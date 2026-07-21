// Brevo transactional email via HTTP API (port 443 — not blocked by Render).
import sanitizeHtml from 'sanitize-html';

const SENDER = { name: 'ALAIA Surf Coach', email: process.env.SMTP_FROM };

// Strips all HTML tags from user-supplied strings before injecting into email templates.
const esc = (str) => sanitizeHtml(String(str ?? ''), { allowedTags: [], allowedAttributes: {} });

// Masks the local part of an email for logs — enough to spot-check delivery without putting
// full client addresses in server logs.
const maskEmail = (email) => String(email ?? '').replace(/^(.).*(@.*)$/, '$1***$2');

// --- NODEMAILER (SMTP) — disabled: Render blocks outbound SMTP ports ---
// import nodemailer from 'nodemailer';
// const SMTP_PORT = Number(process.env.BREVO_SMTP_PORT);
// export const transporter = nodemailer.createTransport({
//   host: process.env.BREVO_SMTP_HOST,
//   port: SMTP_PORT,
//   secure: SMTP_PORT === 465,
//   auth: {
//     user: process.env.BREVO_SMTP_USER,
//     pass: process.env.BREVO_SMTP_PASS,
//   },
// });
// transporter.verify((err) => {
//   if (err) console.error('SMTP error', err.message);
//   else console.log('SMTP connected');
// });
// const safeSendMail = async (mailOptions) => {
//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent to', mailOptions.to, '— messageId:', info.messageId);
//   } catch (err) {
//     console.error('Email failed to', mailOptions.to);
//     console.error('  Subject:', mailOptions.subject);
//     console.error('  Error:', err.message);
//     console.error('  Code:', err.code, '| Response:', err.response);
//     throw err;
//   }
// };
// --- END NODEMAILER ---

const sendBrevo = async ({ to, replyTo, subject, html }) => {
  const body = {
    sender: SENDER,
    to: [{ email: to }],
    subject,
    htmlContent: html,
  };
  if (replyTo) body.replyTo = { email: replyTo };

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const message = err.message ?? res.statusText;
    console.error('Email failed to', maskEmail(to), '— Subject:', subject, '— Error:', message);
    throw new Error(message);
  }

  const data = await res.json();
  console.log('Email sent to', maskEmail(to), '— messageId:', data.messageId);
};

export const sendResetPasswordEmail = async (email, token) => {
  await sendBrevo({
    to: email,
    subject: 'Reset password',
    html: `
      <h2>Hi ${esc(email)}!</h2>
      <p>Click the link to reset your password:</p>
      <a href="${process.env.CLIENT_URL}/reset-password?token=${token}">Reset my password</a>
    `,
  });
};

// Sent to the client after a single-lesson booking is confirmed. Links to the self-service
// manage-booking page (reschedule/cancel), gated by the booking's own cancel_token.
export const bookingConfirmationEmail = async (firstName, email, lessonTitle, date, time, cancelToken) => {
  await sendBrevo({
    to: email,
    subject: `Booking confirmed — ${esc(lessonTitle)}`,
    html: `
      <h2>Hi ${esc(firstName)}!</h2>
      <p>Your session is confirmed: <strong>${esc(lessonTitle)}</strong> on ${esc(date)} at ${esc(time)}.</p>
      <p>A deposit secures your spot, refundable up to 24h before the session.</p>
      <p><a href="${process.env.CLIENT_URL}/manage-booking?token=${cancelToken}">Manage this booking</a></p>
    `,
  });
};

// Sent to the client after a package booking (3/5 sessions) is confirmed. Links to the
// group manage-booking page, gated by the parent booking's group_cancel_token.
export const packageBookingConfirmationEmail = async (firstName, email, lessonTitle, sessions, groupCancelToken) => {
  const sessionsList = sessions
    .map((s) => `<li>${esc(s.slot.date)} at ${esc(s.slot.time)}</li>`)
    .join('');
  await sendBrevo({
    to: email,
    subject: `Package confirmed — ${esc(lessonTitle)}`,
    html: `
      <h2>Hi ${esc(firstName)}!</h2>
      <p>Your package is confirmed: <strong>${esc(lessonTitle)}</strong>.</p>
      <ul>${sessionsList}</ul>
      <p>A deposit secures your package, refundable up to 24h before the first session.</p>
      <p><a href="${process.env.CLIENT_URL}/manage-booking/package?token=${groupCancelToken}">Manage this package</a></p>
    `,
  });
};

// Sent to the client right after a single-lesson booking is created, while it's still PENDING
// (holds the slot for 48h). Replaces bookingConfirmationEmail at creation time — the real
// confirmation email now only goes out once an admin marks the booking as paid.
export const bookingAwaitingPaymentEmail = async (
  firstName,
  email,
  lessonTitle,
  date,
  time,
  bookingId,
  depositAmount,
  bankDetails,
) => {
  await sendBrevo({
    to: email,
    subject: `Action needed — complete your bank transfer for ${esc(lessonTitle)}`,
    html: `
      <h2>Hi ${esc(firstName)}!</h2>
      <p>We've received your booking request: <strong>${esc(lessonTitle)}</strong> on ${esc(date)} at ${esc(time)}.</p>
      <p>Your spot is held for <strong>48 hours</strong> while we wait for your deposit of <strong>$${esc(depositAmount)}</strong> by bank transfer.</p>
      <p>
        Bank: ${esc(bankDetails.bankName)}<br/>
        Account name: ${esc(bankDetails.accountName)}<br/>
        Account number: ${esc(bankDetails.accountNumber)}<br/>
        Reference: <strong>#${esc(bookingId)}</strong>
      </p>
      <p>${esc(bankDetails.note)}</p>
      <p>We'll send your booking confirmation as soon as we've received your payment.</p>
    `,
  });
};

// Sent to the client right after a package booking (3/5 sessions) is created, while still PENDING.
export const packageAwaitingPaymentEmail = async (
  firstName,
  email,
  lessonTitle,
  sessions,
  bookingId,
  depositAmount,
  bankDetails,
) => {
  const sessionsList = sessions
    .map((s) => `<li>${esc(s.slot.date)} at ${esc(s.slot.time)}</li>`)
    .join('');
  await sendBrevo({
    to: email,
    subject: `Action needed — complete your bank transfer for ${esc(lessonTitle)}`,
    html: `
      <h2>Hi ${esc(firstName)}!</h2>
      <p>We've received your package booking request: <strong>${esc(lessonTitle)}</strong>.</p>
      <ul>${sessionsList}</ul>
      <p>Your sessions are held for <strong>48 hours</strong> while we wait for your deposit of <strong>$${esc(depositAmount)}</strong> by bank transfer.</p>
      <p>
        Bank: ${esc(bankDetails.bankName)}<br/>
        Account name: ${esc(bankDetails.accountName)}<br/>
        Account number: ${esc(bankDetails.accountNumber)}<br/>
        Reference: <strong>#${esc(bookingId)}</strong>
      </p>
      <p>${esc(bankDetails.note)}</p>
      <p>We'll send your package confirmation as soon as we've received your payment.</p>
    `,
  });
};

// Sent after a client (or the coach) cancels a booking.
// Sent once, 48h after a session (or the last session of a package) has passed — asks the
// client to leave a review. googleUrl/tripadvisorUrl come from site_content and may be empty
// if not yet configured in the admin, in which case that link is simply omitted.
export const reviewRequestEmail = async (firstName, email, lessonTitle, googleUrl, tripadvisorUrl) => {
  const links = [
    googleUrl && `<p><a href="${esc(googleUrl)}">Leave us a review on Google</a></p>`,
    tripadvisorUrl && `<p><a href="${esc(tripadvisorUrl)}">Leave us a review on TripAdvisor</a></p>`,
  ]
    .filter(Boolean)
    .join('');
  await sendBrevo({
    to: email,
    subject: `How was your session, ${esc(firstName)}?`,
    html: `
      <h2>Hi ${esc(firstName)}!</h2>
      <p>We hope you had a great time at your <strong>${esc(lessonTitle)}</strong> session with ALAIA Surf Coach.</p>
      <p>If you enjoyed it, a quick review would mean the world to us and helps other surfers find us.</p>
      ${links}
    `,
  });
};

export const bookingCancelledEmail = async (firstName, email, lessonTitle, date, time, isPackage) => {
  await sendBrevo({
    to: email,
    subject: `Booking cancelled — ${esc(lessonTitle)}`,
    html: `
      <h2>Hi ${esc(firstName)}!</h2>
      <p>${isPackage ? 'Your package' : 'Your session'} <strong>${esc(lessonTitle)}</strong>
      (${esc(date)} at ${esc(time)}) has been cancelled.</p>
      <p>If a deposit was paid, it will be refunded.</p>
    `,
  });
};

// Sent after a client (or the coach) reschedules a booking to a new date/time. When this
// session is part of a package, otherSessions carries the rest of the package's upcoming
// sessions so the reminder is self-contained — no need to dig through older emails to
// reconstruct the full schedule after one date changes.
export const bookingRescheduledEmail = async (
  firstName,
  email,
  lessonTitle,
  oldSlot,
  newSlot,
  cancelToken,
  otherSessions = [],
) => {
  const scheduleReminder = otherSessions.length
    ? `
      <p>Here's your full updated package schedule:</p>
      <ul>
        <li><strong>${esc(newSlot.date)} at ${esc(newSlot.time)}</strong> (rescheduled)</li>
        ${otherSessions.map((s) => `<li>${esc(s.date)} at ${esc(s.time)}</li>`).join('')}
      </ul>
    `
    : '';
  await sendBrevo({
    to: email,
    subject: `Session rescheduled — ${esc(lessonTitle)}`,
    html: `
      <h2>Hi ${esc(firstName)}!</h2>
      <p>Your session <strong>${esc(lessonTitle)}</strong> has been moved
      to <strong>${esc(newSlot.date)} at ${esc(newSlot.time)}</strong> (was ${esc(oldSlot.date)} at ${esc(oldSlot.time)}).</p>
      ${scheduleReminder}
      <p><a href="${process.env.CLIENT_URL}/manage-booking?token=${cancelToken}">Manage this booking</a></p>
    `,
  });
};

// Sent to the admin inbox when a visitor submits the contact form.
export const newContactEmail = async (firstName, lastName, email, phone, subject, message, source) => {
  const emailSubject = source
    ? `${esc(source)} — ${esc(subject)}`
    : `New message — ${esc(subject)}`;

  await sendBrevo({
    to: process.env.CONTACT_EMAIL,
    replyTo: email,
    subject: emailSubject,
    html: `
      <p>First name: ${esc(firstName)}<br/>
      Last name: ${esc(lastName)}<br/>
      Phone: ${esc(phone)}<br/>
      Email: ${esc(email)}<br/>
      Message: ${esc(message)}</p>
    `,
  });
};
