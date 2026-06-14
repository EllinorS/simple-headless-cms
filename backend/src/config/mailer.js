// Brevo transactional email via HTTP API (port 443 — not blocked by Render).
import sanitizeHtml from 'sanitize-html';

const SENDER = { name: 'ALAIA Surf Coach', email: process.env.SMTP_FROM };

// Strips all HTML tags from user-supplied strings before injecting into email templates.
const esc = (str) => sanitizeHtml(String(str ?? ''), { allowedTags: [], allowedAttributes: {} });

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
    console.error('Email failed to', to, '— Subject:', subject, '— Error:', message);
    throw new Error(message);
  }

  const data = await res.json();
  console.log('Email sent to', to, '— messageId:', data.messageId);
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
