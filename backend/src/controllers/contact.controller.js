import asyncHandler from '../utils/asyncHandler.js';
import { newContactEmail } from '../config/mailer.js';

export const createContact = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, subject, message, source } = req.body;
  await newContactEmail(firstName, lastName, email, phone ?? '', subject, message, source);
  res.status(202).json({ message: 'Message sent' });
});
