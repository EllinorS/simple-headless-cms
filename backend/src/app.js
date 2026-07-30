// Express app: registers global middleware (CORS, Helmet, rate limiting, cookie parser)
// and mounts all API route groups. Exported to server.js which binds the port.
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import { errorHandler } from './utils/errorHandler.js';
import authRoutes from './routes/auth.routes.js';
import mediaRoutes from './routes/media.cloudinary.routes.js';
import siteContentRoutes from './routes/siteContent.routes.js';
import contactRoutes from './routes/contact.routes.js';
import lessonRoutes from './routes/lesson.routes.js';
import slotRoutes from './routes/slot.routes.js';
import formRoutes from './routes/form.routes.js';
import submissionRoutes from './routes/submission.routes.js';
import bookingRoutes from './routes/booking.routes.js';

if (process.env.NODE_ENV === 'production' && !process.env.CLIENT_URL) {
  console.error('FATAL: CLIENT_URL environment variable is required in production.');
  process.exit(1);
}

// Without JWT_SECRET, jwt.sign() only fails at the first login attempt, not at boot.
// Without JWT_EXPIRES_IN, jwt.sign() silently signs a token with no expiry at all — it would
// stay valid forever if a cookie ever leaked. Both cases should fail loudly at startup instead.
if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  console.error('FATAL: JWT_SECRET environment variable is required in production.');
  process.exit(1);
}
if (process.env.NODE_ENV === 'production' && !process.env.JWT_EXPIRES_IN) {
  console.error('FATAL: JWT_EXPIRES_IN environment variable is required in production.');
  process.exit(1);
}

const app = express();

app.set('trust proxy', 1);

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3002',
    credentials: true,
  }),
);

// secure http headers
app.use(helmet());

// Limits the number of requests per IP to prevent brute force attacks
const limiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 10 : 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many login attempts, please try again later.' },
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 5 : 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many messages sent, please try again later.' },
});

const submissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 5 : 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests sent, please try again later.' },
});

// Public content reads (/api/content GET) get their own, more generous limiter:
// every visitor loads several of these per page view, so sharing the brute-force
// quota with them starves out legitimate traffic (and can lock the admin out of login).
const contentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' },
});

const bookingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 5 : 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many booking attempts, please try again later.' },
});

if (process.env.NODE_ENV !== 'test') {
  app.use((req, res, next) => {
    if (req.method === 'GET' && req.path.startsWith('/api/content')) return contentLimiter(req, res, next);
    return limiter(req, res, next);
  });
}
app.use(cookieParser());

// Allows Express to read JSON sent in request bodies
app.use(express.json({ limit: '10kb' }));

// Health check
app.get('/api/health', (req, res) => res.status(200).json({ status: 'OK' }));
 
// Routes
app.use('/api/auth', ...(process.env.NODE_ENV !== 'test' ? [authLimiter] : []), authRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/content', siteContentRoutes);
app.use('/api/contact', ...(process.env.NODE_ENV !== 'test' ? [contactLimiter] : []), contactRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/forms', formRoutes);
app.use(
  '/api/submissions',
  (req, res, next) => {
    if (process.env.NODE_ENV !== 'test' && req.method === 'POST') return submissionLimiter(req, res, next);
    return next();
  },
  submissionRoutes,
);
app.use(
  '/api/bookings',
  (req, res, next) => {
    if (process.env.NODE_ENV !== 'test' && req.method === 'POST') return bookingLimiter(req, res, next);
    return next();
  },
  bookingRoutes,
);

app.use(errorHandler);

export default app;
