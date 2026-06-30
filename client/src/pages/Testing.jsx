import React from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';

const COLOR = 'var(--green)';

const RESOURCES = [
    { type: 'docs',      title: 'Jest Docs',                   description: 'The JavaScript testing framework — mocking, assertions, coverage.',                url: 'https://jestjs.io/docs/getting-started' },
    { type: 'docs',      title: 'Supertest (npm)',              description: 'HTTP assertions for Express — test your API routes without starting a real server.', url: 'https://github.com/ladjs/supertest' },
    { type: 'docs',      title: 'React Testing Library',        description: 'Test React components the way users use them. The modern standard for React testing.', url: 'https://testing-library.com/docs/react-testing-library/intro/' },
    { type: 'tutorial',  title: 'Vitest Docs',                  description: 'Vite-native test runner — faster alternative to Jest for Vite projects.',           url: 'https://vitest.dev/' },
    { type: 'reference', title: 'Testing Best Practices (Node)', description: 'Comprehensive Node.js testing best practices GitHub repo.',                        url: 'https://github.com/goldbergyoni/javascript-testing-best-practices' },
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

export default function Testing() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{ color: COLOR }}>Testing</span> — Chapter 15</div>
                <h1><span className="accent" style={{ color: COLOR }}>Testing</span><br /><em>Code you can trust.</em></h1>
                <p className="hero-desc">
                    Tests catch bugs before users do. This chapter covers the three layers of testing for a MERN app:
                    unit tests with Jest, API integration tests with Supertest, and component tests with
                    React Testing Library. Each layer catches different kinds of bugs.
                </p>
                <div className="hero-stack">
                    {['Jest', 'Supertest', 'React Testing Library', 'Vitest', 'Mocking', 'Code Coverage', 'TDD'].map(t => (
                        <span key={t} className="stack-chip">{t}</span>
                    ))}
                </div>
            </section>

            {/* ── 01 CONCEPTS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>01</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Concepts</div>
                        <h2>The Testing Pyramid</h2>
                    </div>
                </div>
                <div className="topic">
                    <Table
                        headers={['Layer', 'What It Tests', 'Speed', 'Tools', 'Count']}
                        rows={[
                            ['Unit', 'Single functions, utilities, pure logic', 'Very fast (ms)', 'Jest / Vitest', 'Many (~70%)'],
                            ['Integration', 'Multiple units together — API routes + DB', 'Medium (seconds)', 'Jest + Supertest + Mongoose', 'Some (~20%)'],
                            ['E2E', 'Full app flow in a real browser', 'Slow (minutes)', 'Playwright / Cypress', 'Few (~10%)'],
                        ]}
                    />
                    <Callout type="tip" title="💡 What to test first">
                        Start with integration tests (Supertest) for your API routes — they give the most confidence per test written. Add unit tests for complex business logic. E2E tests are optional for early-stage projects.
                    </Callout>
                </div>
            </section>

            {/* ── 02 JEST SETUP ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>02</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Setup</div>
                        <h2>Jest Setup for Express Backend</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Installation & Config</h3>
                    <CodeBlock lang="bash" code={`# Backend testing
npm install -D jest supertest @types/jest @types/supertest
npm install -D mongodb-memory-server   # in-memory MongoDB for tests

# If using ES modules or TypeScript:
npm install -D babel-jest @babel/core @babel/preset-env
# OR for TypeScript:
npm install -D ts-jest`} />
                    <CodeBlock lang="javascript" code={`// package.json
{
    "scripts": {
        "test":     "jest",
        "test:watch": "jest --watch",
        "test:coverage": "jest --coverage"
    },
    "jest": {
        "testEnvironment": "node",
        "testMatch": ["**/*.test.js", "**/*.spec.js"],
        "setupFilesAfterFramework": ["./tests/setup.js"],
        "coverageThreshold": {
            "global": {
                "branches":  70,
                "functions": 70,
                "lines":     70
            }
        }
    }
}`} />
                </div>
                <div className="topic">
                    <h3>Test Database Setup</h3>
                    <CodeBlock lang="javascript" code={`// tests/setup.js — run before all tests
const mongoose         = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

// Connect to in-memory MongoDB before tests
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

// Clear all collections between tests (fresh state per test)
afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
});

// Disconnect and stop MongoDB after all tests
afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});`} />
                </div>
            </section>

            {/* ── 03 UNIT TESTS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>03</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Unit Tests</div>
                        <h2>Unit Testing with Jest</h2>
                        <p className="chapter-intro">Unit tests test one function in isolation. They're fast and precise — great for utility functions, validation, and business logic.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Basic Jest Assertions</h3>
                    <CodeBlock lang="javascript" code={`// utils/formatters.js — the code being tested
const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
};

const slugify = (str) =>
    str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

module.exports = { formatCurrency, slugify };

// ─────────────────────────────────────────────────────────────────────

// tests/utils/formatters.test.js
const { formatCurrency, slugify } = require('../../utils/formatters');

describe('formatCurrency', () => {
    it('formats a positive number as USD', () => {
        expect(formatCurrency(1234.5)).toBe('$1,234.50');
    });

    it('formats zero correctly', () => {
        expect(formatCurrency(0)).toBe('$0.00');
    });

    it('formats negative amounts', () => {
        expect(formatCurrency(-50)).toBe('-$50.00');
    });

    it('supports other currencies', () => {
        expect(formatCurrency(100, 'EUR')).toContain('100');
    });
});

describe('slugify', () => {
    it('converts spaces to hyphens', () => {
        expect(slugify('Hello World')).toBe('hello-world');
    });

    it('removes special characters', () => {
        expect(slugify('React & Node.js!')).toBe('react-node-js');
    });

    it('trims leading and trailing hyphens', () => {
        expect(slugify('  My Post  ')).toBe('my-post');
    });
});`} />
                </div>

                <div className="topic">
                    <h3>Mocking — Isolate External Dependencies</h3>
                    <CodeBlock lang="javascript" code={`// services/emailService.js — sends email via Nodemailer
const nodemailer = require('nodemailer');

const sendWelcomeEmail = async (email, name) => {
    const transporter = nodemailer.createTransport({ /* ... */ });
    await transporter.sendMail({
        to:      email,
        subject: 'Welcome!',
        html:    \`<p>Hi \${name}, welcome aboard!</p>\`,
    });
};

// ──────────────────────────────────────────────────────────────────────

// tests/services/emailService.test.js
// We don't want to actually send emails in tests — mock the module
jest.mock('nodemailer');
const nodemailer = require('nodemailer');

const sendMailMock = jest.fn().mockResolvedValue({ messageId: 'test-id' });

beforeEach(() => {
    nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });
});

const { sendWelcomeEmail } = require('../../services/emailService');

describe('sendWelcomeEmail', () => {
    it('calls sendMail with correct recipient', async () => {
        await sendWelcomeEmail('user@test.com', 'Sanketh');

        expect(sendMailMock).toHaveBeenCalledTimes(1);
        expect(sendMailMock).toHaveBeenCalledWith(
            expect.objectContaining({ to: 'user@test.com' })
        );
    });

    it('includes the user name in the email body', async () => {
        await sendWelcomeEmail('user@test.com', 'Sanketh');
        const callArg = sendMailMock.mock.calls[0][0];
        expect(callArg.html).toContain('Sanketh');
    });
});`} />
                </div>
            </section>

            {/* ── 04 API INTEGRATION TESTS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>04</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Integration Tests</div>
                        <h2>API Testing with Supertest</h2>
                        <p className="chapter-intro">
                            Supertest tests your Express routes end-to-end: the request goes through middleware, the controller, and the real database (in-memory MongoDB).
                            These are the highest-value tests for a backend — they catch the most bugs.
                        </p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Test Express App Setup</h3>
                    <CodeBlock lang="javascript" code={`// app.js — export app WITHOUT starting the server
// This lets Supertest control the HTTP lifecycle
const express    = require('express');
const cors       = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth',  authRoutes);
app.use('/api/users', userRoutes);

// Global error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;   // export, don't listen

// server.js — import app and start listening (only in production)
const app = require('./app');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(5000, () => console.log('Server running'));
});`} />
                </div>

                <div className="topic">
                    <h3>Auth Route Tests</h3>
                    <CodeBlock lang="javascript" code={`// tests/routes/auth.test.js
const request = require('supertest');
const app     = require('../../app');
const User    = require('../../models/User');

describe('POST /api/auth/register', () => {
    const validUser = {
        name:     'Sanketh',
        email:    'sanketh@test.com',
        password: 'Password123',
    };

    it('registers a new user and returns a token', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send(validUser)
            .expect('Content-Type', /json/)
            .expect(201);

        expect(res.body).toHaveProperty('accessToken');
        expect(res.body.user).toMatchObject({
            name:  'Sanketh',
            email: 'sanketh@test.com',
            role:  'user',
        });
        expect(res.body.user).not.toHaveProperty('password');  // never returned!
    });

    it('rejects duplicate email', async () => {
        await User.create({ ...validUser, password: 'hashed' });  // pre-existing user

        const res = await request(app)
            .post('/api/auth/register')
            .send(validUser)
            .expect(400);

        expect(res.body.message).toMatch(/already in use/i);
    });

    it('validates required fields', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ email: 'bad@test.com' })  // missing name, password
            .expect(422);

        expect(res.body).toHaveProperty('errors');
    });

    it('rejects weak passwords', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ ...validUser, password: 'short' })
            .expect(422);

        expect(res.body.errors.some(e => e.field === 'password')).toBe(true);
    });
});

describe('POST /api/auth/login', () => {
    beforeEach(async () => {
        // Create a real user in the in-memory DB (password gets hashed by pre-save hook)
        await User.create({ name: 'Sanketh', email: 'sanketh@test.com', password: 'Password123' });
    });

    it('returns token with valid credentials', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'sanketh@test.com', password: 'Password123' })
            .expect(200);

        expect(res.body).toHaveProperty('accessToken');
    });

    it('rejects wrong password', async () => {
        await request(app)
            .post('/api/auth/login')
            .send({ email: 'sanketh@test.com', password: 'WrongPass123' })
            .expect(401);
    });

    it('rejects non-existent email', async () => {
        await request(app)
            .post('/api/auth/login')
            .send({ email: 'nobody@test.com', password: 'Password123' })
            .expect(401);
    });
});`} />
                </div>

                <div className="topic">
                    <h3>Protected Routes — Testing Auth Middleware</h3>
                    <CodeBlock lang="javascript" code={`// tests/routes/users.test.js
const request = require('supertest');
const app     = require('../../app');
const User    = require('../../models/User');
const jwt     = require('jsonwebtoken');

// Helper: create a user and get a valid token
async function createUserAndGetToken(overrides = {}) {
    const user = await User.create({
        name:     'Test User',
        email:    'test@test.com',
        password: 'Password123',
        role:     'user',
        ...overrides,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    return { user, token };
}

describe('GET /api/users/profile', () => {
    it('returns profile for authenticated user', async () => {
        const { user, token } = await createUserAndGetToken();

        const res = await request(app)
            .get('/api/users/profile')
            .set('Authorization', \`Bearer \${token}\`)   // attach token
            .expect(200);

        expect(res.body.user._id).toBe(user._id.toString());
        expect(res.body.user.name).toBe('Test User');
    });

    it('returns 401 with no token', async () => {
        await request(app)
            .get('/api/users/profile')
            .expect(401);
    });

    it('returns 401 with expired token', async () => {
        const { user } = await createUserAndGetToken();
        const expiredToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '-1s' });

        const res = await request(app)
            .get('/api/users/profile')
            .set('Authorization', \`Bearer \${expiredToken}\`)
            .expect(401);

        expect(res.body.message).toMatch(/expired/i);
    });
});

describe('DELETE /api/users/:id — admin only', () => {
    it('allows admin to delete user', async () => {
        const { token } = await createUserAndGetToken({ email: 'admin@test.com', role: 'admin' });
        const { user: target } = await createUserAndGetToken({ email: 'target@test.com' });

        await request(app)
            .delete(\`/api/users/\${target._id}\`)
            .set('Authorization', \`Bearer \${token}\`)
            .expect(200);
    });

    it('rejects regular user', async () => {
        const { token } = await createUserAndGetToken({ email: 'regular@test.com', role: 'user' });
        const { user: target } = await createUserAndGetToken({ email: 'target2@test.com' });

        await request(app)
            .delete(\`/api/users/\${target._id}\`)
            .set('Authorization', \`Bearer \${token}\`)
            .expect(403);   // Forbidden
    });
});`} />
                </div>
            </section>

            {/* ── 05 REACT TESTING ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>05</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Frontend</div>
                        <h2>React Testing Library</h2>
                        <p className="chapter-intro">
                            Test components the way users use them — by finding elements the way users find them
                            (by text, role, label) and firing events. Avoid testing implementation details.
                        </p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Vitest + RTL Setup (Vite Projects)</h3>
                    <CodeBlock lang="bash" code={`# Install for Vite projects (use Vitest instead of Jest)
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event

# vite.config.js — add test config
# export default defineConfig({
#   plugins: [react()],
#   test: {
#     environment: 'jsdom',
#     globals: true,
#     setupFiles: './src/tests/setup.ts',
#   },
# });

# src/tests/setup.ts
# import '@testing-library/jest-dom';   // custom matchers like .toBeInTheDocument()

# package.json:
# "test": "vitest"
# "test:ui": "vitest --ui"
# "test:coverage": "vitest --coverage"`} />
                </div>

                <div className="topic">
                    <h3>Component Testing</h3>
                    <CodeBlock lang="jsx" code={`// components/Button.jsx — component being tested
export function Button({ label, onClick, disabled = false }) {
    return (
        <button onClick={onClick} disabled={disabled}>
            {label}
        </button>
    );
}

// ─────────────────────────────────────────────────────────────────────

// tests/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../components/Button';

describe('Button', () => {
    it('renders the label text', () => {
        render(<Button label="Click Me" onClick={() => {}} />);

        // Find by role (how a screen reader finds it) — preferred
        const button = screen.getByRole('button', { name: /click me/i });
        expect(button).toBeInTheDocument();
    });

    it('calls onClick when clicked', async () => {
        const handleClick = vi.fn();   // mock function (vitest) / jest.fn() in Jest
        render(<Button label="Submit" onClick={handleClick} />);

        // userEvent simulates real browser interactions (more realistic than fireEvent)
        await userEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
        const handleClick = vi.fn();
        render(<Button label="Submit" onClick={handleClick} disabled={true} />);

        const button = screen.getByRole('button');
        expect(button).toBeDisabled();

        await userEvent.click(button);
        expect(handleClick).not.toHaveBeenCalled();
    });
});`} />
                </div>

                <div className="topic">
                    <h3>Form & Async Tests</h3>
                    <CodeBlock lang="jsx" code={`// tests/LoginForm.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../components/LoginForm';

// Mock the auth hook so we don't need a real server
vi.mock('../context/AuthContext', () => ({
    useAuth: () => ({
        login:   loginMock,
        loading: false,
    }),
}));

const loginMock = vi.fn();

beforeEach(() => {
    loginMock.mockClear();
});

describe('LoginForm', () => {
    it('renders email and password fields', () => {
        render(<LoginForm />);
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it('submits with user-entered values', async () => {
        loginMock.mockResolvedValue({ success: true });
        render(<LoginForm />);

        // Fill in the form (acts like a real user typing)
        await userEvent.type(screen.getByLabelText(/email/i), 'sanketh@test.com');
        await userEvent.type(screen.getByLabelText(/password/i), 'Password123');
        await userEvent.click(screen.getByRole('button', { name: /log in/i }));

        expect(loginMock).toHaveBeenCalledWith('sanketh@test.com', 'Password123');
    });

    it('shows error message on failed login', async () => {
        loginMock.mockResolvedValue({ success: false, message: 'Invalid credentials' });
        render(<LoginForm />);

        await userEvent.type(screen.getByLabelText(/email/i), 'bad@test.com');
        await userEvent.type(screen.getByLabelText(/password/i), 'wrong');
        await userEvent.click(screen.getByRole('button', { name: /log in/i }));

        // waitFor — for async state updates that require a re-render
        await waitFor(() => {
            expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
        });
    });

    it('shows loading state while submitting', async () => {
        // Override the loading state for this test
        vi.mocked(useAuth).mockReturnValue({ login: loginMock, loading: true });
        render(<LoginForm />);

        expect(screen.getByRole('button')).toHaveTextContent(/logging in/i);
        expect(screen.getByRole('button')).toBeDisabled();
    });
});`} />
                    <Callout type="tip" title="💡 Query Priority — How to Find Elements">
                        Use this order: <code>getByRole</code> (most accessible) → <code>getByLabelText</code> → <code>getByPlaceholderText</code> → <code>getByText</code> → <code>getByTestId</code> (last resort).
                        Queries that match what users see give you tests that break when behavior changes, not when implementation details change.
                    </Callout>
                </div>
            </section>

            {/* ── 06 COVERAGE ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>06</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Coverage</div>
                        <h2>Code Coverage & CI Integration</h2>
                    </div>
                </div>
                <div className="topic">
                    <CodeBlock lang="bash" code={`# Run tests with coverage report
npm test -- --coverage

# Coverage output:
# ----------|---------|----------|---------|---------|
# File      | % Stmts | % Branch | % Funcs | % Lines |
# ----------|---------|----------|---------|---------|
# controllers/authController.js | 92 | 87 | 100 | 92 |
# middleware/auth.js             | 100 | 100 | 100 | 100 |
# models/User.js                 | 85  | 75  | 100 | 85  |

# ── What the numbers mean ────────────────────────────────────────────
# Statements: % of code lines executed
# Branches:   % of if/else paths taken
# Functions:  % of functions called
# Lines:      similar to Statements

# ── Recommended minimums ─────────────────────────────────────────────
# 70%+ for early projects
# 80%+ for production APIs
# Don't chase 100% — test behavior, not every line`} />
                    <CodeBlock lang="yaml" code={`# .github/workflows/test.yml — run tests on every PR
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install & test backend
        run: |
          cd server && npm ci
          npm test -- --coverage
        env:
          JWT_SECRET: test-secret-for-ci
          JWT_REFRESH_SECRET: test-refresh-secret

      - name: Install & test frontend
        run: |
          cd client && npm ci
          npm test -- --watchAll=false`} />
                </div>
            </section>

            {/* ── RESOURCES ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>07</div>
                    <div className="chapter-meta"><h2>Resources</h2></div>
                </div>
                <div className="resource-grid">
                    {RESOURCES.map((r, i) => <ResourceCard key={i} {...r} />)}
                </div>
            </section>

            <footer className="footer">
                <p>Testing · Chapter 15 · FullStack Compass</p>
            </footer>
        </>
    );
}
