import React from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';

const COLOR = 'var(--green)';

const RESOURCES = [
    { type: 'docs',      title: 'jsonwebtoken (npm)',     description: 'Official docs for the most-used JWT library in Node.js.',              url: 'https://github.com/auth0/node-jsonwebtoken' },
    { type: 'docs',      title: 'bcrypt.js (npm)',        description: 'Password hashing library — pure JS bcrypt implementation.',             url: 'https://github.com/dcodeIO/bcrypt.js' },
    { type: 'tool',      title: 'JWT.io Debugger',        description: 'Decode and inspect JWTs visually in your browser.',                     url: 'https://jwt.io/' },
    { type: 'reference', title: 'OWASP Auth Cheatsheet',  description: 'Security-focused guide on building authentication correctly.',           url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html' },
    { type: 'tutorial',  title: 'Passport.js',            description: 'Popular auth middleware — OAuth2, Google, GitHub login strategies.',     url: 'http://www.passportjs.org/' },
    { type: 'docs',      title: 'cookie-parser (npm)',    description: 'Parse cookies from request headers — needed for httpOnly cookie auth.',  url: 'https://github.com/expressjs/cookie-parser' },
];

function Callout({ type = 'tip', title, children }) {
    const labels = { tip: '💡 Tip', warn: '⚠️ Warning', info: 'ℹ️ Info', key: '🔑 Key Concept' };
    return (
        <div className={`callout ${type}`}>
            <div className="callout-title">{title || labels[type]}</div>
            <p>{children}</p>
        </div>
    );
}

function Table({ headers, rows }) {
    return (
        <div className="table-wrap">
            <table>
                <thead><tr>{headers.map(h => <th key={h}>{h}</th>)}</tr></thead>
                <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
            </table>
        </div>
    );
}

export default function Auth() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{ color: COLOR }}>Authentication</span> — Chapter 09</div>
                <h1><span className="accent" style={{ color: COLOR }}>Auth</span><br /><em>Securing your MERN app.</em></h1>
                <p className="hero-desc">
                    Every real app needs authentication. This chapter covers the complete, production-grade auth system:
                    bcrypt password hashing, JWT access + refresh tokens, auth middleware, protected routes on both the
                    backend and React frontend.
                </p>
                <div className="hero-stack">
                    {['bcrypt', 'JWT', 'Express Middleware', 'httpOnly Cookies', 'React Context', 'Protected Routes', 'Refresh Tokens'].map(t => (
                        <span key={t} className="stack-chip">{t}</span>
                    ))}
                </div>
            </section>

            {/* ── 01 HOW AUTH WORKS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>01</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Concepts</div>
                        <h2>How Authentication Works</h2>
                        <p className="chapter-intro">
                            Auth answers: <strong>"Who are you?"</strong> (authentication) and <strong>"What can you do?"</strong> (authorization).
                            JWT-based stateless auth is the MERN standard.
                        </p>
                    </div>
                </div>

                <div className="topic">
                    <h3>The Auth Flow</h3>
                    <div className="flow" style={{ flexWrap: 'wrap', gap: '8px' }}>
                        {['User submits email + password', 'Server checks DB + verifies hash', 'Server signs JWT', 'Client stores token', 'Client sends token in header', 'Server verifies token', 'Access granted'].map((s, i, arr) => (
                            <React.Fragment key={i}>
                                <div className="flow-step">{s}</div>
                                {i < arr.length - 1 && <span className="flow-arrow">→</span>}
                            </React.Fragment>
                        ))}
                    </div>
                    <Table
                        headers={['Concept', 'What It Is', 'Library']}
                        rows={[
                            ['Password Hashing', 'One-way transform — never store plain passwords', 'bcrypt'],
                            ['JWT', 'Signed token encoding user identity — stateless', 'jsonwebtoken'],
                            ['Access Token', 'Short-lived (15m–1h) — sent with every request', 'JWT'],
                            ['Refresh Token', 'Long-lived (7–30d) — used to get new access tokens', 'JWT / DB'],
                            ['httpOnly Cookie', 'Browser-safe storage — JS cannot read it (XSS safe)', 'cookie-parser'],
                            ['Auth Middleware', 'Express fn that checks token before protected routes', 'custom'],
                        ]}
                    />
                    <Callout type="key" title="🔑 Never Store Plain Passwords">
                        Always hash passwords with bcrypt before saving to the database. bcrypt is slow by design — that's the point. It makes brute-force attacks impractical.
                    </Callout>
                </div>

                <div className="topic">
                    <h3>Package Installation</h3>
                    <CodeBlock lang="bash" code={`# Backend auth packages
npm install bcryptjs jsonwebtoken cookie-parser express-validator

# Optional: rate limiting (prevent brute force)
npm install express-rate-limit`} />
                </div>
            </section>

            {/* ── 02 BACKEND: REGISTER & LOGIN ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>02</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Backend</div>
                        <h2>Register & Login Routes</h2>
                        <p className="chapter-intro">
                            The User model stores a hashed password. The register route hashes + saves. The login route
                            verifies the hash and issues a JWT.
                        </p>
                    </div>
                </div>

                <div className="topic">
                    <h3>User Model with bcrypt</h3>
                    <CodeBlock lang="javascript" code={`// models/User.js
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:  { type: String, required: true, trim: true },
    email: {
        type:     String,
        required: true,
        unique:   true,
        lowercase: true,
        trim:     true,
    },
    password: {
        type:     String,
        required: true,
        minlength: 8,
        select:   false,  // never returned in queries by default
    },
    role:      { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
});

// ── Hash password before saving ──────────────────────────────────────
userSchema.pre('save', async function(next) {
    // Only hash if password was modified (not on other updates)
    if (!this.isModified('password')) return next();

    const salt    = await bcrypt.genSalt(12);   // 12 rounds = very secure
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// ── Instance method: check password on login ─────────────────────────
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);`} />
                </div>

                <div className="topic">
                    <h3>Auth Controller — Register & Login</h3>
                    <CodeBlock lang="javascript" code={`// controllers/authController.js
const User = require('../models/User');
const jwt  = require('jsonwebtoken');

// ── Helper: generate tokens ───────────────────────────────────────────
const generateAccessToken  = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15m' });
const generateRefreshToken = (id) => jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

// ── @route  POST /api/auth/register ──────────────────────────────────
const register = async (req, res) => {
    const { name, email, password } = req.body;

    // 1. Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
        return res.status(400).json({ message: 'Email already in use' });
    }

    // 2. Create user — password gets hashed by the pre-save hook
    const user = await User.create({ name, email, password });

    // 3. Issue tokens
    const accessToken  = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // 4. Store refresh token in httpOnly cookie (XSS-safe)
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,             // JS cannot read it
        secure:   process.env.NODE_ENV === 'production', // HTTPS only in prod
        sameSite: 'strict',
        maxAge:   7 * 24 * 60 * 60 * 1000, // 7 days in ms
    });

    // 5. Return access token + user info (no password — it was never selected)
    res.status(201).json({
        accessToken,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
};

// ── @route  POST /api/auth/login ─────────────────────────────────────
const login = async (req, res) => {
    const { email, password } = req.body;

    // 1. Find user — explicitly select password (it's excluded by default)
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    // 2. Compare entered password with stored hash
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // 3. Issue tokens (same as register)
    const accessToken  = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure:   process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge:   7 * 24 * 60 * 60 * 1000,
    });

    res.json({
        accessToken,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
};

// ── @route  POST /api/auth/refresh ───────────────────────────────────
const refresh = async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: 'No refresh token' });

    try {
        const decoded     = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const accessToken = generateAccessToken(decoded.id);
        res.json({ accessToken });
    } catch {
        res.status(401).json({ message: 'Invalid refresh token' });
    }
};

// ── @route  POST /api/auth/logout ────────────────────────────────────
const logout = async (req, res) => {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out' });
};

// ── @route  GET  /api/auth/me ─────────────────────────────────────────
const getMe = async (req, res) => {
    // req.user is set by the protect middleware
    const user = await User.findById(req.user.id);
    res.json({ user });
};

module.exports = { register, login, refresh, logout, getMe };`} />
                </div>

                <div className="topic">
                    <h3>Auth Routes</h3>
                    <CodeBlock lang="javascript" code={`// routes/authRoutes.js
const express = require('express');
const router  = express.Router();
const { register, login, refresh, logout, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login',    login);
router.post('/refresh',  refresh);
router.post('/logout',   logout);
router.get('/me',        protect, getMe);   // protected — needs valid token

module.exports = router;

// ── In server.js ──────────────────────────────────────────────────────
const cookieParser = require('cookie-parser');
app.use(cookieParser());                   // parse cookies before routes
app.use('/api/auth', authRoutes);`} />
                </div>
            </section>

            {/* ── 03 AUTH MIDDLEWARE ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>03</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Backend</div>
                        <h2>Auth Middleware — Protecting Routes</h2>
                        <p className="chapter-intro">
                            Middleware that runs before your route handler. It verifies the JWT, finds the user,
                            and attaches them to <code>req.user</code>. Any route can then be protected by adding <code>protect</code> before the handler.
                        </p>
                    </div>
                </div>

                <div className="topic">
                    <h3>protect & authorize Middleware</h3>
                    <CodeBlock lang="javascript" code={`// middleware/auth.js
const jwt  = require('jsonwebtoken');
const User = require('../models/User');

// ── protect: verify JWT, attach user to req ───────────────────────────
const protect = async (req, res, next) => {
    // 1. Get token from Authorization header: "Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Not authenticated. Please log in.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // 2. Verify signature + expiry
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Fetch user from DB (confirms user still exists)
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) return res.status(401).json({ message: 'User no longer exists' });

        next();     // ✅ user is authenticated — pass to route handler
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired. Please refresh.' });
        }
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// ── authorize: restrict to specific roles ─────────────────────────────
// Usage: router.delete('/posts/:id', protect, authorize('admin'), deletePost)
const authorize = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({
            message: \`Role '\${req.user.role}' is not allowed to perform this action\`
        });
    }
    next();
};

module.exports = { protect, authorize };

// ── Using middleware on routes ─────────────────────────────────────────
router.get('/profile',       protect,                  getProfile);     // any logged-in user
router.delete('/users/:id',  protect, authorize('admin'), deleteUser);  // admin only
router.put('/posts/:id',     protect, authorize('admin', 'editor'), updatePost); // admin or editor`} />
                    <Callout type="warn" title="⚠️ Access Token Expiry">
                        Keep access tokens short-lived (15 minutes). When they expire, the client must use the refresh token
                        to get a new one. This limits damage if a token is ever stolen.
                    </Callout>
                </div>

                <div className="topic">
                    <h3>Input Validation with express-validator</h3>
                    <CodeBlock lang="javascript" code={`// middleware/validate.js
const { body, validationResult } = require('express-validator');

// ── Reusable validation rules ─────────────────────────────────────────
const validateRegister = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
    body('email')
        .isEmail().withMessage('Invalid email address')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/[A-Z]/).withMessage('Must contain an uppercase letter')
        .matches(/[0-9]/).withMessage('Must contain a number'),
];

const validateLogin = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password required'),
];

// ── Middleware that checks results ────────────────────────────────────
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

module.exports = { validateRegister, validateLogin, validate };

// ── Apply in routes ───────────────────────────────────────────────────
const { validateRegister, validateLogin, validate } = require('../middleware/validate');

router.post('/register', validateRegister, validate, register);
router.post('/login',    validateLogin,    validate, login);`} />
                </div>
            </section>

            {/* ── 04 FRONTEND AUTH ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>04</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>React Frontend</div>
                        <h2>React Auth Context + Protected Routes</h2>
                        <p className="chapter-intro">
                            Store the access token in memory (not localStorage — safer). Use React Context to share the
                            current user everywhere. Use a wrapper component to redirect unauthenticated users.
                        </p>
                    </div>
                </div>

                <div className="topic">
                    <h3>AuthContext — Global Auth State</h3>
                    <CodeBlock lang="jsx" code={`// context/AuthContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';
import api from '../lib/api';   // your axios instance

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    // Store token in state (memory) — NOT localStorage (XSS risk)
    const [token,   setToken]   = useState(null);
    const [user,    setUser]    = useState(null);
    const [loading, setLoading] = useState(false);

    const login = useCallback(async (email, password) => {
        setLoading(true);
        try {
            const { data } = await api.post('/auth/login', { email, password });
            setToken(data.accessToken);
            setUser(data.user);
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message };
        } finally {
            setLoading(false);
        }
    }, []);

    const register = useCallback(async (name, email, password) => {
        setLoading(true);
        try {
            const { data } = await api.post('/auth/register', { name, email, password });
            setToken(data.accessToken);
            setUser(data.user);
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message };
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        await api.post('/auth/logout');   // clears httpOnly cookie on server
        setToken(null);
        setUser(null);
    }, []);

    // Attach token to all outgoing requests automatically
    api.defaults.headers.common['Authorization'] = token ? \`Bearer \${token}\` : '';

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook — cleaner than useContext everywhere
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
};`} />
                </div>

                <div className="topic">
                    <h3>ProtectedRoute — Redirect if Not Logged In</h3>
                    <CodeBlock lang="jsx" code={`// components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Wrap any route that requires login
export default function ProtectedRoute({ children, requiredRole }) {
    const { user } = useAuth();
    const location  = useLocation();

    if (!user) {
        // Redirect to login but remember where they were trying to go
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}

// ── Usage in App.jsx ──────────────────────────────────────────────────
import { AuthProvider }    from './context/AuthContext';
import ProtectedRoute      from './components/ProtectedRoute';

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/login"    element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected — any logged-in user */}
                <Route path="/dashboard" element={
                    <ProtectedRoute><Dashboard /></ProtectedRoute>
                } />

                {/* Admin only */}
                <Route path="/admin" element={
                    <ProtectedRoute requiredRole="admin"><AdminPanel /></ProtectedRoute>
                } />
            </Routes>
        </AuthProvider>
    );
}`} />
                </div>

                <div className="topic">
                    <h3>Login Form Component</h3>
                    <CodeBlock lang="jsx" code={`// pages/Login.jsx
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const { login, loading } = useAuth();
    const navigate  = useNavigate();
    const location  = useLocation();
    const from      = location.state?.from?.pathname || '/dashboard';

    const [form,  setForm]  = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const result = await login(form.email, form.password);

        if (result.success) {
            navigate(from, { replace: true });   // go back to where they came from
        } else {
            setError(result.message || 'Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                autoComplete="email"
            />
            <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                autoComplete="current-password"
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Logging in…' : 'Log In'}
            </button>
        </form>
    );
}`} />
                </div>

                <div className="topic">
                    <h3>Auto-Refresh Access Token (Silent Refresh)</h3>
                    <CodeBlock lang="jsx" code={`// lib/api.js — Axios instance with automatic token refresh
import axios from 'axios';

const api = axios.create({ baseURL: '/api', withCredentials: true });
//                                          ^^^ sends httpOnly cookies automatically

let isRefreshing = false;
let failedQueue  = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => error ? prom.reject(error) : prom.resolve(token));
    failedQueue = [];
};

// Response interceptor — catches 401s and refreshes token automatically
api.interceptors.response.use(
    response => response,
    async error => {
        const original = error.config;

        // Access token expired — try refreshing
        if (error.response?.status === 401 && !original._retry) {
            if (isRefreshing) {
                // Queue this request until refresh completes
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    original.headers['Authorization'] = 'Bearer ' + token;
                    return api(original);
                });
            }

            original._retry  = true;
            isRefreshing     = true;

            try {
                const { data } = await axios.post('/api/auth/refresh', {}, { withCredentials: true });
                const newToken  = data.accessToken;

                api.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
                processQueue(null, newToken);

                original.headers['Authorization'] = 'Bearer ' + newToken;
                return api(original);       // retry original request with new token
            } catch (err) {
                processQueue(err, null);
                // Refresh failed — user needs to log in again
                window.location.href = '/login';
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;`} />
                    <Callout type="tip" title="💡 withCredentials: true">
                        You MUST set <code>withCredentials: true</code> on your Axios instance for the browser to send the
                        httpOnly refresh token cookie with cross-origin requests. Also configure CORS on your Express server
                        to allow credentials from your frontend origin.
                    </Callout>
                </div>
            </section>

            {/* ── 05 SECURITY CHECKLIST ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>05</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Security</div>
                        <h2>Security Essentials</h2>
                        <p className="chapter-intro">
                            A locked door is only as good as the rest of the wall. These packages and patterns close
                            the most common vulnerabilities in MERN apps.
                        </p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Helmet + Rate Limiting + CORS</h3>
                    <CodeBlock lang="javascript" code={`// server.js — security middleware setup
const express    = require('express');
const helmet     = require('helmet');       // npm install helmet
const rateLimit  = require('express-rate-limit'); // npm install express-rate-limit
const cors       = require('cors');

const app = express();

// ── 1. Helmet: set secure HTTP headers ───────────────────────────────
app.use(helmet());
// Adds: X-Frame-Options, X-Content-Type-Options, Content-Security-Policy, etc.

// ── 2. CORS: only allow your frontend ────────────────────────────────
app.use(cors({
    origin:      process.env.CLIENT_URL,  // e.g. 'https://myapp.vercel.app'
    credentials: true,                    // allow cookies (refresh token)
    methods:     ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));

// ── 3. Rate limiting: prevent brute force ─────────────────────────────
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max:      100,              // max 100 requests per IP per window
    message:  { error: 'Too many requests. Try again later.' },
});
app.use('/api', limiter);       // apply to all API routes

// Stricter limit on auth routes (prevent brute force login)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max:      20,
    message:  { error: 'Too many login attempts.' },
});
app.use('/api/auth', authLimiter);

// ── 4. Parse JSON + cookies ───────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));  // prevent huge payloads
app.use(cookieParser());`} />
                </div>

                <div className="topic">
                    <h3>Security Checklist</h3>
                    <Table
                        headers={['Vulnerability', 'Prevention', 'Tool']}
                        rows={[
                            ['Brute force login', 'Rate limiting on auth routes', 'express-rate-limit'],
                            ['XSS token theft', 'Store tokens in httpOnly cookies', 'cookie-parser'],
                            ['SQL/NoSQL injection', 'Validate inputs, use Mongoose', 'express-validator'],
                            ['CSRF attacks', 'SameSite cookie attribute', 'Built-in'],
                            ['Clickjacking', 'X-Frame-Options header', 'helmet'],
                            ['Weak passwords', 'Minimum length + complexity validation', 'express-validator'],
                            ['Sensitive data leak', 'Use .select(\'-password\')', 'Mongoose'],
                            ['Token never expires', 'Short access token (15m) + refresh flow', 'jsonwebtoken'],
                            ['Plain text passwords', 'bcrypt with 10+ salt rounds', 'bcryptjs'],
                        ]}
                    />
                    <Callout type="warn" title="⚠️ Never store secrets in code">
                        JWT_SECRET, MONGO_URI, and API keys must live in <code>.env</code> files only. Add <code>.env</code> to
                        your <code>.gitignore</code> immediately. Use strong, random secrets — at least 32 characters.
                    </Callout>
                </div>

                <div className="topic">
                    <h3>Complete .env Template</h3>
                    <CodeBlock lang="bash" code={`# server/.env — NEVER commit this file
NODE_ENV=development
PORT=5000

# MongoDB
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/myapp

# JWT — generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your-super-secret-access-token-key-64-chars-min
JWT_REFRESH_SECRET=different-secret-for-refresh-tokens-64-chars-min

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173

# In production, change CLIENT_URL to your Vercel domain:
# CLIENT_URL=https://my-app.vercel.app`} />
                </div>
            </section>

            {/* ── RESOURCES ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>06</div>
                    <div className="chapter-meta"><h2>Resources</h2></div>
                </div>
                <div className="resource-grid">
                    {RESOURCES.map((r, i) => <ResourceCard key={i} {...r} />)}
                </div>
            </section>

            <footer className="footer">
                <p>Authentication · Chapter 09 · FullStack Compass</p>
            </footer>
        </>
    );
}
