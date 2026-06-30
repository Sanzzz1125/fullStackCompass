import React from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';
import PracticeArena from '../components/PracticeArena.jsx';

const COLOR = 'var(--mongo-color)';

const RESOURCES = [
    { type: 'docs',      title: 'Mongoose Official Docs',   description: 'Complete Mongoose documentation — schemas, models, queries, middleware.', url: 'https://mongoosejs.com/docs/' },
    { type: 'reference', title: 'Mongoose Schema Types',    description: 'All available SchemaTypes: String, Number, Date, Buffer, Boolean, ObjectId, Array, Map.', url: 'https://mongoosejs.com/docs/schematypes.html' },
    { type: 'reference', title: 'Mongoose Query API',       description: 'Full reference for find, findOne, updateOne, aggregate, and all query methods.', url: 'https://mongoosejs.com/docs/api/query.html' },
    { type: 'tutorial',  title: 'Mongoose Populate Guide',  description: 'Deep guide to populating referenced documents (Mongoose JOINs).', url: 'https://mongoosejs.com/docs/populate.html' },
];

const GAMES = [
    { emoji: '🦦', name: 'Build a Blog API', description: 'Classic practice: build a REST API with Mongoose models for users and posts.', url: 'https://mongoosejs.com/docs/guide.html' },
];

export default function Mongoose() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{ color: COLOR }}>Mongoose ODM</span> — Chapter 10</div>
                <h1><span className="accent" style={{ color: COLOR }}>Mongoose</span><br /><em>Schema, model, done.</em></h1>
                <p className="hero-desc">Mongoose is an Object Document Mapper (ODM) for MongoDB. It adds schema validation, middleware hooks, virtual fields, and a clean query API on top of the raw MongoDB driver — making your data layer robust and maintainable.</p>
                <div className="hero-stack">
                    {['Schemas', 'Models', 'Validation', 'Middleware', 'Populate', 'Virtuals', 'Transactions'].map(t => <span key={t} className="stack-chip">{t}</span>)}
                </div>
            </section>

            {/* ── WHY MONGOOSE ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>01</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Getting Started</div>
                        <h2>Why Mongoose?</h2>
                        <p className="chapter-intro">MongoDB is schema-less by default. Mongoose adds a schema layer so you can enforce structure, validate data, and write reusable model methods.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Raw Driver vs Mongoose</h3>
                    <div className="concept-grid">
                        {[
                            { icon: '🚫', name: 'No Validation', desc: 'Raw driver: insert anything — missing required fields, wrong types, duplicates. All allowed.', bad: true },
                            { icon: '✅', name: 'Schema Validation', desc: 'Mongoose: required fields, type checking, min/max, custom validators — all enforced automatically.' },
                            { icon: '🚫', name: 'Manual Queries', desc: 'Raw driver: verbose object syntax for every query.' , bad: true},
                            { icon: '✅', name: 'Clean Query API', desc: 'Mongoose: chainable methods — .find().where().limit().sort().populate().' },
                            { icon: '🚫', name: 'No Hooks', desc: 'Raw driver: no way to run code automatically on save/delete.' , bad: true},
                            { icon: '✅', name: 'Middleware Hooks', desc: 'Mongoose: hash passwords before save, log after delete, auto-set timestamps.' },
                        ].map((c, i) => (
                            <div key={i} className="concept-card">
                                <div className="concept-icon">{c.icon}</div>
                                <h5>{c.name}</h5>
                                <p>{c.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="topic">
                    <h3>Installation & Connection</h3>
                    <CodeBlock lang="bash" code={`npm install mongoose`} />
                    <CodeBlock lang="javascript" code={`// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(\`MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error(\`Error: \${error.message}\`);
    process.exit(1); // crash the process — can't run without DB
  }
};

module.exports = connectDB;

// server.js
require('dotenv').config();
const connectDB = require('./config/db');
connectDB(); // call before starting the server`} />
                </div>
            </section>

            {/* ── SCHEMAS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>02</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Data Modeling</div>
                        <h2>Schemas — Defining Your Data Shape</h2>
                        <p className="chapter-intro">A Schema defines the structure, types, and validation rules for documents in a collection. Think of it as a blueprint.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Schema Types & Options</h3>
                    <CodeBlock lang="javascript" code={`const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  // ── String ────────────────────────────────────
  name: {
    type:      String,
    required:  [true, 'Name is required'],       // [true, customMessage]
    trim:      true,                              // remove whitespace
    minlength: [2, 'Name must be at least 2 chars'],
    maxlength: [50, 'Name cannot exceed 50 chars'],
  },

  email: {
    type:     String,
    required: true,
    unique:   true,                               // creates a MongoDB unique index
    lowercase: true,                              // auto-converts to lowercase
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
  },

  // ── Number ────────────────────────────────────
  age: {
    type: Number,
    min:  [0,   'Age cannot be negative'],
    max:  [120, 'Age seems unrealistic'],
  },

  // ── Enum (only specific values allowed) ───────
  role: {
    type:    String,
    enum:    { values: ['user', 'moderator', 'admin'], message: '{VALUE} is not a valid role' },
    default: 'user',
  },

  // ── Boolean ───────────────────────────────────
  isActive:  { type: Boolean, default: true },
  isVerified:{ type: Boolean, default: false },

  // ── Date ──────────────────────────────────────
  birthday:  { type: Date },
  lastLogin: { type: Date, default: Date.now },

  // ── Array of strings ──────────────────────────
  skills:    [String],                            // shorthand for [{ type: String }]
  tags:      { type: [String], default: [] },

  // ── Nested / Embedded object ──────────────────
  address: {
    street:  String,
    city:    { type: String, required: true },
    pincode: String,
    country: { type: String, default: 'India' },
  },

  // ── Reference to another collection (ObjectId) ─
  createdBy: {
    type: Schema.Types.ObjectId,
    ref:  'User',                                 // for .populate()
  },

  // ── Password — excluded from queries by default ─
  password: {
    type:   String,
    select: false,                                // never returned unless explicitly selected
  },

  // ── Custom validation ─────────────────────────
  phone: {
    type: String,
    validate: {
      validator: (v) => /^[6-9]\d{9}$/.test(v),
      message:   props => \`\${props.value} is not a valid Indian phone number\`,
    },
  },

}, {
  timestamps: true,          // adds createdAt and updatedAt automatically
  toJSON:     { virtuals: true },   // include virtual fields in .toJSON()
  toObject:   { virtuals: true },   // include in .toObject()
});`} />
                </div>
            </section>

            {/* ── MODELS & CRUD ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>03</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>CRUD with Mongoose</div>
                        <h2>Models & Querying</h2>
                        <p className="chapter-intro">A Model is a class compiled from a Schema. It provides methods to create, query, update, and delete documents.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Creating a Model</h3>
                    <CodeBlock lang="javascript" code={`// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ /* ... schema ... */ });

// mongoose.model('CollectionName', schema)
// Mongoose auto-pluralises 'User' → 'users' collection
const User = mongoose.model('User', userSchema);

module.exports = User;`} />
                </div>

                <div className="topic">
                    <h3>CRUD Operations</h3>
                    <CodeBlock lang="javascript" code={`const User = require('./models/User');

// ── CREATE ────────────────────────────────────────

// Method 1: new + save
const user = new User({ name: 'Sanketh', email: 'sanketh@example.com', age: 21 });
const saved = await user.save();           // triggers pre('save') hooks

// Method 2: Model.create (shortcut)
const user2 = await User.create({
  name: 'Alice', email: 'alice@example.com', age: 28
});

// Create multiple
const users = await User.insertMany([
  { name: 'Bob',   email: 'bob@example.com' },
  { name: 'Carol', email: 'carol@example.com' },
]);

// ── READ ──────────────────────────────────────────

// Find all
const all = await User.find();
const users = await User.find({ role: 'user' });

// Find with projection (which fields to include/exclude)
const names = await User.find({}, 'name email -_id'); // string syntax
const names2 = await User.find({}, { name: 1, email: 1, _id: 0 });

// Find one
const user = await User.findOne({ email: 'sanketh@example.com' });
const byId = await User.findById('64a1b2c3...');   // shortcut for findOne({ _id })

// Lean — returns plain JS object instead of Mongoose document (faster)
const users = await User.find({ role: 'user' }).lean();

// Chaining query methods
const results = await User
  .find({ age: { $gte: 18 } })
  .select('name email age')
  .sort({ age: 1 })
  .limit(10)
  .skip(20)          // pagination
  .lean();

// With password (normally excluded by select: false)
const userWithPw = await User
  .findOne({ email: 'sanketh@example.com' })
  .select('+password');                   // explicitly include

// ── UPDATE ────────────────────────────────────────

// findByIdAndUpdate — returns document (before or after update)
const updated = await User.findByIdAndUpdate(
  id,
  { $set: { age: 22 } },
  { new: true, runValidators: true }     // new: return UPDATED doc; runValidators: run schema checks
);

// updateOne / updateMany
await User.updateOne({ email: 'alice@example.com' }, { $set: { isActive: true } });
await User.updateMany({ role: 'user' }, { $inc: { loginCount: 1 } });

// findOneAndUpdate with filter
const user = await User.findOneAndUpdate(
  { email: 'alice@example.com' },
  { lastLogin: new Date() },
  { new: true }
);

// ── DELETE ────────────────────────────────────────

await User.findByIdAndDelete(id);             // triggers pre('deleteOne') hooks
await User.deleteOne({ email: 'x@x.com' });
await User.deleteMany({ isActive: false });`} />
                </div>
            </section>

            {/* ── MIDDLEWARE ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>04</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Hooks</div>
                        <h2>Middleware (Pre/Post Hooks)</h2>
                        <p className="chapter-intro">Mongoose middleware runs functions before (pre) or after (post) certain operations. Use them to hash passwords, send emails, log events, and cascade deletes.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Pre and Post Hooks</h3>
                    <CodeBlock lang="javascript" code={`const bcrypt = require('bcryptjs');

// ── pre('save') — runs before every .save() ──────
userSchema.pre('save', async function(next) {
  // 'this' refers to the document being saved

  // Only re-hash if password was changed
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next(); // call next() to continue
});

// ── pre('save') — auto-generate slug ─────────────
postSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

// ── pre('find') — auto-filter deleted docs ───────
userSchema.pre(/^find/, function(next) {
  // 'this' is the query
  this.find({ deleted: { $ne: true } }); // soft-delete filter
  next();
});

// ── post('save') — send welcome email ────────────
userSchema.post('save', async function(doc) {
  if (doc.isNew) {
    await sendWelcomeEmail(doc.email, doc.name);
  }
});

// ── post('findOneAndDelete') — cascade delete ────
userSchema.post('findOneAndDelete', async function(doc) {
  if (doc) {
    // Delete all posts by this user when user is deleted
    await Post.deleteMany({ authorId: doc._id });
  }
});

// ── Instance method — compare password ───────────
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
// Usage: const isMatch = await user.comparePassword(req.body.password);

// ── Static method — find by email ─────────────────
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};
// Usage: const user = await User.findByEmail('sanketh@example.com');`} />
                </div>
            </section>

            {/* ── POPULATE ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>05</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Relationships</div>
                        <h2>Population — Mongoose Joins</h2>
                        <p className="chapter-intro">When you store an ObjectId reference to another collection, <code>.populate()</code> automatically fetches and replaces that reference with the full document — like a JOIN.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Setting Up & Using Populate</h3>
                    <CodeBlock lang="javascript" code={`// ── models/Post.js ───────────────────────────────
const postSchema = new Schema({
  title:    { type: String, required: true },
  content:  String,
  author:   { type: Schema.Types.ObjectId, ref: 'User' },   // reference
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  tags:     [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

// ── Basic populate ────────────────────────────────
const post = await Post.findById(id).populate('author');
// post.author is now the full User document, not just an ObjectId

// ── Select only specific fields from populate ─────
const post = await Post.findById(id)
  .populate('author', 'name email avatar');   // only these fields

// ── Multiple populates ────────────────────────────
const posts = await Post.find()
  .populate('author', 'name')
  .populate('category', 'name slug')
  .sort({ createdAt: -1 });

// ── Nested populate (author's posts) ──────────────
const user = await User.findById(id)
  .populate({
    path:     'posts',
    select:   'title createdAt',
    populate: { path: 'category', select: 'name' },  // populate within populate
  });

// ── Virtual populate (no stored array needed) ─────
// Instead of storing postIds[] on the user schema:
userSchema.virtual('posts', {
  ref:         'Post',           // target model
  localField:  '_id',            // field on User
  foreignField: 'author',        // field on Post that refers to User
  justOne:     false,            // return array
});
// Now: User.find().populate('posts') works without storing any array!`} />
                </div>
            </section>

            {/* ── VIRTUALS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>06</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Computed Fields</div>
                        <h2>Virtual Fields</h2>
                        <p className="chapter-intro">Virtuals are computed properties that are NOT stored in MongoDB. They're calculated on-the-fly when you access them.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Defining and Using Virtuals</h3>
                    <CodeBlock lang="javascript" code={`// Make sure schema has toJSON: { virtuals: true }
const userSchema = new Schema(
  { firstName: String, lastName: String, birthYear: Number },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// ── Virtual getter ─────────────────────────────────
userSchema.virtual('fullName').get(function() {
  return \`\${this.firstName} \${this.lastName}\`;
});

userSchema.virtual('age').get(function() {
  return new Date().getFullYear() - this.birthYear;
});

userSchema.virtual('profileUrl').get(function() {
  return \`/users/\${this._id}\`;
});

// ── Virtual setter ─────────────────────────────────
userSchema.virtual('fullName').set(function(name) {
  const [first, ...rest] = name.split(' ');
  this.firstName = first;
  this.lastName = rest.join(' ');
});

// Usage:
const user = await User.findById(id);
console.log(user.fullName);     // "Sanketh T" — computed, not stored
console.log(user.age);          // 21 — computed from birthYear
user.fullName = 'John Doe';     // setter splits and assigns firstName/lastName`} />
                </div>
            </section>

            {/* ── REAL WORLD SCHEMA EXAMPLE ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>07</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Real-World Example</div>
                        <h2>Complete Production-Ready Schema</h2>
                    </div>
                </div>

                <div className="topic">
                    <h3>User Model — Full Example</h3>
                    <CodeBlock lang="javascript" code={`// models/User.js — a complete, production-ready user model
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type:      String,
    required:  [true, 'Name is required'],
    trim:      true,
    maxlength: [50, 'Name cannot exceed 50 characters'],
  },
  email: {
    type:      String,
    required:  [true, 'Email is required'],
    unique:    true,
    lowercase: true,
    match:     [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  password: {
    type:      String,
    required:  [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select:    false,    // never returned in queries by default
  },
  role: {
    type:    String,
    enum:    ['user', 'moderator', 'admin'],
    default: 'user',
  },
  avatar:      { type: String, default: '/images/default-avatar.png' },
  bio:         { type: String, maxlength: 500 },
  isActive:    { type: Boolean, default: true },
  isVerified:  { type: Boolean, default: false },
  loginCount:  { type: Number, default: 0 },
  lastLogin:   Date,
  resetToken:  { type: String, select: false },
  resetExpiry: { type: Date,   select: false },
}, {
  timestamps: true,
  toJSON:   { virtuals: true },
  toObject: { virtuals: true },
});

// ── Indexes ──────────────────────────────────────
userSchema.index({ email: 1 });
userSchema.index({ role: 1, isActive: 1 });

// ── Virtual: full profile URL ─────────────────────
userSchema.virtual('profileUrl').get(function() {
  return \`/users/\${this._id}\`;
});

// ── Pre-save: hash password ───────────────────────
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// ── Method: check password ────────────────────────
userSchema.methods.correctPassword = async function(candidate) {
  return bcrypt.compare(candidate, this.password);
};

// ── Method: check if password changed after token issued ─
userSchema.methods.changedPasswordAfter = function(jwtTimestamp) {
  if (this.passwordChangedAt) {
    return parseInt(this.passwordChangedAt.getTime() / 1000) > jwtTimestamp;
  }
  return false;
};

// ── Static: find active users ─────────────────────
userSchema.statics.findActive = function() {
  return this.find({ isActive: true });
};

module.exports = mongoose.model('User', userSchema);`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header"><div><h2 style={{ fontFamily: "'Fraunces', serif" }}>Resources</h2></div></div>
                <div className="resource-grid">{RESOURCES.map((r, i) => <ResourceCard key={i} {...r} />)}</div>
                <PracticeArena games={GAMES} />
            </section>

            <footer className="footer">
                <p>Mongoose ODM · Chapter 10 · FullStack Compass</p>
                <a href="https://sanketh.live/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'none', marginTop: '6px', display: 'block' }}>sanketh.live ↗</a>
            </footer>
        </>
    );
}