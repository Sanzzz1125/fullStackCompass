import React from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';
import PracticeArena from '../components/PracticeArena.jsx';

const COLOR = '#ff4438';

const RESOURCES = [
    { type: 'docs',     title: 'Redis Official Docs',           description: 'Full Redis documentation: commands, data types, persistence, clustering.', url: 'https://redis.io/docs/' },
    { type: 'tutorial', title: 'Redis University (Free)',       description: 'Official free courses from Redis. RU101 covers core data structures hands-on.', url: 'https://university.redis.com/' },
    { type: 'tool',     title: 'RedisInsight — GUI Client',    description: 'Official Redis GUI. Browse keys, run commands, see memory stats visually.', url: 'https://redis.io/redis-enterprise/redis-insight/' },
    { type: 'docs',     title: 'ioredis — Node.js Client',     description: 'The most popular Redis client for Node.js. Full-featured with async/await support.', url: 'https://github.com/redis/ioredis' },
    { type: 'tutorial', title: 'Upstash — Serverless Redis',   description: 'Free serverless Redis. Perfect for small apps and Vercel deployments.', url: 'https://upstash.com/' },
];

const GAMES = [
    { emoji: '🎓', name: 'Redis University RU101', description: 'Official hands-on Redis course. Covers all data types with interactive exercises.', url: 'https://university.redis.com/courses/ru101/' },
];

export default function Redis() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{ color: COLOR }}>Redis</span> — Caching & Sessions</div>
                <h1><span className="accent" style={{ color: COLOR }}>Redis</span><br /><em>In-memory data store</em></h1>
                <p className="hero-desc">Redis stores data in memory — making reads and writes microseconds fast. Use it to cache expensive database queries, store sessions, implement rate limiting, and power real-time features.</p>
                <div className="hero-stack">
                    {['Caching','Sessions','Rate Limiting','Pub/Sub','Queues','ioredis'].map(t => <span key={t} className="stack-chip">{t}</span>)}
                </div>
            </section>

            {/* ── WHAT IS REDIS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>01</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Concepts</div>
                        <h2>What is Redis & When to Use It</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Redis vs MongoDB — Different Tools</h3>
                    <CodeBlock lang="javascript" code={`// MongoDB: persistent, disk-based, complex queries
// Redis:   in-memory, microsecond latency, simple key-value + data structures

// When to use Redis:
// 1. API Response Caching      — cache expensive DB queries
// 2. Session Storage           — store JWT or session data
// 3. Rate Limiting             — count requests per IP per minute
// 4. Real-time Leaderboards    — sorted sets, instant ranking
// 5. Pub/Sub                   — chat, notifications, live updates
// 6. Job Queues                — background task processing (Bull/BullMQ)
// 7. Temporary Data            — OTPs, email verification tokens

// Speed comparison:
// MongoDB query:     ~5-50ms
// Redis read:        ~0.1-0.5ms
// That's 10-100x faster

// Memory concern: Redis stores in RAM → expensive
// Solution: only cache hot data, set TTL (expiry)
// Free options: Upstash, Redis Cloud (30MB free)`} />
                </div>
            </section>

            {/* ── SETUP ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>02</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Setup</div>
                        <h2>Installation & Connection</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Local Setup & Connection with ioredis</h3>
                    <CodeBlock lang="bash" code={`# Install Redis locally (Linux/Mac)
brew install redis           # Mac
sudo apt install redis-server # Ubuntu

# Start Redis
redis-server
redis-cli ping              # → PONG

# Install Node.js client
npm install ioredis

# Or use Upstash (free serverless Redis)
# Get REDIS_URL from upstash.com → paste in .env`} />
                    <CodeBlock lang="javascript" code={`// config/redis.js
const Redis = require('ioredis');

const redis = new Redis({
    host:     process.env.REDIS_HOST || 'localhost',
    port:     parseInt(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD,
    // For Upstash or Redis Cloud, use a URL instead:
    // lazyConnect: true,
});

// OR with URL:
// const redis = new Redis(process.env.REDIS_URL);

redis.on('connect', () => console.log('✅ Redis connected'));
redis.on('error',   (err) => console.error('❌ Redis error:', err));

module.exports = redis;

// Basic commands
await redis.set('key', 'value');
await redis.set('key', 'value', 'EX', 3600); // expires in 1 hour
const val = await redis.get('key');           // 'value' or null
await redis.del('key');
await redis.exists('key');                    // 1 or 0
await redis.expire('key', 300);              // set TTL on existing key
await redis.ttl('key');                      // seconds remaining`} />
                </div>
            </section>

            {/* ── DATA TYPES ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>03</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Data Types</div>
                        <h2>Redis Data Structures</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Strings, Hashes, Lists, Sets, Sorted Sets</h3>
                    <CodeBlock lang="javascript" code={`const redis = require('./config/redis');

// ── STRINGS — simplest type, any value ──
await redis.set('user:1:name', 'Sanketh');
await redis.set('user:1:loginCount', 0);
await redis.incr('user:1:loginCount');  // atomic increment → 1
await redis.incrby('user:1:score', 10); // increment by 10
await redis.mset('k1', 'v1', 'k2', 'v2'); // multiple set
const [v1, v2] = await redis.mget('k1', 'k2');

// ── HASHES — objects (more memory-efficient than JSON strings) ──
await redis.hset('user:1', 'name', 'Sanketh', 'role', 'dev', 'age', '22');
await redis.hget('user:1', 'name');         // 'Sanketh'
const user = await redis.hgetall('user:1'); // { name: 'Sanketh', role: 'dev', age: '22' }
await redis.hset('user:1', 'age', '23');    // update single field
await redis.hdel('user:1', 'age');          // remove field

// ── LISTS — ordered list of strings (queue/stack) ──
await redis.rpush('queue:emails', 'email1', 'email2'); // push to right
await redis.lpush('queue:emails', 'email0');            // push to left
await redis.lrange('queue:emails', 0, -1);  // get all items
await redis.llen('queue:emails');            // list length
await redis.lpop('queue:emails');            // remove from left (queue)
await redis.rpop('queue:emails');            // remove from right (stack)

// ── SETS — unordered unique members ──
await redis.sadd('tags:post:1', 'react', 'node', 'mongodb');
await redis.sadd('tags:post:1', 'react'); // duplicate ignored
await redis.smembers('tags:post:1');       // ['react', 'node', 'mongodb']
await redis.sismember('tags:post:1', 'node'); // 1 (exists)
await redis.scard('tags:post:1');          // 3 (count)
await redis.sinter('tags:post:1', 'tags:post:2'); // intersection

// ── SORTED SETS — sets with a score (leaderboards!) ──
await redis.zadd('leaderboard', 5000, 'Sanketh');
await redis.zadd('leaderboard', 8000, 'Raj');
await redis.zadd('leaderboard', 6500, 'Priya');
await redis.zincrby('leaderboard', 500, 'Sanketh'); // add 500 to score
await redis.zrange('leaderboard', 0, -1, 'WITHSCORES'); // ascending
await redis.zrevrange('leaderboard', 0, 9, 'WITHSCORES'); // top 10 desc
await redis.zrank('leaderboard', 'Sanketh');   // position (0-indexed)
await redis.zscore('leaderboard', 'Sanketh');  // 5500`} />
                </div>
            </section>

            {/* ── API CACHING ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>04</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Patterns</div>
                        <h2>Pattern 1: API Response Caching</h2>
                        <p className="chapter-intro">Cache expensive MongoDB queries so subsequent requests return in microseconds instead of querying the database every time.</p>
                    </div>
                </div>
                <div className="topic">
                    <h3>Cache-Aside Pattern with Express</h3>
                    <CodeBlock lang="javascript" code={`const redis  = require('./config/redis');
const Product = require('./models/Product');

// ── Cache Middleware ──
function cacheMiddleware(ttl = 300) {
    return async (req, res, next) => {
        const key = \`cache:\${req.method}:\${req.originalUrl}\`;
        try {
            const cached = await redis.get(key);
            if (cached) {
                console.log('Cache HIT:', key);
                return res.json(JSON.parse(cached));
            }
            // Cache MISS: inject helper to cache response
            res.sendCached = (data) => {
                redis.set(key, JSON.stringify(data), 'EX', ttl);
                res.json(data);
            };
            next();
        } catch (err) {
            next(); // Redis failure → fall through to DB
        }
    };
}

// ── Apply to routes ──
router.get('/products', cacheMiddleware(300), async (req, res) => {
    // Only runs on cache MISS
    const products = await Product.find().limit(50).lean();
    res.sendCached({ products, source: 'database' });
});

// ── Manual caching with cache invalidation ──
router.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const cacheKey = \`product:\${id}\`;

    // 1. Check cache
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    // 2. Cache miss → query DB
    const product = await Product.findById(id).lean();
    if (!product) return res.status(404).json({ error: 'Not found' });

    // 3. Store in cache for 10 minutes
    await redis.set(cacheKey, JSON.stringify(product), 'EX', 600);
    res.json(product);
});

// ── Invalidate on update/delete ──
router.put('/products/:id', async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // Clear the cached version
    await redis.del(\`product:\${req.params.id}\`);
    // Also clear list cache (since list includes this product)
    const listKeys = await redis.keys('cache:GET:/products*');
    if (listKeys.length) await redis.del(...listKeys);
    res.json(product);
});`} />
                </div>
            </section>

            {/* ── RATE LIMITING ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>05</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Patterns</div>
                        <h2>Pattern 2: Rate Limiting</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Protect APIs from Abuse</h3>
                    <CodeBlock lang="javascript" code={`// ── Custom Rate Limiter with Redis ──
async function rateLimit({ key, limit, windowSeconds }) {
    const current = await redis.incr(key);
    if (current === 1) {
        await redis.expire(key, windowSeconds); // start window on first request
    }
    const ttl = await redis.ttl(key);
    return {
        current,
        limit,
        remaining: Math.max(0, limit - current),
        resetIn:   ttl,
        exceeded:  current > limit,
    };
}

// Rate limit middleware
function rateLimiter({ limit = 100, windowSeconds = 60, keyPrefix = 'rl' } = {}) {
    return async (req, res, next) => {
        const ip  = req.ip || req.connection.remoteAddress;
        const key = \`\${keyPrefix}:\${ip}:\${Math.floor(Date.now() / (windowSeconds * 1000))}\`;

        const result = await rateLimit({ key, limit, windowSeconds });

        // Set standard rate-limit headers
        res.set('X-RateLimit-Limit',     limit);
        res.set('X-RateLimit-Remaining', result.remaining);
        res.set('X-RateLimit-Reset',     result.resetIn);

        if (result.exceeded) {
            return res.status(429).json({
                error:    'Too many requests',
                retryAfter: result.resetIn,
            });
        }
        next();
    };
}

// Apply globally
app.use(rateLimiter({ limit: 100, windowSeconds: 60 }));

// Stricter limits for auth routes
app.use('/api/auth', rateLimiter({ limit: 10, windowSeconds: 900, keyPrefix: 'auth' }));

// ── Using express-rate-limit with Redis store (easier) ──
// npm install express-rate-limit rate-limit-redis
const rateLimit2 = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');

app.use('/api/auth/login', rateLimit2({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max:      10,              // 10 attempts
    store:    new RedisStore({ sendCommand: (...args) => redis.call(...args) }),
    message:  { error: 'Too many login attempts. Try again in 15 minutes.' },
}));`} />
                </div>
            </section>

            {/* ── OTP STORAGE ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>06</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Patterns</div>
                        <h2>Pattern 3: OTP & Temporary Tokens</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Email Verification & Password Reset OTPs</h3>
                    <CodeBlock lang="javascript" code={`const crypto = require('crypto');

// ── Store OTP with auto-expiry ──
async function generateAndStoreOTP(userId) {
    const otp       = crypto.randomInt(100000, 999999).toString();
    const key       = \`otp:\${userId}\`;
    const attempts  = \`otp_attempts:\${userId}\`;

    await redis.set(key, otp, 'EX', 600);      // expires in 10 minutes
    await redis.set(attempts, 0, 'EX', 600);   // reset attempts counter
    return otp;
}

async function verifyOTP(userId, providedOtp) {
    const key       = \`otp:\${userId}\`;
    const attemptsKey = \`otp_attempts:\${userId}\`;

    // Check too many attempts
    const attempts = parseInt(await redis.get(attemptsKey) || '0');
    if (attempts >= 5) throw new Error('Too many attempts. Request a new OTP.');

    const storedOtp = await redis.get(key);
    if (!storedOtp) throw new Error('OTP expired or not found');

    await redis.incr(attemptsKey); // count this attempt

    if (storedOtp !== providedOtp) throw new Error('Invalid OTP');

    // Success — delete OTP so it can't be reused
    await redis.del(key, attemptsKey);
    return true;
}

// ── Password Reset Token ──
async function createPasswordResetToken(userId) {
    const token = crypto.randomBytes(32).toString('hex');
    await redis.set(\`reset:\${token}\`, userId, 'EX', 3600); // 1 hour
    return token;
}

async function validateResetToken(token) {
    const userId = await redis.get(\`reset:\${token}\`);
    if (!userId) throw new Error('Token expired or invalid');
    await redis.del(\`reset:\${token}\`); // single use
    return userId;
}

// Usage in routes
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ message: 'If email exists, OTP sent.' }); // don't reveal

    const otp = await generateAndStoreOTP(user._id);
    await sendOTPEmail(email, otp); // see Nodemailer section
    res.json({ message: 'OTP sent to your email' });
});`} />
                </div>
            </section>

            {/* ── RESOURCES ── */}
            <section className="chapter">
                <div className="chapter-header"><div><h2 style={{ fontFamily: "'Fraunces', serif" }}>Resources</h2></div></div>
                <div className="resource-grid">{RESOURCES.map((r, i) => <ResourceCard key={i} {...r} />)}</div>
                <PracticeArena games={GAMES} />
            </section>

            <footer className="footer">
                <p>Redis · FullStack Compass</p>
                <a href="https://sanketh.live/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'none', marginTop: '6px', display: 'block' }}>sanketh.live ↗</a>
            </footer>
        </>
    );
}
