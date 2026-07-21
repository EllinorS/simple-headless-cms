// Runs hourly. Finds confirmed bookings whose (last) session ended 48h+ ago and haven't had a
// review-request email yet, sends it, and marks them sent — one email per client purchase,
// timed off the LAST session for a package rather than each individual one.
import cron from 'node-cron';
import * as bookingModel from '../models/booking.model.js';
import * as siteContentModel from '../models/siteContent.model.js';
import { reviewRequestEmail } from '../config/mailer.js';
import { nzWallClockToUtc } from '../utils/nzTime.js';

const REVIEW_DELAY_MS = 48 * 60 * 60 * 1000;

const lastSessionInstant = async (root) => {
  if (root.sessions_required <= 1) return nzWallClockToUtc(root.slot_date, root.slot_time);
  const sessions = await bookingModel.findGroupSessionsById(root.id);
  const instants = sessions.map((s) => nzWallClockToUtc(s.slot_date, s.slot_time).getTime());
  return new Date(Math.max(...instants));
};

export const checkAndSendReviewRequests = async () => {
  const roots = await bookingModel.findPendingReviewRequestRoots();
  if (roots.length === 0) return;

  const [googleUrl, tripadvisorUrl] = await Promise.all([
    siteContentModel.findContentByKey('global_google_review_url'),
    siteContentModel.findContentByKey('global_tripadvisor_review_url'),
  ]);

  for (const root of roots) {
    const lastSession = await lastSessionInstant(root);
    if (Date.now() < lastSession.getTime() + REVIEW_DELAY_MS) continue;

    try {
      await reviewRequestEmail(
        root.client_firstname,
        root.client_email,
        root.lesson_title,
        googleUrl?.value ?? '',
        tripadvisorUrl?.value ?? '',
      );
      await bookingModel.markReviewEmailSent(root.id);
    } catch (err) {
      console.error(`[reviewRequestJob] failed for booking ${root.id}:`, err.message);
    }
  }
};

export const startReviewRequestJob = () => {
  cron.schedule('0 * * * *', checkAndSendReviewRequests);
};
