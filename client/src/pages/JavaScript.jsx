import React from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';
import PracticeArena from '../components/PracticeArena.jsx';

const COLOR = 'var(--js-color)';

const RESOURCES = [
    { type: 'docs',     title: 'MDN Web Docs — JavaScript',      description: 'The definitive JavaScript reference. Every method, every API, perfectly documented.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { type: 'docs',     title: 'javascript.info',                 description: 'The most complete modern JavaScript tutorial. Goes from basics to advanced topics clearly.', url: 'https://javascript.info/' },
    { type: 'tutorial', title: 'Eloquent JavaScript (Free Book)', description: 'A deep, beautifully written JS book. Read chapters 1–11 for rock-solid fundamentals.', url: 'https://eloquentjavascript.net/' },
    { type: 'tool',     title: 'JS Visualizer 9000',              description: 'Visualize the Event Loop, call stack, and task queues running live in your browser.', url: 'https://www.jsv9000.app/' },
    { type: 'tool',     title: 'Regex101',                        description: 'Build and test regular expressions interactively with step-by-step explanations.', url: 'https://regex101.com/' },
    { type: 'tutorial', title: 'You Don\'t Know JS (Free Series)', description: 'Kyle Simpson\'s deep-dive series covering scope, closures, this, prototypes and async.', url: 'https://github.com/getify/You-Dont-Know-JS' },
];

const GAMES = [
    { emoji: '⚔️', name: 'Codewars',       description: 'Solve increasingly hard JS kata. Best site for building algorithmic thinking.', url: 'https://www.codewars.com/' },
    { emoji: '🏆', name: 'JS Challenger',   description: 'JavaScript-specific challenges targeting real interview and real-world scenarios.', url: 'https://www.jschallenger.com/' },
    { emoji: '🧩', name: 'Exercism.io',     description: 'Mentor-reviewed JS exercises with community feedback on your solutions.', url: 'https://exercism.org/tracks/javascript' },
    { emoji: '🎮', name: 'JavaScript30',    description: '30 pure-JS mini projects by Wes Bos. No frameworks, no libraries — builds real DOM intuition.', url: 'https://javascript30.com/' },
];

export default function JavaScript() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{ color: COLOR }}>JavaScript</span> — Chapter 04</div>
                <h1><span className="accent" style={{ color: COLOR }}>JavaScript</span><br /><em>The language of the web</em></h1>
                <p className="hero-desc">JavaScript runs in every browser and on every server (Node.js). It is the only programming language that is universal across the entire MERN stack. Master JS and every other technology becomes easier.</p>
                <div className="hero-stack">
                    {['Variables & Types','Functions','Arrays','Objects','Async/Await','Event Loop','Closures','Prototypes','Regex','DOM'].map(t => <span key={t} className="stack-chip">{t}</span>)}
                </div>
            </section>

            {/* ── VARIABLES & TYPES ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>01</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Foundations</div>
                        <h2>Variables, Types & Scope</h2>
                        <p className="chapter-intro">JavaScript is dynamically typed — variables can hold any type and types are determined at runtime. Understanding how scope works prevents some of the most common bugs.</p>
                    </div>
                </div>
                <div className="topic">
                    <h3>let, const, var — Which to Use</h3>
                    <CodeBlock lang="javascript" code={`// const — use by default. Cannot be reassigned.
const name = 'Sanketh';
const PI   = 3.14159;
const user = { name: 'Raj', age: 22 }; // object itself is mutable, binding is not
user.age = 23;  // ✅ fine — modifying the object
// user = {};   // ❌ TypeError — cannot reassign const

// let — use when you need to reassign
let score = 0;
score = 100;   // ✅

// var — avoid in modern code. Function-scoped (not block-scoped), hoisted.
// Only legacy code uses var.

// Data Types
const str     = 'hello';           // String
const num     = 42;                // Number
const bignum  = 9007199254740991n; // BigInt
const bool    = true;              // Boolean
const nothing = null;              // null — intentional absence of value
let   notSet;                      // undefined — declared but not assigned
const sym     = Symbol('id');      // Symbol — unique, often used as object keys
const obj     = { key: 'val' };    // Object
const arr     = [1, 2, 3];         // Array (also an object)
const fn      = () => {};          // Function (also an object)

// typeof — check the type at runtime
typeof 'hello'     // 'string'
typeof 42          // 'number'
typeof true        // 'boolean'
typeof undefined   // 'undefined'
typeof null        // 'object' ← famous JS quirk (historical bug)
typeof {}          // 'object'
typeof []          // 'object'
typeof function(){} // 'function'`} />
                </div>
                <div className="topic">
                    <h3>Scope — Where Variables Live</h3>
                    <CodeBlock lang="javascript" code={`// 1. Global Scope — accessible everywhere
const globalVar = 'I am global';

// 2. Function Scope — only inside the function
function greet() {
    const message = 'Hello'; // only accessible inside greet()
    console.log(message);
}
// console.log(message); // ❌ ReferenceError

// 3. Block Scope — let/const are block-scoped
if (true) {
    let blockVar = 'I only exist in this block';
    const alsoBlock = 'Same here';
    var oldSchool = 'I leak out of the block! (var)';
}
// console.log(blockVar);   // ❌ ReferenceError
// console.log(oldSchool);  // ✅ undefined... then 'I leak out' (var hoisting)

// 4. Lexical Scope — inner functions access outer variables
function outer() {
    const x = 10;
    function inner() {
        console.log(x); // ✅ inner can access outer's variables
    }
    inner(); // 10
}

// Hoisting — var declarations and function declarations are moved to top
console.log(hoisted); // undefined (not error) — var is hoisted
var hoisted = 'value';

greetHoisted(); // ✅ works — function declarations are fully hoisted
function greetHoisted() { return 'Hello'; }

// sayHi(); // ❌ TypeError — function expressions are NOT hoisted
const sayHi = () => 'Hi';`} />
                </div>
                <div className="topic">
                    <h3>Closures — Functions That Remember Their Scope</h3>
                    <CodeBlock lang="javascript" code={`// A closure is when a function retains access to its outer scope
// even after the outer function has returned.

function makeCounter(start = 0) {
    let count = start; // 'count' is captured in the closure

    return {
        increment: () => ++count,
        decrement: () => --count,
        value:     () => count,
        reset:     () => { count = start; },
    };
}

const counter = makeCounter(10);
counter.increment(); // 11
counter.increment(); // 12
counter.value();     // 12
counter.reset();     // back to 10

// Real use case: private state (like a mini store)
function createStore(initialState) {
    let state = { ...initialState };
    const listeners = [];

    return {
        getState:   ()       => state,
        setState:   (update) => {
            state = { ...state, ...update };
            listeners.forEach(fn => fn(state));
        },
        subscribe:  (fn)     => listeners.push(fn),
    };
}

const store = createStore({ user: null, theme: 'dark' });
store.subscribe(s => console.log('State changed:', s));
store.setState({ user: { name: 'Sanketh' } });`} />
                </div>
            </section>

            {/* ── FUNCTIONS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>02</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Functions</div>
                        <h2>Functions — All Forms & Patterns</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Function Types</h3>
                    <CodeBlock lang="javascript" code={`// 1. Function Declaration — hoisted, can be called before definition
function add(a, b) { return a + b; }

// 2. Function Expression — not hoisted
const multiply = function(a, b) { return a * b; };

// 3. Arrow Function — concise, no own 'this'
const square   = (n) => n * n;
const greet    = name => \`Hello, \${name}\`;     // single param: no parens
const getUser  = () => ({ name: 'Raj' });       // return object: wrap in ()

// 4. Default Parameters
const createUser = (name, role = 'user', active = true) => ({ name, role, active });

// 5. Rest Parameters — collects remaining args into array
const sum = (...nums) => nums.reduce((a, b) => a + b, 0);
sum(1, 2, 3, 4, 5); // 15

// 6. Immediately Invoked Function Expression (IIFE)
const result = (function() {
    const secret = 'hidden';
    return { getSecret: () => secret };
})();

// 7. Higher-Order Functions — take/return functions
const withLogging = (fn) => (...args) => {
    console.log(\`Calling \${fn.name} with\`, args);
    const result = fn(...args);
    console.log('Result:', result);
    return result;
};

const loggedAdd = withLogging(add);
loggedAdd(3, 4); // logs call and result`} />
                </div>
                <div className="topic">
                    <h3>Destructuring & Spread — Used Constantly in React</h3>
                    <CodeBlock lang="javascript" code={`// Array Destructuring
const [first, second, ...rest] = [10, 20, 30, 40, 50];
// first=10, second=20, rest=[30,40,50]

const [a, , b] = [1, 2, 3]; // skip elements: a=1, b=3

// Object Destructuring
const { name, age, address: { city } } = {
    name: 'Sanketh', age: 22, address: { city: 'Chennai' }
};

// Rename during destructuring
const { name: userName, role = 'user' } = { name: 'Raj' };
// userName = 'Raj', role = 'user' (default)

// Function parameter destructuring (React props style)
function UserCard({ name, email, role = 'user' }) {
    return \`\${name} (\${role}): \${email}\`;
}

// Spread Operator
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1,2,3,4,5,6]

const original = { a: 1, b: 2 };
const updated  = { ...original, b: 99, c: 3 }; // { a:1, b:99, c:3 }

// Cloning (shallow copy)
const clonedArr = [...arr1];
const clonedObj = { ...original };

// Spreading into function call
Math.max(...arr1); // Math.max(1, 2, 3) → 3`} />
                </div>
            </section>

            {/* ── ARRAY METHODS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>03</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Data</div>
                        <h2>Array Methods — The Essential Toolkit</h2>
                        <p className="chapter-intro">These methods are used in every React component. Master them and React state management becomes intuitive.</p>
                    </div>
                </div>
                <div className="topic">
                    <h3>Transforming & Filtering Arrays</h3>
                    <CodeBlock lang="javascript" code={`const products = [
    { id: 1, name: 'Laptop',  price: 50000, inStock: true,  category: 'tech'    },
    { id: 2, name: 'Phone',   price: 20000, inStock: false, category: 'tech'    },
    { id: 3, name: 'T-Shirt', price:   800, inStock: true,  category: 'fashion' },
    { id: 4, name: 'Jeans',   price:  1500, inStock: true,  category: 'fashion' },
];

// map() — transform every item → new array (same length)
const names  = products.map(p => p.name);        // ['Laptop','Phone','T-Shirt','Jeans']
const prices = products.map(p => p.price);        // [50000,20000,800,1500]

// filter() — keep items matching condition → new array (shorter or equal)
const inStock     = products.filter(p => p.inStock);
const techItems   = products.filter(p => p.category === 'tech');
const affordable  = products.filter(p => p.price < 2000);

// reduce() — accumulate to a single value
const totalValue = products.reduce((sum, p) => sum + p.price, 0); // 72300
const byCategory = products.reduce((acc, p) => {
    acc[p.category] = [...(acc[p.category] || []), p];
    return acc;
}, {});
// { tech: [...], fashion: [...] }

// find() — first matching item (or undefined)
const laptop = products.find(p => p.id === 1);

// findIndex() — index of first match (or -1)
const idx = products.findIndex(p => p.id === 2);

// some() — true if ANY item matches
const hasExpensive = products.some(p => p.price > 40000); // true

// every() — true if ALL items match
const allInStock = products.every(p => p.inStock); // false

// includes() — check if primitive value exists
[1, 2, 3].includes(2); // true

// flat() & flatMap()
[[1,2],[3,4]].flat();                 // [1,2,3,4]
[[1],[2],[3]].flat(2);                // deep flatten 2 levels
products.flatMap(p => [p.name, p.price]); // interleaved name+price

// sort() — mutates original! always sort a copy
const byPrice = [...products].sort((a, b) => a.price - b.price);  // asc
const byPriceDesc = [...products].sort((a, b) => b.price - a.price); // desc

// Array creation
Array.from({ length: 5 }, (_, i) => i + 1); // [1,2,3,4,5]
Array.from('hello');                          // ['h','e','l','l','o']
[...new Set([1, 2, 2, 3, 3, 3])];            // [1,2,3] — remove duplicates`} />
                </div>
            </section>

            {/* ── OBJECTS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>04</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Objects</div>
                        <h2>Objects — Deep Dive</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Object Methods & Patterns</h3>
                    <CodeBlock lang="javascript" code={`const user = { name: 'Sanketh', age: 22, role: 'dev' };

// Object iteration
Object.keys(user);         // ['name', 'age', 'role']
Object.values(user);       // ['Sanketh', 22, 'dev']
Object.entries(user);      // [['name','Sanketh'],['age',22],['role','dev']]

// Convert entries back to object
const filtered = Object.fromEntries(
    Object.entries(user).filter(([k, v]) => typeof v === 'string')
);
// { name: 'Sanketh', role: 'dev' }

// Object.assign — merge (mutates target)
const merged = Object.assign({}, user, { age: 23, city: 'Chennai' });

// Spread merge (preferred — doesn't mutate)
const updated = { ...user, age: 23 };

// Optional Chaining — safe deep access
const street = user?.address?.street;     // undefined (not error)
const first  = user?.friends?.[0]?.name;  // undefined (not error)

// Nullish Coalescing — fallback only for null/undefined
const display = user.nickname ?? 'Anonymous'; // 'Anonymous'
const score   = user.score   ?? 0;

// Logical Assignment
user.nickname  ??= 'Anonymous'; // assign only if null/undefined
user.isActive  ||= true;        // assign only if falsy
user.loginCount &&= user.loginCount + 1; // assign only if truthy

// Dynamic property names
const key = 'theme';
const settings = { [key]: 'dark', [\`\${key}Version\`]: 2 };
// { theme: 'dark', themeVersion: 2 }`} />
                </div>
                <div className="topic">
                    <h3>Prototype Chain — How Inheritance Works</h3>
                    <CodeBlock lang="javascript" code={`// Every object has a hidden [[Prototype]] link to another object.
// This chain allows objects to inherit methods and properties.

// The prototype chain in action:
const arr = [1, 2, 3];
// arr → Array.prototype → Object.prototype → null
arr.map   // found on Array.prototype
arr.toString // found on Object.prototype

// Class syntax (ES6) — syntactic sugar over prototypes
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        return \`\${this.name} makes a sound.\`;
    }

    static create(name) { // static: called on class, not instance
        return new Animal(name);
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);      // must call super() before using 'this'
        this.breed = breed;
    }

    speak() {            // override parent method
        return \`\${this.name} barks!\`;
    }

    // Getter — accessed as property, not called as method
    get info() {
        return \`\${this.name} (\${this.breed})\`;
    }
}

const dog = new Dog('Rex', 'Labrador');
dog.speak(); // 'Rex barks!'
dog.info;    // 'Rex (Labrador)'
dog instanceof Dog;    // true
dog instanceof Animal; // true (prototype chain)

// Object.create — direct prototype linking (lower level)
const vehicleProto = {
    move() { return \`\${this.type} is moving\`; }
};
const car = Object.create(vehicleProto);
car.type = 'Car';
car.move(); // 'Car is moving'`} />
                </div>
            </section>

            {/* ── THIS KEYWORD ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>05</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Advanced</div>
                        <h2>The `this` Keyword — Fully Explained</h2>
                        <p className="chapter-intro">`this` is one of the most confusing parts of JavaScript. The value of `this` depends entirely on HOW a function is called, not where it is defined.</p>
                    </div>
                </div>
                <div className="topic">
                    <h3>4 Rules of `this` Binding</h3>
                    <CodeBlock lang="javascript" code={`// RULE 1: Default binding — 'this' = global (or undefined in strict mode)
function showThis() {
    console.log(this); // window (browser) or global (Node) or undefined (strict)
}
showThis();

// RULE 2: Implicit binding — 'this' = the object before the dot
const obj = {
    name: 'Sanketh',
    greet() {
        console.log(this.name); // 'Sanketh' — 'this' is obj
    }
};
obj.greet(); // ✅ 'Sanketh'

// ⚠️ Lost binding problem
const fn = obj.greet;
fn(); // ❌ undefined — no object before the dot

// RULE 3: Explicit binding — call, apply, bind
function introduce(greeting, punctuation) {
    return \`\${greeting}, I'm \${this.name}\${punctuation}\`;
}

const person = { name: 'Raj' };

introduce.call(person, 'Hello', '!');          // 'Hello, I'm Raj!'
introduce.apply(person, ['Hi', '.']);           // 'Hi, I'm Raj.'
const boundFn = introduce.bind(person, 'Hey'); // returns new function
boundFn('?'); // 'Hey, I'm Raj?'

// RULE 4: new binding — 'this' = newly created object
function User(name) {
    this.name  = name;
    this.role  = 'user';
    // constructor implicitly returns 'this'
}
const u = new User('Ankita'); // u = { name: 'Ankita', role: 'user' }

// ── ARROW FUNCTIONS — no own 'this' ──
// Arrow functions inherit 'this' from their enclosing lexical scope.
class Timer {
    constructor() {
        this.seconds = 0;
    }

    start() {
        // Without arrow: this.seconds would be undefined inside setInterval
        setInterval(() => {
            this.seconds++; // ✅ 'this' is the Timer instance (lexical)
            console.log(this.seconds);
        }, 1000);
    }
}

// Common React pattern — arrow functions in class components
class Button extends React.Component {
    handleClick = () => {
        console.log(this.props); // ✅ always bound to component instance
    };
}`} />
                </div>
            </section>

            {/* ── EVENT LOOP ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>06</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Advanced</div>
                        <h2>The Event Loop — How JavaScript Actually Works</h2>
                        <p className="chapter-intro">JavaScript is single-threaded but can handle thousands of async operations. Understanding the event loop explains why setTimeout, Promises, and async/await behave the way they do.</p>
                    </div>
                </div>
                <div className="topic">
                    <h3>Call Stack, Task Queue, Microtask Queue</h3>
                    <CodeBlock lang="javascript" code={`// JavaScript runtime has:
// 1. Call Stack       — executes synchronous code, one frame at a time
// 2. Web APIs         — browser handles async ops (setTimeout, fetch, etc.)
// 3. Microtask Queue  — Promise callbacks (.then, .catch, async/await continuations)
// 4. (Macro)Task Queue— setTimeout, setInterval, I/O callbacks
// 5. Event Loop       — moves tasks to call stack when it's empty

// Order: Sync → Microtasks → Render → Macrotasks → repeat

console.log('1 — sync');

setTimeout(() => console.log('2 — macrotask'), 0);

Promise.resolve().then(() => console.log('3 — microtask'));

console.log('4 — sync');

// Output order: 1, 4, 3, 2
// WHY: sync runs first → microtasks drain completely → macrotask runs

// ── Deeper Example ──
async function fetchData() {
    console.log('A — inside async fn (sync)');
    const data = await Promise.resolve('result'); // suspends here
    console.log('B — after await (microtask queue)');
    return data;
}

console.log('1 — before call');
fetchData();
console.log('2 — after call');

// Output: 1 → A → 2 → B
// 'await' creates a microtask for the continuation

// ── Why this matters ──
// If you do heavy sync work, you BLOCK the event loop
// Nothing else can run — UI freezes, no network responses processed

// Bad: blocks event loop for 2 seconds
const start = Date.now();
while (Date.now() - start < 2000) { /* spinning */ }

// Good: use async/await, setTimeout, or Web Workers for heavy tasks`} />
                </div>
                <div className="topic">
                    <h3>Promises & Async/Await — Modern Async</h3>
                    <CodeBlock lang="javascript" code={`// A Promise represents a value that will be available in the future
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = Math.random() > 0.5;
        if (success) resolve('Data loaded!');
        else         reject(new Error('Network error'));
    }, 1000);
});

// Consuming with .then/.catch
promise
    .then(data  => console.log('Success:', data))
    .catch(err  => console.error('Error:', err.message))
    .finally(() => console.log('Always runs'));

// Async/Await — cleaner syntax (preferred)
async function loadUser(id) {
    try {
        const res  = await fetch(\`/api/users/\${id}\`);
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        const user = await res.json();
        return user;
    } catch (err) {
        console.error('Failed to load user:', err);
        throw err; // re-throw so caller can handle it
    }
}

// Promise combinators
const [users, posts, products] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/products').then(r => r.json()),
]);
// All run in parallel — wait for all to finish

const fastest = await Promise.race([slowFetch(), fastFetch()]);
// Returns first one to resolve

const results = await Promise.allSettled([
    fetch('/api/a'), fetch('/api/b'), fetch('/api/c'),
]);
// results array: [{status:'fulfilled', value:...}, {status:'rejected', reason:...}]
// Never throws — useful when you want all results even if some fail`} />
                </div>
            </section>

            {/* ── ERROR HANDLING ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>07</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Error Handling</div>
                        <h2>Error Handling — Writing Resilient Code</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Error Types & Custom Errors</h3>
                    <CodeBlock lang="javascript" code={`// Built-in Error types
try {
    null.property;          // TypeError
    undeclaredVar;          // ReferenceError
    eval('{{{{');           // SyntaxError
    decodeURIComponent('%'); // URIError
} catch (err) {
    console.log(err.name);    // 'TypeError'
    console.log(err.message); // 'Cannot read properties of null'
    console.log(err.stack);   // full stack trace
}

// Custom Error classes — essential for APIs
class AppError extends Error {
    constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        this.code = code;
        Error.captureStackTrace(this, this.constructor); // cleaner stack
    }
}

class NotFoundError    extends AppError {
    constructor(resource) { super(\`\${resource} not found\`, 404, 'NOT_FOUND'); }
}
class ValidationError  extends AppError {
    constructor(msg)      { super(msg, 400, 'VALIDATION_ERROR'); }
}
class UnauthorizedError extends AppError {
    constructor()         { super('Not authorized', 401, 'UNAUTHORIZED'); }
}

// Usage
function getUser(id) {
    const user = db.find(id);
    if (!user) throw new NotFoundError('User');
    return user;
}

// Catching specific types
try {
    const user = getUser(999);
} catch (err) {
    if (err instanceof NotFoundError)  res.status(404).json({ error: err.message });
    else if (err instanceof AppError)  res.status(err.statusCode).json({ error: err.message });
    else                               res.status(500).json({ error: 'Something went wrong' });
}

// try / catch / finally
async function processOrder(orderId) {
    let connection;
    try {
        connection = await db.connect();
        const order = await connection.query('SELECT * FROM orders WHERE id = ?', [orderId]);
        return order;
    } catch (err) {
        console.error('Order processing failed:', err);
        throw new AppError('Order processing failed', 500);
    } finally {
        connection?.close(); // ALWAYS runs — even if error thrown
    }
}`} />
                </div>
            </section>

            {/* ── REGULAR EXPRESSIONS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>08</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Regex</div>
                        <h2>Regular Expressions — Pattern Matching</h2>
                        <p className="chapter-intro">Regex lets you search, validate, and transform strings using patterns. Used for form validation, URL parsing, and text processing.</p>
                    </div>
                </div>
                <div className="topic">
                    <h3>Syntax, Flags & Methods</h3>
                    <CodeBlock lang="javascript" code={`// Creating regex
const pattern1 = /hello/;        // regex literal
const pattern2 = new RegExp('hello', 'i'); // constructor (dynamic patterns)

// Flags
// i  — case insensitive
// g  — global (find all matches, not just first)
// m  — multiline (^ and $ match line boundaries)
// s  — dotAll (. matches newlines too)

// ── Character Classes ──
/[abc]/    // a, b, or c
/[a-z]/    // any lowercase letter
/[A-Z]/    // any uppercase letter
/[0-9]/    // any digit (same as \d)
/[^abc]/   // NOT a, b, or c
/\d/       // digit [0-9]
/\w/       // word char [a-zA-Z0-9_]
/\s/       // whitespace (space, tab, newline)
/\D/       // NOT digit
/\W/       // NOT word char
/./        // any char except newline

// ── Quantifiers ──
/a*/       // 0 or more 'a'
/a+/       // 1 or more 'a'
/a?/       // 0 or 1 'a' (optional)
/a{3}/     // exactly 3 'a's
/a{2,5}/   // 2 to 5 'a's

// ── Anchors ──
/^hello/   // starts with 'hello'
/world$/   // ends with 'world'
/\bhello\b/ // whole word 'hello'

// ── Methods ──
const email = 'user@example.com';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

emailRegex.test(email);     // true — boolean test
email.match(/\w+/g);        // ['user', 'example', 'com'] — all matches
email.match(/(\w+)@(\w+)/); // ['user@example', 'user', 'example'] with groups
email.replace(/@.+/, '');   // 'user'
'a,b,,c'.split(/,+/);       // ['a', 'b', 'c']

// ── Named Groups ──
const dateStr = '2024-03-15';
const { year, month, day } = dateStr.match(
    /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
).groups;

// ── Common Validation Patterns ──
const patterns = {
    email:     /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone:     /^[6-9]\d{9}$/,           // Indian mobile
    password:  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!])[A-Za-z\d@$!]{8,}$/,
    url:       /^https?:\/\/[^\s$.?#].[^\s]*$/,
    mongoId:   /^[a-f\d]{24}$/i,
};`} />
                </div>
            </section>

            {/* ── PERFORMANCE PATTERNS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>09</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Performance</div>
                        <h2>Performance Patterns — Debounce, Throttle, Memoize</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Debounce, Throttle & Memoization</h3>
                    <CodeBlock lang="javascript" code={`// ── DEBOUNCE ──
// Wait until user STOPS firing events for 'delay' ms, THEN call once.
// Use case: search input, resize handler, form validation

function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

const searchInput = document.getElementById('search');
const handleSearch = debounce((e) => {
    fetch(\`/api/search?q=\${e.target.value}\`);
}, 500); // wait 500ms after user stops typing
searchInput.addEventListener('input', handleSearch);

// ── THROTTLE ──
// Call at most once per 'delay' ms, no matter how often triggered.
// Use case: scroll handlers, mousemove, button click prevention

function throttle(fn, delay) {
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= delay) {
            lastTime = now;
            fn.apply(this, args);
        }
    };
}

window.addEventListener('scroll', throttle(() => {
    console.log('Scroll position:', window.scrollY);
}, 200)); // fire at most every 200ms

// ── MEMOIZATION ──
// Cache function results — return cached value for same inputs

function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

const expensiveCalc = memoize((n) => {
    let result = 0;
    for (let i = 0; i <= n; i++) result += i;
    return result;
});

expensiveCalc(1000000); // calculates
expensiveCalc(1000000); // returns cached result instantly`} />
                </div>
            </section>

            {/* ── DOM MANIPULATION ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>10</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Browser</div>
                        <h2>DOM Manipulation & Browser APIs</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Selecting, Modifying & Events</h3>
                    <CodeBlock lang="javascript" code={`// ── SELECTING ELEMENTS ──
const byId    = document.getElementById('hero');
const byQuery = document.querySelector('.card');          // first match
const allCards= document.querySelectorAll('.card');       // NodeList
const byClass = document.getElementsByClassName('btn');   // HTMLCollection

// ── READING & WRITING ──
const el = document.querySelector('#title');
el.textContent = 'New Title';         // text only (safe)
el.innerHTML   = '<strong>Bold</strong>'; // parses HTML (use carefully — XSS risk)
el.setAttribute('data-id', '123');
el.getAttribute('data-id');           // '123'
el.classList.add('active');
el.classList.remove('hidden');
el.classList.toggle('dark');
el.classList.contains('active');      // true/false
el.style.color = 'red';              // inline style

// ── CREATING ELEMENTS ──
const card = document.createElement('div');
card.className = 'card';
card.textContent = 'Hello World';
document.body.appendChild(card);

// Template literal + insertAdjacentHTML (faster for multiple elements)
const list = document.querySelector('#list');
const items = ['React', 'Node', 'MongoDB'];
list.insertAdjacentHTML('beforeend',
    items.map(item => \`<li class="item">\${item}</li>\`).join('')
);

// ── EVENTS ──
const btn = document.querySelector('#submit');
btn.addEventListener('click', function(e) {
    e.preventDefault();          // stop form submit
    e.stopPropagation();         // stop event bubbling up
    console.log('Clicked:', e.target);
});

// Event Delegation — attach ONE listener to parent, handle many children
document.querySelector('#list').addEventListener('click', (e) => {
    if (e.target.matches('.delete-btn')) {
        e.target.closest('.item').remove();
    }
});

// ── USEFUL WEB APIs ──
// localStorage — persists across sessions
localStorage.setItem('user', JSON.stringify({ name: 'Sanketh' }));
const user = JSON.parse(localStorage.getItem('user'));
localStorage.removeItem('user');

// Intersection Observer — detect when element enters viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.animate').forEach(el => observer.observe(el));`} />
                </div>
            </section>

            {/* ── ES6+ MODERN FEATURES ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>11</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Modern JS</div>
                        <h2>ES6+ Features — Modern JavaScript</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Modules, Symbols, Generators, Proxy</h3>
                    <CodeBlock lang="javascript" code={`// ── MODULES (ES6 import/export) ──
// Named exports
export const API_URL = 'https://api.example.com';
export function formatDate(date) { return date.toLocaleDateString(); }

// Default export (one per file)
export default class UserService {
    async getUser(id) { ... }
}

// Importing
import UserService from './services/UserService.js';
import { API_URL, formatDate } from './config.js';
import * as utils from './utils.js'; // import everything as namespace

// ── SYMBOL ──
// Creates guaranteed unique values. Never equal to anything else.
const id1 = Symbol('id');
const id2 = Symbol('id');
id1 === id2; // false — always unique

// Used as object keys that don't conflict with other keys
const USER_ID = Symbol('userId');
const user = { [USER_ID]: 12345, name: 'Sanketh' };
user[USER_ID]; // 12345
// Symbols don't show in for...in, Object.keys, JSON.stringify

// ── GENERATORS ──
// Functions that can pause execution and resume
function* counter(start = 0) {
    while (true) {
        yield start++;  // pauses here, returns value
    }
}
const gen = counter(1);
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }

// Practical: infinite sequences, custom iterators
function* range(start, end, step = 1) {
    for (let i = start; i < end; i += step) yield i;
}
[...range(0, 10, 2)]; // [0, 2, 4, 6, 8]

// ── PROXY ──
// Intercept object operations
const handler = {
    get(target, key) {
        console.log(\`Getting \${key}\`);
        return key in target ? target[key] : \`Property '\${key}' not found\`;
    },
    set(target, key, value) {
        if (typeof value !== 'string') throw new TypeError('Only strings!');
        target[key] = value;
        return true;
    }
};
const proxied = new Proxy({}, handler);
proxied.name = 'Sanketh'; // triggers set
proxied.name;             // logs 'Getting name', returns 'Sanketh'

// WeakMap & WeakSet — hold weak references (GC can still collect)
const cache = new WeakMap(); // keys must be objects
function processUser(user) {
    if (cache.has(user)) return cache.get(user);
    const result = heavyProcessing(user);
    cache.set(user, result);
    return result;
}`} />
                </div>
            </section>

            {/* ── FUNCTIONAL PROGRAMMING ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>12</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Patterns</div>
                        <h2>Functional Programming Patterns</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Pure Functions, Immutability, Composition</h3>
                    <CodeBlock lang="javascript" code={`// ── PURE FUNCTIONS ──
// Same input → always same output. No side effects.
// Pure:
const add = (a, b) => a + b;
const double = arr => arr.map(x => x * 2); // returns new array

// Impure (has side effects):
let total = 0;
const addToTotal = (n) => { total += n; }; // modifies external state

// ── IMMUTABILITY ──
// Never mutate data — always return new versions
const original = { name: 'Sanketh', scores: [95, 88, 92] };

// ❌ Mutation
original.name = 'Raj';
original.scores.push(99);

// ✅ Immutable updates
const updated = { ...original, name: 'Raj' };
const withNewScore = { ...original, scores: [...original.scores, 99] };

// Object.freeze() — prevents mutations (shallow)
const config = Object.freeze({ api: 'https://api.example.com', timeout: 5000 });
// config.timeout = 1000; // silently fails (or throws in strict mode)

// ── COMPOSITION ──
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

const trim     = str => str.trim();
const toLower  = str => str.toLowerCase();
const slugify  = str => str.replace(/\s+/g, '-');

const createSlug = pipe(trim, toLower, slugify);
createSlug('  Hello World  '); // 'hello-world'

// ── CURRYING ──
// Transform a multi-arg function into a chain of single-arg functions
const curry = fn => {
    const arity = fn.length;
    return function curried(...args) {
        if (args.length >= arity) return fn(...args);
        return (...more) => curried(...args, ...more);
    };
};

const multiply = curry((a, b) => a * b);
const double2  = multiply(2);  // partially applied
double2(5);                    // 10
double2(10);                   // 20

// Real use case: pre-configured functions
const multiply3 = multiply(3);
[1,2,3,4,5].map(multiply3); // [3,6,9,12,15]`} />
                </div>
            </section>

            {/* ── RESOURCES ── */}
            <section className="chapter">
                <div className="chapter-header"><div><h2 style={{ fontFamily: "'Fraunces', serif" }}>Resources & Games</h2></div></div>
                <div className="resource-grid">{RESOURCES.map((r, i) => <ResourceCard key={i} {...r} />)}</div>
                <PracticeArena games={GAMES} />
            </section>

            <footer className="footer">
                <p>JavaScript · Chapter 04 · FullStack Compass</p>
                <a href="https://sanketh.live/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'none', marginTop: '6px', display: 'block' }}>sanketh.live ↗</a>
            </footer>
        </>
    );
}
