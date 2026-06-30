import React, { useState } from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';

const COLOR = 'var(--blue)';

const RESOURCES = [
    { type: 'docs',      title: 'TypeScript Handbook',         description: 'Official TS docs — the most comprehensive reference. Start with "The Basics".',         url: 'https://www.typescriptlang.org/docs/handbook/intro.html' },
    { type: 'docs',      title: 'React TypeScript Cheatsheet', description: 'The community\'s go-to reference for typing React components and hooks.',                 url: 'https://react-typescript-cheatsheet.netlify.app/' },
    { type: 'tool',      title: 'TypeScript Playground',       description: 'Run TypeScript in the browser — great for experimenting with types.',                      url: 'https://www.typescriptlang.org/play' },
    { type: 'tutorial',  title: 'Total TypeScript',            description: 'Matt Pocock\'s free beginner TypeScript tutorials — best practical TS course online.',     url: 'https://www.totaltypescript.com/tutorials/beginners-typescript' },
    { type: 'reference', title: 'DefinitelyTyped (@types)',    description: 'Type definitions for thousands of npm packages — install with @types/package-name.',      url: 'https://definitelytyped.org/' },
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

// ── Side-by-side JS vs TS comparison panel ────────────────────────────
function CompareBlock({ js, ts, lang = 'javascript' }) {
    const [active, setActive] = useState('both');

    const showJs = active === 'js' || active === 'both';
    const showTs = active === 'ts' || active === 'both';
    const side   = active === 'both';

    return (
        <div style={{ marginBottom: '24px' }}>
            {/* Tab switcher */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                {[
                    { key: 'both', label: '⇄  Side by Side' },
                    { key: 'js',   label: '🟡  JavaScript' },
                    { key: 'ts',   label: '🔷  TypeScript' },
                ].map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => setActive(key)}
                        style={{
                            padding:      '4px 12px',
                            borderRadius: '4px',
                            border:       `1px solid ${active === key ? COLOR : 'var(--border2)'}`,
                            background:   active === key ? `${COLOR}22` : 'transparent',
                            color:        active === key ? COLOR : 'var(--text3)',
                            fontFamily:   "'Space Mono', monospace",
                            fontSize:     '10px',
                            cursor:       'pointer',
                            transition:   'all 0.15s',
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Code panels */}
            <div style={{
                display:             side ? 'grid' : 'block',
                gridTemplateColumns: side ? '1fr 1fr' : undefined,
                gap:                 side ? '8px' : undefined,
            }}>
                {showJs && (
                    <div>
                        {side && (
                            <div style={{ padding: '4px 12px', background: '#ffd16622', borderRadius: '4px 4px 0 0', fontSize: '10px', fontFamily: "'Space Mono', monospace", color: '#ffd166', borderBottom: '1px solid #ffd16644' }}>
                                🟡 JavaScript
                            </div>
                        )}
                        <CodeBlock lang={lang} code={js} />
                    </div>
                )}
                {showTs && (
                    <div>
                        {side && (
                            <div style={{ padding: '4px 12px', background: `${COLOR}22`, borderRadius: '4px 4px 0 0', fontSize: '10px', fontFamily: "'Space Mono', monospace", color: COLOR, borderBottom: `1px solid ${COLOR}44` }}>
                                🔷 TypeScript
                            </div>
                        )}
                        <CodeBlock lang={lang} code={ts} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default function TypeScript() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{ color: COLOR }}>TypeScript</span> — Chapter 12</div>
                <h1><span className="accent" style={{ color: COLOR }}>TypeScript</span><br /><em>JavaScript with superpowers.</em></h1>
                <p className="hero-desc">
                    Every example on this page shows <strong>JavaScript first, TypeScript second</strong> — so you can see exactly
                    what TS adds and why. TypeScript catches bugs before they happen, makes code self-documenting,
                    and is the default for modern MERN projects.
                </p>
                <div className="hero-stack">
                    {['Types', 'Interfaces', 'Generics', 'Union Types', 'React Props', 'Express Types', 'Zod Validation'].map(t => (
                        <span key={t} className="stack-chip">{t}</span>
                    ))}
                </div>
            </section>

            {/* ── 01 SETUP ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>01</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Setup</div>
                        <h2>Project Setup — JS vs TS</h2>
                    </div>
                </div>

                <div className="topic">
                    <h3>React Project</h3>
                    <CompareBlock
                        lang="bash"
                        js={`# Plain JavaScript — Vite React template
npm create vite@latest my-app -- --template react
cd my-app && npm install

# Files use .jsx extension
# src/App.jsx
# src/main.jsx

# No type-checking — errors only appear at runtime`}
                        ts={`# TypeScript — Vite React-TS template
npm create vite@latest my-app -- --template react-ts
cd my-app && npm install

# Files use .tsx extension (TypeScript + JSX)
# src/App.tsx
# src/main.tsx

# Key extras created:
# tsconfig.json      — compiler options
# src/vite-env.d.ts  — Vite env var types`}
                    />
                </div>

                <div className="topic">
                    <h3>Node/Express Backend</h3>
                    <CompareBlock
                        lang="bash"
                        js={`# Plain JavaScript — no setup needed
npm install express dotenv cors mongoose

# package.json scripts:
# "dev":   "nodemon server.js"
# "start": "node server.js"

# Files use .js extension — no compilation step`}
                        ts={`# TypeScript — needs compiler + type packages
npm install express dotenv cors mongoose
npm install -D typescript ts-node nodemon
npm install -D @types/node @types/express @types/cors

npx tsc --init    # create tsconfig.json

# tsconfig.json key settings:
# "target": "ES2020"
# "module": "commonjs"
# "outDir": "./dist"
# "rootDir": "./src"
# "strict": true

# package.json scripts:
# "dev":   "nodemon --exec ts-node src/server.ts"
# "build": "tsc"
# "start": "node dist/server.js"`}
                    />
                </div>
            </section>

            {/* ── 02 VARIABLES & TYPES ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>02</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Fundamentals</div>
                        <h2>Variables & Basic Types</h2>
                        <p className="chapter-intro">
                            TypeScript infers types automatically in most cases. You only need to write types explicitly
                            when TS can't figure it out — or when you want to be explicit for clarity.
                        </p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Primitives, Arrays & Functions</h3>
                    <CompareBlock
                        js={`// ── Variables — JS has no type annotations ───────────────────────────
let name    = 'Sanketh';
let age     = 25;
let isAdmin = false;

// JS is flexible — but this causes bugs:
let id = 42;
id = 'abc-123';  // allowed in JS — might break things silently

// ── Arrays ────────────────────────────────────────────────────────────
let scores = [90, 85, 92];
let names  = ['Alice', 'Bob'];

// ── Functions — no parameter or return types ───────────────────────────
function greet(name) {
    return \`Hello, \${name}\`;
}

const add = (a, b) => a + b;

// No hint that b could be accidentally a string:
add(5, '3');   // Returns '53' — JavaScript string concatenation bug!

// ── Optional parameters — just use default values ─────────────────────
function createUser(name, role = 'user') {
    console.log(name, role);
}`}
                        ts={`// ── Variables — types are inferred automatically ─────────────────────
let name:    string  = 'Sanketh';   // explicit (optional — TS infers)
let age:     number  = 25;
let isAdmin: boolean = false;

// TS prevents type mistakes:
let id: number | string = 42;
id = 'abc-123';  // ✅ allowed — declared as union type
id = true;       // ❌ Error: 'boolean' not assignable to 'number | string'

// ── Arrays ────────────────────────────────────────────────────────────
let scores: number[]      = [90, 85, 92];
let names:  Array<string> = ['Alice', 'Bob'];

// ── Functions — parameter and return types ────────────────────────────
function greet(name: string): string {
    return \`Hello, \${name}\`;
}

const add = (a: number, b: number): number => a + b;

// TS catches the bug at compile time:
add(5, '3');   // ❌ Error: Argument of type 'string' not assignable to 'number'

// ── Optional parameters — use ? ───────────────────────────────────────
function createUser(name: string, role?: string): void {
    console.log(name, role ?? 'user');  // role is string | undefined
}`}
                    />
                    <Callout type="key" title="🔑 Type Inference">
                        You don't need to annotate everything. TypeScript infers <code>let name = 'Sanketh'</code> as <code>string</code> automatically.
                        Only annotate when inference isn't possible (e.g., empty arrays, function params, ambiguous returns).
                    </Callout>
                </div>

                <div className="topic">
                    <h3>Union Types & Type Assertions</h3>
                    <CompareBlock
                        js={`// ── JS has no union types — anything goes ────────────────────────────
let status = 'active';
status = 'deleted';
status = 42;        // JS allows this — often a bug

// ── DOM access — JS doesn't know the element type ─────────────────────
const input = document.getElementById('email');
input.value;  // ❌ Runtime error if element doesn't exist or isn't input
              // JS can't warn you at write time

// ── typeof checks — the JS way of narrowing types ─────────────────────
function double(x) {
    if (typeof x === 'string') return x.repeat(2);
    if (typeof x === 'number') return x * 2;
}`}
                        ts={`// ── Union types — this value can ONLY be one of these ──────────────
let status: 'active' | 'inactive' | 'suspended' = 'active';
status = 'deleted';  // ❌ Error: not assignable to the union
status = 42;         // ❌ Error: number not in union

// ── DOM access — tell TS which element type to expect ─────────────────
const input = document.getElementById('email') as HTMLInputElement;
input.value;  // ✅ TS knows it's an input — autocomplete works!

// Safer version (checks for null):
const input2 = document.getElementById('email');
if (input2 instanceof HTMLInputElement) {
    input2.value;  // ✅ TS narrows inside the if block
}

// ── typeof + type narrowing — TS tracks types through conditions ───────
function double(x: number | string): number | string {
    if (typeof x === 'string') return x.repeat(2);  // TS knows x is string here
    return x * 2;                                    // TS knows x is number here
}`}
                    />
                </div>
            </section>

            {/* ── 03 INTERFACES ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>03</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Object Shapes</div>
                        <h2>Interfaces & Type Aliases</h2>
                        <p className="chapter-intro">
                            Interfaces define the shape of objects — what properties they have and what types those properties are.
                            This is where TypeScript becomes really powerful for MERN: you define your data model once and get safety everywhere.
                        </p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Defining Object Shapes</h3>
                    <CompareBlock
                        js={`// ── JS: no way to enforce object shape ──────────────────────────────
// You document it in a comment and hope for the best:

// A user object looks like:
// { id: string, name: string, email: string, role: 'admin'|'user' }

function displayUser(user) {
    // user.nmae — typo! JS won't catch this until runtime
    console.log(user.nmae);  // undefined — silent bug
}

// Even if you pass the wrong shape, no warning:
displayUser({ id: 1, username: 'Sanketh' });   // missing email, role — JS allows it`}
                        ts={`// ── TS: define the shape once, enforce everywhere ───────────────────
interface User {
    id:        string;
    name:      string;
    email:     string;
    role:      'admin' | 'user' | 'editor';
    createdAt: Date;
    avatar?:   string;   // ? = optional
}

function displayUser(user: User): void {
    console.log(user.nmae);  // ❌ Error: 'nmae' does not exist on User
    console.log(user.name);  // ✅ Autocomplete works!
}

// Passing wrong shape gives an error immediately:
displayUser({ id: 1, username: 'Sanketh' });
// ❌ Error: 'username' not in User, 'name' is required, etc.`}
                    />
                </div>

                <div className="topic">
                    <h3>Type Aliases & Extending</h3>
                    <CompareBlock
                        js={`// ── JS has no type aliases or extension ─────────────────────────────
// You just write objects and hope the shape is consistent:

const adminUser = {
    id:          '1',
    name:        'Sanketh',
    email:       'sanketh@example.com',
    role:        'admin',
    permissions: ['delete_user', 'ban_user'],  // extra field
    lastLogin:   new Date(),
};

// No way to say "AdminUser is a User with extra fields"
// You duplicate properties or just hope the shapes are consistent`}
                        ts={`// ── type alias — for unions, primitives, computed types ─────────────
type Status = 'active' | 'inactive' | 'suspended';
type ID     = string | number;

type ApiResponse<T> = {
    data:    T;
    status:  number;
    message: string;
};

// ── Extending interfaces — AdminUser inherits all User properties ──────
interface AdminUser extends User {
    permissions: string[];
    lastLogin:   Date;
}

// ── Utility types — built-in type transformations ─────────────────────
type UpdateUser    = Partial<User>;                         // all fields optional
type PublicUser    = Omit<User, 'email' | 'createdAt'>;    // remove sensitive fields
type UserPreview   = Pick<User, 'id' | 'name' | 'avatar'>; // only these fields
type ReadonlyUser  = Readonly<User>;                        // all fields immutable
type UserRecord    = Record<string, User>;                  // { [key: string]: User }

// Use in API responses:
type UsersResponse = ApiResponse<User[]>;   // { data: User[], status: number, message: string }`}
                    />
                </div>
            </section>

            {/* ── 04 GENERICS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>04</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Advanced Types</div>
                        <h2>Generics — Reusable Typed Code</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Generic Functions</h3>
                    <CompareBlock
                        js={`// ── JS: reusable but no type safety ─────────────────────────────────
function firstItem(arr) {
    return arr[0];
}

const first = firstItem([1, 2, 3]);         // returns 1 — but TS doesn't know it's a number
const name  = firstItem(['Alice', 'Bob']);   // returns 'Alice' — TS doesn't know it's a string
name.toFixed(2);   // Runtime error! toFixed doesn't exist on strings — JS doesn't warn

// ── Generic-like patterns in JS: just use any value ───────────────────
async function fetchData(url) {
    const res = await fetch(url);
    return res.json();   // returns 'any' — TS would have no idea what shape this is
}`}
                        ts={`// ── TS: generic function — typed for whatever you pass in ───────────
function firstItem<T>(arr: T[]): T | undefined {
    return arr[0];
}

const first = firstItem([1, 2, 3]);         // TS infers: first is number | undefined
const name  = firstItem(['Alice', 'Bob']);   // TS infers: name is string | undefined
name.toFixed(2);   // ❌ Error caught at compile time: toFixed not on string

// ── Generic async function: tell TS what the API returns ──────────────
async function fetchData<T>(url: string): Promise<T> {
    const res = await fetch(url);
    return res.json() as T;
}

// Usage — TS now knows exactly what you get:
const users = await fetchData<User[]>('/api/users');
users[0].name;   // ✅ Autocomplete works — TS knows it's a User

// ── Generic interface: paginated API response ─────────────────────────
interface PaginatedResponse<T> {
    data:       T[];
    total:      number;
    page:       number;
    totalPages: number;
}

type UserListResponse = PaginatedResponse<User>;   // reuse with any model
type PostListResponse = PaginatedResponse<Post>;`}
                    />
                </div>
            </section>

            {/* ── 05 REACT + TS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>05</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>React</div>
                        <h2>React — JS vs TypeScript</h2>
                        <p className="chapter-intro">The most practical section for MERN developers. See exactly how components, hooks, and events differ.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Components & Props</h3>
                    <CompareBlock
                        lang="jsx"
                        js={`// ── JS: no prop types — no autocomplete, no warnings ─────────────────
function Button({ label, onClick, variant, disabled }) {
    // If caller forgets 'label', we get undefined — no warning
    return (
        <button onClick={onClick} disabled={disabled} className={\`btn btn-\${variant}\`}>
            {label}
        </button>
    );
}

// Caller has no idea what props Button accepts:
<Button labeel="Click me" onClick={handleClick} />
// Typo in 'labeel' — JS won't catch it until you look at the page`}
                        ts={`// ── TS: typed props — autocomplete + compile-time errors ────────────
interface ButtonProps {
    label:     string;            // required
    onClick:   () => void;        // required
    variant?:  'primary' | 'secondary' | 'danger';  // optional, only these values
    disabled?: boolean;           // optional
    size?:     'sm' | 'md' | 'lg';
}

function Button({ label, onClick, variant = 'primary', disabled = false }: ButtonProps) {
    return (
        <button onClick={onClick} disabled={disabled} className={\`btn btn-\${variant}\`}>
            {label}
        </button>
    );
}

// TS catches mistakes immediately:
<Button labeel="Click me" onClick={handleClick} />
// ❌ Error: 'labeel' does not exist in ButtonProps, 'label' is missing

<Button label="Click" onClick={handleClick} variant="ghost" />
// ❌ Error: 'ghost' is not in 'primary' | 'secondary' | 'danger'

<Button label="Click" onClick={handleClick} />  // ✅ correct`}
                    />
                </div>

                <div className="topic">
                    <h3>useState & useRef</h3>
                    <CompareBlock
                        lang="jsx"
                        js={`// ── JS: useState — no type info ──────────────────────────────────────
const [user,   setUser]   = useState(null);
const [items,  setItems]  = useState([]);
const [status, setStatus] = useState('idle');

// These are all fine in JS:
setUser(42);          // accidentally set user to a number — no warning
setItems('hello');    // accidentally set items to a string — no warning
setStatus('unknown'); // typo status value — no warning

// ── useRef ────────────────────────────────────────────────────────────
const inputRef = useRef(null);
inputRef.current.focus();  // might crash if ref isn't attached — no warning`}
                        ts={`// ── TS: useState — typed, autocomplete everywhere ────────────────────
const [user,   setUser]   = useState<User | null>(null);
const [items,  setItems]  = useState<User[]>([]);
const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

// TS prevents wrong types:
setUser(42);           // ❌ Error: number not assignable to User | null
setItems('hello');     // ❌ Error: string not assignable to User[]
setStatus('unknown');  // ❌ Error: 'unknown' not in the union

// ✅ Correct:
setUser({ id: '1', name: 'Sanketh', email: 'x@x.com', role: 'user', createdAt: new Date() });
setStatus('loading');

// ── useRef — typed DOM element ────────────────────────────────────────
const inputRef = useRef<HTMLInputElement>(null);
inputRef.current?.focus();  // ✅ optional chaining handles null safely
                             // TS knows .focus() exists on HTMLInputElement`}
                    />
                </div>

                <div className="topic">
                    <h3>Event Handlers</h3>
                    <CompareBlock
                        lang="jsx"
                        js={`// ── JS: event handlers — no type info, easy to misuse ──────────────
const handleChange = (e) => {
    setName(e.target.value);  // works, but no autocomplete on e.target
    e.taget.value;            // typo — no warning until runtime
};

const handleSubmit = (e) => {
    e.preventDefault();
    // e.currentTarget could be anything — no autocomplete
    const form = e.currentTarget;
};`}
                        ts={`// ── TS: typed events — full autocomplete on the event object ─────────
const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);  // ✅ TS knows .value exists on HTMLInputElement
    e.taget.value;            // ❌ Error: 'taget' not on ChangeEvent — caught!
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.currentTarget;  // ✅ TS knows it's HTMLFormElement
    const data = new FormData(form);
};

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') submitForm();
};

// ── Event type quick reference ─────────────────────────────────────────
// onClick    → React.MouseEvent<HTMLButtonElement>
// onChange   → React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
// onSubmit   → React.FormEvent<HTMLFormElement>
// onKeyDown  → React.KeyboardEvent<HTMLElement>
// onFocus    → React.FocusEvent<HTMLInputElement>
// onDrop     → React.DragEvent<HTMLDivElement>`}
                    />
                </div>

                <div className="topic">
                    <h3>Custom Hooks & Context</h3>
                    <CompareBlock
                        lang="jsx"
                        js={`// ── JS: custom hook — no return type info ────────────────────────────
function useFetch(url) {
    const [data,    setData]    = useState(null);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState(null);

    useEffect(() => { /* fetch */ }, [url]);
    return { data, loading, error };
    // Caller doesn't know what 'data' looks like — no autocomplete
}

const { data } = useFetch('/api/users');
data[0].nmae;   // Typo — no warning. 'data' is 'any' type

// ── Context ────────────────────────────────────────────────────────────
const AuthContext = createContext(null);  // 'null' gives no type info
const { user, login } = useContext(AuthContext);
login('a', 'b');  // No check that login takes 2 strings`}
                        ts={`// ── TS: custom hook — typed return, full autocomplete ───────────────
interface UseFetchReturn<T> {
    data:    T | null;
    loading: boolean;
    error:   string | null;
    refetch: () => void;
}

function useFetch<T>(url: string): UseFetchReturn<T> {
    const [data,    setData]    = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState<string | null>(null);

    useEffect(() => { /* fetch */ }, [url]);
    return { data, loading, error, refetch: () => {} };
}

// Usage — TS knows exactly what you get:
const { data: users } = useFetch<User[]>('/api/users');
users?.[0].nmae;   // ❌ Error: 'nmae' doesn't exist on User — typo caught!
users?.[0].name;   // ✅ Autocomplete lists User's properties

// ── Typed Context ─────────────────────────────────────────────────────
interface AuthContextType {
    user:   User | null;
    login:  (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be inside AuthProvider');
    return ctx;  // TS narrows: not null after the check
}`}
                    />
                </div>
            </section>

            {/* ── 06 NODE + TS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>06</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Node + Express</div>
                        <h2>Express Backend — JS vs TypeScript</h2>
                    </div>
                </div>

                <div className="topic">
                    <h3>Routes & Middleware</h3>
                    <CompareBlock
                        js={`// ── JS: middleware — no types on req, res ───────────────────────────
// middleware/auth.js
const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Not authenticated' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);  // added to req — but TS doesn't know
        next();
    } catch {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// controllers/userController.js
const getProfile = async (req, res) => {
    const user = await User.findById(req.user._id);  // req.user could be undefined — no warning
    res.json({ user });
};`}
                        ts={`// ── TS: middleware — fully typed, safe req.user access ─────────────
// types/index.ts
import { Request } from 'express';
import { IUser }   from '../models/User';

export interface AuthRequest extends Request {
    user?: IUser;   // extend Express Request to include user
}

// middleware/auth.ts
import { Response, NextFunction } from 'express';
export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) { res.status(401).json({ message: 'Not authenticated' }); return; }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        req.user = await User.findById(decoded.id) as IUser;
        next();
    } catch {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// controllers/userController.ts
import { Response }     from 'express';
import { AuthRequest }  from '../types';

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    const user = await User.findById(req.user!._id);  // ! = we know user exists after protect
    res.json({ user });
};`}
                    />
                </div>

                <div className="topic">
                    <h3>Zod — Validation That Also Gives You Types</h3>
                    <CompareBlock
                        js={`// ── JS with express-validator — validation only, no types ───────────
const { body, validationResult } = require('express-validator');

const validateRegister = [
    body('name').trim().notEmpty().isLength({ min: 2 }),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
];

// In controller — req.body has no type, just 'any'
const { name, email, password } = req.body;
// No autocomplete, no compile-time safety on the shape`}
                        ts={`// ── TS with Zod — ONE schema gives you both validation AND types ─────
import { z } from 'zod';  // npm install zod

// Define schema:
const registerSchema = z.object({
    name:     z.string().min(2).max(50),
    email:    z.string().email(),
    password: z.string().min(8)
               .regex(/[A-Z]/, 'Needs uppercase')
               .regex(/[0-9]/, 'Needs a number'),
    role:     z.enum(['user', 'admin']).default('user'),
});

// Infer the TypeScript type FROM the schema — zero duplication:
type RegisterInput = z.infer<typeof registerSchema>;
// Equivalent to:
// { name: string; email: string; password: string; role: 'user' | 'admin' }

// Validation middleware:
const validateBody = (schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        return res.status(422).json({ errors: result.error.errors });
    }
    req.body = result.data;  // body is now typed + has defaults applied
    next();
};

// In controller — req.body is now fully typed:
const register = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body as RegisterInput;
    // ✅ Autocomplete on name, email, password, role
};

router.post('/register', validateBody(registerSchema), register);`}
                    />
                    <Callout type="key" title="🔑 Why Zod over express-validator?">
                        With Zod you write the validation schema once and get BOTH runtime validation AND TypeScript types from the same source. No duplication, no drift between your types and validation rules. It also handles default values, coercion, and transformations cleanly.
                    </Callout>
                </div>
            </section>

            {/* ── 07 MIGRATION ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>07</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Migration</div>
                        <h2>Migrating JS → TS Gradually</h2>
                        <p className="chapter-intro">You don't have to rewrite everything at once. TypeScript supports incremental adoption via the <code>allowJs</code> option.</p>
                    </div>
                </div>
                <div className="topic">
                    <CodeBlock lang="javascript" code={`// tsconfig.json — allow JS files in a TS project (gradual migration)
{
    "compilerOptions": {
        "allowJs":         true,   // .js files are OK alongside .ts
        "checkJs":         false,  // don't type-check .js files (add later)
        "strict":          false,  // start lenient, tighten over time
        "noImplicitAny":   false,  // allow 'any' temporarily during migration
        "skipLibCheck":    true    // ignore errors in node_modules types
    }
}

// Migration strategy:
// 1. Rename server.js → server.ts (one file at a time)
// 2. Fix any immediate type errors
// 3. Add strict: true once most files are converted
// 4. Add explicit types to replace 'any' gradually

// Quick win — type your most-used data shapes first:
// models/User.ts, types/api.ts
// These propagate type safety through your whole codebase`} />
                </div>
            </section>

            {/* ── RESOURCES ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>08</div>
                    <div className="chapter-meta"><h2>Resources</h2></div>
                </div>
                <div className="resource-grid">
                    {RESOURCES.map((r, i) => <ResourceCard key={i} {...r} />)}
                </div>
            </section>

            <footer className="footer">
                <p>TypeScript · Chapter 12 · FullStack Compass</p>
            </footer>
        </>
    );
}
