const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express   = require('express');
const cors      = require('cors');
const helmet    = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB     = require('./config/db');
const errorHandler  = require('./middleware/errorHandler');

const app = express();

// ── Connect to MongoDB ──────────────────────────────────────────────
// Graceful: app still runs without DB (progress won't persist)
connectDB();

// ── Security Headers ────────────────────────────────────────────────
app.use(helmet());

// ── Rate Limiting ───────────────────────────────────────────────────
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200,                  // max 200 reqs per window per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// ── Core Middleware ─────────────────────────────────────────────────
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? false : '*',
}));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(mongoSanitize()); // prevent NoSQL injection via $gt etc.

// ── Root Route ─────────────────────────────────────────────────────
app.get('/', (req, res) => {
    res.send('Welcome to the FullStack Compass API! 🧭');
});

// ── API Routes ──────────────────────────────────────────────────────
app.use('/api/progress', require('./routes/progress'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', env: process.env.NODE_ENV, time: new Date().toISOString() });
});

// ── Production: serve React build ──────────────────────────────────
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
    });
}

// ── Global Error Handler (must be last) ────────────────────────────
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n🚀  FullStack Compass — server on http://localhost:${PORT}`);
    console.log(`📦  Environment: ${process.env.NODE_ENV || 'development'}\n`);
});