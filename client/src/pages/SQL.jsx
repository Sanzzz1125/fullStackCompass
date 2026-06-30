import React from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';
import PracticeArena from '../components/PracticeArena.jsx';

const COLOR = 'var(--sql-color)';

const RESOURCES = [
    { type: 'docs',      title: 'PostgreSQL Official Docs', description: 'Complete reference for the world\'s most advanced open-source relational database.', url: 'https://www.postgresql.org/docs/' },
    { type: 'tutorial',  title: 'SQLBolt',                  description: 'Interactive, step-by-step SQL lessons in your browser. Perfect for beginners.', url: 'https://sqlbolt.com/' },
    { type: 'tutorial',  title: 'SQL Zoo',                  description: 'Learn SQL by writing queries on real datasets, with instant feedback.', url: 'https://sqlzoo.net/' },
    { type: 'docs',      title: 'Prisma Docs',              description: 'Next-generation ORM for TypeScript/Node — works with PostgreSQL, MySQL, SQLite.', url: 'https://www.prisma.io/docs/' },
    { type: 'reference', title: 'SQL Joins Visualizer',     description: 'Visual interactive guide to INNER, LEFT, RIGHT, and FULL OUTER JOINs.', url: 'https://sql-joins.leopard.in.ua/' },
    { type: 'tool',      title: 'DBeaver (Free GUI)',        description: 'Universal database tool — connects to PostgreSQL, MySQL, SQLite, and 80+ others.', url: 'https://dbeaver.io/' },
];

const GAMES = [
    { emoji: '🕵️', name: 'SQL Murder Mystery', description: 'Solve a murder mystery entirely by writing SQL queries. Incredible, addictive practice.', url: 'https://mystery.knightlab.com/' },
    { emoji: '⚡', name: 'SQLBolt', description: '14 interactive lessons from SELECT basics to complex multi-table queries.', url: 'https://sqlbolt.com/' },
    { emoji: '🏆', name: 'HackerRank SQL', description: 'Graded SQL challenges from Easy to Hard. Great for interview prep.', url: 'https://www.hackerrank.com/domains/sql' },
];

export default function SQL() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{ color: COLOR }}>SQL & Databases</span> — Chapter 11</div>
                <h1><span className="accent" style={{ color: COLOR }}>SQL</span><br /><em>Structured, relational data.</em></h1>
                <p className="hero-desc">SQL (Structured Query Language) is the language of relational databases. While MongoDB excels at flexible, document data — PostgreSQL, MySQL, and SQLite dominate where data relationships, ACID guarantees, and complex queries matter most. This chapter covers SQL from scratch plus Node.js ORMs.</p>
                <div className="hero-stack">
                    {['PostgreSQL', 'MySQL', 'SQLite', 'SELECT & JOINs', 'Indexes', 'Prisma', 'SQL vs NoSQL'].map(t => <span key={t} className="stack-chip">{t}</span>)}
                </div>
            </section>

            {/* ── WHY SQL ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>01</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Foundations</div>
                        <h2>SQL vs NoSQL — When to Use What</h2>
                    </div>
                </div>

                <div className="topic">
                    <h3>Choosing the Right Database</h3>
                    <div className="table-wrap">
                        <table>
                            <thead><tr><th>Factor</th><th>SQL (PostgreSQL/MySQL)</th><th>NoSQL (MongoDB)</th></tr></thead>
                            <tbody>
                            <tr><td>Data Structure</td><td>Fixed schema, tables with rows</td><td>Flexible documents (JSON)</td></tr>
                            <tr><td>Relationships</td><td>Excellent — native JOINs, foreign keys</td><td>Manual via $lookup or embedding</td></tr>
                            <tr><td>ACID Transactions</td><td>Full support, always</td><td>Support (4.0+, with caveats)</td></tr>
                            <tr><td>Schema Changes</td><td>Migrations required (ALTER TABLE)</td><td>Just add/remove fields</td></tr>
                            <tr><td>Scaling</td><td>Vertical (bigger machine)</td><td>Horizontal (sharding)</td></tr>
                            <tr><td>Query Power</td><td>Extremely powerful SQL</td><td>Good, but less expressive</td></tr>
                            <tr><td>Best for</td><td>Banking, ERP, Analytics, CMS</td><td>Real-time apps, catalogs, social</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout tip">
                        <div className="callout-title">💡 In Practice</div>
                        <p>Many production apps use <strong>both</strong> — PostgreSQL for transactional data (users, orders, payments) and MongoDB or Redis for other use cases (sessions, caching, feeds). Pick based on your data, not hype.</p>
                    </div>
                </div>
            </section>

            {/* ── SQL BASICS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>02</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Core SQL</div>
                        <h2>SQL Fundamentals</h2>
                        <p className="chapter-intro">SQL is a declarative language — you describe what data you want, not how to get it. The database engine figures out the how.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Creating Tables</h3>
                    <CodeBlock lang="sql" code={`-- CREATE TABLE — define schema upfront
CREATE TABLE users (
  id         SERIAL PRIMARY KEY,          -- auto-increment integer
  name       VARCHAR(100) NOT NULL,       -- string, max 100 chars, required
  email      VARCHAR(255) NOT NULL UNIQUE,-- unique constraint
  age        INTEGER CHECK (age >= 0),    -- must be non-negative
  role       VARCHAR(20) DEFAULT 'user',  -- default value
  is_active  BOOLEAN DEFAULT TRUE,
  bio        TEXT,                        -- unlimited text
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),   -- timestamp with timezone
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Foreign key — references another table
CREATE TABLE posts (
  id         SERIAL PRIMARY KEY,
  title      VARCHAR(255) NOT NULL,
  content    TEXT,
  user_id    INTEGER REFERENCES users(id) ON DELETE CASCADE,
  -- ON DELETE CASCADE: when user is deleted, their posts are too
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Modify table (add column)
ALTER TABLE users ADD COLUMN phone VARCHAR(15);

-- Drop table
DROP TABLE IF EXISTS temp_data;`} />
                </div>

                <div className="topic">
                    <h3>CRUD — The Four Operations</h3>
                    <CodeBlock lang="sql" code={`-- ── CREATE ─────────────────────────────────────────
INSERT INTO users (name, email, age, role)
VALUES ('Sanketh', 'sanketh@example.com', 21, 'admin');

-- Insert multiple rows
INSERT INTO users (name, email, age) VALUES
  ('Alice', 'alice@example.com', 28),
  ('Bob',   'bob@example.com',   22),
  ('Carol', 'carol@example.com', 35);

-- ── READ ────────────────────────────────────────────
-- Select all columns
SELECT * FROM users;

-- Select specific columns
SELECT id, name, email FROM users;

-- With conditions
SELECT name, email
FROM   users
WHERE  age > 18 AND is_active = TRUE;

-- Sort, limit, offset (pagination)
SELECT name, created_at
FROM   users
ORDER  BY created_at DESC    -- newest first
LIMIT  10                    -- per page
OFFSET 20;                   -- skip first 20 (page 3)

-- Distinct values
SELECT DISTINCT role FROM users;

-- Pattern matching
SELECT * FROM users WHERE name LIKE 'San%';   -- starts with San
SELECT * FROM users WHERE email ILIKE '%gmail%'; -- case-insensitive

-- ── UPDATE ──────────────────────────────────────────
UPDATE users
SET    age = 22, updated_at = NOW()
WHERE  email = 'sanketh@example.com';

-- ── DELETE ──────────────────────────────────────────
DELETE FROM users WHERE is_active = FALSE;
DELETE FROM users WHERE id = 5;`} />
                </div>

                <div className="topic">
                    <h3>JOINs — Combining Tables</h3>
                    <CodeBlock lang="sql" code={`-- ── INNER JOIN — only rows with matches in BOTH tables ─
SELECT p.title, u.name AS author
FROM   posts p
INNER  JOIN users u ON p.user_id = u.id;

-- ── LEFT JOIN — all rows from left, nulls for non-matches ─
SELECT u.name, COUNT(p.id) AS post_count
FROM   users u
LEFT   JOIN posts p ON u.id = p.user_id
GROUP  BY u.id, u.name
ORDER  BY post_count DESC;

-- ── Multiple JOINs ───────────────────────────────────
SELECT
  u.name         AS author,
  p.title        AS post,
  c.content      AS comment,
  c.created_at
FROM   users u
JOIN   posts    p ON p.user_id    = u.id
JOIN   comments c ON c.post_id    = p.id
WHERE  u.id = 1
ORDER  BY c.created_at DESC;`} />
                </div>

                <div className="topic">
                    <h3>Aggregation & Grouping</h3>
                    <CodeBlock lang="sql" code={`-- Aggregate functions: COUNT, SUM, AVG, MIN, MAX
SELECT COUNT(*) FROM users;                        -- total users
SELECT COUNT(*) FROM users WHERE is_active = TRUE; -- active users
SELECT AVG(age)  FROM users;                       -- average age
SELECT MAX(age), MIN(age) FROM users;

-- GROUP BY — aggregate per group
SELECT role, COUNT(*) AS count, AVG(age) AS avg_age
FROM   users
GROUP  BY role
ORDER  BY count DESC;

-- HAVING — filter groups (like WHERE but for aggregated data)
SELECT user_id, COUNT(*) AS post_count
FROM   posts
GROUP  BY user_id
HAVING COUNT(*) > 5   -- only users with more than 5 posts
ORDER  BY post_count DESC;

-- Subquery
SELECT name FROM users
WHERE  id IN (SELECT user_id FROM posts WHERE created_at > NOW() - INTERVAL '7 days');

-- Common Table Expression (CTE) — readable subqueries
WITH active_users AS (
  SELECT * FROM users WHERE is_active = TRUE
),
recent_posts AS (
  SELECT * FROM posts WHERE created_at > NOW() - INTERVAL '30 days'
)
SELECT au.name, rp.title
FROM   active_users au
JOIN   recent_posts rp ON au.id = rp.user_id;`} />
                </div>
            </section>

            {/* ── INDEXES ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>03</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Performance</div>
                        <h2>Indexes in SQL</h2>
                    </div>
                </div>

                <div className="topic">
                    <h3>Creating & Using Indexes</h3>
                    <CodeBlock lang="sql" code={`-- Create index on frequently queried column
CREATE INDEX idx_users_email ON users(email);

-- Unique index (also enforces uniqueness)
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);

-- Composite index (for multi-column queries)
CREATE INDEX idx_posts_user_created ON posts(user_id, created_at DESC);

-- Partial index (only index a subset)
CREATE INDEX idx_active_users ON users(email) WHERE is_active = TRUE;

-- Text search index
CREATE INDEX idx_posts_title ON posts USING GIN(to_tsvector('english', title));

-- Check if query uses index (PostgreSQL)
EXPLAIN ANALYZE
SELECT * FROM users WHERE email = 'sanketh@example.com';
-- Look for "Index Scan" (good) vs "Seq Scan" (bad for large tables)

-- List indexes
\di users*       -- PostgreSQL shell command

-- Drop index
DROP INDEX IF EXISTS idx_users_email;`} />
                </div>
            </section>

            {/* ── PRISMA ORM ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>04</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Node.js Integration</div>
                        <h2>Prisma ORM — SQL with JavaScript</h2>
                        <p className="chapter-intro">Prisma is a modern, type-safe ORM for Node.js. It auto-generates a query client from your schema and handles migrations — making SQL feel as natural as Mongoose.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Setup & Schema</h3>
                    <CodeBlock lang="bash" code={`npm install prisma @prisma/client
npx prisma init                  # creates prisma/ folder and .env

# Set DATABASE_URL in .env:
# DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

npx prisma migrate dev --name init   # create tables from schema
npx prisma studio                    # open GUI browser for your data`} />
                    <CodeBlock lang="javascript" code={`// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  age       Int?
  role      String   @default("user")
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  posts     Post[]   // one-to-many relationship
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
}`} />
                </div>

                <div className="topic">
                    <h3>Prisma CRUD Operations</h3>
                    <CodeBlock lang="javascript" code={`const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ── CREATE ────────────────────────────────────────
const user = await prisma.user.create({
  data: { name: 'Sanketh', email: 'sanketh@example.com', age: 21 },
});

// ── READ ──────────────────────────────────────────
// Find many with filters
const users = await prisma.user.findMany({
  where:   { isActive: true, age: { gte: 18 } },
  orderBy: { createdAt: 'desc' },
  take:    10,
  skip:    0,
  select:  { id: true, name: true, email: true },  // projection
});

// Find one
const user = await prisma.user.findUnique({ where: { email: 'sanketh@example.com' } });
const user = await prisma.user.findFirst({ where: { role: 'admin' } });

// Include related data (JOIN)
const usersWithPosts = await prisma.user.findMany({
  include: { posts: { where: { published: true }, orderBy: { createdAt: 'desc' } } },
});

// ── UPDATE ────────────────────────────────────────
const updated = await prisma.user.update({
  where: { id: 1 },
  data:  { name: 'Updated Name' },
});

// Upsert — create if not exists, update if exists
const user = await prisma.user.upsert({
  where:  { email: 'sanketh@example.com' },
  update: { name: 'Updated' },
  create: { email: 'sanketh@example.com', name: 'Sanketh' },
});

// ── DELETE ────────────────────────────────────────
await prisma.user.delete({ where: { id: 1 } });

// ── Raw SQL (when Prisma isn't enough) ────────────
const users = await prisma.$queryRaw\`SELECT * FROM "User" WHERE age > \${18}\`;

// ── Transactions ──────────────────────────────────
const [user, post] = await prisma.$transaction([
  prisma.user.create({ data: { name: 'New User', email: 'new@example.com' } }),
  prisma.post.create({ data: { title: 'First Post', authorId: 1 } }),
]);`} />
                </div>
            </section>

            {/* ── DATABASES COMPARISON ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>05</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Databases Overview</div>
                        <h2>PostgreSQL vs MySQL vs SQLite</h2>
                    </div>
                </div>

                <div className="concept-grid">
                    {[
                        { icon: '🐘', name: 'PostgreSQL', desc: 'Most powerful, fully standards-compliant. Best choice for new production apps. JSONB, full-text search, advanced indexing. Free & open source.', use: 'Production apps, startups, enterprises' },
                        { icon: '🐬', name: 'MySQL', desc: 'World\'s most popular open source DB. Slightly simpler than Postgres, excellent performance. Powers WordPress, most legacy web apps.', use: 'CMS, legacy systems, high-read apps' },
                        { icon: '🪶', name: 'SQLite', desc: 'A single file. No server process. Perfect for development, testing, mobile apps, and desktop software. Not for concurrent writes.', use: 'Local dev, mobile, CLI tools, embedded' },
                        { icon: '🟥', name: 'Redis', desc: 'Key-value store in RAM. Blazing fast but volatile. Used for caching, sessions, pub/sub, leaderboards — not as primary DB.', use: 'Caching, sessions, real-time counters' },
                        { icon: '🏔️', name: 'PlanetScale', desc: 'Serverless MySQL platform. Branches databases like Git. Excellent for teams working on schema changes without downtime.', use: 'Serverless, team-based schema workflows' },
                        { icon: '🌊', name: 'Supabase', desc: 'Firebase alternative built on PostgreSQL. Adds auth, real-time subscriptions, and file storage on top of Postgres.', use: 'Full-stack apps needing Firebase-style features' },
                    ].map((db, i) => (
                        <div key={i} className="concept-card">
                            <div className="concept-icon">{db.icon}</div>
                            <h5>{db.name}</h5>
                            <p>{db.desc}</p>
                            <p style={{ marginTop: '8px', fontSize: '11px', color: 'var(--teal)', fontFamily: "'Space Mono', monospace" }}>Best for: {db.use}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header"><div><h2 style={{ fontFamily: "'Fraunces', serif" }}>Resources & Practice</h2></div></div>
                <div className="resource-grid">{RESOURCES.map((r, i) => <ResourceCard key={i} {...r} />)}</div>
                <PracticeArena games={GAMES} />
            </section>

            <footer className="footer">
                <p>SQL & Databases · Chapter 11 · FullStack Compass</p>
                <a href="https://sanketh.live/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'none', marginTop: '6px', display: 'block' }}>sanketh.live ↗</a>
            </footer>
        </>
    );
}