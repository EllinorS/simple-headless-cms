// Entry point: binds the Express app to a port. Keep this file thin — all middleware and routes live in app.js.
import 'dotenv/config';
import app from './app.js';
import { startReviewRequestJob } from './jobs/reviewRequestJob.js';
import { startSessionReminderJob } from './jobs/sessionReminderJob.js';

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT} `);
  startReviewRequestJob();
  startSessionReminderJob();
});
