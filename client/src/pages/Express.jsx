import React from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';
import PracticeArena from '../components/PracticeArena.jsx';

const COLOR = 'var(--express-color)';

const RESOURCES = [
    { type: 'docs',     title: 'Express Official Docs',   description: 'Full API reference, guide, and advanced routing. Small but dense.', url: 'https://expressjs.com/' },
    { type: 'tutorial', title: 'MDN — Express/Node Tutorial', description: "Mozilla's complete Express tutorial — builds a full library app step by step.", url: 'https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs' },
    { type: 'tool',     title: 'Postman',                 description: 'Test your Express API endpoints visually. Essential for backend development.', url: 'https://www.postman.com/' },
    { type: 'tool',     title: 'REST Client (VS Code)',   description: 'Test HTTP requests directly inside VS Code with .http files.', url: 'https://marketplace.visualstudio.com/items?itemName=humao.rest-client' },
];

const GAMES = [
    { emoji: '🏋️', name: 'Build a REST API', description: 'Build a fully functional CRUD REST API with Express and connect it to MongoDB.', url: 'https://www.theodinproject.com/lessons/nodejs-express-101' },
];

export default function Express() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{ color: COLOR }}>Express.js</span> — Chapter 07</div>
                <h1><span className="accent" style={{ color: COLOR }}>Express</span><br /><em>Minimal. Fast. Unopinionated.</em></h1>
                <p className="hero-desc">Express is the most popular Node.js web framework. It wraps Node's raw HTTP module with routing, middleware, and a clean API — letting you build REST APIs and web servers in minutes instead of hours.</p>
                <div className="hero-stack">
                    {['Routing', 'Middleware', 'Request & Response', 'REST API', 'Error Handling', 'Security'].map(t => <span key={t} className="stack-chip">{t}</span>)}
                </div>
            </section>

            {/* ── SETUP ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>01</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Getting Started</div>
                        <h2>Setup & Hello World</h2>
                    </div>
                </div>

                <div className="topic">
                    <h3>Install & First Server</h3>
                    <CodeBlock lang="bash" code={`mkdir my-api && cd my-api
npm init -y
npm install express dotenv
npm install -D nodemon

# package.json scripts:
# "dev":   "nodemon server.js"
# "start": "node server.js"`} />
                    <CodeBlock lang="javascript" code={`// server.js
const express = require('express');
const app = express();

// Parse incoming JSON bodies
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: false }));

// A basic route
app.get('/', (req, res) => {
  res.json({ message: 'FullStack Compass API is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`} />
                </div>
            </section>

            {/* ── ROUTING ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>02</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Routing</div>
                        <h2>Routing — Handling Requests</h2>
                        <p className="chapter-intro">Routes map HTTP methods + paths to handler functions. Express supports dynamic segments, query strings, and nested routers.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Basic Routes & HTTP Methods</h3>
                    <CodeBlock lang="javascript" code={`// HTTP method = action, path = resource
app.get('/api/users',        getAllUsers);    // READ — list all
app.get('/api/users/:id',    getUserById);   // READ — one
app.post('/api/users',       createUser);    // CREATE
app.put('/api/users/:id',    replaceUser);   // UPDATE — full replace
app.patch('/api/users/:id',  updateUser);    // UPDATE — partial
app.delete('/api/users/:id', deleteUser);    // DELETE

// Route params — :id is dynamic
app.get('/api/users/:id/posts/:postId', (req, res) => {
  const { id, postId } = req.params;
  res.json({ userId: id, postId });
});

// Query strings — /api/users?role=admin&page=2&limit=10
app.get('/api/users', (req, res) => {
  const { role, page = 1, limit = 10 } = req.query;
  // parse page/limit as numbers
  res.json({ role, page: +page, limit: +limit });
});

// Handle multiple methods on same path
app.route('/api/users/:id')
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);`} />
                </div>

                <div className="topic">
                    <h3>Express Router — Modular Routes</h3>
                    <CodeBlock lang="javascript" code={`// routes/users.js — separate file for user routes
const express = require('express');
const router = express.Router();

// GET /api/users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().lean();
    res.json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/users/:id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: 'Invalid ID format' });
  }
});

// POST /api/users
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// PATCH /api/users/:id
router.patch('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

// ── server.js — mount the router ──────────────────
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));
// all routes in users.js are now prefixed with /api/users`} />
                </div>
            </section>

            {/* ── MIDDLEWARE ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>03</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Middleware</div>
                        <h2>Middleware — The Power of Express</h2>
                        <p className="chapter-intro">Middleware functions run between receiving a request and sending a response. They can modify <code>req</code>, modify <code>res</code>, call <code>next()</code>, or end the cycle entirely.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Writing Middleware</h3>
                    <CodeBlock lang="javascript" code={`// Middleware signature: (req, res, next)
// MUST call next() to pass control to the next middleware

// ── Application-level middleware ──────────────────
// Runs on every request
app.use((req, res, next) => {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
  next();  // pass to next middleware/route
});

// ── Route-level middleware ─────────────────────────
// Only runs on specific routes
app.use('/api/admin', requireAdminRole);

// ── Authentication middleware ─────────────────────
const protect = async (req, res, next) => {
  try {
    // Check Authorization header
    const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);  // attach user to req
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Apply to a specific route
app.get('/api/profile', protect, (req, res) => {
  res.json({ user: req.user });  // req.user was set by middleware
});

// ── Multiple middleware on a route ────────────────
app.post('/api/posts', protect, checkAuthor, validateBody, createPost);

// ── Third-party middleware ─────────────────────────
const cors    = require('cors');
const helmet  = require('helmet');
const morgan  = require('morgan');    // HTTP request logger

app.use(helmet());        // security headers
app.use(cors());          // allow cross-origin requests
app.use(morgan('dev'));    // log: "GET /api/users 200 12ms"
app.use(express.json());  // parse JSON body`} />
                </div>
            </section>

            {/* ── REQUEST & RESPONSE ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>04</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Core API</div>
                        <h2>Request & Response Objects</h2>
                    </div>
                </div>

                <div className="topic">
                    <h3>req — Reading the Request</h3>
                    <CodeBlock lang="javascript" code={`app.post('/api/users/:id', (req, res) => {
  // ── URL & Params ──────────────────────────────
  req.params.id;            // ':id' from URL  e.g. '64a1b2c3'
  req.query.page;           // ?page=2          e.g. '2' (string)
  req.query.limit;          // ?limit=10        e.g. '10'
  req.path;                 // '/api/users/123'
  req.url;                  // '/api/users/123?page=2'
  req.baseUrl;              // '/api'

  // ── Body ──────────────────────────────────────
  req.body;                 // parsed JSON body (needs express.json() middleware)
  req.body.name;            // specific field

  // ── Headers ───────────────────────────────────
  req.headers;
  req.headers.authorization;   // 'Bearer <token>'
  req.headers['content-type']; // 'application/json'
  req.get('Content-Type');     // header by name (case-insensitive)

  // ── Method & Protocol ─────────────────────────
  req.method;               // 'GET', 'POST', 'PATCH', etc.
  req.protocol;             // 'http' or 'https'
  req.secure;               // true if https
  req.ip;                   // client IP address
  req.hostname;             // 'localhost' or 'example.com'

  // ── Cookies (needs cookie-parser) ─────────────
  req.cookies.token;
});`} />
                </div>

                <div className="topic">
                    <h3>res — Sending the Response</h3>
                    <CodeBlock lang="javascript" code={`app.get('/examples', (req, res) => {
  // ── JSON (most common for APIs) ───────────────
  res.json({ success: true, data: [] });
  res.status(201).json({ success: true, data: newItem });
  res.status(404).json({ success: false, error: 'Not found' });

  // ── Status codes ──────────────────────────────
  res.status(200);  // OK (default)
  res.status(201);  // Created
  res.status(204).send();  // No Content (DELETE success)
  res.status(400);  // Bad Request
  res.status(401);  // Unauthorized (not logged in)
  res.status(403);  // Forbidden (logged in but no permission)
  res.status(404);  // Not Found
  res.status(409);  // Conflict (e.g. email already exists)
  res.status(422);  // Unprocessable Entity (validation error)
  res.status(500);  // Internal Server Error

  // ── Headers ───────────────────────────────────
  res.set('X-Custom-Header', 'value');
  res.setHeader('Content-Type', 'text/plain');

  // ── Redirect ──────────────────────────────────
  res.redirect('/new-path');
  res.redirect(301, '/permanent-redirect');

  // ── Send file ─────────────────────────────────
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
  res.download('/path/to/file.pdf');  // triggers browser download

  // ── Cookies ───────────────────────────────────
  res.cookie('token', value, {
    httpOnly: true,   // JS can't access
    secure:   true,   // HTTPS only
    maxAge:   3600000 // 1 hour in ms
  });
  res.clearCookie('token');
});`} />
                </div>
            </section>

            {/* ── ERROR HANDLING ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>05</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Error Handling</div>
                        <h2>Global Error Handling</h2>
                        <p className="chapter-intro">Never put try/catch in every route. Use a centralized error handler — it keeps routes clean and ensures consistent error responses.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>The Async Handler Pattern</h3>
                    <CodeBlock lang="javascript" code={`// ── middleware/asyncHandler.js ────────────────────
// Wraps async route functions — catches errors and forwards to next()
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;

// ── In routes — zero try/catch boilerplate ─────────
const asyncHandler = require('../middleware/asyncHandler');

router.get('/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err;  // caught by asyncHandler → sent to error middleware
  }
  res.json({ success: true, data: user });
}));

// ── middleware/errorHandler.js ─────────────────────
// 4-argument signature = Express error middleware
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message    = err.message    || 'Server Error';

  // Mongoose: bad ObjectId format
  if (err.name === 'CastError') {
    message    = 'Invalid ID format';
    statusCode = 400;
  }
  // Mongoose: duplicate key (unique index violated)
  if (err.code === 11000) {
    message    = \`Duplicate value: \${Object.keys(err.keyValue).join(', ')}\`;
    statusCode = 409;
  }
  // Mongoose: validation failed
  if (err.name === 'ValidationError') {
    message    = Object.values(err.errors).map(e => e.message).join(', ');
    statusCode = 422;
  }
  // JWT: token invalid
  if (err.name === 'JsonWebTokenError') {
    message    = 'Invalid token';
    statusCode = 401;
  }

  res.status(statusCode).json({
    success:    false,
    error:      message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;

// ── server.js — mount LAST ─────────────────────────
app.use(errorHandler);  // must be after all routes`} />
                </div>
            </section>

            {/* ── SECURITY ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>06</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Security</div>
                        <h2>Securing Your Express App</h2>
                    </div>
                </div>

                <div className="topic">
                    <h3>Essential Security Middleware</h3>
                    <CodeBlock lang="bash" code={`npm install helmet express-rate-limit express-mongo-sanitize cors`} />
                    <CodeBlock lang="javascript" code={`const helmet       = require('helmet');
const rateLimit    = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const cors         = require('cors');

// 1. Helmet — sets 15+ secure HTTP headers automatically
//    Prevents: Clickjacking, MIME sniffing, XSS via content-type
app.use(helmet());

// 2. CORS — control which origins can call your API
app.use(cors({
  origin:      ['https://yourfrontend.com', 'http://localhost:5173'],
  methods:     ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,  // allow cookies
}));

// 3. Rate Limiting — prevent DDoS and brute force
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max:      100,              // max 100 requests per IP per window
  message:  { error: 'Too many requests, slow down!' },
});
app.use('/api/', limiter);

// Stricter limit for auth endpoints
const authLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 10 });
app.use('/api/auth/', authLimiter);

// 4. MongoDB Sanitize — prevent NoSQL injection
//    Blocks: { email: { $gt: "" } } attacks that bypass passwords
app.use(mongoSanitize());

// 5. Limit body size — prevent huge payload attacks
app.use(express.json({ limit: '10kb' }));`} />
                    <div className="callout tip">
                        <div className="callout-title">💡 Additional Security</div>
                        <p>Always validate and sanitize user input before using it. Use <code>express-validator</code> for schema-based validation. Store secrets in <code>.env</code>, never in code. Use HTTPS in production (Nginx, Cloudflare, or your host).</p>
                    </div>
                </div>
            </section>

            {/* ── FULL PROJECT STRUCTURE ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>07</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Architecture</div>
                        <h2>Production Project Structure</h2>
                    </div>
                </div>

                <div className="topic">
                    <h3>Recommended Folder Structure</h3>
                    <CodeBlock lang="bash" code={`my-api/
├── server.js          # Entry point
├── .env               # Environment variables (gitignored)
├── .env.example       # Template for env vars (committed)
├── package.json
├── config/
│   └── db.js          # MongoDB connection
├── models/
│   ├── User.js        # Mongoose schemas/models
│   └── Post.js
├── routes/
│   ├── users.js       # Router: /api/users
│   └── posts.js       # Router: /api/posts
├── controllers/       # Route handler logic (keeps routes thin)
│   ├── userController.js
│   └── postController.js
├── middleware/
│   ├── asyncHandler.js  # Async error wrapper
│   ├── errorHandler.js  # Global error handler
│   └── protect.js       # JWT auth middleware
└── utils/
    └── sendEmail.js   # Helper functions`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header"><div><h2 style={{ fontFamily: "'Fraunces', serif" }}>Resources</h2></div></div>
                <div className="resource-grid">{RESOURCES.map((r, i) => <ResourceCard key={i} {...r} />)}</div>
                <PracticeArena games={GAMES} />
            </section>

            <footer className="footer">
                <p>Express.js · Chapter 07 · FullStack Compass</p>
                <a href="https://sanketh.live/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'none', marginTop: '6px', display: 'block' }}>sanketh.live ↗</a>
            </footer>
        </>
    );
}