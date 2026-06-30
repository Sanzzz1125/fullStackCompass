import React from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';
import PracticeArena from '../components/PracticeArena.jsx';

const COLOR = 'var(--mongo-color)';

const RESOURCES = [
    { type: 'docs',      title: 'MongoDB Official Docs',      description: 'The definitive reference — CRUD, aggregation, indexes, Atlas, drivers.', url: 'https://www.mongodb.com/docs/' },
    { type: 'tutorial',  title: 'MongoDB University (Free)',   description: 'Free official courses. M001 (basics) and M121 (aggregation) are excellent.', url: 'https://learn.mongodb.com/' },
    { type: 'reference', title: 'MongoDB Aggregation Stages',  description: 'Complete list of all aggregation pipeline stages with examples.', url: 'https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/' },
    { type: 'tool',      title: 'MongoDB Compass',             description: 'Official GUI to browse, query, and visualise your MongoDB data.', url: 'https://www.mongodb.com/products/tools/compass' },
    { type: 'tool',      title: 'MongoDB Atlas',               description: 'Free cloud-hosted MongoDB. Easiest way to get started without local setup.', url: 'https://www.mongodb.com/atlas' },
    { type: 'reference', title: 'Query Operators Reference',   description: 'All $gt, $lt, $in, $or, $regex and other query operators documented.', url: 'https://www.mongodb.com/docs/manual/reference/operator/query/' },
];

const GAMES = [
    { emoji: '🍃', name: 'MongoDB University Labs', description: 'Hands-on interactive labs inside MongoDB University courses.', url: 'https://learn.mongodb.com/' },
    { emoji: '🔍', name: 'MongoDB Playground', description: 'Run MongoDB queries directly in your browser — no setup needed.', url: 'https://mongoplayground.net/' },
];

export default function MongoDB() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{ color: COLOR }}>MongoDB</span> — Chapter 09</div>
                <h1><span className="accent" style={{ color: COLOR }}>MongoDB</span><br /><em>The document database.</em></h1>
                <p className="hero-desc">MongoDB stores data as flexible JSON-like documents instead of rigid table rows. It powers startups and Fortune 500s alike — and it's the M in MERN. This chapter goes from zero (what is a database?) to advanced aggregation and Atlas.</p>
                <div className="hero-stack">
                    {['CRUD', 'Query Operators', 'Indexes', 'Aggregation', 'Atlas', 'Schema Design', 'Transactions'].map(t => <span key={t} className="stack-chip">{t}</span>)}
                </div>
            </section>

            {/* ── WHAT IS MONGODB ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>01</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Foundations</div>
                        <h2>What is MongoDB?</h2>
                        <p className="chapter-intro">MongoDB is a NoSQL database that stores data as documents (BSON — Binary JSON). Unlike SQL's rigid rows and columns, each document can have a different structure.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>SQL vs MongoDB — Key Concepts</h3>
                    <div className="table-wrap">
                        <table>
                            <thead><tr><th>SQL</th><th>MongoDB</th><th>Description</th></tr></thead>
                            <tbody>
                            <tr><td>Database</td><td>Database</td><td>Container for all your data</td></tr>
                            <tr><td>Table</td><td>Collection</td><td>Group of related records</td></tr>
                            <tr><td>Row / Record</td><td>Document</td><td>Single entry (JSON object)</td></tr>
                            <tr><td>Column</td><td>Field</td><td>A single property of a document</td></tr>
                            <tr><td>Primary Key</td><td>_id</td><td>Unique identifier (auto-generated ObjectId)</td></tr>
                            <tr><td>JOIN</td><td>$lookup</td><td>Combine data from multiple collections</td></tr>
                            <tr><td>WHERE</td><td>find() / $match</td><td>Filter documents</td></tr>
                            <tr><td>GROUP BY</td><td>$group</td><td>Aggregate grouped data</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="topic">
                    <h3>A MongoDB Document</h3>
                    <CodeBlock lang="javascript" code={`// A MongoDB document is a JSON object stored in a collection
// Every document automatically gets a unique _id (ObjectId)
{
  "_id": ObjectId("64a1b2c3d4e5f6789abc0001"),
  "name": "Sanketh",
  "email": "sanketh@example.com",
  "age": 21,
  "address": {                      // Embedded/nested document
    "city": "Chennai",
    "state": "Tamil Nadu",
    "pincode": "600001"
  },
  "skills": ["JavaScript", "React", "Node.js"],  // Array
  "isActive": true,
  "createdAt": ISODate("2024-08-01T10:30:00Z")
}

// Documents in the same collection DON'T need identical fields
// This is valid in the same "users" collection:
{
  "_id": ObjectId("64a1b2c3d4e5f6789abc0002"),
  "name": "Guest User"
  // No email, no address — that's fine!
}`} />
                </div>

                <div className="topic">
                    <h3>Installation & Setup</h3>
                    <CodeBlock lang="bash" code={`# Option 1: MongoDB Atlas (Recommended for beginners)
# 1. Go to https://mongodb.com/atlas → Create free account
# 2. Create a free M0 cluster
# 3. Click "Connect" → "Connect your application"
# 4. Copy the connection string: mongodb+srv://username:password@cluster.mongodb.net/dbname

# Option 2: Local MongoDB (macOS with Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Option 3: Local MongoDB (Ubuntu/Debian)
sudo apt-get install -y mongodb
sudo systemctl start mongod

# Connect via MongoDB Shell (mongosh)
mongosh                                    # connect to local
mongosh "mongodb+srv://cluster.mongodb.net" --username sanketh   # Atlas

# Connect from Node.js
npm install mongoose   # OR the native mongodb driver
# npm install mongodb  # native driver (lower level)`} />
                </div>

                <div className="topic">
                    <h3>Connecting in Node.js</h3>
                    <CodeBlock lang="javascript" code={`// Using the native MongoDB driver
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI; // your connection string
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('myapp');               // select database
    const users = db.collection('users');        // select collection

    // Now you can run CRUD operations
    const result = await users.findOne({ name: 'Sanketh' });
    console.log(result);
  } finally {
    await client.close();
  }
}
run();

// ──────────────────────────────────────────────
// Using Mongoose (ODM — see the Mongoose chapter)
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected via Mongoose'))
  .catch(err => console.error(err));`} />
                </div>
            </section>

            {/* ── CRUD ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>02</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Core Operations</div>
                        <h2>CRUD — Create, Read, Update, Delete</h2>
                        <p className="chapter-intro">Every database operation is one of four things: creating data, reading it, updating it, or deleting it. MongoDB's CRUD API is simple and expressive.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>CREATE — Inserting Documents</h3>
                    <CodeBlock lang="javascript" code={`// ── In mongosh (MongoDB Shell) ──────────────────

// Insert one document
db.users.insertOne({
  name: "Sanketh",
  email: "sanketh@example.com",
  age: 21,
  role: "admin"
});
// Returns: { acknowledged: true, insertedId: ObjectId("...") }

// Insert many documents at once
db.users.insertMany([
  { name: "Alice", email: "alice@example.com", age: 28, role: "user" },
  { name: "Bob",   email: "bob@example.com",   age: 22, role: "user" },
  { name: "Carol", email: "carol@example.com", age: 35, role: "moderator" },
]);
// Returns: { acknowledged: true, insertedCount: 3, insertedIds: {...} }

// MongoDB auto-generates _id if you don't provide one
// To set your own _id:
db.users.insertOne({ _id: "custom-id-123", name: "Custom" });`} />
                </div>

                <div className="topic">
                    <h3>READ — Querying Documents</h3>
                    <CodeBlock lang="javascript" code={`// ── Basic Queries ────────────────────────────────

// Find ALL documents
db.users.find();                           // returns cursor (all docs)
db.users.find().toArray();                 // convert to array

// Find with a filter
db.users.find({ role: "user" });           // all users with role="user"
db.users.findOne({ email: "alice@example.com" }); // first match

// Select specific fields (projection)
db.users.find({}, { name: 1, email: 1, _id: 0 });  // only name and email

// ── Sorting, Limiting, Skipping ──────────────────
db.users.find().sort({ age: 1 });          // ascending
db.users.find().sort({ age: -1 });         // descending
db.users.find().limit(10);                 // first 10 docs
db.users.find().skip(20).limit(10);        // pagination: page 3

// ── Counting ─────────────────────────────────────
db.users.countDocuments({ role: "user" }); // count matching docs
db.users.estimatedDocumentCount();         // fast approximate count

// ── Check if document exists ─────────────────────
const exists = await db.users.findOne({ email: "x@x.com" });
if (!exists) { /* not found */ }`} />
                </div>

                <div className="topic">
                    <h3>UPDATE — Modifying Documents</h3>
                    <CodeBlock lang="javascript" code={`// ── Update Operators ─────────────────────────────
// $set    — set/add fields
// $unset  — remove a field
// $inc    — increment/decrement a number
// $push   — add to an array
// $pull   — remove from an array
// $addToSet — add to array only if not already present
// $rename — rename a field

// updateOne — first match only
db.users.updateOne(
  { email: "sanketh@example.com" },   // filter
  { $set: { age: 22, city: "Chennai" } } // update
);

// updateMany — all matches
db.users.updateMany(
  { role: "user" },
  { $set: { isActive: true } }
);

// Increment a field
db.users.updateOne(
  { _id: ObjectId("...") },
  { $inc: { loginCount: 1 } }           // adds 1 each time
);

// Add to array
db.users.updateOne(
  { email: "alice@example.com" },
  { $push: { skills: "MongoDB" } }      // adds "MongoDB" to skills array
);

// Remove from array
db.users.updateOne(
  { email: "alice@example.com" },
  { $pull: { skills: "CSS" } }          // removes "CSS" from skills
);

// Remove a field entirely
db.users.updateOne(
  { _id: ObjectId("...") },
  { $unset: { temporaryToken: "" } }
);

// upsert: insert if no match found
db.users.updateOne(
  { email: "new@example.com" },
  { $set: { name: "New User", role: "user" } },
  { upsert: true }
);

// findOneAndUpdate — returns the updated document
const updated = await db.users.findOneAndUpdate(
  { _id: id },
  { $set: { name: "Updated" } },
  { returnDocument: 'after' }  // return NEW document
);`} />
                </div>

                <div className="topic">
                    <h3>DELETE — Removing Documents</h3>
                    <CodeBlock lang="javascript" code={`// deleteOne — remove first match
db.users.deleteOne({ email: "old@example.com" });

// deleteMany — remove all matches
db.users.deleteMany({ isActive: false });

// deleteMany with no filter — CLEAR the collection (dangerous!)
db.users.deleteMany({});

// findOneAndDelete — returns the deleted document
const deleted = await db.users.findOneAndDelete({ _id: id });
console.log('Deleted:', deleted.name);

// Drop entire collection
db.users.drop();

// Drop entire database
db.dropDatabase();`} />
                </div>
            </section>

            {/* ── QUERY OPERATORS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>03</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Querying</div>
                        <h2>Query Operators — Filter Anything</h2>
                        <p className="chapter-intro">MongoDB has a rich set of operators to filter, compare, and match documents. Mastering these unlocks powerful queries.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Comparison & Logical Operators</h3>
                    <CodeBlock lang="javascript" code={`// ── Comparison ───────────────────────────────────
db.users.find({ age: { $gt:  18 } });    // greater than
db.users.find({ age: { $gte: 18 } });    // greater than or equal
db.users.find({ age: { $lt:  65 } });    // less than
db.users.find({ age: { $lte: 65 } });    // less than or equal
db.users.find({ age: { $ne:  0  } });    // not equal
db.users.find({ role: { $in:  ["admin", "moderator"] } }); // in list
db.users.find({ role: { $nin: ["banned", "deleted"] }  }); // not in list

// Combine comparisons
db.users.find({ age: { $gte: 18, $lte: 65 } }); // between 18-65

// ── Logical ──────────────────────────────────────
// $and — all conditions must match
db.users.find({ $and: [ { age: { $gt: 18 } }, { role: "user" } ] });
// Shorthand (implicit $and with same field):
db.users.find({ age: { $gt: 18 }, role: "user" });

// $or — at least one condition must match
db.users.find({ $or: [ { role: "admin" }, { age: { $gt: 60 } } ] });

// $nor — none of the conditions match
db.users.find({ $nor: [ { role: "banned" }, { isActive: false } ] });

// $not — inverts a condition
db.users.find({ age: { $not: { $gt: 18 } } }); // age <= 18

// ── Element Operators ────────────────────────────
db.users.find({ phone: { $exists: true }  }); // field must exist
db.users.find({ phone: { $exists: false } }); // field must NOT exist
db.users.find({ age:   { $type: "number" } }); // type check

// ── Array Operators ──────────────────────────────
db.users.find({ skills: "MongoDB" });           // array contains "MongoDB"
db.users.find({ skills: { $all: ["React", "Node.js"] } }); // contains ALL
db.users.find({ skills: { $size: 3 } });        // array has exactly 3 items
db.users.find({ "skills.0": "JavaScript" });    // first element is "JavaScript"

// ── String / Regex ───────────────────────────────
db.users.find({ name: /^San/i });               // starts with "San" (case insensitive)
db.users.find({ email: { $regex: "@gmail.com$", $options: "i" } });

// ── Nested Document Queries (dot notation) ───────
db.users.find({ "address.city": "Chennai" });
db.users.find({ "address.pincode": { $in: ["600001", "600002"] } });`} />
                </div>
            </section>

            {/* ── INDEXES ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>04</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Performance</div>
                        <h2>Indexes — Making Queries Fast</h2>
                        <p className="chapter-intro">Without an index, MongoDB scans every single document (COLLSCAN). With an index, it jumps directly to the result (IXSCAN). For large collections, this is the difference between milliseconds and minutes.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Creating Indexes</h3>
                    <CodeBlock lang="javascript" code={`// ── Single Field Index ───────────────────────────
// 1 = ascending, -1 = descending
db.users.createIndex({ email: 1 });
db.users.createIndex({ age: -1 });

// Unique index — prevents duplicate values
db.users.createIndex({ email: 1 }, { unique: true });

// Sparse index — only indexes docs where the field exists
db.users.createIndex({ phone: 1 }, { sparse: true });

// TTL index — auto-deletes documents after N seconds
// Great for sessions, OTP tokens, temporary data
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });

// ── Compound Index ───────────────────────────────
// Use the ESR Rule: Equality → Sort → Range
// This index helps: find({ status: "active" }).sort({ createdAt: -1 })
db.users.createIndex({ status: 1, createdAt: -1 });

// ── Text Index — full-text search ────────────────
db.articles.createIndex({ title: "text", content: "text" });
// Query with text search
db.articles.find({ $text: { $search: "mongodb tutorial" } });

// ── Manage Indexes ───────────────────────────────
db.users.getIndexes();              // list all indexes
db.users.dropIndex({ email: 1 });   // drop specific index
db.users.dropIndexes();             // drop ALL (except _id)

// ── Analyze Query Performance ────────────────────
db.users.find({ email: "test@test.com" }).explain("executionStats");
// Look for:
//   "stage": "IXSCAN"    ← good — used an index
//   "stage": "COLLSCAN"  ← bad — scanned every document
//   "nReturned" vs "totalDocsExamined" — lower ratio is better`} />

                    <div className="callout warn">
                        <div className="callout-title">⚠️ Index Trade-offs</div>
                        <p>Indexes speed up <strong>reads</strong> but slow down <strong>writes</strong> (every insert/update must also update the index B-tree). Don't index every field — only fields you frequently query, sort, or join on. Monitor with <code>explain()</code>.</p>
                    </div>
                </div>
            </section>

            {/* ── AGGREGATION ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>05</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Analytics</div>
                        <h2>Aggregation Pipeline</h2>
                        <p className="chapter-intro">The aggregation pipeline transforms documents through a sequence of stages. Think of it as a data pipeline — each stage takes documents in and outputs transformed documents to the next stage.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Essential Pipeline Stages</h3>
                    <div className="table-wrap">
                        <table>
                            <thead><tr><th>Stage</th><th>What it does</th><th>SQL Equivalent</th></tr></thead>
                            <tbody>
                            <tr><td><code>$match</code></td><td>Filter documents (use early!)</td><td>WHERE</td></tr>
                            <tr><td><code>$group</code></td><td>Group documents + aggregate</td><td>GROUP BY</td></tr>
                            <tr><td><code>$project</code></td><td>Include/exclude/transform fields</td><td>SELECT</td></tr>
                            <tr><td><code>$sort</code></td><td>Sort documents</td><td>ORDER BY</td></tr>
                            <tr><td><code>$limit</code></td><td>Limit output count</td><td>LIMIT</td></tr>
                            <tr><td><code>$skip</code></td><td>Skip documents (pagination)</td><td>OFFSET</td></tr>
                            <tr><td><code>$lookup</code></td><td>Join with another collection</td><td>JOIN</td></tr>
                            <tr><td><code>$unwind</code></td><td>Deconstruct array fields</td><td>—</td></tr>
                            <tr><td><code>$addFields</code></td><td>Add computed fields</td><td>—</td></tr>
                            <tr><td><code>$count</code></td><td>Count documents</td><td>COUNT(*)</td></tr>
                            <tr><td><code>$facet</code></td><td>Run multiple pipelines</td><td>—</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="topic">
                    <h3>Real Pipeline Examples</h3>
                    <CodeBlock lang="javascript" code={`// ── Example 1: Sales Analytics ───────────────────
// Total revenue and order count per product category
db.orders.aggregate([
  { $match: { status: "completed" } },          // filter first!
  { $group: {
      _id: "$category",
      totalRevenue: { $sum: "$price" },
      orderCount:   { $sum: 1 },
      avgPrice:     { $avg: "$price" },
      maxPrice:     { $max: "$price" },
  }},
  { $sort: { totalRevenue: -1 } },              // highest revenue first
  { $limit: 5 },                                // top 5 categories
  { $project: {
      category:     "$_id",
      totalRevenue: { $round: ["$totalRevenue", 2] },
      orderCount:   1,
      avgPrice:     { $round: ["$avgPrice", 2] },
      _id:          0,
  }},
]);

// ── Example 2: $lookup (JOIN) ─────────────────────
// Get all orders with full user details attached
db.orders.aggregate([
  { $lookup: {
      from:         "users",        // collection to join
      localField:   "userId",       // field in orders
      foreignField: "_id",          // field in users
      as:           "user",         // output array name
  }},
  { $unwind: "$user" },             // convert array to object
  { $project: {
      orderId:      "$_id",
      total:        1,
      "user.name":  1,
      "user.email": 1,
      _id: 0,
  }},
]);

// ── Example 3: $unwind arrays ────────────────────
// Count how many users have each skill
db.users.aggregate([
  { $unwind: "$skills" },           // each skill becomes its own doc
  { $group: { _id: "$skills", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
]);

// ── Example 4: Date-based grouping ───────────────
// Monthly sign-up counts
db.users.aggregate([
  { $group: {
      _id: {
        year:  { $year:  "$createdAt" },
        month: { $month: "$createdAt" },
      },
      signups: { $sum: 1 },
  }},
  { $sort: { "_id.year": 1, "_id.month": 1 } },
]);`} />
                </div>
            </section>

            {/* ── TRANSACTIONS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>06</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Data Integrity</div>
                        <h2>ACID Transactions</h2>
                        <p className="chapter-intro">MongoDB 4.0+ supports multi-document ACID transactions. "All or nothing" — if any step fails, all changes are rolled back. Critical for financial operations, inventory, and anything where consistency matters.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Multi-Document Transactions</h3>
                    <CodeBlock lang="javascript" code={`// Requires a replica set (or Atlas — it has one built in)
// Use case: bank transfer — deduct from sender, add to receiver

const mongoose = require('mongoose');

async function transferMoney(senderId, receiverId, amount) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Step 1: Check sender has enough balance
    const sender = await Account.findById(senderId).session(session);
    if (sender.balance < amount) {
      throw new Error('Insufficient balance');
    }

    // Step 2: Deduct from sender
    await Account.updateOne(
      { _id: senderId },
      { $inc: { balance: -amount } },
      { session }                  // ← pass session to every operation
    );

    // Step 3: Add to receiver
    await Account.updateOne(
      { _id: receiverId },
      { $inc: { balance: +amount } },
      { session }
    );

    // Step 4: Create transaction record
    await Transaction.create([{
      from: senderId, to: receiverId, amount,
      type: 'transfer', createdAt: new Date(),
    }], { session });

    // ✅ Commit — all changes saved atomically
    await session.commitTransaction();
    console.log('Transfer successful');

  } catch (error) {
    // ❌ Rollback — ALL changes undone if any step failed
    await session.abortTransaction();
    throw error;

  } finally {
    session.endSession();
  }
}`} />
                </div>
            </section>

            {/* ── SCHEMA DESIGN ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>07</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Architecture</div>
                        <h2>Schema Design Patterns</h2>
                        <p className="chapter-intro">MongoDB is schema-flexible, but good schema design still matters enormously. The key decision: embed data inside a document, or reference it from another collection?</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Embedding vs Referencing</h3>
                    <CodeBlock lang="javascript" code={`// ── EMBEDDING (Denormalization) ──────────────────
// Store related data inside the same document
// Best for: data that is ALWAYS accessed together, 1:few relationships

{
  "_id": ObjectId("..."),
  "title": "Getting Started with MongoDB",
  "author": {                          // embedded author
    "name": "Sanketh",
    "avatar": "/images/sanketh.jpg"
  },
  "comments": [                        // embedded array (1:few is fine)
    { "user": "Alice", "text": "Great post!", "likes": 12 },
    { "user": "Bob",   "text": "Very helpful", "likes": 5 },
  ],
  "tags": ["mongodb", "nosql", "tutorial"]
}
// ✅ One query fetches everything
// ❌ If author updates their name, you must update all posts

// ── REFERENCING (Normalization) ───────────────────
// Store the ObjectId and look it up in another collection
// Best for: shared data, 1:many, many:many relationships

// posts collection
{
  "_id": ObjectId("post1"),
  "title": "Getting Started",
  "authorId": ObjectId("user1"),        // reference to users collection
  "categoryId": ObjectId("cat1"),
}

// users collection (separate)
{ "_id": ObjectId("user1"), "name": "Sanketh", "email": "..." }

// To fetch post + author:
db.posts.aggregate([
  { $lookup: { from: "users", localField: "authorId", foreignField: "_id", as: "author" } }
])
// ✅ Update author once, all posts see the change
// ❌ Requires a JOIN ($lookup) to get related data`} />

                    <div className="callout tip">
                        <div className="callout-title">💡 The Golden Rule</div>
                        <p><strong>Embed</strong> when you always query the data together and the nested data is small (comments, addresses, tags). <strong>Reference</strong> when data is shared between many documents, can grow unboundedly (posts on a user), or is accessed independently.</p>
                    </div>
                </div>
            </section>

            {/* ── ATLAS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>08</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Cloud</div>
                        <h2>MongoDB Atlas — Cloud Database</h2>
                        <p className="chapter-intro">Atlas is MongoDB's fully managed cloud service. Free tier (M0) gives you 512MB — enough for learning and small projects, no credit card needed.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Getting Started with Atlas</h3>
                    <CodeBlock lang="bash" code={`# Steps to connect your Node.js app to Atlas:

# 1. Create account at mongodb.com/atlas
# 2. Create a free M0 cluster (AWS/GCP/Azure)
# 3. In "Database Access" → add a database user (username + password)
# 4. In "Network Access" → Add IP Address → "Allow from Anywhere" (0.0.0.0/0)
# 5. Click "Connect" → "Connect your application" → copy the URI

# The URI looks like:
mongodb+srv://sanketh:<password>@cluster0.abc123.mongodb.net/myapp?retryWrites=true&w=majority

# 6. Add to your .env file:
MONGO_URI=mongodb+srv://sanketh:yourpassword@cluster0.abc123.mongodb.net/myapp

# 7. Connect in Node.js (never hardcode credentials!)
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);`} />

                    <div className="callout info">
                        <div className="callout-title">Atlas Features (Free + Paid)</div>
                        <p><strong>Free M0:</strong> 512MB storage, shared cluster, no credit card. <strong>Paid:</strong> Auto-scaling, backups, performance advisor, Atlas Search (full-text), Charts (dashboards), App Services (serverless), Vector Search (AI/ML).</p>
                    </div>
                </div>
            </section>

            {/* ── RESOURCES ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>09</div>
                    <div className="chapter-meta"><h2>Resources & Practice</h2></div>
                </div>
                <div className="resource-grid">{RESOURCES.map((r, i) => <ResourceCard key={i} {...r} />)}</div>
                <PracticeArena games={GAMES} />
            </section>

            <footer className="footer">
                <p>MongoDB · Chapter 09 · FullStack Compass</p>
                <a href="https://sanketh.live/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'none', marginTop: '6px', display: 'block' }}>sanketh.live ↗</a>
            </footer>
        </>
    );
}