import React from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';

const COLOR = 'var(--teal)';

const RESOURCES = [
    { type: 'docs',      title: 'Render Docs',          description: 'Official guide to deploying Node/Express APIs on Render.com — free tier available.',    url: 'https://render.com/docs' },
    { type: 'docs',      title: 'Vercel Docs',           description: 'Deploy React/Vite apps in seconds. Free tier includes custom domains and HTTPS.',         url: 'https://vercel.com/docs' },
    { type: 'docs',      title: 'MongoDB Atlas',         description: 'Free cloud MongoDB cluster — the database for your production MERN app.',                  url: 'https://www.mongodb.com/atlas' },
    { type: 'reference', title: 'Railway Docs',          description: 'Simple platform for full-stack apps — deploy frontend + backend together.',                url: 'https://docs.railway.app/' },
    { type: 'tool',      title: 'dotenv (npm)',           description: 'Load environment variables from .env file into process.env. Essential for config.',        url: 'https://github.com/motdotla/dotenv' },
    { type: 'tutorial',  title: 'pm2 Process Manager',   description: 'Keep your Node.js app running in production — auto-restart on crash.',                     url: 'https://pm2.keymetrics.io/' },
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

function Step({ n, title, children }) {
    return (
        <div style={{ display: 'flex', gap: '20px', marginBottom: '32px', alignItems: 'flex-start' }}>
            <div style={{
                flexShrink: 0, width: '36px', height: '36px', borderRadius: '50%',
                background: COLOR, color: '#000', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontFamily: "'Space Mono', monospace",
                fontWeight: '700', fontSize: '13px',
            }}>{n}</div>
            <div style={{ flex: 1 }}>
                <h4 style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 700, fontSize: '16px', marginBottom: '12px', color: 'var(--text)' }}>{title}</h4>
                {children}
            </div>
        </div>
    );
}

export default function Deployment() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{ color: COLOR }}>Deployment</span> — Chapter 10</div>
                <h1><span className="accent" style={{ color: COLOR }}>Deploy</span><br /><em>From localhost to the internet.</em></h1>
                <p className="hero-desc">
                    Building an app is only half the work — the other half is making it available to the world.
                    This chapter walks you through deploying a full MERN stack: Express API on Render,
                    React frontend on Vercel, and MongoDB on Atlas.
                </p>
                <div className="hero-stack">
                    {['Render', 'Vercel', 'MongoDB Atlas', 'Environment Variables', 'CORS', 'Production Build', 'Custom Domain'].map(t => (
                        <span key={t} className="stack-chip">{t}</span>
                    ))}
                </div>
            </section>

            {/* ── 01 ARCHITECTURE ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>01</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Overview</div>
                        <h2>Production Architecture</h2>
                        <p className="chapter-intro">In production, your MERN app is split across three separate services. Each is deployed independently.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Where Everything Lives</h3>
                    <div className="flow" style={{ flexWrap: 'wrap', gap: '8px' }}>
                        {[
                            'User visits Vercel URL',
                            'React app loads (static files)',
                            'React calls your API',
                            'Render serves Express API',
                            'Express queries MongoDB Atlas',
                            'Data flows back to user',
                        ].map((s, i, arr) => (
                            <React.Fragment key={i}>
                                <div className="flow-step">{s}</div>
                                {i < arr.length - 1 && <span className="flow-arrow">→</span>}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="concept-grid" style={{ marginTop: '24px' }}>
                        <div className="concept-card">
                            <div className="concept-icon">⚛️</div>
                            <h5>Frontend — Vercel</h5>
                            <p>Your React app is built to static files and served by Vercel's global CDN. Free tier, HTTPS, custom domain.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">🟢</div>
                            <h5>Backend — Render</h5>
                            <p>Your Express API runs as a long-running Node.js service. Free tier available (spins down after inactivity).</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">🍃</div>
                            <h5>Database — MongoDB Atlas</h5>
                            <p>Free M0 cluster (512MB). Your API connects via MONGO_URI environment variable. Never expose this URL.</p>
                        </div>
                    </div>
                    <Callout type="info" title="ℹ️ Free Tier Strategy">
                        Render free tier sleeps after 15 minutes of inactivity — first request after sleep takes ~30s. Upgrade to a paid plan for production apps with real users. Vercel and MongoDB Atlas free tiers are always-on.
                    </Callout>
                </div>
            </section>

            {/* ── 02 PREP ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>02</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Preparation</div>
                        <h2>Prepare Your Codebase</h2>
                        <p className="chapter-intro">Before deploying, you need to configure your app to work in a production environment. Environment variables are the key.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Project File Structure</h3>
                    <CodeBlock lang="bash" code={`my-mern-app/
├── client/              ← React app (deploy to Vercel)
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── server/              ← Express API (deploy to Render)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
├── .gitignore           ← MUST exclude node_modules and .env files
└── README.md`} />
                </div>

                <div className="topic">
                    <h3>.gitignore — Critical First Step</h3>
                    <CodeBlock lang="bash" code={`# .gitignore — add this to the ROOT of your project
node_modules/
.env
.env.local
.env.production

# Also add to client/.gitignore
dist/
.env

# And server/.gitignore
.env`} />
                    <Callout type="warn" title="⚠️ Never commit .env files">
                        If you push your MONGO_URI or JWT_SECRET to GitHub, your database and app are compromised.
                        Create <code>.gitignore</code> BEFORE your first commit. If you accidentally pushed secrets,
                        rotate them immediately (change passwords, regenerate keys).
                    </Callout>
                </div>

                <div className="topic">
                    <h3>Production-Ready server.js</h3>
                    <CodeBlock lang="javascript" code={`// server/server.js — production-ready setup
require('dotenv').config();
const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
const helmet     = require('helmet');
const path       = require('path');

const app = express();

// ── Security ──────────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
    origin:      process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}));

// ── Body parsing ──────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(require('cookie-parser')());

// ── Routes ────────────────────────────────────────────────────────────
app.use('/api/auth',    require('./routes/authRoutes'));
app.use('/api/users',   require('./routes/userRoutes'));
app.use('/api/posts',   require('./routes/postRoutes'));

// ── Health check (useful for deployment monitoring) ───────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok', env: process.env.NODE_ENV }));

// ── 404 handler ───────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// ── Global error handler ──────────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: process.env.NODE_ENV === 'production'
            ? 'Something went wrong'   // hide internals in prod
            : err.message,
    });
});

// ── Connect to MongoDB then start server ──────────────────────────────
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
    })
    .catch(err => {
        console.error('MongoDB connection failed:', err);
        process.exit(1);
    });`} />
                </div>

                <div className="topic">
                    <h3>Vite Config — API Proxy for Development</h3>
                    <CodeBlock lang="javascript" code={`// client/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            // In dev: /api/auth → http://localhost:5000/api/auth
            '/api': {
                target:       'http://localhost:5000',
                changeOrigin: true,
            },
        },
    },
});

// ── In production: set your API URL in an env variable ────────────────
// client/.env.production
VITE_API_URL=https://my-api.onrender.com

// Then in your axios config:
// baseURL: import.meta.env.VITE_API_URL || '/api'`} />
                </div>
            </section>

            {/* ── 03 MONGODB ATLAS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>03</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Database</div>
                        <h2>Step 1 — MongoDB Atlas Setup</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Create Your Free Cluster</h3>
                    <Step n="1" title="Create an Atlas account">
                        Go to <strong>mongodb.com/atlas</strong> → Sign up free → Create a free M0 cluster (choose any region).
                    </Step>
                    <Step n="2" title="Create a database user">
                        In Atlas sidebar → <strong>Database Access</strong> → Add New Database User → choose a username + strong password (save these!).
                    </Step>
                    <Step n="3" title="Allow your IP (Network Access)">
                        <strong>Network Access</strong> → Add IP Address → For development add <code>0.0.0.0/0</code> (allow anywhere). In production, add only your Render server's IP.
                    </Step>
                    <Step n="4" title="Get your connection string">
                        <strong>Database</strong> → Connect → Drivers → Node.js → copy the URI. Replace <code>&lt;password&gt;</code> with your DB user password.
                        <CodeBlock lang="bash" code={`# Your MONGO_URI looks like this:
mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/myapp?retryWrites=true&w=majority

# Add to server/.env:
MONGO_URI=mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/myapp?retryWrites=true&w=majority`} />
                    </Step>
                </div>
            </section>

            {/* ── 04 RENDER ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>04</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Backend</div>
                        <h2>Step 2 — Deploy Express API to Render</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Deploy Your Backend</h3>
                    <Step n="1" title="Push your code to GitHub">
                        <CodeBlock lang="bash" code={`git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/my-mern-app.git
git push -u origin main`} />
                    </Step>
                    <Step n="2" title="Create a new Web Service on Render">
                        Go to <strong>render.com</strong> → New → Web Service → connect your GitHub repo.
                    </Step>
                    <Step n="3" title="Configure the service">
                        <div className="table-wrap">
                            <table>
                                <thead><tr><th>Setting</th><th>Value</th></tr></thead>
                                <tbody>
                                    <tr><td>Name</td><td>my-mern-api</td></tr>
                                    <tr><td>Root Directory</td><td>server</td></tr>
                                    <tr><td>Build Command</td><td>npm install</td></tr>
                                    <tr><td>Start Command</td><td>node server.js</td></tr>
                                    <tr><td>Instance Type</td><td>Free</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </Step>
                    <Step n="4" title="Add environment variables">
                        In Render → your service → <strong>Environment</strong> → Add the following:
                        <CodeBlock lang="bash" code={`NODE_ENV=production
MONGO_URI=mongodb+srv://... (from Atlas)
JWT_SECRET=your-64-char-random-string
JWT_REFRESH_SECRET=different-64-char-random-string
CLIENT_URL=https://my-app.vercel.app   (add this after deploying frontend)`} />
                    </Step>
                    <Step n="5" title="Deploy">
                        Click <strong>Create Web Service</strong>. Render will install dependencies and start your server.
                        Your API will be live at <code>https://my-mern-api.onrender.com</code>. Test with <code>/api/health</code>.
                    </Step>
                </div>
            </section>

            {/* ── 05 VERCEL ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>05</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Frontend</div>
                        <h2>Step 3 — Deploy React to Vercel</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Deploy Your Frontend</h3>
                    <Step n="1" title="Install Vercel CLI (optional but useful)">
                        <CodeBlock lang="bash" code={`npm install -g vercel
vercel login`} />
                    </Step>
                    <Step n="2" title="Configure the client for production API URL">
                        <CodeBlock lang="bash" code={`# client/.env.production
VITE_API_URL=https://my-mern-api.onrender.com`} />
                        <CodeBlock lang="javascript" code={`// client/src/lib/api.js
import axios from 'axios';
const api = axios.create({
    baseURL:         import.meta.env.VITE_API_URL || '/api',
    withCredentials: true,
});
export default api;`} />
                    </Step>
                    <Step n="3" title="Deploy via Vercel dashboard">
                        Go to <strong>vercel.com</strong> → New Project → Import your GitHub repo → set Root Directory to <code>client</code> → Deploy.
                        Vercel auto-detects Vite and sets the correct build command.
                    </Step>
                    <Step n="4" title="Add environment variable in Vercel">
                        Vercel Dashboard → your project → Settings → Environment Variables → add <code>VITE_API_URL</code>.
                    </Step>
                    <Step n="5" title="Update CORS on your backend">
                        Now that you have your Vercel URL, go back to Render and update <code>CLIENT_URL</code>:
                        <CodeBlock lang="bash" code={`# In Render Environment Variables:
CLIENT_URL=https://my-app.vercel.app`} />
                    </Step>
                    <Callout type="tip" title="💡 Handle Client-Side Routing">
                        React Router uses client-side routing. If a user navigates directly to <code>/dashboard</code>, Vercel will 404. Fix by adding a <code>vercel.json</code> file:
                        <br /><br />
                        Create <code>client/vercel.json</code>: <code>{"{ \"rewrites\": [{ \"source\": \"/(.*)\", \"destination\": \"/\" }] }"}</code>
                    </Callout>
                </div>
            </section>

            {/* ── 06 PRODUCTION CHECKLIST ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>06</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Checklist</div>
                        <h2>Production Deployment Checklist</h2>
                    </div>
                </div>
                <div className="topic">
                    <CodeBlock lang="bash" code={`# ── Before deploying ────────────────────────────────────────────────
✅  .env files are in .gitignore
✅  All secrets are in environment variables (not hardcoded)
✅  NODE_ENV=production is set on the server
✅  Error messages in production don't expose stack traces
✅  CORS is configured with your specific frontend URL (not '*')
✅  Rate limiting is enabled on auth routes
✅  MongoDB Atlas network access is configured
✅  All API routes have error handling (try/catch or asyncHandler)

# ── After deploying ───────────────────────────────────────────────────
✅  Test GET /api/health → returns { status: 'ok' }
✅  Test register and login flow end-to-end
✅  Verify HTTPS is working (Render and Vercel both provide it)
✅  Check browser network tab — no CORS errors
✅  Check cookies are being set correctly (Application tab in DevTools)
✅  Test on mobile / different device

# ── Ongoing ───────────────────────────────────────────────────────────
✅  Set up deployment notifications (Render notifies via email)
✅  Monitor logs in Render dashboard
✅  Rotate JWT secrets every 90 days
✅  Keep npm packages updated (npm audit regularly)`} />
                </div>

                <div className="topic">
                    <h3>Common Deployment Problems & Fixes</h3>
                    <div className="table-wrap">
                        <table>
                            <thead><tr><th>Problem</th><th>Cause</th><th>Fix</th></tr></thead>
                            <tbody>
                                <tr><td>CORS error in browser</td><td>CLIENT_URL not set or wrong</td><td>Update CLIENT_URL in Render env vars to exact Vercel URL (no trailing slash)</td></tr>
                                <tr><td>500 error on API</td><td>MONGO_URI wrong or Atlas IP blocked</td><td>Check Render logs + Atlas Network Access</td></tr>
                                <tr><td>White screen on Vercel</td><td>Build failed or wrong root dir</td><td>Check Vercel build logs; set Root Directory to <code>client</code></td></tr>
                                <tr><td>404 on page refresh</td><td>React Router + Vercel</td><td>Add <code>vercel.json</code> with rewrite rule</td></tr>
                                <tr><td>Auth cookies not sent</td><td>withCredentials missing</td><td>Add <code>withCredentials: true</code> to Axios + <code>credentials: true</code> to CORS</td></tr>
                                <tr><td>API URL wrong in prod</td><td>VITE_API_URL not set</td><td>Add env var in Vercel dashboard + redeploy</td></tr>
                            </tbody>
                        </table>
                    </div>
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
                <p>Deployment · Chapter 10 · FullStack Compass</p>
            </footer>
        </>
    );
}
