import React from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';
import PracticeArena from '../components/PracticeArena.jsx';

const COLOR = 'var(--node-color)';

const RESOURCES = [
    { type: 'docs',     title: 'Node.js Official Docs',         description: 'Full API documentation for every built-in module: fs, http, path, stream, crypto and more.', url: 'https://nodejs.org/en/docs' },
    { type: 'docs',     title: 'Node.js Best Practices (GitHub)', description: '90+ best practices for Node.js production apps. Security, error handling, testing and more.', url: 'https://github.com/goldbergyoni/nodebestpractices' },
    { type: 'tutorial', title: 'The Odin Project — Node',        description: 'Hands-on Node.js curriculum that builds real projects with full explanations.', url: 'https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs' },
    { type: 'tool',     title: 'PM2 Documentation',              description: 'Process manager for Node.js. Keeps apps running, provides monitoring, clustering, logs.', url: 'https://pm2.keymetrics.io/docs/' },
    { type: 'tool',     title: 'Nodemon',                        description: 'Automatically restarts server on file changes during development.', url: 'https://nodemon.io/' },
];

const GAMES = [
    { emoji: '🎯', name: 'NodeSchool',      description: 'Interactive Node.js lessons run in your terminal. learnyounode is the classic starter.', url: 'https://nodeschool.io/' },
    { emoji: '🔨', name: 'Build a CLI Tool', description: 'Challenge: build a command-line task manager using Node.js fs module and commander.js.', url: 'https://nodejs.org/en/learn/command-line/how-to-read-files-in-nodejs' },
];

export default function NodeJS() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{ color: COLOR }}>Node.js</span> — Chapter 06</div>
                <h1><span className="accent" style={{ color: COLOR }}>Node.js</span><br /><em>JavaScript on the server</em></h1>
                <p className="hero-desc">Node.js is a JavaScript runtime built on Chrome's V8 engine. It lets you run JavaScript outside the browser — powering your backend, CLIs, scripts, and real-time systems. Same language, everywhere.</p>
                <div className="hero-stack">
                    {['Runtime','Event Loop','Modules','fs','Streams','HTTP','npm','PM2','Debugging'].map(t => <span key={t} className="stack-chip">{t}</span>)}
                </div>
            </section>

            {/* ── HOW NODE WORKS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>01</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Core Concepts</div>
                        <h2>How Node.js Works</h2>
                        <p className="chapter-intro">Node.js is single-threaded but handles thousands of concurrent operations through non-blocking I/O and the event loop. Understanding this unlocks why Node is fast for APIs.</p>
                    </div>
                </div>
                <div className="topic">
                    <h3>Single Thread + Event Loop = Scalability</h3>
                    <CodeBlock lang="javascript" code={`// Node.js Event Loop — simplified
// 1. Execute sync code
// 2. Process timers (setTimeout, setInterval)
// 3. Process I/O callbacks (fs, network)
// 4. Process setImmediate callbacks
// 5. Process close events
// 6. Repeat

// ── NON-BLOCKING I/O ──
// Bad (blocking — freezes everything)
const data = fs.readFileSync('big-file.txt'); // BLOCKS until done
processData(data);

// Good (non-blocking — continues executing)
fs.readFile('big-file.txt', 'utf8', (err, data) => {
    if (err) throw err;
    processData(data); // called when ready
});
doOtherWork(); // runs immediately, doesn't wait

// Modern — async/await (same non-blocking, cleaner syntax)
const { readFile, writeFile } = require('fs/promises');

async function processFile() {
    try {
        const data = await readFile('input.txt', 'utf8');
        const processed = data.toUpperCase();
        await writeFile('output.txt', processed);
        console.log('Done!');
    } catch (err) {
        console.error('File error:', err.message);
    }
}

// Why Node scales:
// A PHP/Python server creates a thread per request (1000 requests = 1000 threads)
// Node handles all requests on ONE thread via the event loop
// I/O (network, disk) is offloaded to OS — Node just waits for callbacks
// Result: Node can handle 10,000+ concurrent connections with low memory`} />
                </div>
            </section>

            {/* ── MODULES ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>02</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Modules</div>
                        <h2>Module System — CommonJS & ESM</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>CommonJS vs ES Modules</h3>
                    <CodeBlock lang="javascript" code={`// ── CommonJS (CJS) — traditional Node.js ──
// Synchronous, works everywhere, no config needed

// Exporting
const PI = 3.14159;
function add(a, b) { return a + b; }
class Calculator { ... }

module.exports = { PI, add, Calculator };
// OR export single default:
module.exports = Calculator;

// Importing
const { PI, add } = require('./math');
const Calculator  = require('./Calculator');
const express     = require('express'); // node_modules
const path        = require('path');    // built-in module

// ── ES Modules (ESM) — modern standard ──
// Add "type": "module" to package.json to enable

// Exporting (math.mjs or package.json "type":"module")
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export default class Calculator { ... }

// Importing
import Calculator, { PI, add } from './math.js'; // .js extension required in ESM
import * as math from './math.js';               // namespace import
import path from 'path';

// ── MODULE RESOLUTION ORDER ──
// require('./utils')  → looks for:
//   1. ./utils.js
//   2. ./utils.json
//   3. ./utils/index.js
//   4. ./utils/package.json "main" field

// __dirname  — directory of current file (CJS only)
// __filename — full path of current file (CJS only)
// import.meta.url — equivalent in ESM

const __dirname = new URL('.', import.meta.url).pathname; // ESM equivalent`} />
                </div>
            </section>

            {/* ── BUILT-IN MODULES ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>03</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Built-ins</div>
                        <h2>Built-in Modules — fs, path, os, crypto</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>File System (fs), Path & OS</h3>
                    <CodeBlock lang="javascript" code={`const fs   = require('fs/promises'); // async fs (Node 14+)
const path = require('path');
const os   = require('os');

// ── PATH ── (cross-platform file paths)
path.join('/users', 'sanketh', 'projects');  // '/users/sanketh/projects'
path.resolve('src', 'index.js');             // absolute path from cwd
path.basename('/users/sanketh/app.js');      // 'app.js'
path.dirname('/users/sanketh/app.js');       // '/users/sanketh'
path.extname('index.html');                  // '.html'
path.parse('/home/sanketh/file.txt');
// { root:'/', dir:'/home/sanketh', base:'file.txt', ext:'.txt', name:'file' }

// ── FILE SYSTEM (async) ──
async function fileOperations() {
    // Read
    const content = await fs.readFile('data.json', 'utf8');
    const json    = JSON.parse(content);

    // Write
    await fs.writeFile('output.json', JSON.stringify(data, null, 2));

    // Append
    await fs.appendFile('log.txt', \`\${new Date().toISOString()} - Event\n\`);

    // Check if exists
    try {
        await fs.access('file.txt');
        console.log('File exists');
    } catch { console.log('File does not exist'); }

    // Read directory
    const files = await fs.readdir('./uploads');
    const jsFiles = files.filter(f => f.endsWith('.js'));

    // Create directory (recursive)
    await fs.mkdir('./logs/2024/03', { recursive: true });

    // Copy, rename, delete
    await fs.copyFile('source.txt', 'dest.txt');
    await fs.rename('old.txt', 'new.txt');
    await fs.unlink('delete-me.txt');

    // File stats
    const stat = await fs.stat('file.txt');
    console.log(stat.size, stat.mtime, stat.isDirectory());
}

// ── OS ──
os.platform();    // 'linux', 'darwin', 'win32'
os.cpus().length; // number of CPU cores
os.totalmem();    // total RAM in bytes
os.freemem();     // free RAM in bytes
os.homedir();     // '/home/sanketh'
os.tmpdir();      // '/tmp'
os.hostname();    // machine hostname`} />
                </div>
                <div className="topic">
                    <h3>Crypto — Hashing, Tokens & Encryption</h3>
                    <CodeBlock lang="javascript" code={`const crypto = require('crypto');

// ── HASHING ──
const hash = crypto.createHash('sha256').update('hello').digest('hex');
// 'b94d27b9934d3e08a52e52d7da7dabfac484efe04294e576...'

// File integrity check
const fileContent = fs.readFileSync('file.txt');
const checksum    = crypto.createHash('md5').update(fileContent).digest('hex');

// ── RANDOM BYTES — secure tokens ──
// Generate a secure random token (for email verification, password reset, etc.)
const token = crypto.randomBytes(32).toString('hex');
// '9f8a2c1d...' — 64 char hex string

// Shorter URL-safe token
const shortToken = crypto.randomBytes(16).toString('base64url');

// Random number in range
const otp = crypto.randomInt(100000, 999999); // 6-digit OTP

// ── HMAC — signed tokens ──
const secret = process.env.HMAC_SECRET;
const data   = JSON.stringify({ userId: 123, expires: Date.now() + 3600000 });
const signature = crypto.createHmac('sha256', secret).update(data).digest('hex');

function verifyHmac(data, signature) {
    const expected = crypto.createHmac('sha256', secret).update(data).digest('hex');
    return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expected)
    );
}

// ── ENCRYPTION (AES-256-GCM) ──
function encrypt(text, key) {
    const iv  = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return { iv: iv.toString('hex'), encrypted: encrypted.toString('hex'), tag: tag.toString('hex') };
}

function decrypt({ iv, encrypted, tag }, key) {
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'hex'));
    decipher.setAuthTag(Buffer.from(tag, 'hex'));
    return decipher.update(Buffer.from(encrypted, 'hex')) + decipher.final('utf8');
}

const key  = crypto.scryptSync(process.env.ENCRYPTION_KEY, 'salt', 32);
const enc  = encrypt('sensitive data', key);
const dec  = decrypt(enc, key); // 'sensitive data'`} />
                </div>
            </section>

            {/* ── STREAMS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>04</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Streams</div>
                        <h2>Streams — Processing Large Data</h2>
                        <p className="chapter-intro">Streams process data in chunks instead of loading everything into memory. Essential for file uploads, large CSV processing, proxying HTTP responses, and real-time data.</p>
                    </div>
                </div>
                <div className="topic">
                    <h3>Readable, Writable & Transform Streams</h3>
                    <CodeBlock lang="javascript" code={`const fs         = require('fs');
const zlib        = require('zlib');
const { Transform, pipeline } = require('stream');
const { promisify } = require('util');
const pipelineAsync = promisify(pipeline);

// ── WITHOUT STREAMS (bad for large files) ──
// const data = fs.readFileSync('huge-file.csv'); // loads ENTIRE file into RAM
// process(data);

// ── WITH STREAMS (memory-efficient) ──
// Read file as stream, process line by line
const readable = fs.createReadStream('data.csv', { encoding: 'utf8', highWaterMark: 64 * 1024 });
const writable = fs.createWriteStream('output.csv');

readable.on('data', (chunk) => {
    const lines = chunk.split('\n');
    lines.forEach(line => {
        // process each line without loading whole file
    });
});

readable.on('end',   ()    => console.log('Done reading'));
readable.on('error', (err) => console.error('Error:', err));

// ── PIPE — connect streams ──
// Read → Gzip compress → Write (all streaming, no full copy in RAM)
const input  = fs.createReadStream('large-file.txt');
const gzip   = zlib.createGzip();
const output = fs.createWriteStream('large-file.txt.gz');
input.pipe(gzip).pipe(output);

// ── TRANSFORM STREAM — modify data mid-pipeline ──
const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

// Full pipeline with error handling
await pipelineAsync(
    fs.createReadStream('input.txt'),
    upperCaseTransform,
    zlib.createGzip(),
    fs.createWriteStream('output.txt.gz')
);

// ── STREAM LARGE MONGODB CURSOR ──
// Instead of Product.find().then(products => ...) which loads all into RAM:
const cursor = Product.find({}).cursor();
for await (const product of cursor) {
    await processProduct(product); // one at a time
}

// ── HTTP RESPONSE STREAMING ──
app.get('/download', (req, res) => {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="export.csv"');

    const dbStream = Product.find({}).cursor();
    dbStream.on('data', (doc) => {
        res.write(\`\${doc.name},\${doc.price}\n\`);
    });
    dbStream.on('end', () => res.end());
});`} />
                </div>
            </section>

            {/* ── HTTP SERVER ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>05</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>HTTP</div>
                        <h2>HTTP Module — Raw Server</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Raw HTTP Server (Without Express)</h3>
                    <CodeBlock lang="javascript" code={`const http = require('http');
const url  = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname  = parsedUrl.pathname;
    const query     = parsedUrl.query;

    // Set headers
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Route handling
    if (req.method === 'GET' && pathname === '/') {
        res.writeHead(200);
        res.end(JSON.stringify({ message: 'Hello World' }));

    } else if (req.method === 'POST' && pathname === '/users') {
        let body = '';
        req.on('data',  chunk => { body += chunk.toString(); });
        req.on('end',   ()    => {
            const data = JSON.parse(body);
            res.writeHead(201);
            res.end(JSON.stringify({ created: data }));
        });

    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(3000, () => console.log('Server on port 3000'));

// Note: Express wraps this with much cleaner routing, middleware, etc.
// But understanding raw http helps you know what Express is doing.`} />
                </div>
            </section>

            {/* ── ENVIRONMENT & CONFIG ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>06</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Config</div>
                        <h2>Environment Variables & Configuration</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>dotenv, Config Pattern & Validation</h3>
                    <CodeBlock lang="javascript" code={`// npm install dotenv

// .env — NEVER commit this file
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/mydb
JWT_SECRET=your_super_secret_key_here_min_32_chars
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
REDIS_URL=redis://localhost:6379
FRONTEND_URL=http://localhost:5173

// .env.example — commit this (template without values)
PORT=
NODE_ENV=development
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRES_IN=7d

// config/env.js — validate and export
require('dotenv').config();

const required = ['MONGODB_URI', 'JWT_SECRET'];
required.forEach(key => {
    if (!process.env[key]) {
        console.error(\`❌ Missing required env var: \${key}\`);
        process.exit(1);
    }
});

module.exports = {
    port:       parseInt(process.env.PORT) || 5000,
    nodeEnv:    process.env.NODE_ENV || 'development',
    mongoUri:   process.env.MONGODB_URI,
    jwtSecret:  process.env.JWT_SECRET,
    jwtExpiry:  process.env.JWT_EXPIRES_IN || '7d',
    isDev:      process.env.NODE_ENV === 'development',
    isProd:     process.env.NODE_ENV === 'production',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
};

// Usage in server.js
const { port, mongoUri } = require('./config/env');
app.listen(port, () => console.log(\`Running on port \${port}\`));`} />
                </div>
            </section>

            {/* ── PM2 ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>07</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Production</div>
                        <h2>PM2 — Process Manager</h2>
                        <p className="chapter-intro">PM2 keeps your Node.js app running in production. It restarts on crashes, manages logs, enables clustering across CPU cores, and runs apps on server startup.</p>
                    </div>
                </div>
                <div className="topic">
                    <h3>Install, Configure & Deploy with PM2</h3>
                    <CodeBlock lang="bash" code={`# Install globally
npm install -g pm2

# Start app
pm2 start server.js --name "myapp"
pm2 start server.js --name "myapp" --watch  # restart on file change (dev)

# Cluster mode — use all CPU cores (production)
pm2 start server.js --name "myapp" -i max   # -i max = num of CPU cores
pm2 start server.js --name "myapp" -i 4     # 4 instances

# Management commands
pm2 list                    # show all processes
pm2 status                  # process status
pm2 logs myapp              # tail logs
pm2 logs myapp --lines 200  # last 200 log lines
pm2 monit                   # live monitoring dashboard
pm2 restart myapp           # restart
pm2 reload myapp            # graceful reload (0 downtime, cluster only)
pm2 stop myapp
pm2 delete myapp

# Auto-start on system reboot
pm2 startup                 # generates startup command
pm2 save                    # save current process list`} />
                    <CodeBlock lang="javascript" code={`// ecosystem.config.js — PM2 config file
module.exports = {
    apps: [{
        name:         'fullstack-compass-api',
        script:       './server/server.js',
        instances:    'max',          // cluster all CPU cores
        exec_mode:    'cluster',
        watch:        false,
        max_memory_restart: '500M',  // restart if RAM exceeds 500MB
        env: {
            NODE_ENV: 'development',
            PORT: 5000,
        },
        env_production: {
            NODE_ENV: 'production',
            PORT: 5000,
        },
        log_date_format: 'YYYY-MM-DD HH:mm:ss',
        error_file:  './logs/pm2-error.log',
        out_file:    './logs/pm2-out.log',
        merge_logs:  true,
    }],
};

// Run with:
// pm2 start ecosystem.config.js --env production`} />
                </div>
            </section>

            {/* ── DEBUGGING ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>08</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Debugging</div>
                        <h2>Debugging Node.js Apps</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Built-in Debugger, Chrome DevTools & VS Code</h3>
                    <CodeBlock lang="bash" code={`# ── OPTION 1: Built-in debugger ──
node --inspect server.js           # start with debugger
node --inspect-brk server.js       # pause on first line
# Then open: chrome://inspect in Chrome → click "inspect"

# ── OPTION 2: VS Code (recommended) ──
# .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Server",
      "skipFiles": ["<node_internals>/**"],
      "program": "\${workspaceFolder}/server/server.js",
      "envFile": "\${workspaceFolder}/server/.env",
      "restart": true,
      "runtimeExecutable": "nodemon"
    }
  ]
}
# F5 to start — set breakpoints by clicking line numbers`} />
                    <CodeBlock lang="javascript" code={`// ── CONSOLE DEBUGGING TECHNIQUES ──
console.log('Simple value:', value);
console.dir(obj, { depth: null, colors: true }); // deep object inspection
console.table(arrayOfObjects);                    // table format
console.time('operation');
/* ... */
console.timeEnd('operation'); // logs elapsed time

// Group related logs
console.group('User Processing');
console.log('Fetching user...');
console.log('Processing data...');
console.groupEnd();

// ── PERFORMANCE PROFILING ──
const { PerformanceObserver, performance } = require('perf_hooks');

performance.mark('start');
// ... heavy operation ...
performance.mark('end');
performance.measure('operation', 'start', 'end');

const obs = new PerformanceObserver(list => {
    const entry = list.getEntries()[0];
    console.log(\`\${entry.name}: \${entry.duration.toFixed(2)}ms\`);
});
obs.observe({ entryTypes: ['measure'] });

// ── DEBUG MODULE (conditional logging) ──
// npm install debug
const debug = require('debug');
const log   = debug('app:server');
const dbLog = debug('app:db');

log('Server starting...');
dbLog('Connecting to MongoDB...');

// Enable: DEBUG=app:* node server.js
// Enable specific: DEBUG=app:server node server.js`} />
                </div>
            </section>

            {/* ── WORKER THREADS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>09</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Performance</div>
                        <h2>Worker Threads — CPU-Intensive Tasks</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Offloading Heavy Computation</h3>
                    <CodeBlock lang="javascript" code={`const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

// ── main.js ──
if (isMainThread) {
    function runWorker(data) {
        return new Promise((resolve, reject) => {
            const worker = new Worker(__filename, { workerData: data });
            worker.on('message', resolve);
            worker.on('error',   reject);
            worker.on('exit', code => {
                if (code !== 0) reject(new Error(\`Worker exited with code \${code}\`));
            });
        });
    }

    // Run CPU-intensive task WITHOUT blocking event loop
    const result = await runWorker({ numbers: [1, 2, 3, ..., 1000000] });
    console.log('Sum:', result);

    // HTTP response is still fast because heavy work is in worker
    app.get('/compute', async (req, res) => {
        const result = await runWorker({ numbers: req.body.numbers });
        res.json({ result });
    });

} else {
    // ── Worker thread code ──
    const { numbers } = workerData;
    const sum = numbers.reduce((a, b) => a + b, 0);
    parentPort.postMessage(sum);
}

// When to use Worker Threads:
// ✅ CPU-intensive computation (image processing, encryption, complex math)
// ✅ Parsing large CSV/JSON files
// ❌ I/O operations (use async/await — event loop handles these fine)`} />
                </div>
            </section>

            {/* ── RESOURCES ── */}
            <section className="chapter">
                <div className="chapter-header"><div><h2 style={{ fontFamily: "'Fraunces', serif" }}>Resources & Practice</h2></div></div>
                <div className="resource-grid">{RESOURCES.map((r, i) => <ResourceCard key={i} {...r} />)}</div>
                <PracticeArena games={GAMES} />
            </section>

            <footer className="footer">
                <p>Node.js · Chapter 06 · FullStack Compass</p>
                <a href="https://sanketh.live/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'none', marginTop: '6px', display: 'block' }}>sanketh.live ↗</a>
            </footer>
        </>
    );
}
