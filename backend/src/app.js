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
import sessionRoutes from './routes/session.routes.js';

if (process.env.NODE_ENV === 'production' && !process.env.CLIENT_URL) {
  console.error('FATAL: CLIENT_URL environment variable is required in production.');
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
app.use('/api/sessions', sessionRoutes);

app.use(errorHandler);

export default app;
