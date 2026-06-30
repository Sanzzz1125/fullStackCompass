import React from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';
import PracticeArena from '../components/PracticeArena.jsx';

const COLOR = 'var(--react-color)';

const RESOURCES = [
    { type: 'docs',      title: 'React Official Docs',         description: 'The best starting point. react.dev is beautifully written with interactive sandboxes.',                          url: 'https://react.dev/' },
    { type: 'docs',      title: 'React Router v6 Docs',        description: 'Complete guide to client-side routing in React apps.',                                                           url: 'https://reactrouter.com/en/main' },
    { type: 'docs',      title: 'TanStack Query Docs',         description: 'Everything about React Query — fetching, caching, syncing server state.',                                        url: 'https://tanstack.com/query/latest' },
    { type: 'docs',      title: 'Zustand Docs',                description: 'Lightweight global state management. Simple, fast, and scalable.',                                               url: 'https://zustand-demo.pmnd.rs/' },
    { type: 'tutorial',  title: 'React Patterns',              description: 'Common React patterns — render props, HOCs, compound components.',                                               url: 'https://reactpatterns.com/' },
    { type: 'tutorial',  title: 'React Hook Form',             description: 'Performant, flexible and extensible forms with easy-to-use validation.',                                          url: 'https://react-hook-form.com/' },
    { type: 'reference', title: 'useHooks.com',                description: 'Collection of production-ready custom React hooks with examples.',                                               url: 'https://usehooks.com/' },
    { type: 'reference', title: 'TypeScript + React Cheatsheet', description: 'The go-to reference for typing React components, hooks, events, and more.',                                   url: 'https://react-typescript-cheatsheet.netlify.app/' },
    { type: 'tool',      title: 'React DevTools',              description: 'Browser extension to inspect React component trees, props, and state.',                                          url: 'https://react.dev/learn/react-developer-tools' },
    { type: 'tool',      title: 'Vite',                        description: 'Lightning-fast build tool. The modern way to scaffold React projects.',                                          url: 'https://vitejs.dev/' },
    { type: 'course',    title: 'Scrimba — Learn React',       description: 'Interactive React course — write code directly in the browser.',                                                 url: 'https://scrimba.com/learn/learnreact' },
    { type: 'course',    title: 'Epic React by Kent C. Dodds', description: 'The most comprehensive React course. Covers everything from fundamentals to advanced patterns.',                 url: 'https://epicreact.dev/' },
];

const GAMES = [
    { emoji: '⚛️', name: 'React Challenge',    description: 'Build real UI components against time and constraints.',             url: 'https://www.frontendmentor.io/challenges?types=free&frameworks=react' },
    { emoji: '🏋️', name: 'React Exercises',    description: 'Progressive exercises from The Odin Project React path.',            url: 'https://www.theodinproject.com/paths/full-stack-javascript/courses/react' },
    { emoji: '🧩', name: 'React Quiz',         description: 'Test your React knowledge with 15 questions across hooks, patterns, and performance.', url: 'https://react-quiz.netlify.app/' },
    { emoji: '🎯', name: 'Frontend Mentor',    description: 'Real-world projects with Figma designs. Build and compare with others.', url: 'https://www.frontendmentor.io/' },
];

// ── Callout helper ─────────────────────────────────────────────────────────────
function Callout({ type = 'tip', title, children }) {
    const labels = { tip: '💡 Tip', warn: '⚠️ Warning', info: 'ℹ️ Info', key: '🔑 Key Concept' };
    return (
        <div className={`callout ${type}`}>
            <div className="callout-title">{title || labels[type]}</div>
            <p>{children}</p>
        </div>
    );
}

// ── Concept grid card helper ───────────────────────────────────────────────────
function ConceptCard({ icon, title, desc }) {
    return (
        <div className="concept-card">
            <div className="concept-icon">{icon}</div>
            <h5>{title}</h5>
            <p>{desc}</p>
        </div>
    );
}

// ── Flow diagram helper ────────────────────────────────────────────────────────
function Flow({ steps }) {
    return (
        <div className="flow">
            {steps.map((s, i) => (
                <React.Fragment key={i}>
                    <div className="flow-step">{s}</div>
                    {i < steps.length - 1 && <span className="flow-arrow">→</span>}
                </React.Fragment>
            ))}
        </div>
    );
}

// ── Comparison table helper ────────────────────────────────────────────────────
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

export default function ReactPage() {
    return (
        <>
            {/* ── HERO ── */}
            <section className="hero">
                <div className="hero-eyebrow"><span style={{ color: COLOR }}>React</span> — Chapter 05</div>
                <h1>
                    <span className="accent" style={{ color: COLOR }}>React</span><br />
                    <em>UI as a function of state.</em>
                </h1>
                <p className="hero-desc">
                    From absolute zero to production-ready. Every concept, pattern, hook, and best practice —
                    documented with real, runnable code. This is your complete React mastery reference.
                </p>
                <div className="hero-stack">
                    {['JSX','Components','Props','useState','useEffect','useRef','useMemo','useCallback',
                        'useReducer','Context API','Custom Hooks','React Router v6','React Query',
                        'Zustand','TypeScript','Testing','Performance','Patterns'].map(t => (
                        <span key={t} className="stack-chip">{t}</span>
                    ))}
                </div>
                <div className="hero-stats">
                    <div><div className="hero-stat-num">18</div><div className="hero-stat-lbl">Chapters</div></div>
                    <div><div className="hero-stat-num">60+</div><div className="hero-stat-lbl">Code Examples</div></div>
                    <div><div className="hero-stat-num">10+</div><div className="hero-stat-lbl">Custom Hooks</div></div>
                    <div><div className="hero-stat-num">∞</div><div className="hero-stat-lbl">Things to Build</div></div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                00 — WHAT IS REACT & HOW IT WORKS
            ══════════════════════════════════════════ */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>00</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Foundations</div>
                        <h2>What is React & How It Works</h2>
                        <p className="chapter-intro">React is a JavaScript <em>library</em> (not a framework) for building user interfaces. Created by Facebook in 2013, it's the most widely used front-end library in the world.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Core Ideas</h3>
                    <div className="concept-grid">
                        <ConceptCard icon="🧩" title="Component-Based" desc="Everything is a component. Build small, reusable pieces and compose them into complex UIs — like LEGO bricks." />
                        <ConceptCard icon="🔄" title="Declarative" desc="Describe WHAT the UI should look like for a given state. React figures out HOW to update the DOM efficiently." />
                        <ConceptCard icon="⬇️" title="Unidirectional Data Flow" desc="Data flows one way: parent → child via props. Predictable, easy to debug, easy to reason about." />
                        <ConceptCard icon="⚡" title="Virtual DOM" desc="React keeps a lightweight copy of the DOM. On state change it diffs old vs new and only updates what changed." />
                        <ConceptCard icon="🪝" title="Hooks" desc="Functions that let you use state, effects, refs, and other React features inside function components." />
                        <ConceptCard icon="🌐" title="Huge Ecosystem" desc="React Native (mobile), Next.js (SSR), Remix, React Query, Zustand, Framer Motion…" />
                    </div>
                    <Callout type="info">React is just a <strong>view library</strong> — it handles the UI layer only. You pick your own routing, state management, and data fetching. This is both freedom and responsibility.</Callout>
                </div>

                <div className="topic">
                    <h3>The Render Cycle</h3>
                    <p>React re-renders a component whenever its <strong>state</strong>, <strong>props</strong>, or <strong>context</strong> changes. Understanding this cycle is key to writing efficient React.</p>
                    <Flow steps={['State/Props Change', 'Render Phase (call component fn)', 'Reconciliation (diff)', 'Commit Phase (update DOM)', 'useLayoutEffect', 'useEffect']} />
                    <CodeBlock lang="jsx" code={`// React re-renders when:
// 1. Its own STATE changes (useState / useReducer)
// 2. Its PROPS change (parent re-renders and passes new values)
// 3. Its CONTEXT changes (value inside a Provider updates)

// During "Render", React calls your component function and builds a new virtual DOM tree.
// During "Reconciliation", it diffs old vs new virtual DOM.
// During "Commit", it applies only the minimal DOM changes needed.

function MyComponent({ name }) {
    console.log('RENDERED'); // runs every time React re-renders this component
    return <h1>Hello {name}</h1>;
}`} />
                </div>

                <div className="topic">
                    <h3>Virtual DOM & Keys</h3>
                    <CodeBlock lang="jsx" code={`// React uses "keys" to identify list items during reconciliation.
// Without stable keys, React re-renders every item when the list changes.

// ❌ BAD — index as key: breaks when the list reorders or filters
{items.map((item, index) => <Item key={index} {...item} />)}

// ✅ GOOD — stable unique ID as key
{items.map(item => <Item key={item.id} {...item} />)}

// Keys must be:
// 1. Unique among siblings (not globally unique)
// 2. Stable (don't change between renders — no Math.random()!)
// 3. A string or number`} />
                    <Callout type="warn">In React 18 Strict Mode, your component function is called <strong>twice</strong> on mount in development. This is intentional — React is checking that your component is a pure function with no side effects in the render phase. In production it only runs once.</Callout>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                01 — SETUP
            ══════════════════════════════════════════ */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>01</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Getting Started</div>
                        <h2>Environment Setup</h2>
                        <p className="chapter-intro">Three ways to get a React project running. Use Vite for most projects — it's the modern standard with near-instant dev server startup.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Vite (Recommended)</h3>
                    <CodeBlock lang="bash" code={`# Prerequisites: Node.js 18+ (check: node -v)

npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev       # dev server at http://localhost:5173

# For TypeScript (recommended for all new projects):
npm create vite@latest my-app -- --template react-ts`} />
                    <CodeBlock lang="jsx" code={`// Vite project structure:
my-app/
├── public/              // static files (favicon, robots.txt)
├── src/
│   ├── assets/          // images, fonts, SVGs
│   ├── components/      // reusable UI components
│   ├── pages/           // route-level components
│   ├── hooks/           // custom hooks
│   ├── App.jsx          // root component
│   ├── App.css
│   ├── index.css        // global styles
│   └── main.jsx         // entry point
├── index.html           // single HTML file (React mounts here)
├── vite.config.js
└── package.json`} />
                </div>

                <div className="topic">
                    <h3>Other Options</h3>
                    <Table
                        headers={['Tool', 'Use When', 'Command']}
                        rows={[
                            ['Vite', 'SPA, most projects — fastest', 'npm create vite@latest -- --template react'],
                            ['Next.js', 'SSR, SSG, full-stack React', 'npx create-next-app@latest'],
                            ['Create React App', 'Legacy — avoid for new projects', 'npx create-react-app my-app'],
                            ['Remix', 'Full-stack, forms, nested routes', 'npx create-remix@latest'],
                        ]}
                    />
                </div>

                <div className="topic">
                    <h3>main.jsx — The Entry Point</h3>
                    <CodeBlock lang="jsx" code={`// src/main.jsx — This is where React mounts into the HTML
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Find <div id="root"> in index.html and mount the React tree into it
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* StrictMode: helps catch bugs in dev — runs effects twice, warns about deprecated APIs */}
        <App />
    </React.StrictMode>
);`} />
                    <Callout type="tip">Install the <strong>React Developer Tools</strong> browser extension (Chrome / Firefox). It lets you inspect component trees, view props and state, and profile re-renders. It's absolutely essential — install it before writing a single line of React.</Callout>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                02 — JSX & COMPONENTS
            ══════════════════════════════════════════ */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>02</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>React Foundations</div>
                        <h2>JSX & Components</h2>
                        <p className="chapter-intro">JSX is JavaScript + HTML-like syntax. It compiles to <code>React.createElement()</code> calls. Components are functions that return JSX.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>JSX Rules & Differences from HTML</h3>
                    <CodeBlock lang="jsx" code={`// JSX compiles to: React.createElement(type, props, ...children)
// <h1 className="title">Hello</h1>
// → React.createElement('h1', { className: 'title' }, 'Hello')

// ── Key differences from HTML ──────────────────────────────────────

// 1. class → className  (class is a reserved word in JS)
<div class="box">       // ❌ HTML
<div className="box">   // ✅ JSX

// 2. for → htmlFor
<label for="name">      // ❌ HTML
<label htmlFor="name">  // ✅ JSX

// 3. Self-close ALL empty tags
<br> <img src="...">    // ❌ HTML
<br /> <img src="..." /> // ✅ JSX

// 4. style takes an object with camelCase properties
<div style="background: #111; font-size: 16px">   // ❌ HTML (string)
<div style={{ background: '#111', fontSize: '16px' }}> // ✅ JSX (object)

// 5. Must return a single root element — use Fragment to avoid extra div
function Card() {
    return (
        <>   {/* Fragment — no extra DOM node */}
            <h2>Title</h2>
            <p>Body</p>
        </>
    );
}

// ── Expressions inside {} ──────────────────────────────────────────
const name   = 'Raj';
const isAdmin = true;
const items  = ['HTML', 'CSS', 'JS'];

<p>{name}</p>                           // variable
<p>{2 + 2}</p>                          // expression
<p>{'hello'.toUpperCase()}</p>          // method call
<p>{isAdmin ? 'Admin' : 'User'}</p>     // ternary
{isAdmin && <AdminBadge />}             // short-circuit render

// ── List rendering — always need a key ────────────────────────────
<ul>
    {items.map(item => (
        <li key={item}>{item}</li>      // key must be stable & unique among siblings
    ))}
</ul>

// ── Rendering nothing ─────────────────────────────────────────────
{false}      // ✅ renders nothing
{null}       // ✅ renders nothing
{undefined}  // ✅ renders nothing
{0}          // ❌ renders "0" — common bug! use {count > 0 && <Badge />}`} />
                </div>

                <div className="topic">
                    <h3>Function Components</h3>
                    <CodeBlock lang="jsx" code={`// A component = a function that returns JSX
// Naming: PascalCase — React treats lowercase as HTML elements

// Basic component
function Hello() {
    return <h1>Hello, World!</h1>;
}

// Arrow function (same thing)
const Hello = () => <h1>Hello, World!</h1>;

// Composing components
function Avatar({ src, alt, size = 40 }) {
    return (
        <img
            src={src}
            alt={alt}
            style={{ width: size, height: size, borderRadius: '50%' }}
        />
    );
}

function UserInfo({ user }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar src={user.avatar} alt={user.name} size={48} />
            <div>
                <strong>{user.name}</strong>
                <p style={{ margin: 0, color: 'var(--text2)' }}>{user.role}</p>
            </div>
        </div>
    );
}

// children prop — anything between opening and closing tags
function Card({ children, title }) {
    return (
        <div className="card">
            {title && <div className="card-header">{title}</div>}
            <div className="card-body">{children}</div>
        </div>
    );
}

<Card title="My Article">
    <p>Content goes here.</p>
    <button>Read More</button>
</Card>`} />
                </div>

                <div className="topic">
                    <h3>Dynamic className with clsx</h3>
                    <CodeBlock lang="jsx" code={`// npm install clsx (tiny utility — most popular approach)
import clsx from 'clsx';

function Button({ variant = 'primary', size = 'md', disabled, isLoading, children }) {
    return (
        <button
            className={clsx(
                'btn',
                {
                    'btn-primary':   variant === 'primary',
                    'btn-secondary': variant === 'secondary',
                    'btn-danger':    variant === 'danger',
                    'btn-sm':        size === 'sm',
                    'btn-lg':        size === 'lg',
                    'btn-disabled':  disabled,
                    'btn-loading':   isLoading,
                }
            )}
            disabled={disabled || isLoading}
        >
            {isLoading ? 'Loading…' : children}
        </button>
    );
}

// Without clsx — template literal (works fine for simple cases)
<div className={\`card \${isActive ? 'active' : ''} \${hasError ? 'error' : ''}\`}>`} />
                </div>
            </section>

            {/* ══════════════════════════════════════════
                03 — PROPS
            ══════════════════════════════════════════ */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>03</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>React Foundations</div>
                        <h2>Props — Complete Guide</h2>
                        <p className="chapter-intro">Props (properties) pass data from parent → child. They are <strong>read-only</strong> — a child can never modify its own props. Data only flows downward.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>All Ways to Receive Props</h3>
                    <CodeBlock lang="jsx" code={`// ── Destructure in parameters (most common) ──
function Button({ label, onClick, variant = 'primary', disabled = false }) {
    return (
        <button onClick={onClick} disabled={disabled} className={\`btn-\${variant}\`}>
            {label}
        </button>
    );
}

// ── Props object (useful for spreading) ──
function Input(props) {
    const { label, error, ...inputProps } = props;  // rest props
    return (
        <div>
            <label>{label}</label>
            <input {...inputProps} />  {/* spread everything else onto <input> */}
            {error && <span className="error">{error}</span>}
        </div>
    );
}

// Usage — clean and flexible
<Input
    label="Email"
    type="email"
    placeholder="you@example.com"
    value={email}
    onChange={e => setEmail(e.target.value)}
    error={emailError}
    required
    autoFocus
/>

// ── Default values ──
function Avatar({ src, size = 40, shape = 'circle', alt = 'User avatar' }) { ... }

// ── Nested destructuring ──
function Profile({ user: { name, email, address: { city } } }) {
    return <p>{name} · {email} · {city}</p>;
}`} />
                </div>

                <div className="topic">
                    <h3>Prop Types Reference</h3>
                    <Table
                        headers={['Type', 'Example', 'Notes']}
                        rows={[
                            ['string', '<Input label="Name" />', 'Most common'],
                            ['number', '<Input maxLength={50} />', 'No quotes — curly braces'],
                            ['boolean', '<Button disabled />', 'Just the name = true'],
                            ['object', '<Card user={{ id: 1, name: "Raj" }} />', 'Double curly: outer = JSX expr, inner = object literal'],
                            ['array', '<Tags items={["a", "b"]} />', 'Pass arrays like any JS value'],
                            ['function', '<Button onClick={() => save()} />', 'Callbacks — how child talks to parent'],
                            ['ReactNode', '<Layout header={<Navbar />} />', 'JSX as prop — render prop pattern'],
                            ['children', '<Card><p>Content</p></Card>', 'Built-in special prop'],
                        ]}
                    />
                </div>

                <div className="topic">
                    <h3>forwardRef — Passing Refs Through Components</h3>
                    <CodeBlock lang="jsx" code={`import { forwardRef, useRef } from 'react';

// Problem: refs don't pass through custom components by default
// Solution: forwardRef — wraps your component so it can accept a ref

const Input = forwardRef(function Input({ label, ...props }, ref) {
    return (
        <div>
            <label>{label}</label>
            <input ref={ref} {...props} />
        </div>
    );
});

// Parent can now access the <input> DOM node directly
function Form() {
    const inputRef = useRef(null);

    const handleFocus = () => {
        inputRef.current.focus();      // direct DOM access ✅
        inputRef.current.select();     // select all text ✅
    };

    return (
        <>
            <Input ref={inputRef} label="Name" />
            <button onClick={handleFocus}>Focus Input</button>
        </>
    );
}`} />
                </div>
            </section>

            {/* ══════════════════════════════════════════
                04 — useState
            ══════════════════════════════════════════ */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>04</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>React Hooks</div>
                        <h2>useState — State Management</h2>
                        <p className="chapter-intro">State is data that changes over time and triggers re-renders. <code>useState</code> is the most fundamental hook — the heart of interactive React.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>All useState Patterns</h3>
                    <CodeBlock lang="jsx" code={`import { useState } from 'react';

// ── Primitive values ──
const [count,  setCount]  = useState(0);
const [name,   setName]   = useState('');
const [isOpen, setIsOpen] = useState(false);
const [user,   setUser]   = useState(null);

// ── Setting state ──
setCount(42);               // direct value
setIsOpen(true);

// ── Functional update — ALWAYS use this when new state depends on previous ──
setCount(prev => prev + 1);     // increment
setCount(prev => prev - 1);     // decrement
setIsOpen(prev => !prev);       // toggle

// ── Updating objects — ALWAYS spread, never mutate ──
const [user, setUser] = useState({ name: '', email: '', age: 0 });

// ❌ WRONG — mutating state, React won't re-render
user.name = 'Raj';
setUser(user);             // same reference — no re-render!

// ✅ CORRECT — create a new object
setUser({ ...user, name: 'Raj' });
setUser(prev => ({ ...prev, name: 'Raj', updatedAt: Date.now() }));

// ── Updating arrays — never push/pop/splice (those mutate!) ──
const [items, setItems] = useState([]);

setItems(prev => [...prev, newItem]);               // add to end
setItems(prev => [newItem, ...prev]);               // add to start
setItems(prev => prev.filter(i => i.id !== id));    // remove by id
setItems(prev => prev.map(i =>                      // update by id
    i.id === id ? { ...i, ...updates } : i
));
setItems(prev => [...prev].sort((a, b) =>           // sort (spread first!)
    a.name.localeCompare(b.name)
));

// ── Lazy initialization — for expensive initial values ──
// ❌ Runs on every render (bad if localStorage access is slow)
const [prefs, setPrefs] = useState(JSON.parse(localStorage.getItem('prefs')));

// ✅ Pass a function — only called once on mount
const [prefs, setPrefs] = useState(() => {
    try { return JSON.parse(localStorage.getItem('prefs')) ?? {}; }
    catch { return {}; }
});`} />
                </div>

                <div className="topic">
                    <h3>Derived State — Don't Store What You Can Compute</h3>
                    <CodeBlock lang="jsx" code={`// ❌ BAD — storing derived values as separate state
const [items, setItems]   = useState([]);
const [count, setCount]   = useState(0);     // stays in sync manually?
const [total, setTotal]   = useState(0);     // stays in sync manually?

// They can go out of sync. You'd update 3 states every time.

// ✅ GOOD — compute during render, always in sync
const [items, setItems] = useState([]);

const count  = items.length;                                       // derived
const total  = items.reduce((sum, i) => sum + i.price, 0);        // derived
const done   = items.filter(i => i.completed);                     // derived
const hasDue = items.some(i => new Date(i.due) < new Date());      // derived

// Rule: if a value can be computed from existing state/props → compute it, don't store it`} />
                </div>

                <div className="topic">
                    <h3>One Object vs Multiple State Variables</h3>
                    <CodeBlock lang="jsx" code={`// Use SEPARATE variables for unrelated, independently-changing values:
const [isOpen,    setIsOpen]    = useState(false);
const [count,     setCount]     = useState(0);
const [sortOrder, setSortOrder] = useState('asc');

// Use ONE OBJECT for related values that form a unit (e.g., a form):
const [form, setForm] = useState({
    firstName: '',
    lastName:  '',
    email:     '',
    password:  '',
    role:      'user',
});

// Update one field cleanly:
const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
};`} />
                </div>
            </section>

            {/* ══════════════════════════════════════════
                05 — useEffect
            ══════════════════════════════════════════ */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>05</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>React Hooks</div>
                        <h2>useEffect — Side Effects</h2>
                        <p className="chapter-intro"><code>useEffect</code> synchronizes your component with external systems: APIs, browser APIs, subscriptions, timers. Not for computing derived state.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>The Three Forms</h3>
                    <CodeBlock lang="jsx" code={`import { useEffect } from 'react';

// ── FORM 1: No deps array — runs after EVERY render (almost never what you want) ──
useEffect(() => {
    document.title = count.toString();
});

// ── FORM 2: Empty deps [] — runs ONCE after mount ──
useEffect(() => {
    console.log('Component mounted');
    return () => console.log('Component unmounted'); // cleanup on unmount
}, []);

// ── FORM 3: Deps array — runs on mount AND when deps change ──
useEffect(() => {
    fetchUser(userId);
}, [userId]);  // re-runs whenever userId changes`} />
                </div>

                <div className="topic">
                    <h3>Cleanup — Preventing Memory Leaks</h3>
                    <CodeBlock lang="jsx" code={`// Always clean up subscriptions, timers, and async operations!
// The function returned from useEffect is the cleanup function.

// ── Fetch with AbortController (modern cancellation) ──
useEffect(() => {
    const controller = new AbortController();

    async function load() {
        try {
            const res = await fetch(\`/api/users/\${userId}\`, {
                signal: controller.signal
            });
            if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
            const data = await res.json();
            setUser(data);
            setLoading(false);
        } catch (err) {
            if (err.name !== 'AbortError') setError(err.message);
        }
    }
    load();

    return () => controller.abort();  // cancels fetch on unmount / re-run
}, [userId]);

// ── Timer cleanup ──
useEffect(() => {
    const id = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(id);
}, []);

// ── Interval cleanup ──
useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
}, []);

// ── Event listener cleanup ──
useEffect(() => {
    const onKeyDown = (e) => {
        if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
}, []);

// ── WebSocket cleanup ──
useEffect(() => {
    const ws = new WebSocket('wss://api.example.com/live');
    ws.onmessage = (e) => setMessages(prev => [...prev, JSON.parse(e.data)]);
    ws.onerror   = (e) => console.error('WS error', e);
    return () => ws.close();
}, []);`} />
                </div>

                <div className="topic">
                    <h3>Common useEffect Patterns</h3>
                    <CodeBlock lang="jsx" code={`// ── Sync document title ──
useEffect(() => {
    document.title = \`(\${unreadCount}) MyApp\`;
}, [unreadCount]);

// ── Sync with localStorage ──
useEffect(() => {
    localStorage.setItem('theme', theme);
}, [theme]);

// ── Run only on UPDATE (skip first render) ──
const isFirstRender = useRef(true);
useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    console.log('Value changed:', value);  // only runs on subsequent changes
}, [value]);

// ── Scroll chat to bottom when messages update ──
useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]);`} />
                    <Callout type="warn">The <strong>exhaustive-deps</strong> ESLint rule warns when your deps array is incomplete. Listen to it — missing deps cause stale closure bugs where your effect uses old, outdated values of variables.</Callout>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                06 — useRef, useMemo, useCallback
            ══════════════════════════════════════════ */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>06</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>React Hooks</div>
                        <h2>useRef, useMemo, useCallback</h2>
                        <p className="chapter-intro">Three essential hooks for DOM access, mutable values, and performance memoization. Understand when — and when <em>not</em> — to use them.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>useRef</h3>
                    <CodeBlock lang="jsx" code={`import { useRef, useEffect } from 'react';

// useRef returns a mutable box: { current: initialValue }
// Changing .current does NOT trigger a re-render

// ── USE 1: DOM Access ──
function SearchBar() {
    const inputRef = useRef(null);

    useEffect(() => { inputRef.current.focus(); }, []);  // focus on mount

    return <input ref={inputRef} type="search" />;
}

// ── USE 2: Store mutable values (timers, intervals, flags) ──
function Stopwatch() {
    const [elapsed, setElapsed] = useState(0);
    const intervalRef = useRef(null);    // store interval ID — changing doesn't re-render

    const start = () => {
        intervalRef.current = setInterval(() => setElapsed(t => t + 1), 1000);
    };
    const stop  = () => clearInterval(intervalRef.current);
    const reset = () => { stop(); setElapsed(0); };
    return <div>{elapsed}s <button onClick={start}>Start</button> <button onClick={stop}>Stop</button></div>;
}

// ── USE 3: Track previous value ──
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => { ref.current = value; });  // update after render
    return ref.current;                         // returns last render's value
}

// ── USE 4: Scroll to bottom ──
function Chat({ messages }) {
    const bottomRef = useRef(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    return (
        <div className="chat">
            {messages.map(m => <Message key={m.id} {...m} />)}
            <div ref={bottomRef} />
        </div>
    );
}`} />
                </div>

                <div className="topic">
                    <h3>useMemo & useCallback</h3>
                    <CodeBlock lang="jsx" code={`import { useMemo, useCallback, memo } from 'react';

// useMemo — memoize expensive computed values
// Only recomputes when deps change
const filteredProducts = useMemo(() => {
    return products
        .filter(p => p.category === filter)
        .sort((a, b) => a.price - b.price);
}, [products, filter]);   // recompute only when products or filter changes

// useCallback — memoize a function reference
// Without it, a new function is created every render → child with memo() re-renders
const handleDelete = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
}, []);   // empty deps = stable reference forever

// React.memo — skip re-render if props haven't changed
const ProductCard = memo(function ProductCard({ product, onDelete }) {
    console.log('ProductCard rendered', product.id);
    return (
        <div>
            {product.name}
            <button onClick={() => onDelete(product.id)}>Delete</button>
        </div>
    );
});

// The triad: memo + useCallback + useMemo work together
function ProductList({ products }) {
    const [filter, setFilter] = useState('all');

    const filtered  = useMemo(() => products.filter(p => p.category === filter), [products, filter]);
    const onDelete  = useCallback((id) => deleteProduct(id), []);

    return filtered.map(p => <ProductCard key={p.id} product={p} onDelete={onDelete} />);
}`} />
                    <Callout type="warn">Don't add useMemo/useCallback everywhere. They have overhead (memory, comparison). Use them when: a computation is genuinely slow, or when a function is a dependency of useEffect / passed to a memoized child. <strong>Profile first, optimize second.</strong></Callout>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                07 — useReducer
            ══════════════════════════════════════════ */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>07</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>React Hooks</div>
                        <h2>useReducer — Complex State</h2>
                        <p className="chapter-intro"><code>useReducer</code> is <code>useState</code> for complex state logic. Think of it as a mini Redux inside a component — perfect for state with multiple sub-values or complex transitions.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Pattern & Shopping Cart Example</h3>
                    <CodeBlock lang="jsx" code={`import { useReducer } from 'react';

// ── 1. Define action types ──
const ACTIONS = {
    ADD_ITEM:    'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    UPDATE_QTY:  'UPDATE_QTY',
    CLEAR_CART:  'CLEAR_CART',
};

// ── 2. Write a pure reducer: (state, action) → newState ──
function cartReducer(state, action) {
    switch (action.type) {

        case ACTIONS.ADD_ITEM: {
            const existing = state.items.find(i => i.id === action.item.id);
            const items = existing
                ? state.items.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i)
                : [...state.items, { ...action.item, qty: 1 }];
            return { ...state, items };
        }

        case ACTIONS.REMOVE_ITEM:
            return { ...state, items: state.items.filter(i => i.id !== action.id) };

        case ACTIONS.UPDATE_QTY:
            return {
                ...state,
                items: state.items
                    .map(i => i.id === action.id ? { ...i, qty: action.qty } : i)
                    .filter(i => i.qty > 0),
            };

        case ACTIONS.CLEAR_CART:
            return { ...state, items: [] };

        default:
            throw new Error(\`Unknown action type: \${action.type}\`);
    }
}

// ── 3. Use it in a component ──
function Cart() {
    const [cart, dispatch] = useReducer(cartReducer, { items: [] });

    const total = cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);

    return (
        <div>
            {cart.items.map(item => (
                <div key={item.id}>
                    {item.name} × {item.qty}
                    <button onClick={() => dispatch({ type: ACTIONS.REMOVE_ITEM, id: item.id })}>Remove</button>
                    <button onClick={() => dispatch({ type: ACTIONS.UPDATE_QTY, id: item.id, qty: item.qty + 1 })}>+</button>
                    <button onClick={() => dispatch({ type: ACTIONS.UPDATE_QTY, id: item.id, qty: item.qty - 1 })}>-</button>
                </div>
            ))}
            <strong>Total: ₹{total.toFixed(2)}</strong>
            <button onClick={() => dispatch({ type: ACTIONS.CLEAR_CART })}>Clear Cart</button>
        </div>
    );
}`} />
                </div>

                <div className="topic">
                    <h3>useState vs useReducer</h3>
                    <Table
                        headers={['Situation', 'Use']}
                        rows={[
                            ['Simple value: number, string, boolean', 'useState'],
                            ['Independent, unrelated state pieces', 'useState'],
                            ['Complex object with many sub-values', 'useReducer'],
                            ['Next state depends heavily on previous state', 'useReducer'],
                            ['Same action dispatched from many places', 'useReducer'],
                            ['Need predictable state transitions (like a state machine)', 'useReducer'],
                        ]}
                    />
                </div>
            </section>

            {/* ══════════════════════════════════════════
                08 — CONTEXT API
            ══════════════════════════════════════════ */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>08</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>State Management</div>
                        <h2>Context API</h2>
                        <p className="chapter-intro">Context solves prop drilling — passing data through many layers of components that don't need it. Perfect for: theme, auth, language, current user.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Creating & Consuming Context</h3>
                    <CodeBlock lang="jsx" code={`import { createContext, useContext, useState } from 'react';

// ── Step 1: Create the context ──
const AuthContext = createContext(null);

// ── Step 2: Create a Provider component ──
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) throw new Error('Invalid credentials');
        const { user, token } = await res.json();
        localStorage.setItem('token', token);
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
        isLoggedIn: !!user,
        isAdmin:    user?.role === 'admin',
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// ── Step 3: Custom hook — the right way to consume ──
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (ctx === null) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
}

// ── Step 4: Wrap your app ──
// main.jsx
<AuthProvider>
    <App />
</AuthProvider>

// ── Step 5: Use anywhere in the tree ──
function Navbar() {
    const { user, logout, isLoggedIn } = useAuth();
    return (
        <nav>
            {isLoggedIn ? (
                <>
                    <span>Hello, {user.name}</span>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <a href="/login">Login</a>
            )}
        </nav>
    );
}`} />
                    <Callout type="warn">Context is not a replacement for all state management. Local state (form inputs, toggles, UI state) stays in components. For high-frequency updates like search inputs, context re-renders every consumer — use Zustand instead.</Callout>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                09 — CUSTOM HOOKS
            ══════════════════════════════════════════ */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>09</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Advanced Patterns</div>
                        <h2>Custom Hooks</h2>
                        <p className="chapter-intro">Custom hooks extract reusable stateful logic into shareable functions. If you find yourself copying the same <code>useState + useEffect</code> pattern in multiple components, it belongs in a hook.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Useful Custom Hooks Library</h3>
                    <CodeBlock lang="jsx" code={`// ── useFetch — data fetching with loading / error states ──
function useFetch(url) {
    const [data,    setData]    = useState(null);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState(null);

    useEffect(() => {
        if (!url) return;
        const controller = new AbortController();
        setLoading(true); setError(null);

        fetch(url, { signal: controller.signal })
            .then(res => { if (!res.ok) throw new Error(\`HTTP \${res.status}\`); return res.json(); })
            .then(data   => { setData(data);          setLoading(false); })
            .catch(err   => { if (err.name !== 'AbortError') { setError(err.message); setLoading(false); }});

        return () => controller.abort();
    }, [url]);

    return { data, loading, error };
}
// Usage: const { data: user, loading, error } = useFetch('/api/users/1');

// ── useLocalStorage — persist state to localStorage ──
function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try { return JSON.parse(localStorage.getItem(key)) ?? initialValue; }
        catch { return initialValue; }
    });
    const set = (val) => {
        const resolved = typeof val === 'function' ? val(value) : val;
        setValue(resolved);
        localStorage.setItem(key, JSON.stringify(resolved));
    };
    return [value, set];
}
// Usage: const [theme, setTheme] = useLocalStorage('theme', 'dark');

// ── useDebounce — debounce rapidly changing values ──
function useDebounce(value, delay = 300) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debounced;
}
// Usage: const debouncedSearch = useDebounce(searchInput, 400);

// ── useToggle — boolean toggle with helpers ──
function useToggle(initial = false) {
    const [value, setValue] = useState(initial);
    const toggle   = useCallback(() => setValue(v => !v), []);
    const setTrue  = useCallback(() => setValue(true), []);
    const setFalse = useCallback(() => setValue(false), []);
    return [value, { toggle, open: setTrue, close: setFalse }];
}
// Usage: const [isOpen, { toggle, close }] = useToggle();

// ── useMediaQuery — responsive design in JS ──
function useMediaQuery(query) {
    const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
    useEffect(() => {
        const mql = window.matchMedia(query);
        const handler = (e) => setMatches(e.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, [query]);
    return matches;
}
// Usage: const isMobile = useMediaQuery('(max-width: 768px)');

// ── useClickOutside — close dropdowns on outside click ──
function useClickOutside(ref, callback) {
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) callback();
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [ref, callback]);
}
// Usage: const menuRef = useRef(); useClickOutside(menuRef, () => setOpen(false));

// ── useWindowSize — track viewport dimensions ──
function useWindowSize() {
    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    useEffect(() => {
        const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return size;
}

// ── useCounter — counter with min/max/step ──
function useCounter(initial = 0, { min = -Infinity, max = Infinity, step = 1 } = {}) {
    const [count, setCount] = useState(initial);
    const increment = () => setCount(c => Math.min(max, c + step));
    const decrement = () => setCount(c => Math.max(min, c - step));
    const reset     = () => setCount(initial);
    const set       = (v) => setCount(Math.max(min, Math.min(max, v)));
    return { count, increment, decrement, reset, set };
}
// Usage: const { count, increment, decrement } = useCounter(0, { min: 0, max: 10 });`} />
                </div>
            </section>

            {/* ══════════════════════════════════════════
                10 — FORMS
            ══════════════════════════════════════════ */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>10</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Forms</div>
                        <h2>Forms — Controlled & Uncontrolled</h2>
                        <p className="chapter-intro">React gives you two approaches. Controlled inputs store their value in React state — React is the single source of truth. Uncontrolled inputs manage their own state in the DOM via refs.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Controlled Inputs (Recommended)</h3>
                    <CodeBlock lang="jsx" code={`function RegistrationForm() {
    const [form, setForm] = useState({
        name: '', email: '', password: '', role: 'user', agreeToTerms: false,
    });
    const [errors,      setErrors]      = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Generic handler for all input types
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));  // clear error on change
    };

    const validate = () => {
        const errs = {};
        if (!form.name.trim())          errs.name         = 'Name is required';
        if (!form.email.includes('@'))   errs.email        = 'Valid email required';
        if (form.password.length < 8)   errs.password     = 'Password must be 8+ characters';
        if (!form.agreeToTerms)         errs.agreeToTerms = 'You must agree to the terms';
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
        setIsSubmitting(true);
        try {
            await registerUser(form);
        } catch (err) {
            setErrors({ server: err.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input  name="name"     type="text"     value={form.name}     onChange={handleChange} />
            {errors.name && <span className="error">{errors.name}</span>}

            <input  name="email"    type="email"    value={form.email}    onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}

            <input  name="password" type="password" value={form.password} onChange={handleChange} />
            {errors.password && <span className="error">{errors.password}</span>}

            <select name="role" value={form.role} onChange={handleChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>

            <input name="agreeToTerms" type="checkbox" checked={form.agreeToTerms} onChange={handleChange} />
            {errors.agreeToTerms && <span className="error">{errors.agreeToTerms}</span>}

            {errors.server && <div className="error">{errors.server}</div>}

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating account…' : 'Create Account'}
            </button>
        </form>
    );
}`} />
                </div>

                <div className="topic">
                    <h3>React Hook Form + Zod (Production Standard)</h3>
                    <CodeBlock lang="jsx" code={`// npm install react-hook-form zod @hookform/resolvers

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 1. Define your schema
const schema = z.object({
    name:     z.string().min(2, 'Name must be at least 2 characters'),
    email:    z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be 8+ characters')
                .regex(/[A-Z]/, 'Must contain an uppercase letter')
                .regex(/[0-9]/, 'Must contain a number'),
    age:      z.number({ invalid_type_error: 'Age is required' }).min(18, 'Must be 18+'),
});

// 2. Use the form
function SignupForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty, isValid },
        watch, reset,
    } = useForm({
        resolver:      zodResolver(schema),
        defaultValues: { name: '', email: '', password: '', age: undefined },
        mode:          'onChange',   // validate as user types
    });

    const onSubmit = async (data) => {  // data is already validated & typed
        await registerUser(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('name')}  placeholder="Name" />
            {errors.name && <p>{errors.name.message}</p>}

            <input {...register('email')} type="email" placeholder="Email" />
            {errors.email && <p>{errors.email.message}</p>}

            <input {...register('password')} type="password" />
            {errors.password && <p>{errors.password.message}</p>}

            <input {...register('age', { valueAsNumber: true })} type="number" />
            {errors.age && <p>{errors.age.message}</p>}

            <button disabled={!isDirty || !isValid || isSubmitting}>
                {isSubmitting ? 'Submitting…' : 'Submit'}
            </button>
        </form>
    );
}`} />
                </div>
            </section>

            {/* ══════════════════════════════════════════
                11 — REACT ROUTER v6
            ══════════════════════════════════════════ */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>11</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>React Router v6</div>
                        <h2>Client-Side Routing</h2>
                        <p className="chapter-intro">React Router v6 is the standard for routing in React SPAs. <code>npm install react-router-dom</code></p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Setup & Basic Routes</h3>
                    <CodeBlock lang="jsx" code={`// main.jsx
import { BrowserRouter } from 'react-router-dom';
ReactDOM.createRoot(root).render(
    <BrowserRouter><App /></BrowserRouter>
);

// App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
    return (
        <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/about"     element={<About />} />
            <Route path="/users/:id" element={<UserDetail />} />  {/* dynamic segment */}
            <Route path="*"          element={<NotFound />} />    {/* 404 */}
            <Route path="/old"       element={<Navigate to="/new" replace />} />  {/* redirect */}

            {/* Nested / Layout routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index           element={<DashboardHome />} />   {/* /dashboard */}
                <Route path="analytics" element={<Analytics />} />       {/* /dashboard/analytics */}
                <Route path="settings"  element={<Settings />} />        {/* /dashboard/settings */}
            </Route>

            {/* Protected routes */}
            <Route element={<RequireAuth />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin"   element={<AdminPanel />} />
            </Route>
        </Routes>
    );
}

// DashboardLayout renders child routes via <Outlet />
import { Outlet } from 'react-router-dom';
function DashboardLayout() {
    return (
        <div className="dashboard">
            <Sidebar />
            <main><Outlet /></main>
        </div>
    );
}`} />
                </div>

                <div className="topic">
                    <h3>All Navigation Hooks</h3>
                    <CodeBlock lang="jsx" code={`import {
    Link, NavLink,
    useNavigate, useParams, useLocation, useSearchParams,
} from 'react-router-dom';

// ── Link & NavLink ──
<Link to="/">Home</Link>
<Link to={\`/users/\${userId}\`}>Profile</Link>

<NavLink
    to="/dashboard"
    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
>
    Dashboard
</NavLink>

// ── useNavigate — programmatic navigation ──
const navigate = useNavigate();
navigate('/dashboard');                           // push (can go back)
navigate('/dashboard', { replace: true });        // replace (can't go back)
navigate(-1);                                     // go back
navigate('/profile', { state: { from: '/' } });  // pass state

// ── useParams — URL dynamic segments ──
const { id } = useParams();       // /users/:id  → id is always a STRING

// ── useLocation — current URL info ──
const location = useLocation();
// location.pathname → '/users/42'
// location.search   → '?sort=name'
// location.state    → state passed via navigate()

// ── useSearchParams — query string ──
const [searchParams, setSearchParams] = useSearchParams();
const query = searchParams.get('q') || '';
const page  = parseInt(searchParams.get('page') || '1');

const updateSearch = (q) => {
    setSearchParams(prev => { prev.set('q', q); prev.set('page', '1'); return prev; });
};`} />
                </div>

                <div className="topic">
                    <h3>Protected Routes</h3>
                    <CodeBlock lang="jsx" code={`import { Navigate, Outlet, useLocation } from 'react-router-dom';

function RequireAuth() {
    const { isLoggedIn } = useAuth();
    const location = useLocation();

    if (!isLoggedIn) {
        // Remember where the user was going, redirect to login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;  // render child routes
}

// After login — redirect to where they were headed
function LoginPage() {
    const { login }  = useAuth();
    const navigate   = useNavigate();
    const location   = useLocation();
    const from       = location.state?.from?.pathname || '/';

    const handleLogin = async (creds) => {
        await login(creds);
        navigate(from, { replace: true });  // go where they were headed
    };
}`} />
                </div>
            </section>

            {/* ══════════════════════════════════════════
                12 — ERROR BOUNDARIES & SUSPENSE
            ══════════════════════════════════════════ */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>12</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Advanced React</div>
                        <h2>Error Boundaries & Suspense</h2>
                        <p className="chapter-intro">Error Boundaries catch runtime errors in the component tree. Suspense enables declarative loading states for async components and data.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Error Boundaries</h3>
                    <CodeBlock lang="jsx" code={`// npm install react-error-boundary
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div role="alert" style={{ padding: 24, textAlign: 'center' }}>
            <h2>Something went wrong</h2>
            <pre style={{ color: 'red', fontSize: 12 }}>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    );
}

// Wrap any component that might throw
<ErrorBoundary
    FallbackComponent={ErrorFallback}
    onError={(error, info) => logToSentry(error, info)}
    onReset={() => { /* reset any state that caused the error */ }}
>
    <MyRiskyComponent />
</ErrorBoundary>`} />
                </div>

                <div className="topic">
                    <h3>Suspense & lazy — Code Splitting</h3>
                    <CodeBlock lang="jsx" code={`import { Suspense, lazy } from 'react';

// lazy() — dynamically import a component (split into its own chunk)
// The bundle for Dashboard is only downloaded when first needed
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const HeavyChart = lazy(() => import('./components/HeavyChart'));

// Suspense — shows fallback while the lazy component loads
function App() {
    return (
        <Suspense fallback={<div>Loading page…</div>}>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin"     element={<AdminPanel />} />
            </Routes>
        </Suspense>
    );
}

// Multiple Suspense boundaries — granular loading states
function Page() {
    return (
        <div>
            <Suspense fallback={<HeaderSkeleton />}><Header /></Suspense>
            <Suspense fallback={<ChartSkeleton />}><HeavyChart /></Suspense>
            <Suspense fallback={<TableSkeleton />}><DataTable /></Suspense>
        </div>
    );
}

// React 18: useTransition — mark state updates as non-urgent
import { useTransition } from 'react';

function Search() {
    const [query,   setQuery]   = useState('');
    const [results, setResults] = useState([]);
    const [isPending, startTransition] = useTransition();

    const handleChange = (e) => {
        setQuery(e.target.value);  // urgent — updates input immediately

        startTransition(() => {
            setResults(heavySearch(e.target.value));  // non-urgent — can be deferred
        });
    };

    return (
        <>
            <input value={query} onChange={handleChange} />
            {isPending && <Spinner />}
            <Results data={results} />
        </>
    );
}`} />
                </div>
            </section>

            {/* ══════════════════════════════════════════
                13 — REACT QUERY
            ══════════════════════════════════════════ */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>13</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Data Fetching</div>
                        <h2>React Query — Server State</h2>
                        <p className="chapter-intro">React Query is the best way to fetch, cache, and sync server data. It handles loading/error states, caching, background refetching, pagination, and optimistic updates. <code>npm install @tanstack/react-query</code></p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Setup & useQuery</h3>
                    <CodeBlock lang="jsx" code={`// main.jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime:           5 * 60 * 1000,  // 5 min — don't refetch if data is fresh
            gcTime:             10 * 60 * 1000,  // 10 min — keep unused data in cache
            retry:               3,
            refetchOnWindowFocus: true,
        },
    },
});

<QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools />
</QueryClientProvider>

// ── useQuery ──
import { useQuery } from '@tanstack/react-query';

function UserProfile({ userId }) {
    const {
        data: user,
        isLoading, isError, error, isFetching,
        refetch,
    } = useQuery({
        queryKey:  ['user', userId],        // unique cache key — auto-refetches when it changes
        queryFn:   () => fetchUser(userId),
        enabled:   !!userId,               // don't fetch if no userId
        staleTime: 60_000,                 // consider fresh for 1 minute
        select:    (data) => data.user,    // transform/select from response
    });

    if (isLoading) return <UserSkeleton />;
    if (isError)   return <p>Error: {error.message}</p>;

    return <div>{user.name}</div>;
}`} />
                </div>

                <div className="topic">
                    <h3>Mutations & Optimistic Updates</h3>
                    <CodeBlock lang="jsx" code={`import { useMutation, useQueryClient } from '@tanstack/react-query';

function TodoList() {
    const queryClient = useQueryClient();

    // ── Basic mutation ──
    const createTodo = useMutation({
        mutationFn: (title) => fetch('/api/todos', {
            method: 'POST',
            body:   JSON.stringify({ title }),
        }).then(r => r.json()),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });  // refetch list
        },
        onError: (err) => toast.error(err.message),
    });

    // ── Optimistic update — feels instant ──
    const toggleTodo = useMutation({
        mutationFn: ({ id, done }) => fetch(\`/api/todos/\${id}\`, {
            method: 'PATCH', body: JSON.stringify({ done }),
        }),

        onMutate: async ({ id, done }) => {
            await queryClient.cancelQueries({ queryKey: ['todos'] });
            const previous = queryClient.getQueryData(['todos']);  // snapshot

            // Immediately update the cache
            queryClient.setQueryData(['todos'], old =>
                old.map(t => t.id === id ? { ...t, done } : t)
            );

            return { previous };  // passed to onError for rollback
        },

        onError: (err, vars, ctx) => {
            queryClient.setQueryData(['todos'], ctx.previous);  // rollback
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });  // sync with server
        },
    });

    return (
        <button
            disabled={createTodo.isPending}
            onClick={() => createTodo.mutate('New task')}
        >
            {createTodo.isPending ? 'Adding…' : 'Add Todo'}
        </button>
    );
}`} />
                </div>
            </section>

            {/* ══════════════════════════════════════════
                14 — ZUSTAND
            ══════════════════════════════════════════ */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>14</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>State Management</div>
                        <h2>Zustand — Global State</h2>
                        <p className="chapter-intro">Zustand is a tiny (~1KB), fast global state manager. Much simpler than Redux — no Provider needed, no boilerplate. <code>npm install zustand</code></p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Cart & Auth Stores</h3>
                    <CodeBlock lang="jsx" code={`import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ── Cart store with persist middleware ──
const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (product) => set(state => {
                const existing = state.items.find(i => i.id === product.id);
                return {
                    items: existing
                        ? state.items.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
                        : [...state.items, { ...product, qty: 1 }],
                };
            }),

            removeItem: (id) => set(state => ({
                items: state.items.filter(i => i.id !== id),
            })),

            clearCart:   () => set({ items: [] }),
            toggleCart:  () => set(state => ({ isOpen: !state.isOpen })),

            get total()     { return get().items.reduce((s, i) => s + i.price * i.qty, 0); },
            get itemCount() { return get().items.reduce((s, i) => s + i.qty, 0); },
        }),
        { name: 'cart-storage', partialize: (state) => ({ items: state.items }) }
    )
);

// ── Auth store ──
const useAuthStore = create((set) => ({
    user:  null,
    token: localStorage.getItem('token'),

    login: async (email, password) => {
        const { user, token } = await fetch('/api/login', {
            method: 'POST',
            body:   JSON.stringify({ email, password }),
        }).then(r => r.json());
        localStorage.setItem('token', token);
        set({ user, token });
    },

    logout: () => { localStorage.removeItem('token'); set({ user: null, token: null }); },
}));

// ── Use in any component — no Provider needed! ──
function Navbar() {
    // Select only what you need — prevents unnecessary re-renders
    const user      = useAuthStore(state => state.user);
    const logout    = useAuthStore(state => state.logout);
    const itemCount = useCartStore(state => state.itemCount);

    return (
        <nav>
            <span>Cart ({itemCount})</span>
            {user
                ? <button onClick={logout}>Logout</button>
                : <Link to="/login">Login</Link>
            }
        </nav>
    );
}`} />
                </div>
            </section>

            {/* ══════════════════════════════════════════
                15 — PERFORMANCE
            ══════════════════════════════════════════ */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>15</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Performance</div>
                        <h2>Performance Optimization</h2>
                        <p className="chapter-intro">React is fast by default. Only optimize when you have a <em>measured</em> performance problem. Open React DevTools → Profiler and record before making any changes.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Code Splitting & Lazy Loading</h3>
                    <CodeBlock lang="jsx" code={`// Split by route — each page downloads only when visited
const Home      = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Admin     = lazy(() => import('./pages/Admin'));

// Split heavy components — only load when rendered
const VideoPlayer = lazy(() => import('./components/VideoPlayer'));
const RichEditor  = lazy(() => import('./components/RichEditor'));

// ── Analyze bundle: npx vite-bundle-visualizer ──
// Tips:
// - import { format } from 'date-fns'  ← tree-shakeable ✅
// - import * as dateFns from 'date-fns' ← imports EVERYTHING ❌
// - Move large static data (country lists, etc.) to JSON files`} />
                </div>

                <div className="topic">
                    <h3>Virtual Lists — Rendering 10,000 Items</h3>
                    <CodeBlock lang="jsx" code={`// npm install @tanstack/react-virtual
// Problem: 10,000 <li> elements in the DOM is very slow
// Solution: only render the ~15 rows visible in the viewport

import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }) {
    const parentRef = useRef(null);

    const virtualizer = useVirtualizer({
        count:           items.length,
        getScrollElement: () => parentRef.current,
        estimateSize:    () => 50,   // estimated row height px
    });

    return (
        <div ref={parentRef} style={{ height: '500px', overflow: 'auto' }}>
            <div style={{ height: \`\${virtualizer.getTotalSize()}px\`, position: 'relative' }}>
                {virtualizer.getVirtualItems().map(vi => (
                    <div
                        key={vi.key}
                        style={{
                            position:  'absolute',
                            top: 0, left: 0, width: '100%',
                            height:    \`\${vi.size}px\`,
                            transform: \`translateY(\${vi.start}px)\`,
                        }}
                    >
                        {items[vi.index].name}
                    </div>
                ))}
            </div>
        </div>
    );
}
// Only ~15 DOM nodes, regardless of list length!`} />
                </div>
            </section>

            {/* ══════════════════════════════════════════
                16 — TYPESCRIPT + REACT
            ══════════════════════════════════════════ */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>16</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>TypeScript</div>
                        <h2>TypeScript + React</h2>
                        <p className="chapter-intro">TypeScript catches bugs at compile time. All new production React code should use TypeScript. Scaffold with <code>npm create vite@latest -- --template react-ts</code></p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Typing Components, Hooks & Events</h3>
                    <CodeBlock lang="jsx" code={`// ── Component prop types ──
interface ButtonProps {
    label:     string;
    onClick:   () => void;
    variant?:  'primary' | 'secondary' | 'danger';
    disabled?: boolean;
    children?: React.ReactNode;   // anything React can render
    style?:    React.CSSProperties;
}

function Button({ label, onClick, variant = 'primary', disabled = false }: ButtonProps) {
    return <button onClick={onClick} disabled={disabled} className={\`btn-\${variant}\`}>{label}</button>;
}

// ── Typing useState ──
const [count,  setCount]  = useState<number>(0);
const [user,   setUser]   = useState<User | null>(null);
const [items,  setItems]  = useState<Product[]>([]);
const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');

// ── Event types ──
const handleChange  = (e: React.ChangeEvent<HTMLInputElement>)   => setValue(e.target.value);
const handleSubmit  = (e: React.FormEvent<HTMLFormElement>)       => { e.preventDefault(); };
const handleClick   = (e: React.MouseEvent<HTMLButtonElement>)    => console.log(e);
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>)  => { if (e.key === 'Enter') submit(); };

// ── useRef typing ──
const inputRef = useRef<HTMLInputElement>(null);
const divRef   = useRef<HTMLDivElement>(null);

// ── Typing custom hooks ──
interface UseFetchResult<T> {
    data:    T | null;
    loading: boolean;
    error:   string | null;
}

function useFetch<T>(url: string): UseFetchResult<T> {
    const [data,    setData]    = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState<string | null>(null);
    // ...
    return { data, loading, error };
}

// Usage — fully typed!
const { data: user } = useFetch<User>('/api/users/1');
// user is User | null — TypeScript knows the shape

// ── Generic components ──
interface ListProps<T> {
    items:       T[];
    renderItem:  (item: T) => React.ReactNode;
    keyExtractor:(item: T) => string | number;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
    return <ul>{items.map(item => <li key={keyExtractor(item)}>{renderItem(item)}</li>)}</ul>;
}

<List items={users} keyExtractor={u => u.id} renderItem={u => <UserCard user={u} />} />`} />
                </div>
            </section>

            {/* ══════════════════════════════════════════
                17 — TESTING
            ══════════════════════════════════════════ */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>17</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Testing</div>
                        <h2>Testing React Apps</h2>
                        <p className="chapter-intro">Test pyramid: many unit tests, some integration tests, few E2E tests. React Testing Library encourages testing the way users actually interact with your app.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Setup — Vitest + React Testing Library</h3>
                    <CodeBlock lang="bash" code={`npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom

# vite.config.js — add test config
test: {
    environment:  'jsdom',
    globals:      true,
    setupFiles:  ['./src/test/setup.js'],
}

# src/test/setup.js
import '@testing-library/jest-dom';   // adds toBeInTheDocument, toBeDisabled, etc.`} />
                </div>

                <div className="topic">
                    <h3>Writing Tests</h3>
                    <CodeBlock lang="jsx" code={`import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

// ── Component tests ──
describe('Button', () => {
    it('renders with correct label', () => {
        render(<Button label="Click me" onClick={() => {}} />);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('calls onClick when clicked', async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();
        render(<Button label="Submit" onClick={handleClick} />);

        await user.click(screen.getByRole('button', { name: 'Submit' }));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('is disabled when prop is true', () => {
        render(<Button label="OK" onClick={() => {}} disabled />);
        expect(screen.getByRole('button')).toBeDisabled();
    });
});

// ── Testing async / API calls ──
it('loads and displays user', async () => {
    global.fetch = vi.fn().mockResolvedValue({
        ok:   true,
        json: async () => ({ id: 1, name: 'Raj Kumar' }),
    });

    render(<UserProfile userId={1} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText('Raj Kumar')).toBeInTheDocument());
});

// ── Testing form submission ──
it('submits form correctly', async () => {
    const user     = userEvent.setup();
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/email/i),    'raj@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(onSubmit).toHaveBeenCalledWith({ email: 'raj@example.com', password: 'password123' });
});

// ── Testing custom hooks — renderHook ──
import { renderHook, act } from '@testing-library/react';

it('useCounter works correctly', () => {
    const { result } = renderHook(() => useCounter(0, { min: 0, max: 10 }));

    act(() => result.current.increment());
    expect(result.current.count).toBe(1);

    act(() => result.current.decrement());
    expect(result.current.count).toBe(0);

    act(() => result.current.decrement());
    expect(result.current.count).toBe(0);  // stays at min
});`} />
                </div>
            </section>

            {/* ══════════════════════════════════════════
                18 — PATTERNS & MISTAKES
            ══════════════════════════════════════════ */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>18</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Architecture & Best Practices</div>
                        <h2>Patterns & Common Mistakes</h2>
                        <p className="chapter-intro">Patterns that appear in production React codebases, and the mistakes every React developer makes at least once.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Compound Components Pattern</h3>
                    <CodeBlock lang="jsx" code={`// Compound components share state through context — great for flexible UI kits
const TabsContext = createContext(null);

function Tabs({ children, defaultTab }) {
    const [activeTab, setActiveTab] = useState(defaultTab);
    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className="tabs">{children}</div>
        </TabsContext.Provider>
    );
}

Tabs.List  = ({ children }) => <div className="tabs-list" role="tablist">{children}</div>;

Tabs.Tab   = ({ value, children }) => {
    const { activeTab, setActiveTab } = useContext(TabsContext);
    return (
        <button
            role="tab"
            aria-selected={activeTab === value}
            className={\`tab \${activeTab === value ? 'active' : ''}\`}
            onClick={() => setActiveTab(value)}
        >
            {children}
        </button>
    );
};

Tabs.Panel = ({ value, children }) => {
    const { activeTab } = useContext(TabsContext);
    return activeTab === value ? <div role="tabpanel">{children}</div> : null;
};

// Usage — clean, flexible, no prop drilling
<Tabs defaultTab="overview">
    <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="code">Code</Tabs.Tab>
        <Tabs.Tab value="preview">Preview</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="overview"><Overview /></Tabs.Panel>
    <Tabs.Panel value="code"><CodeEditor /></Tabs.Panel>
    <Tabs.Panel value="preview"><LivePreview /></Tabs.Panel>
</Tabs>`} />
                </div>

                <div className="topic">
                    <h3>9 Common Mistakes to Avoid</h3>
                    <CodeBlock lang="jsx" code={`// ❌ 1. MUTATING STATE — React won't see the change
user.name = 'Raj'; setUser(user);      // same reference = no re-render
items.push(newItem); setItems(items);  // mutation = no re-render
// ✅ Create new objects/arrays:
setUser({ ...user, name: 'Raj' });
setItems([...items, newItem]);

// ❌ 2. INDEX AS KEY — breaks on reorder/filter
items.map((item, i) => <Item key={i} />)
// ✅ Use stable unique ID:
items.map(item => <Item key={item.id} />)

// ❌ 3. MISSING CLEANUP — memory leak
useEffect(() => {
    const id = setInterval(() => tick(), 1000);
    // forgot return () => clearInterval(id)
}, []);
// ✅ Always return cleanup for timers, listeners, subscriptions

// ❌ 4. STALE CLOSURE — count is always 0 inside the effect
useEffect(() => {
    const id = setInterval(() => setCount(count + 1), 1000);  // always sets to 1!
    return () => clearInterval(id);
}, []);  // missing count in deps
// ✅ Use functional update (no closure needed):
setCount(c => c + 1);

// ❌ 5. CONDITIONAL HOOKS — breaks React's rules
if (isLoggedIn) { const [data] = useState(null); }
// ✅ Always call hooks at the top level, unconditionally

// ❌ 6. useEffect FOR DERIVED STATE — unnecessary extra render
const [items, setItems] = useState([]);
const [count, setCount] = useState(0);
useEffect(() => { setCount(items.length); }, [items]);
// ✅ Compute directly:
const count = items.length;

// ❌ 7. CREATING OBJECTS/FUNCTIONS IN JSX — new reference every render
<Child style={{ color: 'red' }} onClick={() => doSomething()} />
// ✅ Define outside or memoize:
const STYLE = { color: 'red' };
const handleClick = useCallback(() => doSomething(), []);

// ❌ 8. NOT HANDLING LOADING / ERROR STATES
const { data } = useFetch('/api/user');
return <p>{data.name}</p>;   // crashes if data is null!
// ✅ Always handle all states:
if (loading) return <Skeleton />;
if (error)   return <ErrorState />;
return <p>{data.name}</p>;

// ❌ 9. PROP DRILLING TOO DEEP — passing through 5 layers
<App user={user}><Layout user={user}><Page user={user}><Avatar user={user} /></Page></Layout></App>
// ✅ Use Context or component composition for deeply shared data`} />
                </div>

                <div className="topic">
                    <h3>Recommended Project Structure</h3>
                    <CodeBlock lang="jsx" code={`src/
├── assets/                  # images, fonts, global SVGs
├── components/              # shared, reusable UI components
│   ├── Button/
│   │   ├── Button.jsx
│   │   ├── Button.test.jsx
│   │   └── index.js         # export Button from './Button'
│   └── index.js             # barrel: export { Button } from './Button'
├── features/                # feature-based modules (scales well)
│   ├── auth/
│   │   ├── components/      # auth-specific UI
│   │   ├── hooks/           # useAuth.js
│   │   ├── store/           # authStore.js (zustand)
│   │   └── index.js
│   ├── cart/
│   └── products/
├── hooks/                   # shared custom hooks (useFetch, useDebounce…)
├── lib/                     # API clients, utilities, constants
│   ├── api.js               # axios / fetch configuration
│   └── utils.js
├── pages/                   # route-level components
│   ├── HomePage.jsx
│   └── DashboardPage.jsx
├── store/                   # global zustand stores (if not in features/)
├── types/                   # TypeScript interfaces (types.ts)
├── App.jsx
└── main.jsx`} />
                </div>
            </section>

            {/* ── RESOURCES ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div>
                        <h2 style={{ fontFamily: "'Fraunces', serif" }}>Resources & Practice</h2>
                    </div>
                </div>
                <div className="resource-grid">
                    {RESOURCES.map((r, i) => <ResourceCard key={i} {...r} />)}
                </div>
                <PracticeArena games={GAMES} />
            </section>

            <footer className="footer">
                <p>React · Chapter 05 · FullStack Compass</p>
            </footer>
        </>
    );
}