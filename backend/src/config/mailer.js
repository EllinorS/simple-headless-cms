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

// --- BRAND TEMPLATE ---
// Colors mirror the site's design tokens (frontend/app/globals.css) so emails match the brand.
const BRAND = {
  cream: '#f5f2ee',
  darkBlue: '#152d3c',
  primary: '#1a7060',
  gold: '#e8a85e',
  text: '#2e2622',
  border: '#e0dcd5',
};

// Text-based header, not an image logo — SVG logos don't render in Outlook desktop, and a
// hosted PNG isn't available yet. Revisit if a raster logo gets added to /public/assets.
const socialLinksHtml = () => {
  const links = [
    process.env.SOCIAL_INSTAGRAM_URL &&
      `<a href="${process.env.SOCIAL_INSTAGRAM_URL}" style="color:${BRAND.cream};text-decoration:none;margin:0 10px;font-size:13px;">Instagram</a>`,
    process.env.SOCIAL_FACEBOOK_URL &&
      `<a href="${process.env.SOCIAL_FACEBOOK_URL}" style="color:${BRAND.cream};text-decoration:none;margin:0 10px;font-size:13px;">Facebook</a>`,
  ].filter(Boolean);
  return links.length
    ? `<p style="margin:0 0 12px;">${links.join(`<span style="color:${BRAND.cream};opacity:0.4;">•</span>`)}</p>`
    : '';
};

// Wraps email body markup in the shared branded layout: dark header, cream body, footer with
// social links + copyright. Table-based layout for Outlook/legacy client compatibility.
const layout = (bodyHtml, preheader = '') => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="margin:0;padding:0;background:${BRAND.cream};font-family:Helvetica,Arial,sans-serif;">
    <span style="display:none;font-size:1px;color:${BRAND.cream};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${esc(preheader)}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.cream};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="background:${BRAND.darkBlue};padding:28px 32px;text-align:center;">
                <p style="margin:0;color:${BRAND.cream};font-size:18px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Alaia Surf Coach</p>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px;color:${BRAND.text};font-size:15px;line-height:1.6;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="background:${BRAND.darkBlue};padding:24px 32px;text-align:center;">
                ${socialLinksHtml()}
                <p style="margin:0;color:${BRAND.cream};opacity:0.6;font-size:11px;">© ${new Date().getFullYear()} Alaia Surf Coach</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

const button = (href, label) => `
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:20px 0;">
    <tr>
      <td style="background:${BRAND.primary};border-radius:8px;">
        <a href="${href}" style="display:inline-block;padding:13px 26px;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;">${label}</a>
      </td>
    </tr>
  </table>`;

const infoBox = (innerHtml) => `
  <div style="background:${BRAND.cream};border:1px solid ${BRAND.border};border-radius:8px;padding:18px 20px;margin:18px 0;">
    ${innerHtml}
  </div>`;

const heading = (text) =>
  `<h2 style="margin:0 0 16px;color:${BRAND.text};font-size:20px;">${text}</h2>`;
// --- END BRAND TEMPLATE ---

export const sendResetPasswordEmail = async (email, token) => {
  await sendBrevo({
    to: email,
    subject: 'Reset your password',
    html: layout(`
      ${heading('Reset your password')}
      <p>We received a request to reset the password for your account.</p>
      <p>Click below to set a new one. This link expires shortly for your security.</p>
      ${button(`${process.env.CLIENT_URL}/reset-password?token=${token}`, 'Reset my password')}
      <p style="font-size:13px;color:#8a8a8a;">Didn't request this? You can safely ignore this email.</p>
    `),
  });
};

// Sent to the client after a single-lesson booking is confirmed. Links to the self-service
// manage-booking page (reschedule/cancel), gated by the booking's own cancel_token.
export const bookingConfirmationEmail = async (firstName, email, lessonTitle, date, time, cancelToken) => {
  await sendBrevo({
    to: email,
    subject: `Booking confirmed — ${esc(lessonTitle)}`,
    html: layout(`
      ${heading(`Hi ${esc(firstName)}!`)}
      <p>Great news — your surf session is locked in.</p>
      ${infoBox(`
        <p style="margin:0 0 4px;font-size:16px;"><strong>${esc(lessonTitle)}</strong></p>
        <p style="margin:0;color:${BRAND.primary};font-weight:600;">${esc(date)} at ${esc(time)}</p>
      `)}
      <p>Your deposit secures this spot — free reschedule or cancellation up to 24h before the session.</p>
      ${button(`${process.env.CLIENT_URL}/manage-booking?token=${cancelToken}`, 'Manage my booking')}
      <p>See you on the water!</p>
    `, `Your session is confirmed for ${date} at ${time}`),
  });
};

// Sent to the client after a package booking (3/5 sessions) is confirmed. Links to the
// group manage-booking page, gated by the parent booking's group_cancel_token.
export const packageBookingConfirmationEmail = async (firstName, email, lessonTitle, sessions, groupCancelToken) => {
  const sessionsList = sessions
    .map((s) => `<li style="margin:4px 0;">${esc(s.slot.date)} at ${esc(s.slot.time)}</li>`)
    .join('');
  await sendBrevo({
    to: email,
    subject: `Package confirmed — ${esc(lessonTitle)}`,
    html: layout(`
      ${heading(`Hi ${esc(firstName)}!`)}
      <p>Great news — your package is locked in: <strong>${esc(lessonTitle)}</strong>.</p>
      ${infoBox(`<ul style="margin:0;padding-left:18px;">${sessionsList}</ul>`)}
      <p>Your deposit secures the whole package — free reschedule or cancellation up to 24h before your first session.</p>
      ${button(`${process.env.CLIENT_URL}/manage-booking/package?token=${groupCancelToken}`, 'Manage my package')}
      <p>See you on the water!</p>
    `, `Your package is confirmed: ${lessonTitle}`),
  });
};

// Sent to the client right after a single-lesson booking is created, while it's still PENDING
// (holds the slot for up to 48h — holdHours is the actual clamped window, shorter for
// last-minute bookings). Replaces bookingConfirmationEmail at creation time — the real
// confirmation email now only goes out once an admin marks the booking as paid.
export const bookingAwaitingPaymentEmail = async (
  firstName,
  email,
  lessonTitle,
  date,
  time,
  bookingId,
  depositAmount,
  holdHours,
  bankDetails,
) => {
  await sendBrevo({
    to: email,
    subject: `Action needed — complete your bank transfer for ${esc(lessonTitle)}`,
    html: layout(`
      ${heading(`Hi ${esc(firstName)}!`)}
      <p>Thanks for booking <strong>${esc(lessonTitle)}</strong> on ${esc(date)} at ${esc(time)} — you're almost set.</p>
      <p>We're holding your spot for <strong>${esc(holdHours)} hour${holdHours === 1 ? '' : 's'}</strong> while we wait for your deposit of <strong>$${esc(depositAmount)}</strong> by bank transfer.</p>
      ${infoBox(`
        <p style="margin:0 0 6px;"><strong>Bank:</strong> ${esc(bankDetails.bankName)}</p>
        <p style="margin:0 0 6px;"><strong>Account name:</strong> ${esc(bankDetails.accountName)}</p>
        <p style="margin:0 0 6px;"><strong>Account number:</strong> ${esc(bankDetails.accountNumber)}</p>
        <p style="margin:0;"><strong>Reference:</strong> #${esc(bookingId)}</p>
      `)}
      ${bankDetails.note ? `<p style="font-size:13px;color:#8a8a8a;">${esc(bankDetails.note)}</p>` : ''}
      <p>We'll send your confirmation as soon as your payment lands.</p>
    `, `Complete your bank transfer to secure your spot`),
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
  holdHours,
  bankDetails,
) => {
  const sessionsList = sessions
    .map((s) => `<li style="margin:4px 0;">${esc(s.slot.date)} at ${esc(s.slot.time)}</li>`)
    .join('');
  await sendBrevo({
    to: email,
    subject: `Action needed — complete your bank transfer for ${esc(lessonTitle)}`,
    html: layout(`
      ${heading(`Hi ${esc(firstName)}!`)}
      <p>Thanks for booking your package: <strong>${esc(lessonTitle)}</strong> — you're almost set.</p>
      ${infoBox(`<ul style="margin:0;padding-left:18px;">${sessionsList}</ul>`)}
      <p>We're holding your sessions for <strong>${esc(holdHours)} hour${holdHours === 1 ? '' : 's'}</strong> while we wait for your deposit of <strong>$${esc(depositAmount)}</strong> by bank transfer.</p>
      ${infoBox(`
        <p style="margin:0 0 6px;"><strong>Bank:</strong> ${esc(bankDetails.bankName)}</p>
        <p style="margin:0 0 6px;"><strong>Account name:</strong> ${esc(bankDetails.accountName)}</p>
        <p style="margin:0 0 6px;"><strong>Account number:</strong> ${esc(bankDetails.accountNumber)}</p>
        <p style="margin:0;"><strong>Reference:</strong> #${esc(bookingId)}</p>
      `)}
      ${bankDetails.note ? `<p style="font-size:13px;color:#8a8a8a;">${esc(bankDetails.note)}</p>` : ''}
      <p>We'll send your confirmation as soon as your payment lands.</p>
    `, `Complete your bank transfer to secure your sessions`),
  });
};

// Sent ~24h before a confirmed session. Each individual session in a package gets its own
// reminder (unlike reviewRequestEmail, which is once per purchase) since a client needs
// prompting before EVERY date, not just the first. The Q&A copy below is a generic
// surf-lesson placeholder (what to bring / weather policy / arrival time) — not a confirmed
// business fact, edit the wording in this file to match ALAIA's actual policies.
export const sessionReminderEmail = async (firstName, email, lessonTitle, date, time) => {
  await sendBrevo({
    to: email,
    subject: `See you soon — ${esc(lessonTitle)}`,
    html: layout(`
      ${heading(`Hi ${esc(firstName)}!`)}
      <p>Just a reminder — your session is coming up:</p>
      ${infoBox(`
        <p style="margin:0 0 4px;font-size:16px;"><strong>${esc(lessonTitle)}</strong></p>
        <p style="margin:0;color:${BRAND.primary};font-weight:600;">${esc(date)} at ${esc(time)}</p>
      `)}
      <p style="margin:24px 0 12px;font-weight:600;">A few quick things:</p>
      <p style="margin:0 0 12px;"><strong>What should I bring?</strong><br/>Just your togs, a towel, and sunscreen — we provide the board and wetsuit.</p>
      <p style="margin:0 0 12px;"><strong>What if the weather turns?</strong><br/>We keep an eye on conditions — if it's not safe to surf, we'll reach out to reschedule at no cost to you.</p>
      <p style="margin:0 0 12px;"><strong>What time should I arrive?</strong><br/>Please arrive about 10 minutes early so we can get you set up before the session starts.</p>
      <p>Got another question? Our FAQ covers the rest.</p>
      ${button(`${process.env.CLIENT_URL}/faq`, 'Visit our FAQ')}
    `, `Your session is coming up — a few quick reminders`),
  });
};

// Sent once, 48h after a session (or the last session of a package) has passed — asks the
// client to leave a review. googleUrl/tripadvisorUrl come from site_content and may be empty
// if not yet configured in the admin, in which case that link is simply omitted.
export const reviewRequestEmail = async (firstName, email, lessonTitle, googleUrl, tripadvisorUrl) => {
  const links = [
    googleUrl && button(esc(googleUrl), 'Leave a review on Google'),
    tripadvisorUrl && button(esc(tripadvisorUrl), 'Leave a review on TripAdvisor'),
  ]
    .filter(Boolean)
    .join('');
  await sendBrevo({
    to: email,
    subject: `How was your session, ${esc(firstName)}?`,
    html: layout(`
      ${heading(`Hi ${esc(firstName)}!`)}
      <p>We hope you caught some great waves during your <strong>${esc(lessonTitle)}</strong> session with ALAIA Surf Coach.</p>
      <p>If you had a good time, a quick review helps other surfers find us — it means a lot.</p>
      ${links}
    `, `How was your session with ALAIA Surf Coach?`),
  });
};

export const bookingCancelledEmail = async (firstName, email, lessonTitle, date, time, isPackage) => {
  await sendBrevo({
    to: email,
    subject: `Booking cancelled — ${esc(lessonTitle)}`,
    html: layout(`
      ${heading(`Hi ${esc(firstName)}!`)}
      <p>${isPackage ? 'Your package' : 'Your session'} <strong>${esc(lessonTitle)}</strong>
      (${esc(date)} at ${esc(time)}) has been cancelled.</p>
      <p>If a deposit was paid, it will be refunded to you.</p>
      <p>Hope to see you back on the water soon.</p>
    `, `Your booking has been cancelled`),
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
      <p style="margin:18px 0 8px;font-size:13px;color:#8a8a8a;text-transform:uppercase;letter-spacing:0.5px;">Your full updated schedule</p>
      ${infoBox(`
        <ul style="margin:0;padding-left:18px;">
          <li style="margin:4px 0;color:${BRAND.primary};font-weight:600;">${esc(newSlot.date)} at ${esc(newSlot.time)} (rescheduled)</li>
          ${otherSessions.map((s) => `<li style="margin:4px 0;">${esc(s.date)} at ${esc(s.time)}</li>`).join('')}
        </ul>
      `)}
    `
    : '';
  await sendBrevo({
    to: email,
    subject: `Session rescheduled — ${esc(lessonTitle)}`,
    html: layout(`
      ${heading(`Hi ${esc(firstName)}!`)}
      <p>Your session <strong>${esc(lessonTitle)}</strong> has a new time.</p>
      ${infoBox(`
        <p style="margin:0 0 6px;text-decoration:line-through;opacity:0.5;">Was: ${esc(oldSlot.date)} at ${esc(oldSlot.time)}</p>
        <p style="margin:0;color:${BRAND.primary};font-weight:600;">Now: ${esc(newSlot.date)} at ${esc(newSlot.time)}</p>
      `)}
      ${scheduleReminder}
      ${button(`${process.env.CLIENT_URL}/manage-booking?token=${cancelToken}`, 'Manage my booking')}
    `, `Your session has been moved to ${newSlot.date} at ${newSlot.time}`),
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
    html: layout(`
      ${heading('New enquiry' + (source ? ` from ${esc(source)}` : ''))}
      ${infoBox(`
        <p style="margin:0 0 6px;"><strong>Name:</strong> ${esc(firstName)} ${esc(lastName)}</p>
        <p style="margin:0 0 6px;"><strong>Email:</strong> ${esc(email)}</p>
        <p style="margin:0 0 6px;"><strong>Phone:</strong> ${esc(phone)}</p>
        <p style="margin:0;"><strong>Message:</strong><br/>${esc(message)}</p>
      `)}
    `, emailSubject),
  });
};
