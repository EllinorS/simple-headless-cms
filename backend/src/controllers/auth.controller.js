// Auth controller: login/logout (JWT in HttpOnly cookie)
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import ms from 'ms';
import argon2 from 'argon2';
import { v4 as uuid4 } from 'uuid';

import * as authModel from '../models/auth.model.js';
import { sendResetPasswordEmail } from '../config/mailer.js';
import asyncHandler from '../utils/asyncHandler.js';
import { toUserDTO } from '../utils/dto.js';

// Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await authModel.findAllUsers();
  res.status(200).json({ data: users.map(toUserDTO) });
});

// Login

// Precomputed once at startup so a nonexistent email still pays the same argon2.verify cost
// as a real one below — otherwise "no such account" (instant 400) and "wrong password"
// (400 after a hash verify) are distinguishable by response latency alone.
const DUMMY_HASH = await argon2.hash('dummy-password-for-timing-safety');

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await authModel.findUserByEmail(email);

  const valid = await argon2.verify(user ? user.password : DUMMY_HASH, password);
  if (!user || !valid) {
    return res.status(400).json({ message: 'Incorrect email or password' });
  }

  await authModel.updateLastLogin(user.id);

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
  );

  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: ms(process.env.JWT_EXPIRES_IN ?? '7d'),
  });

  return res.status(200).json({ data: toUserDTO(user) });
});

// Connected user

export const connectedUser = asyncHandler(async (req, res) => {
  const user = await authModel.findUserById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.status(200).json({ data: toUserDTO(user) });
});

// ResetPassword Request

export const resetPasswordRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await authModel.findUserByEmail(email);
  // Always return 200 with the same message regardless of whether the email exists.
  if (!user)
    return res.status(200).json({ message: 'If this email exists, a reset link has been sent.' });
  const resetToken = uuid4();
  await authModel.storeResetToken(user.id, resetToken);
  // Fire-and-forget: awaiting the outbound email call would make the response noticeably
  // slower for a real account than for a nonexistent one, leaking the same kind of timing
  // signal this endpoint's response body is designed to hide. sendBrevo already logs failures.
  sendResetPasswordEmail(email, resetToken).catch(() => {});
  res.status(200).json({ message: 'If this email exists, a reset link has been sent.' });
});

// Reset password

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;

  const user = await authModel.findUserByResetToken(token);
  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
  const passwordHash = await argon2.hash(password);
  await authModel.updatePassword(user.id, passwordHash);
  await authModel.clearResetToken(user.id);

  res.status(200).json({ message: 'Password reset successfully.' });
});

// logout

export const logout = (req, res) => {
  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });
  res.status(200).json({ message: 'Logged out' });
};

// Invite user (SUPER_ADMIN only)
// new user can choose their own password before their first login.

export const inviteUser = asyncHandler(async (req, res) => {
  const { email, firstName, lastName, role } = req.body;

  const existing = await authModel.findUserByEmail(email);
  if (existing) return res.status(400).json({ message: 'Email already in use.' });

  const roleRecord = await authModel.findRoleByName(role);
  if (!roleRecord) return res.status(400).json({ message: 'Invalid role.' });

  const passwordHash = await argon2.hash(uuid4());
  const userId = await authModel.createAdminUser(
    roleRecord.id,
    email,
    passwordHash,
    firstName,
    lastName,
  );

  const resetToken = uuid4();
  await authModel.storeResetToken(userId, resetToken);
  await sendResetPasswordEmail(email, resetToken);

  const newUser = await authModel.findUserById(userId);
  res.status(201).json({ data: toUserDTO(newUser) });
});

// delete user

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (String(req.user.id) === String(id))
    return res.status(403).json({ message: 'You cannot delete your own account.' });

  const existingUser = await authModel.findUserById(id);
  if (!existingUser) return res.status(404).json({ message: 'User not found.' });

  await authModel.deleteUserById(id);
  res.status(204).send();
});
