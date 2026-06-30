import React, { useState } from 'react';
import CodeBlock from '../components/CodeBlock.jsx';

const COLOR = 'var(--projects-color)';

const projects = [
    {
        id: 1, title: 'Task Tracker', difficulty: 'Beginner', status: 'done',
        concepts: ['useState','props','map()','filter()','events'],
        desc: 'Add, complete, delete tasks. Your first real React state management project.',
    },
    {
        id: 2, title: 'Expense Tracker', difficulty: 'Beginner', status: 'done',
        concepts: ['reduce()','multiple state','forms','number handling'],
        desc: 'Track income and expenses. Shows running balance. Introduces reduce().',
    },
    {
        id: 3, title: 'Notes App', difficulty: 'Beginner', status: 'done',
        concepts: ['search','filter()','localStorage','controlled inputs'],
        desc: 'Add, search, delete notes. Persist with localStorage.',
    },
    {
        id: 4, title: 'Weather App', difficulty: 'Intermediate', status: 'done',
        concepts: ['useEffect','fetch API','async/await','loading state'],
        desc: 'Fetch real weather by city using OpenWeatherMap API.',
    },
    {
        id: 5, title: 'Movie Search App', difficulty: 'Intermediate', status: 'next',
        concepts: ['useEffect','debounce','React Router','OMDB API'],
        desc: 'Search movies, display posters and ratings. Click for detail page.',
    },
    {
        id: 6, title: 'Shopping Cart', difficulty: 'Intermediate', status: 'todo',
        concepts: ['Context API','useReducer','localStorage'],
        desc: 'Product listing with cart. Context for global cart state.',
    },
    {
        id: 7, title: 'Blog REST API', difficulty: 'Intermediate', status: 'todo',
        concepts: ['Express','MongoDB','CRUD','Postman'],
        desc: 'Full CRUD API for blog posts. Test every route in Postman.',
    },
    {
        id: 8, title: 'Auth API', difficulty: 'Advanced', status: 'todo',
        concepts: ['JWT','bcrypt','protected routes','refresh tokens'],
        desc: 'Register, login, logout. JWT auth with protected routes.',
    },
    {
        id: 9, title: 'Full Stack Blog', difficulty: 'Advanced', status: 'todo',
        concepts: ['MERN','Cloudinary','rich text','auth'],
        desc: 'Complete blog with auth, image uploads, admin dashboard.',
    },
    {
        id: 10, title: 'Real-Time Chat', difficulty: 'Expert', status: 'todo',
        concepts: ['Socket.io','rooms','MERN','notifications'],
        desc: 'Live chat with rooms, typing indicators, message history.',
    },
];

const diffColor = { Beginner: '#16a34a', Intermediate: '#ca8a04', Advanced: '#ea580c', Expert: '#dc2626' };
const statusBadge = { done: { label: '✓ Done', bg: 'rgba(22,163,74,.12)', color: '#16a34a' }, next: { label: 'Next →', bg: 'rgba(234,179,8,.12)', color: '#ca8a04' }, todo: { label: 'Todo', bg: 'rgba(107,114,128,.1)', color: '#6b7280' } };

export default function MiniProjects() {
    const [open, setOpen] = useState(null);

    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{color:COLOR}}>Projects</span> — Build to Learn</div>
                <h1><span className="accent" style={{color:COLOR}}>Mini Projects</span><br/><em>Concepts become skills</em></h1>
                <p className="hero-desc">10 projects in order of complexity. Each one introduces exactly one new concept. Do all 10 and you will have built every pattern used in real MERN applications.</p>
                <div className="hero-stack">{['4 Done','6 To Build','React → Full Stack','Deploy Each'].map(t=><span key={t} className="stack-chip">{t}</span>)}</div>
            </section>

            {/* Project Cards */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>00</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{color:COLOR}}>Overview</div>
                        <h2>All 10 Projects — Your Roadmap</h2>
                    </div>
                </div>
                <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px,1fr))', gap:'12px', marginBottom:'32px'}}>
                    {projects.map(p => {
                        const badge = statusBadge[p.status];
                        return (
                            <div key={p.id}
                                onClick={() => setOpen(open === p.id ? null : p.id)}
                                style={{background:'var(--surface)', border:'1px solid var(--border2)', borderRadius:'12px', padding:'20px', cursor:'pointer', transition:'border-color .15s'}}
                            >
                                <div style={{display:'flex', justifyContent:'space-between', marginBottom:'8px'}}>
                                    <span style={{fontFamily:"'Space Mono',monospace", fontSize:'10px', background:badge.bg, color:badge.color, padding:'2px 8px', borderRadius:'3px'}}>{badge.label}</span>
                                    <span style={{fontSize:'10px', fontFamily:"'Space Mono',monospace", color:diffColor[p.difficulty]}}>{p.difficulty}</span>
                                </div>
                                <h4 style={{fontFamily:"'Fraunces',serif", marginBottom:'6px', fontSize:'16px'}}>
                                    <span style={{color:'var(--text3)', marginRight:'8px'}}>#{p.id}</span>{p.title}
                                </h4>
                                <p style={{fontSize:'12.5px', color:'var(--text2)', marginBottom:'10px', lineHeight:'1.6'}}>{p.desc}</p>
                                <div style={{display:'flex', flexWrap:'wrap', gap:'5px'}}>
                                    {p.concepts.map(c => <span key={c} style={{fontSize:'10px', fontFamily:"'Space Mono',monospace", background:'var(--bg3)', border:'1px solid var(--border2)', padding:'1px 6px', borderRadius:'3px', color:'var(--text3)'}}>{c}</span>)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ── PROJECT 5: MOVIE SEARCH ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>05</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{color:COLOR}}>Next Project</div>
                        <h2>Movie Search App — Full Walkthrough</h2>
                        <p className="chapter-intro">Search movies via OMDB API. Introduces debounce, React Router params, and loading skeletons. Free API key at omdbapi.com</p>
                    </div>
                </div>
                <div className="topic">
                    <h3>Setup</h3>
                    <CodeBlock lang="bash" code={`npm create vite@latest movie-search -- --template react
cd movie-search && npm install
npm install react-router-dom axios
npm run dev

# Get free API key: https://www.omdbapi.com/apikey.aspx
# Add to .env: VITE_OMDB_KEY=your_key`} />
                </div>
                <div className="topic">
                    <h3>Project Structure</h3>
                    <CodeBlock lang="javascript" code={`src/
 ├── components/
 │    ├── SearchBar.jsx      // debounced input
 │    ├── MovieCard.jsx      // poster + title + year
 │    ├── MovieGrid.jsx      // responsive grid
 │    └── Skeleton.jsx       // loading placeholder
 ├── pages/
 │    ├── Home.jsx           // search results
 │    └── MovieDetail.jsx    // single movie /:imdbID
 ├── hooks/
 │    └── useDebounce.js     // debounce hook
 ├── api/
 │    └── omdb.js            // axios instance
 └── App.jsx                 // router setup`} />
                </div>
                <div className="topic">
                    <h3>useDebounce Hook</h3>
                    <CodeBlock lang="javascript" code={`// hooks/useDebounce.js
import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer); // cleanup on next keystroke
    }, [value, delay]);

    return debouncedValue;
}

// Usage: debounce prevents API call on every keystroke
// User types "Avengers" → only fires when they stop for 500ms`} />
                </div>
                <div className="topic">
                    <h3>OMDB API Layer</h3>
                    <CodeBlock lang="javascript" code={`// api/omdb.js
import axios from 'axios';

const BASE = 'https://www.omdbapi.com';
const KEY  = import.meta.env.VITE_OMDB_KEY;

export const searchMovies = async (query, page = 1) => {
    const { data } = await axios.get(BASE, {
        params: { apikey: KEY, s: query, page, type: 'movie' },
    });
    if (data.Response === 'False') throw new Error(data.Error);
    return { movies: data.Search, total: parseInt(data.totalResults) };
};

export const getMovie = async (imdbID) => {
    const { data } = await axios.get(BASE, {
        params: { apikey: KEY, i: imdbID, plot: 'full' },
    });
    if (data.Response === 'False') throw new Error(data.Error);
    return data;
};`} />
                </div>
                <div className="topic">
                    <h3>Home Page — Search + Results</h3>
                    <CodeBlock lang="javascript" code={`// pages/Home.jsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../api/omdb';
import { useDebounce } from '../hooks/useDebounce';
import MovieCard from '../components/MovieCard';
import Skeleton from '../components/Skeleton';

export default function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query,    setQuery]    = useState(searchParams.get('q') || '');
    const [movies,   setMovies]   = useState([]);
    const [loading,  setLoading]  = useState(false);
    const [error,    setError]    = useState('');
    const [page,     setPage]     = useState(1);
    const [total,    setTotal]    = useState(0);

    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        if (!debouncedQuery.trim()) { setMovies([]); return; }
        const fetchMovies = async () => {
            try {
                setLoading(true); setError('');
                setSearchParams({ q: debouncedQuery });
                const result = await searchMovies(debouncedQuery, page);
                setMovies(page === 1 ? result.movies : prev => [...prev, ...result.movies]);
                setTotal(result.total);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, [debouncedQuery, page]);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '24px' }}>🎬 Movie Search</h1>

            <input
                value={query}
                onChange={e => { setQuery(e.target.value); setPage(1); }}
                placeholder="Search movies..."
                style={{ width: '100%', padding: '12px 16px', fontSize: '16px',
                         border: '1px solid #e5e7eb', borderRadius: '8px', marginBottom: '24px' }}
            />

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px,1fr))', gap: '16px' }}>
                {movies.map(m => <MovieCard key={m.imdbID} movie={m} />)}
                {loading && Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} />)}
            </div>

            {movies.length < total && !loading && (
                <button onClick={() => setPage(p => p + 1)}
                        style={{ display: 'block', margin: '32px auto', padding: '12px 32px',
                                 background: '#2563eb', color: 'white', border: 'none',
                                 borderRadius: '8px', cursor: 'pointer' }}>
                    Load More ({total - movies.length} remaining)
                </button>
            )}
        </div>
    );
}`} />
                </div>
                <div className="topic">
                    <h3>MovieCard + Detail Page</h3>
                    <CodeBlock lang="javascript" code={`// components/MovieCard.jsx
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
    const poster = movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.png';
    return (
        <Link to={\`/movie/\${movie.imdbID}\`}
              style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ borderRadius: '8px', overflow: 'hidden',
                          border: '1px solid #e5e7eb', transition: 'transform .2s' }}
                 onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                 onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <img src={poster} alt={movie.Title}
                     style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover' }} />
                <div style={{ padding: '10px' }}>
                    <p style={{ fontWeight: 600, fontSize: '13px', margin: '0 0 4px' }}
                       className="truncate">{movie.Title}</p>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{movie.Year}</p>
                </div>
            </div>
        </Link>
    );
}

// pages/MovieDetail.jsx
import { useParams, useNavigate } from 'react-router-dom';

export default function MovieDetail() {
    const { imdbID } = useParams();
    const navigate   = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMovie(imdbID).then(setMovie).finally(() => setLoading(false));
    }, [imdbID]);

    if (loading) return <p>Loading...</p>;
    if (!movie)  return <p>Movie not found</p>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 16px' }}>
            <button onClick={() => navigate(-1)}
                    style={{ marginBottom: '24px', background: 'none', border: 'none',
                             cursor: 'pointer', color: '#2563eb' }}>← Back</button>
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                <img src={movie.Poster} alt={movie.Title}
                     style={{ width: '200px', borderRadius: '8px' }} />
                <div>
                    <h1>{movie.Title} <span style={{color:'#6b7280', fontWeight:400}}>({movie.Year})</span></h1>
                    <p>⭐ {movie.imdbRating} · {movie.Runtime} · {movie.Genre}</p>
                    <p style={{ lineHeight: '1.7', marginTop: '16px' }}>{movie.Plot}</p>
                    <p><strong>Director:</strong> {movie.Director}</p>
                    <p><strong>Cast:</strong> {movie.Actors}</p>
                </div>
            </div>
        </div>
    );
}`} />
                </div>
                <div className="topic">
                    <h3>App.jsx — Router Setup</h3>
                    <CodeBlock lang="javascript" code={`// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home        from './pages/Home';
import MovieDetail from './pages/MovieDetail';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"              element={<Home />} />
                <Route path="/movie/:imdbID" element={<MovieDetail />} />
            </Routes>
        </BrowserRouter>
    );
}`} />
                </div>
            </section>

            {/* ── PROJECT 6: SHOPPING CART ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>06</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{color:COLOR}}>Context API</div>
                        <h2>Shopping Cart — Context + useReducer</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Cart Context with useReducer</h3>
                    <CodeBlock lang="javascript" code={`// context/CartContext.jsx
import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM': {
            const exists = state.find(i => i.id === action.payload.id);
            if (exists) {
                return state.map(i =>
                    i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
                );
            }
            return [...state, { ...action.payload, qty: 1 }];
        }
        case 'REMOVE_ITEM':
            return state.filter(i => i.id !== action.payload);
        case 'UPDATE_QTY':
            return state.map(i =>
                i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i
            ).filter(i => i.qty > 0);
        case 'CLEAR':
            return [];
        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(cartReducer, [], () => {
        try { return JSON.parse(localStorage.getItem('cart')) || []; } catch { return []; }
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const total    = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const itemCount = cart.reduce((sum, i) => sum + i.qty, 0);

    return (
        <CartContext.Provider value={{ cart, dispatch, total, itemCount }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);

// Usage in any component
function ProductCard({ product }) {
    const { dispatch } = useCart();
    return (
        <div>
            <p>{product.name} — ₹{product.price}</p>
            <button onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}>
                Add to Cart
            </button>
        </div>
    );
}

function CartIcon() {
    const { itemCount } = useCart();
    return <span>🛒 {itemCount}</span>;
}`} />
                </div>
            </section>

            {/* ── PROJECT 7: BLOG API ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>07</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{color:COLOR}}>Backend</div>
                        <h2>Blog REST API — Express + MongoDB</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Full Project Setup</h3>
                    <CodeBlock lang="bash" code={`mkdir blog-api && cd blog-api
npm init -y
npm install express mongoose dotenv cors bcryptjs jsonwebtoken
npm install -D nodemon

# Project structure
src/
 ├── models/      User.js, Post.js, Comment.js
 ├── routes/      auth.js, posts.js, comments.js
 ├── middleware/  auth.js, error.js
 ├── controllers/ authController.js, postController.js
 └── server.js`} />
                    <CodeBlock lang="javascript" code={`// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:      { type: String, required: true, trim: true, maxlength: 200 },
    slug:       { type: String, unique: true },
    content:    { type: String, required: true },
    excerpt:    { type: String, maxlength: 500 },
    author:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tags:       [String],
    coverImage: String,
    published:  { type: Boolean, default: false },
    views:      { type: Number, default: 0 },
    likes:      [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

// Auto-generate slug from title
postSchema.pre('save', function(next) {
    if (this.isModified('title')) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-');
    }
    next();
});

postSchema.index({ title: 'text', content: 'text', tags: 1 });

module.exports = mongoose.model('Post', postSchema);`} />
                    <CodeBlock lang="javascript" code={`// routes/posts.js — full CRUD
const router  = require('express').Router();
const Post    = require('../models/Post');
const { protect, optionalAuth } = require('../middleware/auth');

// GET /api/posts — public, with pagination & filtering
router.get('/', optionalAuth, async (req, res) => {
    const { tag, search, page = 1, limit = 10, sort = '-createdAt' } = req.query;

    const filter = { published: true };
    if (tag)    filter.tags    = tag;
    if (search) filter.$text   = { $search: search };

    const [posts, total] = await Promise.all([
        Post.find(filter)
            .populate('author', 'name avatar')
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .lean(),
        Post.countDocuments(filter),
    ]);

    res.json({ posts, total, page: +page, pages: Math.ceil(total / limit) });
});

// GET /api/posts/:slug
router.get('/:slug', async (req, res) => {
    const post = await Post.findOneAndUpdate(
        { slug: req.params.slug, published: true },
        { $inc: { views: 1 } },
        { new: true }
    ).populate('author', 'name avatar bio');

    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
});

// POST /api/posts — protected
router.post('/', protect, async (req, res) => {
    const post = await Post.create({ ...req.body, author: req.user.id });
    res.status(201).json(post);
});

// PUT /api/posts/:id
router.put('/:id', protect, async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id, author: req.user.id });
    if (!post) return res.status(404).json({ error: 'Not found or unauthorised' });
    Object.assign(post, req.body);
    await post.save();
    res.json(post);
});

// DELETE /api/posts/:id
router.delete('/:id', protect, async (req, res) => {
    await Post.findOneAndDelete({ _id: req.params.id, author: req.user.id });
    res.json({ message: 'Deleted' });
});

// POST /api/posts/:id/like
router.post('/:id/like', protect, async (req, res) => {
    const post   = await Post.findById(req.params.id);
    const liked  = post.likes.includes(req.user.id);
    liked
        ? post.likes.pull(req.user.id)
        : post.likes.push(req.user.id);
    await post.save();
    res.json({ likes: post.likes.length, liked: !liked });
});

module.exports = router;`} />
                </div>
            </section>

            <footer className="footer">
                <p>Mini Projects · FullStack Compass</p>
                <a href="https://sanketh.live/" target="_blank" rel="noopener noreferrer" style={{color:'var(--green)', textDecoration:'none', marginTop:'6px', display:'block'}}>sanketh.live ↗</a>
            </footer>
        </>
    );
}
