import React from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';

const COLOR = '#7c3aed';
const RESOURCES = [
    { type:'docs',     title:'Winston Docs',         description:'Most popular Node.js logging library. Transports, formats, multiple outputs.', url:'https://github.com/winstonjs/winston' },
    { type:'docs',     title:'Sentry Node.js Docs',  description:'Error tracking setup for Node.js + Express. Source maps, performance monitoring.', url:'https://docs.sentry.io/platforms/node/' },
    { type:'docs',     title:'Sentry React Docs',    description:'Frontend error boundary integration with React.', url:'https://docs.sentry.io/platforms/javascript/guides/react/' },
    { type:'tool',     title:'Morgan — HTTP Logger', description:'HTTP request logger middleware for Express. Works with Winston.', url:'https://github.com/expressjs/morgan' },
];

export default function ErrorTracking() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{color:COLOR}}>Logging & Monitoring</span></div>
                <h1><span className="accent" style={{color:COLOR}}>Winston + Sentry</span><br/><em>See everything in production</em></h1>
                <p className="hero-desc">Production apps fail silently without proper logging and error tracking. Winston logs every event to files. Morgan logs every HTTP request. Sentry catches every unhandled error and alerts you instantly.</p>
                <div className="hero-stack">{['Winston','Morgan','Sentry','Log Levels','Alerts','Error Boundaries'].map(t=><span key={t} className="stack-chip">{t}</span>)}</div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>01</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{color:COLOR}}>Logging</div>
                        <h2>Winston — Structured Logging</h2>
                    </div>
                </div>
                <div className="topic">
                    <CodeBlock lang="bash" code={`npm install winston winston-daily-rotate-file morgan`} />
                    <CodeBlock lang="javascript" code={`// config/logger.js
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const { combine, timestamp, printf, colorize, errors } = winston.format;

// Custom log format
const logFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
    return \`\${timestamp} [\${level.toUpperCase()}] \${stack || message} \${metaStr}\`;
});

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',   // log 'info' and above

    format: combine(
        errors({ stack: true }),   // capture stack traces
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat,
    ),

    transports: [
        // Console (colorized for development)
        new winston.transports.Console({
            format: combine(colorize(), timestamp(), logFormat),
            silent: process.env.NODE_ENV === 'test',
        }),

        // Daily rotating file — errors only
        new DailyRotateFile({
            filename:    'logs/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            level:       'error',
            maxFiles:    '30d',   // keep 30 days
            zippedArchive: true,
        }),

        // Daily rotating file — all logs
        new DailyRotateFile({
            filename:    'logs/combined-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles:    '14d',
        }),
    ],

    exceptionHandlers: [
        new winston.transports.File({ filename: 'logs/exceptions.log' }),
    ],
    rejectionHandlers: [
        new winston.transports.File({ filename: 'logs/rejections.log' }),
    ],
});

module.exports = logger;

// Usage anywhere in app
const logger = require('./config/logger');

logger.info('Server started', { port: 5000, env: 'production' });
logger.warn('Rate limit approaching', { ip: '1.2.3.4', count: 90 });
logger.error('Database connection failed', { error: err.message });
logger.debug('User lookup', { userId: '123', duration: '12ms' });`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>02</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{color:COLOR}}>HTTP Logging</div>
                        <h2>Morgan — HTTP Request Logger</h2>
                    </div>
                </div>
                <div className="topic">
                    <CodeBlock lang="javascript" code={`// middleware/httpLogger.js
const morgan  = require('morgan');
const logger  = require('../config/logger');

// Stream Morgan output into Winston
const stream = {
    write: (message) => logger.http(message.trim()),
};

// Skip logging for health checks
const skip = (req) => req.url === '/health';

const httpLogger = morgan(
    ':remote-addr :method :url :status :res[content-length] - :response-time ms',
    { stream, skip }
);

module.exports = httpLogger;

// server.js — add near the top (before routes)
app.use(require('./middleware/httpLogger'));

// Sample output in logs:
// 192.168.1.1 GET /api/products 200 1234 - 23.456 ms
// 192.168.1.1 POST /api/auth/login 401 89 - 145.23 ms`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>03</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{color:COLOR}}>Sentry</div>
                        <h2>Sentry — Error Tracking in Production</h2>
                        <p className="chapter-intro">Sentry catches unhandled errors, groups them, shows stack traces with source maps, and sends alerts. Free tier handles 5,000 errors/month.</p>
                    </div>
                </div>
                <div className="topic">
                    <h3>Backend Setup</h3>
                    <CodeBlock lang="bash" code={`npm install @sentry/node @sentry/profiling-node`} />
                    <CodeBlock lang="javascript" code={`// server.js — MUST be first import
const Sentry = require('@sentry/node');
const { nodeProfilingIntegration } = require('@sentry/profiling-node');

Sentry.init({
    dsn:          process.env.SENTRY_DSN,  // get from sentry.io → project settings
    environment:  process.env.NODE_ENV,
    integrations: [nodeProfilingIntegration()],
    tracesSampleRate:   1.0,   // 100% in dev, lower in prod (0.1 = 10%)
    profilesSampleRate: 1.0,
});

const app = express();

// Sentry request handler — BEFORE other middleware
app.use(Sentry.Handlers.requestHandler());

// Your routes here
app.use('/api/users',    require('./routes/users'));
app.use('/api/products', require('./routes/products'));

// Sentry error handler — AFTER routes, BEFORE your error handler
app.use(Sentry.Handlers.errorHandler());

// Your error handler last
app.use((err, req, res, next) => {
    logger.error('Unhandled error', { error: err.message, stack: err.stack });
    res.status(err.statusCode || 500).json({ message: err.message || 'Server error' });
});

// Manual error capture
try {
    riskyOperation();
} catch (err) {
    Sentry.captureException(err, {
        extra: { userId: req.user?.id, orderId },
    });
    throw err;
}

// Add user context to errors
Sentry.setUser({ id: user._id, email: user.email });

// Custom breadcrumbs (events leading up to an error)
Sentry.addBreadcrumb({
    category: 'payment',
    message:  \`User \${userId} initiated checkout\`,
    level:    'info',
});`} />
                </div>
                <div className="topic">
                    <h3>React Frontend — Error Boundary</h3>
                    <CodeBlock lang="bash" code={`npm install @sentry/react`} />
                    <CodeBlock lang="javascript" code={`// main.jsx
import * as Sentry from '@sentry/react';

Sentry.init({
    dsn:              import.meta.env.VITE_SENTRY_DSN,
    environment:      import.meta.env.MODE,
    integrations:     [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0.1,  // record 10% of sessions
    replaysOnErrorSampleRate:  1.0, // record 100% of sessions with errors
});

// App.jsx — wrap app with Sentry error boundary
import { ErrorBoundary } from '@sentry/react';

function FallbackUI({ error, resetError }) {
    return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h2>Something went wrong</h2>
            <p>{error?.message}</p>
            <button onClick={resetError}>Try again</button>
        </div>
    );
}

export default function App() {
    return (
        <ErrorBoundary fallback={FallbackUI} showDialog>
            <Router>...</Router>
        </ErrorBoundary>
    );
}`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header"><div><h2 style={{fontFamily:"'Fraunces', serif"}}>Resources</h2></div></div>
                <div className="resource-grid">{RESOURCES.map((r,i)=><ResourceCard key={i} {...r}/>)}</div>
            </section>
            <footer className="footer"><p>Logging & Error Tracking · FullStack Compass</p></footer>
        </>
    );
}
