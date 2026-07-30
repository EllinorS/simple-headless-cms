// Runs hourly. Finds confirmed sessions starting within 24h that haven't had a reminder
// email yet, sends it, and marks it sent — one email per session (not per purchase), since a
// package client needs reminding before EACH date, unlike the once-per-purchase review request.
import cron from 'node-cron';
import * as bookingModel from '../models/booking.model.js';
import { sessionReminderEmail } from '../config/mailer.js';
import { nzWallClockToUtc } from '../utils/nzTime.js';

const REMINDER_WINDOW_MS = 24 * 60 * 60 * 1000;

export const checkAndSendSessionReminders = async () => {
  const candidates = await bookingModel.findPendingSessionReminders();
  if (candidates.length === 0) return;

  for (const booking of candidates) {
    const sessionStart = nzWallClockToUtc(booking.slot_date, booking.slot_time);
    const msUntilSession = sessionStart.getTime() - Date.now();
    // Skip sessions already past (nothing to remind about) or still more than 24h out.
    if (msUntilSession <= 0 || msUntilSession > REMINDER_WINDOW_MS) continue;

    try {
      await sessionReminderEmail(
        booking.client_firstname,
        booking.client_email,
        booking.lesson_title,
        booking.slot_date,
        booking.slot_time,
      );
      await bookingModel.markReminderEmailSent(booking.id);
    } catch (err) {
      console.error(`[sessionReminderJob] failed for booking ${booking.id}:`, err.message);
    }
  }
};

export const startSessionReminderJob = () => {
  cron.schedule('0 * * * *', checkAndSendSessionReminders);
};
