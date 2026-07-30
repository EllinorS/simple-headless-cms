// Verifies the JWT stored in the HttpOnly auth_token cookie on every protected route, then
// re-checks the user against the DB so a deleted/demoted account can't keep using an
// already-issued token until it naturally expires — the JWT payload alone can't be revoked.
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import * as authModel from '../models/auth.model.js';
import asyncHandler from '../utils/asyncHandler.js';

export const authMiddleware = asyncHandler(async (req, res, next) => {
  // cookieParser in app.js parses it into req.cookies before this middleware runs.
  const token = req.cookies?.auth_token;

  if (!token) return res.status(401).json({ message: 'Missing token' });

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error('JWT verification failed:', err.name, err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }

  const user = await authModel.findUserById(payload.id);
  if (!user) return res.status(401).json({ message: 'Invalid token' });

  req.user = { id: user.id, email: user.email, role: user.role };
  next();
});
