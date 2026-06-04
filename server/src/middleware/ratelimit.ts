import rateLimit from 'express-rate-limit';

// Auth endpints: 7 attempts per 15 mins

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 7,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many auth attempts. Please try again in 15 minutes.',
  },
  skipSuccessfulRequests: true,
});

// ─── Chat endpoints: 30 messages per minute

export const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Chat rate limit reached. Please slow down.',
  },
});

// General API: 200 req per minute

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests. Please try again shortly.',
  },
});
