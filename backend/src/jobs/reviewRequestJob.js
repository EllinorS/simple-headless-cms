// Runs hourly. Finds confirmed bookings whose (last) session ended 48h+ ago and haven't had a
// review-request email yet, sends it, and marks them sent — one email per client purchase,
// timed off the LAST session for a package rather than each individual one.
import cron from 'node-cron';
import * as bookingModel from '../models/booking.model.js';
import * as siteContentModel from '../models/siteContent.model.js';
import { reviewRequestEmail } from '../config/mailer.js';
import { nzWallClockToUtc } from '../utils/nzTime.js';

const REVIEW_DELAY_MS = 48 * 60 * 60 * 1000;

// Groups batch-fetched group sessions by root id (own id if root, parent_booking_id if sibling).
const groupSessionsByRoot = (sessions) => {
  const byRoot = new Map();
  for (const s of sessions) {
    const rootId = s.parent_booking_id ?? s.id;
    if (!byRoot.has(rootId)) byRoot.set(rootId, []);
    byRoot.get(rootId).push(s);
  }
  return byRoot;
};

const lastSessionInstant = (root, sessionsByRoot) => {
  if (root.sessions_required <= 1) return nzWallClockToUtc(root.slot_date, root.slot_time);
  const sessions = sessionsByRoot.get(root.id) ?? [];
  const instants = sessions.map((s) => nzWallClockToUtc(s.slot_date, s.slot_time).getTime());
  return new Date(Math.max(...instants));
};

export const checkAndSendReviewRequests = async () => {
  const roots = await bookingModel.findPendingReviewRequestRoots();
  if (roots.length === 0) return;

  const [googleUrl, tripadvisorUrl, groupSessions] = await Promise.all([
    siteContentModel.findContentByKey('global_google_review_url'),
    siteContentModel.findContentByKey('global_tripadvisor_review_url'),
    bookingModel.findGroupSessionsByRootIds(
      roots.filter((r) => r.sessions_required > 1).map((r) => r.id),
    ),
  ]);
  const sessionsByRoot = groupSessionsByRoot(groupSessions);

  for (const root of roots) {
    const lastSession = lastSessionInstant(root, sessionsByRoot);
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
