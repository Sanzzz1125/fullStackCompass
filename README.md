# FullStack Compass 🧭

**Complete MERN Stack Learning Platform — Zero to Full Stack Engineer**

> Live: [www.fullstackcompass.in](https://www.fullstackcompass.in) · Built by [Sanketh](https://sanketh.live)

---

## What is FullStack Compass?

A single-page React application that serves as a comprehensive MERN stack learning guide. Covers HTML through deployment with code examples, projects, resources, and practice games for every topic.

---

## Project Structure

```
FullStack Compass/
├── client/                          # React Frontend (Vite)
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── assets/                  # Images, fonts
│   │   ├── components/
│   │   │   ├── CodeBlock.jsx        # Syntax-highlighted code renderer
│   │   │   ├── Layout.jsx           # Sidebar + main content wrapper
│   │   │   ├── Navbar.jsx           # Top navigation bar
│   │   │   ├── ResourceCard.jsx     # External resource card
│   │   │   ├── PracticeArena.jsx    # Practice game cards
│   │   │   └── ThemeToggle.jsx      # Dark/light toggle
│   │   ├── context/
│   │   │   └── ThemeContext.jsx     # Global theme state
│   │   ├── data/
│   │   │   ├── navData.js           # Sidebar navigation items
│   │   │   ├── cloneData.js         # App clone content & architecture
│   │   │   └── resourceData.js      # Curated resource links
│   │   ├── hooks/
│   │   │   └── useActiveSection.js  # Tracks current scroll position
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx        # Home / landing dashboard
│   │   │   │
│   │   │   ── FOUNDATION ──────────────────────────────────────
│   │   │   ├── HTML.jsx             # HTML semantics, forms, tables
│   │   │   ├── CSS.jsx              # Box model, Flex, Grid, Sass, BEM
│   │   │   ├── JavaScript.jsx       # JS from basics to advanced patterns
│   │   │   │
│   │   │   ── STYLING ─────────────────────────────────────────
│   │   │   ├── Bootstrap.jsx        # Grid, components, utilities
│   │   │   ├── Tailwind.jsx         # Utility-first, dark mode, config (NEW)
│   │   │   │
│   │   │   ── REACT ECOSYSTEM ──────────────────────────────────
│   │   │   ├── ReactPage.jsx        # Full React guide (hooks, patterns, perf)
│   │   │   │
│   │   │   ── BACKEND ─────────────────────────────────────────
│   │   │   ├── NodeJS.jsx           # Runtime, modules, streams, PM2
│   │   │   ├── Express.jsx          # Server, routing, middleware, REST
│   │   │   ├── APIs.jsx             # REST, HTTP, Postman, third-party
│   │   │   ├── Auth.jsx             # JWT, bcrypt, refresh tokens
│   │   │   ├── FileUploads.jsx      # Multer, Cloudinary
│   │   │   ├── Nodemailer.jsx       # SMTP, OTP, password reset (NEW)
│   │   │   ├── Payments.jsx         # Razorpay, Stripe, webhooks (NEW)
│   │   │   ├── SocketIO.jsx         # Real-time, rooms, events
│   │   │   │
│   │   │   ── DATABASES ────────────────────────────────────────
│   │   │   ├── MongoDB.jsx          # CRUD, aggregation, indexes
│   │   │   ├── Mongoose.jsx         # Schemas, models, middleware
│   │   │   ├── Redis.jsx            # Caching, rate limiting, OTPs (NEW)
│   │   │   ├── SQL.jsx              # SQL, PostgreSQL, MySQL
│   │   │   │
│   │   │   ── DEVOPS ─────────────────────────────────────────
│   │   │   ├── Docker.jsx           # Dockerfile, Compose, MERN stack (NEW)
│   │   │   ├── CICD.jsx             # GitHub Actions, deploy pipelines (NEW)
│   │   │   ├── Deployment.jsx       # Vercel, Render, PM2, Nginx
│   │   │   │
│   │   │   ── QUALITY ─────────────────────────────────────────
│   │   │   ├── TypeScript.jsx       # Types, interfaces, generics, React+TS
│   │   │   ├── Testing.jsx          # Jest, RTL, Supertest
│   │   │   ├── ErrorTracking.jsx    # Winston, Morgan, Sentry (NEW)
│   │   │   │
│   │   │   ── BUILD ──────────────────────────────────────────
│   │   │   ├── MiniProjects.jsx     # 10 guided projects with full code
│   │   │   ├── AppClones.jsx        # 8 app clones with architecture
│   │   │   │
│   │   │   ── MORE ───────────────────────────────────────────
│   │   │   ├── Git.jsx              # Git workflow, branching
│   │   │   └── Connect.jsx          # Contact / social links
│   │   │
│   │   ├── styles/
│   │   │   ├── index.css            # Global styles, CSS variables, themes
│   │   │   └── components.css       # CodeBlock, cards, layout styles
│   │   ├── utils/
│   │   │   └── cn.js                # classnames utility helper
│   │   ├── App.jsx                  # Root: BrowserRouter + all Routes
│   │   └── main.jsx                 # ReactDOM.createRoot entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md                        # This file
```

---

## Pages Quick Reference

| Page | Path | Topics Covered |
|---|---|---|
| Dashboard | `/` | Overview, learning path, stats |
| HTML | `/html` | Structure, semantics, forms, tables, accessibility |
| CSS | `/css` | Box model, Flexbox, Grid, animations, Sass, BEM, modern CSS |
| JavaScript | `/javascript` | Types, closures, this, event loop, async, regex, patterns |
| Bootstrap | `/bootstrap` | Grid, components, utilities, templates |
| **Tailwind** | `/tailwind` | Utility classes, dark mode, responsive, config, React |
| React | `/react` | Hooks, Router, Context, React Query, Zustand, performance |
| Node.js | `/nodejs` | Runtime, modules, fs, streams, crypto, PM2, debugging |
| Express | `/express` | Server, routing, REST API, validation, error handling |
| APIs | `/apis` | HTTP, REST design, Postman, Axios, third-party APIs |
| Auth | `/auth` | JWT, bcrypt, refresh tokens, protected routes, security |
| File Uploads | `/file-uploads` | Multer, Cloudinary, file validation |
| **Nodemailer** | `/nodemailer` | SMTP, HTML templates, OTP, password reset |
| **Payments** | `/payments` | Razorpay checkout, Stripe, webhooks, verification |
| Socket.io | `/socketio` | Real-time events, rooms, chat architecture |
| MongoDB | `/mongodb` | CRUD, aggregation pipeline, indexes, transactions |
| Mongoose | `/mongoose` | Schemas, models, hooks, populate, virtuals |
| **Redis** | `/redis` | Caching, rate limiting, OTPs, sorted sets |
| SQL | `/sql` | SQL queries, PostgreSQL, MySQL, ORMs |
| **Docker** | `/docker` | Dockerfile, multi-stage builds, Compose MERN stack |
| **CI/CD** | `/cicd` | GitHub Actions, test on PR, auto-deploy |
| Deployment | `/deployment` | Vercel, Render, PM2, Nginx, SSL |
| TypeScript | `/typescript` | Types, generics, React + TS, Express + TS |
| Testing | `/testing` | Jest, React Testing Library, Supertest |
| **Error Tracking** | `/error-tracking` | Winston, Morgan, Sentry frontend + backend |
| Mini Projects | `/mini-projects` | 10 full project walkthroughs with code |
| App Clones | `/clones` | 8 app clones with architecture & schemas |
| Git | `/git` | Git workflow, branching strategy, GitHub |

> **Bold** = newly added pages

---

## Learning Order (Recommended)

Follow this exact order. Each topic builds on the previous one.

### Phase 1 — Web Foundations (Week 1–2)
```
HTML → CSS → Bootstrap → Tailwind CSS → JavaScript (basics)
```
**Goal:** Build a static responsive website from scratch.

### Phase 2 — JavaScript Deep Dive (Week 3)
```
JavaScript → (closures, this, event loop, async, regex, patterns)
```
**Goal:** Solve 10 Codewars kata at kyu 7–6 level.

### Phase 3 — React Basics (Week 4–5)
```
React → (components, hooks, forms, Router, Context)
Mini Projects #1–4 (Task Tracker → Weather App)
```
**Goal:** Deploy a working React app on Vercel.

### Phase 4 — Advanced React (Week 6)
```
React → (React Query, Zustand, performance, TypeScript)
Mini Project #5 (Movie Search App)
Mini Project #6 (Shopping Cart with Context)
```
**Goal:** Shopping cart app deployed with dark mode + localStorage.

### Phase 5 — Backend Basics (Week 7–8)
```
Node.js → Express → REST API Design → Authentication (JWT)
Mini Project #7 (Blog REST API — tested in Postman)
```
**Goal:** A fully working REST API with auth, tested in Postman.

### Phase 6 — Database Layer (Week 9)
```
MongoDB → Mongoose → Redis (caching)
Mini Project #8 (Auth API with JWT + bcrypt)
```
**Goal:** Full auth flow: register → verify email → login → protected routes.

### Phase 7 — Production Features (Week 10–11)
```
File Uploads → Nodemailer → Payments → Socket.io
```
**Goal:** Connect all features into one full stack app.

### Phase 8 — DevOps & Quality (Week 12)
```
Docker → CI/CD → Deployment → Error Tracking → Testing
```
**Goal:** App is containerised, auto-deployed, and monitored in production.

### Phase 9 — Portfolio Projects (Week 13–16)
```
Mini Projects #9–10 → App Clones (pick 2)
```
**Goal:** 2 deployed clones on GitHub with README, screenshots, live URL.

---

## Key Files Explained

### `src/App.jsx`
Root component. Sets up `BrowserRouter` with every route in the application. If you add a new page, register it here with a `<Route>` and import at the top.

### `src/data/navData.js`
Drives the sidebar navigation. Each entry has `label`, `path`, and `color`. Add new pages here to make them appear in the sidebar.

### `src/components/CodeBlock.jsx`
Self-contained syntax highlighter using inline `style="color:..."` spans. Supports `html`, `css`, `javascript`, `bash`, `sql`. Pass `lang` and `code` props. No external CSS dependency.

### `src/data/cloneData.js`
All app clone content — feature lists, folder structure, component breakdown, DB schemas, and API design for each clone (Myntra, Spotify, Twitter, YouTube, Zomato, Instagram, Amazon, Netflix).

### `src/styles/index.css`
CSS custom properties (design tokens) for the whole app. Colors, spacing, shadows, fonts. Dark/light theme controlled by `data-theme` attribute on `<html>`.

---

## Environment Setup

```bash
# Clone and install
git clone https://github.com/Sanzzz1125/FullStack-Compass.git
cd "FullStack Compass/client"
npm install
npm run dev
# Opens at http://localhost:5173
```

No `.env` needed for the frontend — it is a purely static React app with no API calls.

---

## Adding a New Page

1. Create `src/pages/YourPage.jsx` (copy structure from any existing page)
2. Add route in `src/App.jsx`:
   ```jsx
   import YourPage from './pages/YourPage';
   <Route path="your-path" element={<YourPage />} />
   ```
3. Add nav entry in `src/data/navData.js`:
   ```js
   { label: 'Your Page', path: '/your-path', color: '#hexcolor', dot: true }
   ```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| Routing | React Router v6 |
| Styling | CSS Custom Properties (no framework) |
| Code Highlighting | Custom regex-based (inline styles) |
| Deployment | Vercel |
| Repo | GitHub → github.com/Sanzzz1125/Satyam-chits |

---

## Content Sources

All code examples reference and are consistent with:
- [MDN Web Docs](https://developer.mozilla.org/) — HTML, CSS, JavaScript
- [React Docs](https://react.dev/) — React patterns
- [Node.js Docs](https://nodejs.org/en/docs) — Node.js APIs
- [Express Docs](https://expressjs.com/) — Express middleware and routing
- [MongoDB Docs](https://www.mongodb.com/docs/) — Aggregation, indexes
- [Mongoose Docs](https://mongoosejs.com/docs/) — Schema, models
- [Redis Docs](https://redis.io/docs/) — Commands, data structures
- [Tailwind CSS Docs](https://tailwindcss.com/docs) — Utility classes
- [Docker Docs](https://docs.docker.com/) — Dockerfile, Compose
- [GitHub Actions Docs](https://docs.github.com/en/actions) — Workflows

---

*FullStack Compass — Learn MERN the right way.*
