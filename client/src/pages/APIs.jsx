import React from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';
import PracticeArena from '../components/PracticeArena.jsx';

const COLOR = 'var(--api-color)';

const RESOURCES = [
    { type: 'docs',      title: 'MDN — HTTP',               description: 'Complete HTTP protocol reference — methods, status codes, headers, cookies.', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP' },
    { type: 'tool',      title: 'Postman',                   description: 'Build, test, document, and share APIs. Industry-standard for API development.', url: 'https://www.postman.com/' },
    { type: 'reference', title: 'HTTP Status Codes',         description: 'Every status code explained with context on when to use each one.', url: 'https://httpstatuses.com/' },
    { type: 'docs',      title: 'Axios Docs',                description: 'Full Axios API reference — interceptors, instances, transformers.', url: 'https://axios-http.com/docs/intro' },
    { type: 'reference', title: 'REST API Best Practices',   description: 'Comprehensive guide to designing clean, consistent REST APIs.', url: 'https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/' },
    { type: 'tool',      title: 'JSON Placeholder',          description: 'Free fake REST API for testing and prototyping your frontend code.', url: 'https://jsonplaceholder.typicode.com/' },
    { type: 'tool',      title: 'Public APIs List',          description: 'Massive curated list of free public APIs — weather, maps, finance, and more.', url: 'https://publicapis.dev/' },
    { type: 'reference', title: 'JWT.io Debugger',           description: 'Decode, verify, and generate JSON Web Tokens visually in your browser.', url: 'https://jwt.io/' },
];

const GAMES = [
    { emoji: '🏋️', name: 'Postman API Fundamentals', description: 'Official Postman student expert course — free, hands-on API testing certification.', url: 'https://academy.postman.com/postman-api-fundamentals-student-expert' },
    { emoji: '🎮', name: 'REST Countries Challenge', description: 'Practice Fetch/Axios by building a country explorer using the REST Countries API.', url: 'https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca' },
];

export default function APIs() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{ color: COLOR }}>APIs</span> — Chapter 08</div>
                <h1><span className="accent" style={{ color: COLOR }}>APIs</span><br /><em>How the web talks.</em></h1>
                <p className="hero-desc">APIs (Application Programming Interfaces) are how software talks to other software. Every time your React app fetches data, every time you log in with Google, every time a weather widget shows temperature — that's an API. This chapter covers everything from the basics to building and securing your own.</p>
                <div className="hero-stack">
                    {['HTTP', 'REST', 'Fetch', 'Axios', 'JWT', 'Status Codes', 'Postman'].map(t => <span key={t} className="stack-chip">{t}</span>)}
                </div>
            </section>

            {/* ── WHAT IS AN API ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>01</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Foundations</div>
                        <h2>What is an API?</h2>
                        <p className="chapter-intro">An API is a contract between two pieces of software. One side says "here's what I can do, here's how to ask me" — the other side makes requests and gets responses.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>The Restaurant Analogy</h3>
                    <div className="concept-grid">
                        <div className="concept-card"><div className="concept-icon">👤</div><h5>You (Client)</h5><p>Your React app or browser. Makes requests when a user does something — clicks a button, loads a page.</p></div>
                        <div className="concept-card"><div className="concept-icon">🧑‍🍳</div><h5>Waiter (API)</h5><p>The API is the interface. It takes your order (request), talks to the kitchen, and brings back your food (response).</p></div>
                        <div className="concept-card"><div className="concept-icon">🍳</div><h5>Kitchen (Server)</h5><p>Your Express + Node.js backend. Processes the request, talks to the database, prepares the data.</p></div>
                        <div className="concept-card"><div className="concept-icon">🗄️</div><h5>Pantry (Database)</h5><p>MongoDB or SQL. Stores all the actual data that gets prepared and returned to the client.</p></div>
                    </div>
                </div>

                <div className="topic">
                    <h3>Types of APIs</h3>
                    <div className="table-wrap">
                        <table>
                            <thead><tr><th>Type</th><th>Description</th><th>Example</th></tr></thead>
                            <tbody>
                            <tr><td>REST API</td><td>Resources accessed via URLs + HTTP methods. Most common.</td><td>Twitter API, GitHub API</td></tr>
                            <tr><td>GraphQL</td><td>Single endpoint, client specifies exactly what data it needs.</td><td>GitHub GraphQL API</td></tr>
                            <tr><td>WebSocket</td><td>Persistent two-way connection for real-time data.</td><td>Chat apps, live trading</td></tr>
                            <tr><td>gRPC</td><td>High-performance binary protocol, common in microservices.</td><td>Internal Google services</td></tr>
                            <tr><td>SOAP</td><td>XML-based, strict contract. Legacy enterprise systems.</td><td>Banking, government</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ── HTTP PROTOCOL ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>02</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>HTTP Protocol</div>
                        <h2>HTTP — How Requests Work</h2>
                        <p className="chapter-intro">HTTP (HyperText Transfer Protocol) is the language of the web. Every API call is an HTTP request. Understanding the request/response cycle is fundamental.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>HTTP Methods (Verbs)</h3>
                    <div className="table-wrap">
                        <table>
                            <thead><tr><th>Method</th><th>Action</th><th>Body?</th><th>Idempotent?</th><th>Example</th></tr></thead>
                            <tbody>
                            <tr><td>GET</td><td>Retrieve data — never modify</td><td>No</td><td>Yes</td><td>GET /api/users</td></tr>
                            <tr><td>POST</td><td>Create a new resource</td><td>Yes</td><td>No</td><td>POST /api/users</td></tr>
                            <tr><td>PUT</td><td>Replace a resource entirely</td><td>Yes</td><td>Yes</td><td>PUT /api/users/1</td></tr>
                            <tr><td>PATCH</td><td>Update part of a resource</td><td>Yes</td><td>No</td><td>PATCH /api/users/1</td></tr>
                            <tr><td>DELETE</td><td>Remove a resource</td><td>No</td><td>Yes</td><td>DELETE /api/users/1</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="topic">
                    <h3>HTTP Status Codes</h3>
                    <div className="table-wrap">
                        <table>
                            <thead><tr><th>Code</th><th>Meaning</th><th>When to use</th></tr></thead>
                            <tbody>
                            <tr><td>200 OK</td><td>Success</td><td>GET, PATCH, PUT — successful response</td></tr>
                            <tr><td>201 Created</td><td>Resource created</td><td>POST — new resource created</td></tr>
                            <tr><td>204 No Content</td><td>Success, no body</td><td>DELETE — deleted successfully</td></tr>
                            <tr><td>400 Bad Request</td><td>Invalid request</td><td>Missing fields, wrong types</td></tr>
                            <tr><td>401 Unauthorized</td><td>Not authenticated</td><td>No token or invalid token</td></tr>
                            <tr><td>403 Forbidden</td><td>No permission</td><td>Valid token but insufficient role</td></tr>
                            <tr><td>404 Not Found</td><td>Resource missing</td><td>ID doesn't exist</td></tr>
                            <tr><td>409 Conflict</td><td>Duplicate/conflict</td><td>Email already registered</td></tr>
                            <tr><td>422 Unprocessable</td><td>Validation failed</td><td>Schema validation errors</td></tr>
                            <tr><td>429 Too Many Requests</td><td>Rate limited</td><td>Client sending too fast</td></tr>
                            <tr><td>500 Server Error</td><td>Something crashed</td><td>Unhandled exception on server</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="topic">
                    <h3>Request & Response Structure</h3>
                    <CodeBlock lang="http" code={`// ── HTTP Request ──────────────────────────────────
POST /api/auth/login HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Accept: application/json

{
  "email": "sanketh@example.com",
  "password": "mypassword123"
}

// ── HTTP Response ──────────────────────────────────
HTTP/1.1 200 OK
Content-Type: application/json
X-Request-Id: abc-123-def

{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "64a1b2c3",
    "name": "Sanketh",
    "role": "admin"
  }
}`} />
                </div>
            </section>

            {/* ── FETCH API ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>03</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Client Side</div>
                        <h2>Fetch API — Built-in Browser HTTP</h2>
                        <p className="chapter-intro">The Fetch API is built into every modern browser. No installation needed — call any HTTP endpoint from your React or vanilla JS code.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Fetch — All HTTP Methods</h3>
                    <CodeBlock lang="javascript" code={`// ── GET ──────────────────────────────────────────
const response = await fetch('https://api.example.com/users');
if (!response.ok) throw new Error(\`HTTP error: \${response.status}\`);
const users = await response.json();

// ── POST ──────────────────────────────────────────
const response = await fetch('/api/users', {
  method:  'POST',
  headers: { 'Content-Type': 'application/json' },
  body:    JSON.stringify({ name: 'Sanketh', email: 'sanketh@example.com' }),
});
const newUser = await response.json();

// ── PATCH ─────────────────────────────────────────
const response = await fetch(\`/api/users/\${id}\`, {
  method:  'PATCH',
  headers: {
    'Content-Type':  'application/json',
    'Authorization': \`Bearer \${localStorage.getItem('token')}\`,
  },
  body: JSON.stringify({ age: 22 }),
});

// ── DELETE ────────────────────────────────────────
const response = await fetch(\`/api/users/\${id}\`, {
  method:  'DELETE',
  headers: { 'Authorization': \`Bearer \${token}\` },
});
if (response.status === 204) console.log('Deleted successfully');

// ── Robust fetch with error handling ──────────────
async function apiFetch(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || \`Request failed: \${response.status}\`);
    }

    return data;
  } catch (err) {
    if (err.name === 'TypeError') throw new Error('Network error — check your connection');
    throw err;
  }
}

// Usage
const users = await apiFetch('/api/users');
const newPost = await apiFetch('/api/posts', {
  method: 'POST',
  body: JSON.stringify({ title: 'Hello World' }),
});`} />
                </div>
            </section>

            {/* ── AXIOS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>04</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Client Side</div>
                        <h2>Axios — HTTP for React Apps</h2>
                        <p className="chapter-intro">Axios is a popular HTTP library that's more convenient than Fetch — automatic JSON parsing, better error handling, request interceptors, and cancellation support.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Axios Setup & Usage</h3>
                    <CodeBlock lang="bash" code={`npm install axios`} />
                    <CodeBlock lang="javascript" code={`import axios from 'axios';

// ── Create a configured instance ─────────────────
// api/axiosInstance.js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,  // 10s timeout
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor — auto-attach auth token ──
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = \`Bearer \${token}\`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor — global error handling ──
api.interceptors.response.use(
  (response) => response.data,       // auto-unwrap .data
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;

// ── Using the instance in React ───────────────────
import api from './api/axiosInstance';

// GET
const users = await api.get('/users');
const user  = await api.get(\`/users/\${id}\`);

// POST
const newUser = await api.post('/users', { name: 'Sanketh', email: '...' });

// PATCH
const updated = await api.patch(\`/users/\${id}\`, { age: 22 });

// DELETE
await api.delete(\`/users/\${id}\`);

// Upload file (multipart/form-data)
const formData = new FormData();
formData.append('avatar', file);
await api.post('/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
  onUploadProgress: (e) => setProgress(Math.round(e.loaded * 100 / e.total)),
});`} />
                </div>
            </section>

            {/* ── REST DESIGN ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>05</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>API Design</div>
                        <h2>REST API Design Principles</h2>
                    </div>
                </div>

                <div className="topic">
                    <h3>URL Conventions & Patterns</h3>
                    <CodeBlock lang="bash" code={`# ── Good REST URL design ──────────────────────────
GET    /api/users           # List all users
POST   /api/users           # Create a user
GET    /api/users/:id       # Get specific user
PATCH  /api/users/:id       # Update specific user
DELETE /api/users/:id       # Delete specific user

# Nested resources
GET    /api/users/:id/posts        # All posts by user
GET    /api/posts/:id/comments     # All comments on post
POST   /api/posts/:id/comments     # Add comment to post

# Filtering, sorting, pagination via query strings
GET /api/posts?category=tech&page=2&limit=10&sort=-createdAt

# ── Naming rules ──────────────────────────────────
# ✅ Use nouns (resources), not verbs
GET /api/users          # not /api/getUsers
POST /api/users         # not /api/createUser

# ✅ Use plural nouns
/api/users              # not /api/user

# ✅ Use lowercase, hyphens for multi-word
/api/blog-posts         # not /api/blogPosts or /api/blog_posts

# ✅ Version your API
/api/v1/users
/api/v2/users`} />
                </div>

                <div className="topic">
                    <h3>Consistent Response Format</h3>
                    <CodeBlock lang="javascript" code={`// Always return a consistent JSON structure

// ── Success responses ─────────────────────────────
// Single resource
res.status(200).json({
  success: true,
  data: user,
});

// Collection
res.status(200).json({
  success: true,
  count:   users.length,
  pagination: { page: 1, limit: 10, total: 150, pages: 15 },
  data:    users,
});

// Created
res.status(201).json({ success: true, data: newUser });

// ── Error responses ───────────────────────────────
res.status(404).json({
  success: false,
  error:   'User not found',
});

res.status(422).json({
  success: false,
  error:   'Validation failed',
  details: ['Name is required', 'Email format invalid'],
});`} />
                </div>
            </section>

            {/* ── JWT AUTH ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>06</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Authentication</div>
                        <h2>JWT — Stateless Authentication</h2>
                        <p className="chapter-intro">JSON Web Tokens are the standard for stateless API authentication. The server issues a signed token; the client sends it on every request. No session storage needed.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>JWT Structure & Implementation</h3>
                    <CodeBlock lang="javascript" code={`// JWT = Header.Payload.Signature (base64 encoded)
// Header:    { "alg": "HS256", "typ": "JWT" }
// Payload:   { "id": "64a1b2c3", "role": "admin", "iat": 1722600000, "exp": 1722604000 }
// Signature: HMACSHA256(base64(header) + "." + base64(payload), SECRET)

npm install jsonwebtoken

// ── Server: issue token on login ──────────────────
const jwt = require('jsonwebtoken');

const generateToken = (userId) => jwt.sign(
  { id: userId },                   // payload — keep small!
  process.env.JWT_SECRET,           // secret key (keep safe!)
  { expiresIn: '7d' }              // expiry
);

// POST /api/auth/login
const user = await User.findOne({ email }).select('+password');
if (!user || !await user.correctPassword(password)) {
  return res.status(401).json({ error: 'Invalid credentials' });
}

const token = generateToken(user._id);
res.json({ success: true, token, data: { id: user._id, name: user.name } });

// ── Server: protect routes with middleware ────────
const protect = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ error: 'User no longer exists' });
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Role-based authorization
const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'You do not have permission' });
  }
  next();
};

// Usage:
router.delete('/:id', protect, restrictTo('admin'), deleteUser);

// ── Client: store and send token ──────────────────
// After login:
localStorage.setItem('token', response.token);

// On every request (Axios interceptor handles this automatically):
headers: { 'Authorization': \`Bearer \${localStorage.getItem('token')}\` }`} />
                </div>
            </section>

            {/* ── THIRD PARTY APIS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>07</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Real World</div>
                        <h2>Using Third-Party APIs</h2>
                    </div>
                </div>

                <div className="topic">
                    <h3>Common APIs & How to Use Them</h3>
                    <CodeBlock lang="javascript" code={`// ── Always call 3rd party APIs from your SERVER ──
// Never expose API keys in frontend code!

// ── OpenWeather API ───────────────────────────────
// GET https://api.openweathermap.org/data/2.5/weather?q=Chennai&appid=YOUR_KEY

// Express route that calls OpenWeather
app.get('/api/weather/:city', async (req, res) => {
  const { city } = req.params;
  const apiKey = process.env.OPENWEATHER_KEY;

  const url = \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${apiKey}&units=metric\`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.cod !== 200) return res.status(404).json({ error: 'City not found' });

  res.json({
    city:        data.name,
    temperature: data.main.temp,
    description: data.weather[0].description,
    humidity:    data.main.humidity,
  });
});

// ── Sending emails with Nodemailer ────────────────
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

await transporter.sendMail({
  from:    '"FullStack Compass" <noreply@fsc.dev>',
  to:      user.email,
  subject: 'Welcome to FullStack Compass!',
  html:    \`<h1>Hi \${user.name}!</h1><p>Thanks for joining.</p>\`,
});

// ── Cloudinary image upload ───────────────────────
const cloudinary = require('cloudinary').v2;
cloudinary.config({ cloud_name: '...', api_key: '...', api_secret: '...' });

const result = await cloudinary.uploader.upload(req.file.path, {
  folder: 'avatars',
  transformation: [{ width: 300, height: 300, crop: 'fill' }],
});
const imageUrl = result.secure_url;`} />

                    <div className="callout warn">
                        <div className="callout-title">🔑 API Key Security</div>
                        <p>Never put API keys in your frontend/React code — they'll be visible in the browser. Always proxy API calls through your Express server. Store keys in <code>.env</code> files and never commit them.</p>
                    </div>
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header"><div><h2 style={{ fontFamily: "'Fraunces', serif" }}>Resources</h2></div></div>
                <div className="resource-grid">{RESOURCES.map((r, i) => <ResourceCard key={i} {...r} />)}</div>
                <PracticeArena games={GAMES} />
            </section>

            <footer className="footer">
                <p>APIs · Chapter 08 · FullStack Compass</p>
                <a href="https://sanketh.live/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'none', marginTop: '6px', display: 'block' }}>sanketh.live ↗</a>
            </footer>
        </>
    );
}