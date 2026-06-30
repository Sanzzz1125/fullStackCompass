export const cloneData = {
    myntra: {
        name: 'Myntra',
        icon: '🛍️',
        color: '#ea580c',
        shortDesc: 'Product listing with complex filters, sorting, and cart management.',
        description: 'A full-scale e-commerce frontend architecture focusing on complex state management. Features multi-parameter filtering (size, color, brand, price), dynamic grid layouts, and a Context-driven cart and wishlist system.',
        techStack: ['React', 'Context API', 'Express', 'Mongoose', 'CSS Grid'],

        apiRoutes: [
            { method: 'GET', path: '/api/products', desc: 'Fetches products with dynamic $in queries for multi-select filters and sorting.' },
            { method: 'GET', path: '/api/products/:id', desc: 'Fetches single product details including size and stock availability.' },
            { method: 'POST', path: '/api/cart', desc: 'Adds item to user cart. Validates stock levels before insertion.' }
        ],

        componentTree: `src/
├── context/
│   └── ShopContext.jsx     (Manages active brands, price ranges, and sorting state)
├── pages/
│   └── Shop.jsx            (Main shop page containing Sidebar and Grid)
└── components/
    ├── SidebarFilters.jsx  (Checkbox lists and range sliders)
    ├── ProductGrid.jsx     (Maps products to cards)
    └── ProductCard.jsx     (Individual item with hover image-swap and wishlist heart)`,

        // THIS IS THE MASSIVE NEW ARRAY THAT HOLDS THE ENTIRE PROJECT
        fullCodebase: [
            {
                filename: 'server/models/Product.js',
                lang: 'javascript',
                code: `const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  brand: { type: String, required: true, index: true },
  description: String,
  price: { type: Number, required: true },
  discountPrice: Number,
  category: { type: String, enum: ['Men', 'Women', 'Kids', 'Beauty'], required: true },
  subCategory: String, // e.g., 'T-Shirts', 'Jeans'
  images: [{ type: String }], // Array of image URLs
  sizes: [{ 
    size: { type: String, enum: ['S', 'M', 'L', 'XL', 'XXL'] },
    stock: Number 
  }],
  colors: [{ type: String }],
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  }
}, { timestamps: true });

// Compound index for high-performance filtering queries
productSchema.index({ category: 1, brand: 1, price: 1 });

module.exports = mongoose.model('Product', productSchema);`
            },
            {
                filename: 'server/controllers/productController.js',
                lang: 'javascript',
                code: `const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    // 1. Extract query parameters sent from React Axios call
    // Example URL: /api/products?category=Men&brand=Nike,Puma&minPrice=500&maxPrice=2000
    const { category, brand, color, minPrice, maxPrice, sort } = req.query;
    
    // 2. Initialize an empty dynamic query object
    let queryBase = {};

    if (category) queryBase.category = category;

    // 3. Array matches ($in operator for multiple checkboxes)
    if (brand) {
      queryBase.brand = { $in: brand.split(',') }; 
    }
    
    if (color) {
      queryBase.colors = { $in: color.split(',') };
    }

    // 4. Range operators ($gte and $lte for pricing)
    if (minPrice || maxPrice) {
      queryBase.price = {};
      if (minPrice) queryBase.price.$gte = Number(minPrice);
      if (maxPrice) queryBase.price.$lte = Number(maxPrice);
    }

    // 5. Sorting logic
    let sortConfig = { createdAt: -1 }; // Default: Newest first
    if (sort === 'price_asc') sortConfig = { price: 1 };
    if (sort === 'price_desc') sortConfig = { price: -1 };
    if (sort === 'rating') sortConfig = { 'ratings.average': -1 };

    // 6. Execute the database query
    const products = await Product.find(queryBase).sort(sortConfig).limit(50);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });

  } catch (error) {
    res.status(500).json({ success: false, error: 'Database query failed' });
  }
};`
            },
            {
                filename: 'server/routes/productRoutes.js',
                lang: 'javascript',
                code: `const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/productController');

// Route: GET /api/products
router.get('/', getProducts);

module.exports = router;`
            },
            {
                filename: 'client/src/context/ShopContext.jsx',
                lang: 'javascript',
                code: `import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Master Filter State
  const [filters, setFilters] = useState({
    category: '',
    brand: [],
    minPrice: '',
    maxPrice: '',
    sort: 'newest'
  });

  // Re-fetch products whenever the filter state changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Convert array of brands into a comma-separated string for the URL
        const brandString = filters.brand.join(',');
        
        const res = await axios.get('/api/products', {
          params: {
            ...filters,
            brand: brandString
          }
        });
        setProducts(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const toggleBrand = (brandName) => {
    setFilters(prev => {
      const currentBrands = prev.brand;
      if (currentBrands.includes(brandName)) {
        return { ...prev, brand: currentBrands.filter(b => b !== brandName) };
      } else {
        return { ...prev, brand: [...currentBrands, brandName] };
      }
    });
  };

  const updateSort = (sortType) => {
    setFilters(prev => ({ ...prev, sort: sortType }));
  };

  return (
    <ShopContext.Provider value={{ products, loading, filters, toggleBrand, updateSort }}>
      {children}
    </ShopContext.Provider>
  );
};`
            },
            {
                filename: 'client/src/pages/Shop.jsx',
                lang: 'javascript',
                code: `import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import SidebarFilters from '../components/SidebarFilters';
import ProductGrid from '../components/ProductGrid';
import './Shop.css';

export default function Shop() {
  const { products, loading, updateSort } = useContext(ShopContext);

  return (
    <div className="shop-layout">
      {/* Left Column: Filters */}
      <aside className="shop-sidebar">
        <SidebarFilters />
      </aside>

      {/* Right Column: Content */}
      <main className="shop-main">
        <div className="shop-header">
          <h2>Men's T-Shirts <span>({products.length} items)</span></h2>
          
          <div className="sort-dropdown">
            <label>Sort By: </label>
            <select onChange={(e) => updateSort(e.target.value)}>
              <option value="newest">What's New</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Better Discount</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loader">Loading fresh styles...</div>
        ) : (
          <ProductGrid products={products} />
        )}
      </main>
    </div>
  );
}`
            },
            {
                filename: 'client/src/components/SidebarFilters.jsx',
                lang: 'javascript',
                code: `import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const BRANDS = ['Nike', 'Puma', 'Adidas', 'HRX', 'Wrogn'];

export default function SidebarFilters() {
  const { filters, toggleBrand } = useContext(ShopContext);

  return (
    <div className="filter-container">
      <h3>FILTERS</h3>
      
      <div className="filter-section">
        <h4>BRAND</h4>
        <div className="checkbox-list">
          {BRANDS.map(brand => (
            <label key={brand} className="checkbox-label">
              <input 
                type="checkbox" 
                checked={filters.brand.includes(brand)}
                onChange={() => toggleBrand(brand)}
              />
              <span className="checkmark"></span>
              {brand}
            </label>
          ))}
        </div>
      </div>
      
      <div className="filter-section">
        <h4>PRICE</h4>
        <div className="checkbox-list">
          <label className="checkbox-label"><input type="radio" name="price" /> Rs. 199 to Rs. 499</label>
          <label className="checkbox-label"><input type="radio" name="price" /> Rs. 500 to Rs. 999</label>
          <label className="checkbox-label"><input type="radio" name="price" /> Rs. 1000 to Rs. 1999</label>
        </div>
      </div>
    </div>
  );
}`
            },
            {
                filename: 'client/src/components/ProductCard.jsx',
                lang: 'javascript',
                code: `import React, { useState } from 'react';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Calculate discount percentage dynamically
  const discount = Math.round(((product.price - product.discountPrice) / product.price) * 100);

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="image-container">
        {/* Swap image on hover if a second image exists */}
        <img 
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]} 
          alt={product.name} 
        />
        
        {/* Wishlist Heart Icon */}
        <button 
          className={\`wishlist-btn \${isWishlisted ? 'active' : ''}\`}
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          {isWishlisted ? '♥' : '♡'}
        </button>

        {/* Quick Add overlay on hover */}
        {isHovered && (
          <div className="quick-add-overlay">
            <button>ADD TO CART</button>
          </div>
        )}
      </div>

      <div className="product-info">
        <h3 className="brand-name">{product.brand}</h3>
        <p className="product-name">{product.name}</p>
        
        <div className="price-row">
          <span className="current-price">Rs. {product.discountPrice}</span>
          <span className="original-price">Rs. {product.price}</span>
          <span className="discount-tag">({discount}% OFF)</span>
        </div>
      </div>
    </div>
  );
}`
            }
        ]
    },
    // ════════════════════════════════════════════════════════════════
    // 2. SPOTIFY CLONE
    // ════════════════════════════════════════════════════════════════
    spotify: {
        name: 'Spotify',
        icon: '🎵',
        color: '#1ed760',
        shortDesc: 'Music player with play/pause, progress bar, and playlist management.',
        description: 'A media-heavy architecture focusing on the HTML5 Audio API. It features persistent global player state, time-scrubbing calculations, and seamless component communication so music plays uninterrupted while navigating.',
        techStack: ['React', 'HTML5 Audio', 'useRef', 'Spotify API', 'CSS Flexbox'],

        apiRoutes: [
            { method: 'GET', path: '/api/playlists/me', desc: 'Fetches all custom playlists created by the currently authenticated user.' },
            { method: 'POST', path: '/api/playlists/:id/tracks', desc: 'Pushes a new Spotify track ID into the tracks array of a specific playlist.' },
            { method: 'GET', path: 'Spotify API /search', desc: 'External proxy call to Spotify Web API to search for artists, albums, or tracks.' }
        ],

        componentTree: `src/
├── context/
│   └── PlayerContext.jsx   (Global state for currentTrack, isPlaying, volume)
├── pages/
│   └── Dashboard.jsx       (Recently played and featured playlists)
└── components/
    ├── TrackList.jsx       (Reusable table rendering track rows)
    └── GlobalPlayer.jsx    (Fixed bottom bar with Audio ref and scrubber)`,

        fullCodebase: [
            {
                filename: 'server/models/Playlist.js',
                lang: 'javascript',
                code: `const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, maxlength: 300 },
  coverImage: { type: String, default: 'default-playlist.png' },
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  tracks: [{
    spotifyTrackId: { type: String, required: true }, // ID from Spotify Web API
    title: String,
    artist: String,
    durationMs: Number,
    previewUrl: String, // 30-second audio clip URL
    addedAt: { type: Date, default: Date.now }
  }],
  isPublic: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Playlist', playlistSchema);`
            },
            {
                filename: 'server/controllers/playlistController.js',
                lang: 'javascript',
                code: `const Playlist = require('../models/Playlist');

exports.addTrackToPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { trackData } = req.body;

    const playlist = await Playlist.findOne({ _id: playlistId, owner: req.user.id });
    if (!playlist) return res.status(404).json({ error: 'Playlist not found or unauthorized' });

    // Prevent duplicate tracks in the same playlist
    const isDuplicate = playlist.tracks.some(t => t.spotifyTrackId === trackData.id);
    if (isDuplicate) return res.status(400).json({ error: 'Track already exists in playlist' });

    playlist.tracks.push({
      spotifyTrackId: trackData.id,
      title: trackData.name,
      artist: trackData.artists[0].name,
      durationMs: trackData.duration_ms,
      previewUrl: trackData.preview_url
    });

    await playlist.save();
    res.status(200).json({ success: true, playlist });
  } catch (error) {
    res.status(500).json({ error: 'Server error processing track addition' });
  }
};`
            },
            {
                filename: 'client/src/context/PlayerContext.jsx',
                lang: 'javascript',
                code: `import React, { createContext, useContext, useState } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);

  const playTrack = (track, newQueue = null) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    if (newQueue) setQueue(newQueue);
  };

  const togglePlay = (status) => {
    setIsPlaying(status !== undefined ? status : !isPlaying);
  };

  const playNext = () => {
    if (queue.length === 0) return;
    const currentIndex = queue.findIndex(t => t.spotifyTrackId === currentTrack.spotifyTrackId);
    if (currentIndex < queue.length - 1) {
      playTrack(queue[currentIndex + 1]);
    }
  };

  return (
    <PlayerContext.Provider value={{ currentTrack, isPlaying, queue, playTrack, togglePlay, playNext }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);`
            },
            {
                filename: 'client/src/components/GlobalPlayer.jsx',
                lang: 'javascript',
                code: `import React, { useRef, useState, useEffect } from 'react';
import { usePlayer } from '../context/PlayerContext';

export default function GlobalPlayer() {
  const { currentTrack, isPlaying, togglePlay, playNext } = usePlayer();
  
  // 1. Direct reference to the invisible <audio> DOM element
  const audioRef = useRef(null);
  
  // 2. Local state for the progress bar scrubber
  const [progress, setProgress] = useState(0);

  // 3. React to global play/pause state changes
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(err => console.log('Autoplay blocked by browser', err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  // 4. Update the visual scrubber as the music plays
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  // 5. Allow user to click the bar to jump to a specific time
  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const clickPosition = e.nativeEvent.offsetX;
    const barWidth = e.currentTarget.clientWidth;
    const percentage = clickPosition / barWidth;
    
    // Command the audio node to jump to the new time
    audioRef.current.currentTime = percentage * audioRef.current.duration;
  };

  if (!currentTrack) return null; // Hide player if no music selected

  return (
    <div className="player-bottom-bar">
      {/* Invisible HTML5 Audio Engine */}
      <audio 
        ref={audioRef} 
        src={currentTrack.previewUrl} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={playNext}
        autoPlay
      />

      <div className="track-info">
        <img src={currentTrack.albumArt || '/default-art.png'} alt="Album" />
        <div className="track-text">
          <h4>{currentTrack.title}</h4>
          <p>{currentTrack.artist}</p>
        </div>
      </div>

      <div className="player-controls">
        <div className="playback-buttons">
          <button onClick={() => togglePlay(!isPlaying)} className="play-pause-btn">
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button onClick={playNext} className="skip-btn">⏭</button>
        </div>
        
        {/* Custom Progress Scrubber */}
        <div className="progress-bar-container" onClick={handleSeek}>
          <div className="progress-fill" style={{ width: \`\${progress}%\` }}></div>
        </div>
      </div>
    </div>
  );
}`
            }
        ]
    },

    // ════════════════════════════════════════════════════════════════
    // 3. TWITTER / X CLONE (EXPERT LEVEL)
    // ════════════════════════════════════════════════════════════════
    twitter: {
        name: 'Twitter / X',
        icon: '🐦',
        color: '#1da1f2',
        shortDesc: 'Real-time social feed with WebSockets, retweets, and media uploads.',
        description: 'A master-level distributed system architecture. This clone utilizes Socket.io for instantaneous timeline updates, complex MongoDB aggregation pipelines for timeline generation, and infinite scrolling intersection observers.',
        techStack: ['MERN', 'Socket.io', 'Cloudinary', 'Infinite Scroll', 'JWT'],

        apiRoutes: [
            { method: 'GET', path: '/api/feed/timeline', desc: 'Aggregates tweets from users the client follows, sorted chronologically with pagination limits.' },
            { method: 'POST', path: '/api/tweets', desc: 'Saves new tweet to database and broadcasts io.emit() to followers.' },
            { method: 'PUT', path: '/api/tweets/:id/like', desc: 'Atomic database transaction incrementing like count and triggering Socket.io broadcast.' }
        ],

        componentTree: `src/
├── context/
│   └── SocketContext.jsx   (Maintains persistent WS connection and active listeners)
├── pages/
│   └── Feed.jsx            (Infinite scrolling timeline with IntersectionObserver)
└── components/
    ├── ComposeBox.jsx      (Textarea with character counters and media attachments)
    └── TweetNode.jsx       (Complex nested component handling replies and action buttons)`,

        fullCodebase: [
            {
                filename: 'server/models/Tweet.js',
                lang: 'javascript',
                code: `const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  text: { 
    type: String, 
    maxlength: 280 
  },
  mediaUrls: [{ String }],
  isRetweet: { type: Boolean, default: false },
  originalTweet: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Tweet' 
  },
  metrics: {
    likesCount: { type: Number, default: 0 },
    retweetsCount: { type: Number, default: 0 },
    repliesCount: { type: Number, default: 0 }
  },
  hashtags: [{ type: String, index: true }]
}, { timestamps: true });

// High-performance indexing for timeline generation
tweetSchema.index({ author: 1, createdAt: -1 });

module.exports = mongoose.model('Tweet', tweetSchema);`
            },
            {
                filename: 'server/socket/io.js',
                lang: 'javascript',
                code: `const socketIo = require('socket.io');

let io;

module.exports = {
  init: (server) => {
    io = socketIo(server, {
      cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"]
      }
    });

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      // Users join a personal room based on their User ID to receive targeted updates
      socket.on('join_user_room', (userId) => {
        socket.join(userId);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });

    return io;
  },
  getIo: () => {
    if (!io) throw new Error('Socket.io not initialized!');
    return io;
  }
};`
            },
            {
                filename: 'server/controllers/tweetController.js',
                lang: 'javascript',
                code: `const Tweet = require('../models/Tweet');
const User = require('../models/User');
const io = require('../socket/io');

exports.createTweet = async (req, res) => {
  try {
    const { text, mediaUrls, hashtags } = req.body;
    
    // 1. Save to Database
    const newTweet = await Tweet.create({
      author: req.user.id,
      text,
      mediaUrls,
      hashtags
    });

    // Populate author details before sending over socket
    await newTweet.populate('author', 'name handle avatar');

    // 2. Find all followers of this user to broadcast the tweet instantly
    const currentUser = await User.findById(req.user.id).select('followers');
    
    // 3. Emit real-time update to all followers' active socket connections
    const socketIo = io.getIo();
    currentUser.followers.forEach(followerId => {
      socketIo.to(followerId.toString()).emit('new_timeline_tweet', newTweet);
    });

    res.status(201).json({ success: true, tweet: newTweet });
  } catch (error) {
    res.status(500).json({ error: 'Failed to publish tweet' });
  }
};`
            },
            {
                filename: 'client/src/context/SocketContext.jsx',
                lang: 'javascript',
                code: `import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Only establish connection if user is logged in
    if (user) {
      const newSocket = io(import.meta.env.VITE_API_URL);
      setSocket(newSocket);

      // Join personal room to receive targeted feed updates
      newSocket.emit('join_user_room', user._id);

      return () => newSocket.close(); // Cleanup on unmount/logout
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);`
            },
            {
                filename: 'client/src/pages/Feed.jsx',
                lang: 'javascript',
                code: `import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSocket } from '../context/SocketContext';
import axios from 'axios';
import TweetNode from '../components/TweetNode';

export default function Feed() {
  const { socket } = useSocket();
  const [tweets, setTweets] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // 1. Setup IntersectionObserver for Infinite Scrolling
  const observer = useRef();
  const lastTweetRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      // If the user scrolls to the absolute bottom of the feed, fetch next page
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [hasMore]);

  // 2. Fetch Historical Database Records
  useEffect(() => {
    const fetchTimeline = async () => {
      const res = await axios.get(\`/api/feed/timeline?page=\${page}&limit=20\`);
      setTweets(prev => [...prev, ...res.data.tweets]);
      setHasMore(res.data.tweets.length === 20); // If less than 20 returned, we hit the end
    };
    fetchTimeline();
  }, [page]);

  // 3. Listen for Live WebSocket Injections
  useEffect(() => {
    if (!socket) return;
    
    // Instantly inject new tweets at the top of the feed without a page refresh
    const handleNewTweet = (newTweet) => {
      setTweets(prevTweets => [newTweet, ...prevTweets]);
    };

    socket.on('new_timeline_tweet', handleNewTweet);
    return () => socket.off('new_timeline_tweet', handleNewTweet);
  }, [socket]);

  return (
    <div className="feed-container">
      <div className="feed-header"><h2>Home</h2></div>
      
      <div className="tweet-stream">
        {tweets.map((tweet, index) => {
          // Attach the observer ref ONLY to the absolute last element in the array
          if (tweets.length === index + 1) {
            return <div ref={lastTweetRef} key={tweet._id}><TweetNode data={tweet} /></div>;
          }
          return <TweetNode key={tweet._id} data={tweet} />;
        })}
      </div>
      
      {!hasMore && <div className="end-of-feed">You are completely caught up!</div>}
    </div>
  );
}`
            }
        ]
    },
    // ════════════════════════════════════════════════════════════════
    // 4. YOUTUBE CLONE (ADVANCED LEVEL)
    // ════════════════════════════════════════════════════════════════
    youtube: {
        name: 'YouTube',
        icon: '▶️',
        color: '#ff0000',
        shortDesc: 'Media catalog with external API integration, dynamic routing, and embedded players.',
        description: 'A data-heavy architectural clone focused on third-party API orchestration. It relies heavily on React Router for dynamic URL parameters, iframe embedding for secure media playback, and parallel asynchronous requests to manage complex video metadata and comments.',
        techStack: ['React Router', 'YouTube API v3', 'Axios', 'CSS Flexbox/Grid'],

        apiRoutes: [
            { method: 'GET', path: 'https://youtube.googleapis.com/youtube/v3/videos', desc: 'External: Fetches trending videos or specific IDs with chart=mostPopular parameters.' },
            { method: 'GET', path: 'https://youtube.googleapis.com/youtube/v3/search', desc: 'External: Executes search queries against YouTube catalog and returns metadata.' },
            { method: 'POST', path: '/api/users/history', desc: 'Local API: Saves the currently playing Video ID to the user\'s MongoDB history array.' }
        ],

        componentTree: `src/
├── api/
│   └── youtubeClient.js    (Axios instance pre-configured with Google API Keys)
├── pages/
│   ├── HomeFeed.jsx        (Grid of category chips and video thumbnails)
│   ├── SearchResults.jsx   (Vertical list rendering based on ?query= params)
│   └── WatchVideo.jsx      (Theatre mode player, description accordion, and comments)
└── components/
    ├── Header.jsx          (Hamburger menu trigger and global search bar)
    ├── DrawerSidebar.jsx   (Slide-out menu for History, Watch Later, and Library)
    └── VideoCard.jsx       (Thumbnail with absolute positioned duration tag)`,

        fullCodebase: [
            {
                filename: 'server/models/UserActivity.js',
                lang: 'javascript',
                code: `// Even when using YouTube's API for video data, you need a local DB for user accounts
const mongoose = require('mongoose');

const userActivitySchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  watchHistory: [{
    videoId: { type: String, required: true }, // Storing the YouTube API Video ID
    title: String,
    thumbnailUrl: String,
    channelTitle: String,
    watchedAt: { type: Date, default: Date.now },
    progressSeconds: { type: Number, default: 0 }
  }],
  watchLater: [String], // Array of YouTube Video IDs
  likedVideos: [String],
  customPlaylists: [{
    title: String,
    isPrivate: { type: Boolean, default: true },
    videoIds: [String]
  }]
}, { timestamps: true });

// Index for fast history retrieval
userActivitySchema.index({ user: 1 });

module.exports = mongoose.model('UserActivity', userActivitySchema);`
            },
            {
                filename: 'server/controllers/activityController.js',
                lang: 'javascript',
                code: `const UserActivity = require('../models/UserActivity');

exports.addToHistory = async (req, res) => {
  try {
    const { videoId, title, thumbnailUrl, channelTitle } = req.body;
    
    let activity = await UserActivity.findOne({ user: req.user.id });
    if (!activity) {
      activity = new UserActivity({ user: req.user.id });
    }

    // Remove video if it already exists in history to bring it to the top
    activity.watchHistory = activity.watchHistory.filter(v => v.videoId !== videoId);
    
    // Add to the beginning of the array (most recent first)
    activity.watchHistory.unshift({
      videoId, title, thumbnailUrl, channelTitle, watchedAt: Date.now()
    });

    // Cap history at 500 items to prevent massive document sizes
    if (activity.watchHistory.length > 500) {
      activity.watchHistory.pop();
    }

    await activity.save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update watch history' });
  }
};`
            },
            {
                filename: 'client/src/api/youtubeClient.js',
                lang: 'javascript',
                code: `import axios from 'axios';

// Centralized Axios instance for external API calls
// Keeps the components clean and manages the API key securely via environment variables
export default axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3',
  params: {
    // VITE_ prefix is required for Vite to expose the variable to the frontend
    key: import.meta.env.VITE_YOUTUBE_API_KEY 
  }
});`
            },
            {
                filename: 'client/src/pages/WatchVideo.jsx',
                lang: 'javascript',
                code: `import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import youtubeClient from '../api/youtubeClient';
import axios from 'axios'; // Local API calls
import './WatchVideo.css';

export default function WatchVideo() {
  const { videoId } = useParams(); // Extract ID directly from the browser URL (e.g., /watch/:videoId)
  
  const [videoData, setVideoData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // 1. Parallel Request Execution Engine
    // We use Promise.all to fetch the video details AND the comments at the exact same time
    const fetchWatchData = async () => {
      try {
        const [videoRes, commentsRes] = await Promise.all([
          youtubeClient.get('/videos', {
            params: { part: 'snippet,statistics', id: videoId }
          }),
          youtubeClient.get('/commentThreads', {
            params: { part: 'snippet', videoId: videoId, maxResults: 20 }
          })
        ]);

        const videoInfo = videoRes.data.items[0];
        setVideoData(videoInfo);
        setComments(commentsRes.data.items);

        // 2. Dependent Request (Requires channelId from the first request)
        const channelRes = await youtubeClient.get('/channels', {
          params: { part: 'snippet,statistics', id: videoInfo.snippet.channelId }
        });
        setChannelData(channelRes.data.items[0]);

        // 3. Save to local MongoDB History (Fire and forget, no await needed)
        axios.post('/api/users/history', {
          videoId,
          title: videoInfo.snippet.title,
          thumbnailUrl: videoInfo.snippet.thumbnails.high.url,
          channelTitle: videoInfo.snippet.channelTitle
        }, {
          headers: { Authorization: \`Bearer \${localStorage.getItem('token')}\` }
        }).catch(err => console.log('History save skipped (unauthenticated)'));

      } catch (error) {
        console.error('Failed to load video matrix:', error);
      }
    };

    fetchWatchData();
    window.scrollTo(0, 0); // Reset viewport to top on new video load
  }, [videoId]);

  if (!videoData) return <div className="loader" />;

  return (
    <div className="watch-container">
      <div className="watch-primary-column">
        {/* Secure Media Embed Engine */}
        <div className="iframe-wrapper">
          <iframe 
            src={\`https://www.youtube.com/embed/\${videoId}?autoplay=1\`}
            title={videoData.snippet.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Dynamic Metadata Output */}
        <h2 className="video-title">{videoData.snippet.title}</h2>
        <div className="video-action-bar">
          <div className="channel-block">
            <img src={channelData?.snippet.thumbnails.default.url} alt="Channel" />
            <div className="channel-text">
              <h4>{videoData.snippet.channelTitle}</h4>
              <p>{parseInt(channelData?.statistics.subscriberCount).toLocaleString()} subscribers</p>
            </div>
          </div>
          <div className="metrics-block">
            <button className="like-btn">👍 {parseInt(videoData.statistics.likeCount).toLocaleString()}</button>
          </div>
        </div>
      </div>
    </div>
  );
}`
            }
        ]
    },

    // ════════════════════════════════════════════════════════════════
    // 5. ZOMATO / SWIGGY CLONE (INTERMEDIATE LEVEL)
    // ════════════════════════════════════════════════════════════════
    zomato: {
        name: 'Zomato / Swiggy',
        icon: '🍕',
        color: '#cb202d',
        shortDesc: 'Restaurant listing, advanced food cart state, and order tracking.',
        description: 'A robust e-commerce clone focusing on relational database architecture. Features include nested menu items within restaurants, geographical coordinates, complex Context API logic for grouping cart items by restaurant, and checkout calculation pipelines.',
        techStack: ['React', 'MERN', 'Geolocation', 'Context API'],

        apiRoutes: [
            { method: 'GET', path: '/api/restaurants', desc: 'Fetches restaurants based on user geolocation or text search queries.' },
            { method: 'GET', path: '/api/restaurants/:id', desc: 'Fetches specific restaurant details and populates its full menu categories.' },
            { method: 'POST', path: '/api/orders', desc: 'Calculates tax, delivery fees, validates items, and generates an order record.' }
        ],

        componentTree: `src/
├── context/
│   ├── CartContext.jsx     (Handles adding items, quantity increment/decrement, and total calculation)
│   └── LocationContext.jsx (Browser geolocation API wrapper)
├── pages/
│   ├── Home.jsx            (Search bar, cuisine filters, and restaurant grid)
│   ├── RestaurantMenu.jsx  (Categorized menu listing with Add/Remove buttons)
│   └── Checkout.jsx        (Cart review, address selection, and payment mock)
└── components/
    ├── RestaurantCard.jsx  (Image, rating, delivery time, and cost for two)
    ├── MenuItem.jsx        (Food details, veg/non-veg badge, and custom add logic)
    └── StickyCartBar.jsx   (Appears at bottom of screen when items are in cart)`,

        fullCodebase: [
            {
                filename: 'server/models/Restaurant.js',
                lang: 'javascript',
                code: `const mongoose = require('mongoose');

// We use an embedded schema for menu items because they tightly belong to the restaurant
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  category: { type: String, required: true }, // e.g., 'Starters', 'Main Course', 'Desserts'
  isVeg: { type: Boolean, required: true },
  isAvailable: { type: Boolean, default: true }
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  cuisines: [{ type: String }], // e.g., ['North Indian', 'Chinese', 'Biryani']
  coverImage: String,
  location: {
    address: String,
    city: String,
    // GeoJSON format for geospatial queries (finding restaurants near the user)
    coordinates: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number] } // [longitude, latitude]
    }
  },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  deliveryTime: { type: Number }, // in minutes
  costForTwo: { type: Number },
  menu: [menuItemSchema] // Embedded documents
}, { timestamps: true });

// Create a 2dsphere index for location-based searching
restaurantSchema.index({ 'location.coordinates': '2dsphere' });

module.exports = mongoose.model('Restaurant', restaurantSchema);`
            },
            {
                filename: 'server/controllers/orderController.js',
                lang: 'javascript',
                code: `const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');

exports.createOrder = async (req, res) => {
  try {
    const { restaurantId, items, deliveryAddress } = req.body;

    // 1. Fetch the restaurant to validate item prices (Never trust frontend prices!)
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });

    let itemTotal = 0;
    const validatedItems = items.map(cartItem => {
      // Find the corresponding menu item in the database
      const dbItem = restaurant.menu.id(cartItem.menuItemId);
      if (!dbItem) throw new Error(\`Item \${cartItem.menuItemId} not found in menu\`);
      
      const price = dbItem.price;
      itemTotal += price * cartItem.quantity;
      
      return {
        menuItem: dbItem._id,
        name: dbItem.name,
        price: price,
        quantity: cartItem.quantity
      };
    });

    // 2. Calculate final bill
    const deliveryFee = itemTotal > 500 ? 0 : 40;
    const tax = Math.round(itemTotal * 0.05); // 5% GST
    const grandTotal = itemTotal + deliveryFee + tax;

    // 3. Create the order record
    const newOrder = await Order.create({
      user: req.user.id,
      restaurant: restaurantId,
      items: validatedItems,
      bill: { itemTotal, deliveryFee, tax, grandTotal },
      deliveryAddress,
      status: 'Placed'
    });

    res.status(201).json({ success: true, orderId: newOrder._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};`
            },
            {
                filename: 'client/src/context/CartContext.jsx',
                lang: 'javascript',
                code: `import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ restaurantId: null, items: [] });

  const addToCart = (restaurantId, item) => {
    setCart(prev => {
      // Rule: Can only order from one restaurant at a time
      if (prev.restaurantId && prev.restaurantId !== restaurantId) {
        alert('You can only order from one restaurant at a time. Clear cart first?');
        return prev; // Reject addition
      }

      const existingItemIndex = prev.items.findIndex(i => i._id === item._id);
      let newItems = [...prev.items];

      if (existingItemIndex > -1) {
        // Increment quantity if item already in cart
        newItems[existingItemIndex].quantity += 1;
      } else {
        // Add new item with quantity 1
        newItems.push({ ...item, quantity: 1 });
      }

      return { restaurantId, items: newItems };
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => {
      const existingItemIndex = prev.items.findIndex(i => i._id === itemId);
      let newItems = [...prev.items];

      if (existingItemIndex > -1) {
        if (newItems[existingItemIndex].quantity > 1) {
          newItems[existingItemIndex].quantity -= 1;
        } else {
          // Remove completely if quantity drops to 0
          newItems.splice(existingItemIndex, 1);
        }
      }

      // If cart is completely empty, reset restaurantId lock
      return { 
        restaurantId: newItems.length > 0 ? prev.restaurantId : null, 
        items: newItems 
      };
    });
  };

  const clearCart = () => setCart({ restaurantId: null, items: [] });

  const getItemQuantity = (itemId) => {
    const item = cart.items.find(i => i._id === itemId);
    return item ? item.quantity : 0;
  };

  const cartTotal = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getItemQuantity, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);`
            },
            {
                filename: 'client/src/components/MenuItem.jsx',
                lang: 'javascript',
                code: `import React from 'react';
import { useCart } from '../context/CartContext';

export default function MenuItem({ item, restaurantId }) {
  // Pull functions and state from the global Cart Context
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  
  // Check how many of THIS specific item are currently in the cart
  const quantity = getItemQuantity(item._id);

  return (
    <div className="menu-item-card">
      <div className="item-details">
        <span className={\`veg-badge \${item.isVeg ? 'veg' : 'non-veg'}\`}>●</span>
        <h4>{item.name}</h4>
        <p className="price">₹{item.price}</p>
        <p className="desc">{item.description}</p>
      </div>
      
      <div className="item-image-box">
        {item.image && <img src={item.image} alt={item.name} />}
        
        {/* Conditional Add to Cart Button Logic */}
        <div className="cart-controls">
          {quantity === 0 ? (
            <button className="add-btn" onClick={() => addToCart(restaurantId, item)}>
              ADD
            </button>
          ) : (
            <div className="quantity-stepper">
              <button onClick={() => removeFromCart(item._id)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => addToCart(restaurantId, item)}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}`
            }
        ]
    },

    // ════════════════════════════════════════════════════════════════
    // 6. INSTAGRAM CLONE (ADVANCED LEVEL)
    // ════════════════════════════════════════════════════════════════
    instagram: {
        name: 'Instagram',
        icon: '📸',
        color: '#E1306C',
        shortDesc: 'Image-heavy social network with likes, comments, and media storage.',
        description: 'A masterclass in handling multipart form data and third-party bucket storage. This clone focuses on user-generated media, complex relational data (users, posts, followers, comments, likes), and highly optimized infinite scroll grid UIs.',
        techStack: ['MERN', 'Cloudinary', 'Multer', 'Tailwind', 'JWT'],

        apiRoutes: [
            { method: 'POST', path: '/api/posts', desc: 'Accepts multipart/form-data via Multer, uploads image buffer to Cloudinary, saves URL to DB.' },
            { method: 'PUT', path: '/api/posts/:id/like', desc: 'Atomic update: pushes/pulls User ID to/from the post likes array.' },
            { method: 'POST', path: '/api/users/:id/follow', desc: 'Updates both the follower list of the target and the following list of the current user.' }
        ],

        componentTree: `src/
├── context/
│   └── AuthContext.jsx     (Manages active user profile and JWT rotation)
├── pages/
│   ├── Feed.jsx            (Vertical scrolling feed of posts from followed users)
│   ├── Profile.jsx         (User bio, stats, and a 3-column CSS grid of square thumbnails)
│   └── Explore.jsx         (Masonry grid of trending posts across the platform)
└── components/
    ├── PostCard.jsx        (Header, Image with double-tap logic, Action Bar, Comment preview)
    ├── ImageUploader.jsx   (Drag-and-drop zone with image cropping preview)
    └── StoryStrip.jsx      (Horizontal scrolling row of user avatars)`,

        fullCodebase: [
            {
                filename: 'server/models/Post.js',
                lang: 'javascript',
                code: `const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String, required: true },
  caption: { type: String, maxlength: 2200 },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of User IDs who liked it
  comments: [commentSchema], // Embedded comments for fast read access
  location: String
}, { timestamps: true });

// Optimize feed queries by indexing createdAt
postSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Post', postSchema);`
            },
            {
                filename: 'server/routes/uploadRoutes.js',
                lang: 'javascript',
                code: `const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Post = require('../models/Post');
const { protect } = require('../middleware/auth');

const router = express.Router();

// 1. Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// 2. Configure Multer Storage Engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'instagram_clone_posts',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1080, height: 1080, crop: 'limit' }] // Auto-resize heavy images
  }
});

const upload = multer({ storage: storage });

// 3. Upload Route: Handles the file, uploads to Cloudinary, then saves the URL to MongoDB
router.post('/upload', protect, upload.single('image'), async (req, res) => {
  try {
    const newPost = await Post.create({
      author: req.user.id,
      imageUrl: req.file.path, // URL returned directly from Cloudinary
      caption: req.body.caption,
      location: req.body.location
    });

    res.status(201).json({ success: true, post: newPost });
  } catch (error) {
    res.status(500).json({ error: 'Image upload failed' });
  }
});

module.exports = router;`
            },
            {
                filename: 'client/src/components/PostCard.jsx',
                lang: 'javascript',
                code: `import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function PostCard({ post }) {
  const { user } = useAuth();
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));
  const [showHeart, setShowHeart] = useState(false); // For double-tap animation

  const toggleLike = async () => {
    // 1. Optimistic UI Update (Update UI instantly before server responds for snappy feel)
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev.filter(id => id !== user._id) : [...prev, user._id]);

    // 2. Background Server Sync
    try {
      await axios.put(\`/api/posts/\${post._id}/like\`);
    } catch (err) {
      // Revert if API fails
      setIsLiked(isLiked);
      setLikes(post.likes);
    }
  };

  const handleDoubleTap = () => {
    if (!isLiked) toggleLike();
    
    // Trigger giant heart animation overlay
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1000);
  };

  return (
    <article className="post-card">
      <header className="post-header">
        <img src={post.author.avatar} alt="avatar" className="avatar" />
        <span className="username">{post.author.username}</span>
      </header>

      <div className="post-image-container" onDoubleClick={handleDoubleTap}>
        <img src={post.imageUrl} alt="Post content" loading="lazy" />
        {showHeart && <div className="heart-overlay-animation">❤️</div>}
      </div>

      <div className="post-actions">
        <button onClick={toggleLike} className={\`action-btn \${isLiked ? 'liked' : ''}\`}>
          {isLiked ? '❤️' : '🤍'}
        </button>
        <button className="action-btn">💬</button>
        <button className="action-btn">✈️</button>
      </div>

      <div className="post-metadata">
        <p className="likes-count">{likes.length} likes</p>
        <p className="caption">
          <strong>{post.author.username}</strong> {post.caption}
        </p>
        {post.comments.length > 0 && (
          <p className="view-comments">View all {post.comments.length} comments</p>
        )}
      </div>
    </article>
  );
}`
            }
        ]
    },

    // ════════════════════════════════════════════════════════════════
    // 7. AMAZON CLONE (EXPERT LEVEL)
    // ════════════════════════════════════════════════════════════════
    amazon: {
        name: 'Amazon',
        icon: '📦',
        color: '#ff9900',
        shortDesc: 'Massive e-commerce with useReducer cart state and Stripe Checkout.',
        description: 'The ultimate state management challenge. This architecture uses React useReducer to handle complex cart logic, integrates Stripe for secure credit card processing, and manages secure Webhooks to finalize orders in the database.',
        techStack: ['React', 'useReducer', 'Stripe API', 'Express', 'Firebase/MongoDB'],

        apiRoutes: [
            { method: 'POST', path: '/api/create-checkout-session', desc: 'Calculates cart total securely on backend and generates Stripe payment URL.' },
            { method: 'POST', path: '/api/webhook/stripe', desc: 'Secure Stripe Webhook listener. Listens for checkout.session.completed to save order to DB.' }
        ],

        componentTree: `src/
├── context/
│   ├── StateProvider.jsx   (Global wrapper utilizing useReducer)
│   └── reducer.js          (Pure functions mapping ACTIONS to state changes)
├── pages/
│   ├── Home.jsx            (Hero carousel and product grids)
│   ├── Checkout.jsx        (Cart item listing and Subtotal panel)
│   ├── Payment.jsx         (Stripe Elements credit card input)
│   └── Orders.jsx          (Historical order tracking pulled from DB)
└── components/
    ├── Header.jsx          (Complex nav with search, location, and dynamic cart count)
    └── CheckoutProduct.jsx (Cart row item with star ratings and remove logic)`,

        fullCodebase: [
            {
                filename: 'client/src/context/reducer.js',
                lang: 'javascript',
                code: `export const initialState = {
  basket: [],
  user: null
};

// Advanced selector to calculate basket total dynamically
export const getBasketTotal = (basket) => 
  basket?.reduce((amount, item) => item.price + amount, 0);

// Pure Reducer Function: The ONLY way state is modified in the app
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
      
    case 'REMOVE_FROM_BASKET':
      // Find FIRST occurrence of the item (if user has 2 identical items, only remove 1)
      const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(\`Cannot remove product (id: \${action.id}) as it is not in basket!\`);
      }

      return {
        ...state,
        basket: newBasket
      };
      
    case 'EMPTY_BASKET':
      return {
        ...state,
        basket: []
      };
      
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      };

    default:
      return state;
  }
};

export default reducer;`
            },
            {
                filename: 'server/controllers/stripeController.js',
                lang: 'javascript',
                code: `const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

// 1. Generate Checkout Session securely on the server
exports.createCheckoutSession = async (req, res) => {
  const { items, email } = req.body;

  // Transform internal cart items into Stripe's line_items format
  const transformedItems = items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.title,
        images: [item.image],
      },
      unit_amount: item.price * 100, // Stripe requires values in cents
    },
    quantity: 1,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_address_collection: { allowed_countries: ['US', 'CA', 'IN'] },
    line_items: transformedItems,
    mode: 'payment',
    success_url: \`\${process.env.CLIENT_URL}/orders\`,
    cancel_url: \`\${process.env.CLIENT_URL}/checkout\`,
    metadata: {
      email,
      images: JSON.stringify(items.map(item => item.image))
    }
  });

  res.status(200).json({ id: session.id });
};

// 2. Stripe Webhook (Automatically called by Stripe when a payment succeeds)
exports.stripeWebhook = async (req, res) => {
  const payload = req.body;
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    // Verify the webhook is actually from Stripe and not a hacker
    event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_ENDPOINT_SECRET);
  } catch (err) {
    return res.status(400).send(\`Webhook Error: \${err.message}\`);
  }

  // Handle successful checkout completion
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Save the order into MongoDB securely
    await Order.create({
      userId: session.metadata.email, // Using email as user identifier for this example
      amount: session.amount_total / 100,
      amountShipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      stripeSessionId: session.id,
      timestamp: new Date()
    });
  }

  res.status(200).end();
};`
            }
        ]
    },

    // ════════════════════════════════════════════════════════════════
    // 8. NETFLIX CLONE (INTERMEDIATE LEVEL)
    // ════════════════════════════════════════════════════════════════
    netflix: {
        name: 'Netflix',
        icon: '🎬',
        color: '#E50914',
        shortDesc: 'Media catalog with TMDB API integration and Youtube Trailer embeds.',
        description: 'A frontend-heavy architectural clone focused on high-performance data fetching and UI rendering. It utilizes the external TMDB API to fetch movie metadata, manages complex scroll-based header transparency, and embeds React-YouTube players dynamically.',
        techStack: ['React', 'TMDB API', 'Axios', 'react-youtube', 'Firebase Auth'],

        apiRoutes: [
            { method: 'GET', path: 'https://api.themoviedb.org/3/trending/all/week', desc: 'External Call: Fetches current trending movies and TV shows for the Hero Banner.' },
            { method: 'GET', path: 'https://api.themoviedb.org/3/movie/:id/videos', desc: 'External Call: Fetches the associated YouTube trailer ID for a specific movie.' }
        ],

        componentTree: `src/
├── api/
│   ├── axios.js            (Configured Axios instance pointing to TMDB base URL)
│   └── requests.js         (Dictionary of all specific TMDB endpoint paths)
├── pages/
│   ├── LoginScreen.jsx     (Landing page with email input and background gradient)
│   └── HomeScreen.jsx      (Main authenticated dashboard)
└── components/
    ├── Nav.jsx             (Top bar with transparent-to-black scroll listener)
    ├── Banner.jsx          (Hero section fetching a random trending movie)
    └── Row.jsx             (Horizontal scrolling component mapping video posters)` ,

        fullCodebase: [
            {
                filename: 'client/src/api/requests.js',
                lang: 'javascript',
                code: `// TMDB API Request Dictionary
// Keeps endpoints organized and centralized
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const requests = {
  fetchTrending: \`/trending/all/week?api_key=\${API_KEY}&language=en-US\`,
  fetchNetflixOriginals: \`/discover/tv?api_key=\${API_KEY}&with_networks=213\`,
  fetchTopRated: \`/movie/top_rated?api_key=\${API_KEY}&language=en-US\`,
  fetchActionMovies: \`/discover/movie?api_key=\${API_KEY}&with_genres=28\`,
  fetchComedyMovies: \`/discover/movie?api_key=\${API_KEY}&with_genres=35\`,
  fetchHorrorMovies: \`/discover/movie?api_key=\${API_KEY}&with_genres=27\`,
  fetchRomanceMovies: \`/discover/movie?api_key=\${API_KEY}&with_genres=10749\`,
  fetchDocumentaries: \`/discover/movie?api_key=\${API_KEY}&with_genres=99\`,
};

export default requests;`
            },
            {
                filename: 'client/src/components/Row.jsx',
                lang: 'javascript',
                code: `import React, { useState, useEffect } from 'react';
import axios from '../api/axios'; // Our custom configured axios instance
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'; // NPM package to find trailer URLs
import './Row.css';

const base_url = "https://image.tmdb.org/t/p/original/";

export default function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // Run once when the row mounts, fetch the movies for this specific category
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  // Click handler to find and play the trailer for the clicked poster
  const handleClick = (movie) => {
    // If a trailer is already playing, close it
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      // Find the trailer URL based on movie name using movie-trailer package
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          // Extract the exact Video ID from the standard youtube URL
          // Example: https://www.youtube.com/watch?v=XtMThy8QKqU -> XtMThy8QKqU
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log('Trailer not found', error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row-posters">
        {movies.map((movie) => (
          ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={\`row-poster \${isLargeRow && "row-posterLarge"}\`}
              src={\`\${base_url}\${isLargeRow ? movie.poster_path : movie.backdrop_path}\`}
              alt={movie.name}
            />
          )
        ))}
      </div>
      
      {/* If we successfully captured a trailer ID, render the embedded YouTube player */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}`
            }
        ]
    },

    // ════════════════════════════════════════════════════════════════
    // 9. REAL-TIME CHAT APP (FULL STACK PROJECT)
    // ════════════════════════════════════════════════════════════════
    chatapp: {
        name: 'Real-Time Chat',
        icon: '💬',
        color: '#0ea5e9',
        shortDesc: 'Live messaging architecture using WebSockets and room-based connections.',
        description: 'A dedicated real-time communication architecture. This project shifts away from standard REST APIs and utilizes persistent WebSocket connections (Socket.io) to instantly push messages to clients, manage "user typing" states, and isolate conversations into secure rooms.',
        techStack: ['React', 'Socket.io', 'Express', 'MongoDB', 'JWT Auth'],

        apiRoutes: [
            { method: 'GET', path: '/api/chats', desc: 'REST Fallback: Fetches historical chat rooms the user is a part of.' },
            { method: 'GET', path: '/api/chats/:roomId/messages', desc: 'REST Fallback: Fetches message history when joining a room.' },
            { method: 'WS', path: 'io.to(roomId).emit()', desc: 'WebSocket: Broadcasts messages exclusively to users currently subscribed to a specific room.' }
        ],

        componentTree: `src/
├── context/
│   ├── AuthContext.jsx     (Handles user identity required for message tagging)
│   └── SocketContext.jsx   (Maintains the global active Socket connection)
├── pages/
│   └── ChatDashboard.jsx   (Main split-screen UI layout)
└── components/
    ├── Sidebar.jsx         (List of active conversations and online status indicators)
    ├── ChatWindow.jsx      (Message timeline with auto-scroll to bottom)
    └── MessageInput.jsx    (Text input firing 'typing' events and 'send_message' events)`,

        fullCodebase: [
            {
                filename: 'server/models/Message.js',
                lang: 'javascript',
                code: `const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  room: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Room', 
    required: true,
    index: true // Indexed because we query messages BY room frequently
  },
  sender: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  text: { type: String, required: true },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);`
            },
            {
                filename: 'server/socket/chatHandler.js',
                lang: 'javascript',
                code: `const Message = require('../models/Message');

module.exports = (io, socket) => {
  // 1. Join a specific conversation room
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(\`User \${socket.id} joined room \${roomId}\`);
  });

  // 2. Handle incoming messages
  socket.on('send_message', async (data) => {
    try {
      // Data payload expected: { roomId, senderId, text }
      
      // Save message to MongoDB first for persistence
      const newMessage = await Message.create({
        room: data.roomId,
        sender: data.senderId,
        text: data.text
      });

      // Populate sender details so the frontend has avatar/name immediately
      await newMessage.populate('sender', 'username avatar');

      // Broadcast the saved message ONLY to users in that specific room
      io.to(data.roomId).emit('receive_message', newMessage);
      
    } catch (error) {
      console.error('Message failed to process', error);
      socket.emit('error', 'Message failed to send');
    }
  });

  // 3. Handle typing indicators
  socket.on('typing', (data) => {
    // Send to everyone in the room EXCEPT the person typing
    socket.to(data.roomId).emit('user_typing', { username: data.username });
  });
};`
            },
            {
                filename: 'client/src/components/ChatWindow.jsx',
                lang: 'javascript',
                code: `import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function ChatWindow({ activeRoom }) {
  const { socket } = useSocket();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [typingUser, setTypingUser] = useState('');
  
  const messagesEndRef = useRef(null);

  // Auto-scroll to the newest message whenever the messages array updates
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages, typingUser]);

  // Load historical messages & attach socket listeners when room changes
  useEffect(() => {
    if (!activeRoom || !socket) return;

    // 1. Fetch history from REST API
    axios.get(\`/api/chats/\${activeRoom._id}/messages\`)
         .then(res => setMessages(res.data));

    // 2. Tell the server we are subscribing to this room's events
    socket.emit('join_room', activeRoom._id);

    // 3. Listen for live incoming messages
    const handleReceiveMessage = (newMessage) => {
      setMessages(prev => [...prev, newMessage]);
    };
    
    // 4. Listen for typing indicators
    let typingTimeout;
    const handleTyping = (data) => {
      setTypingUser(data.username);
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => setTypingUser(''), 3000); // Clear after 3s
    };

    socket.on('receive_message', handleReceiveMessage);
    socket.on('user_typing', handleTyping);

    return () => {
      socket.off('receive_message', handleReceiveMessage);
      socket.off('user_typing', handleTyping);
    };
  }, [activeRoom, socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !socket) return;

    socket.emit('send_message', {
      roomId: activeRoom._id,
      senderId: user._id,
      text: inputText
    });

    setInputText('');
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    socket.emit('typing', { roomId: activeRoom._id, username: user.username });
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>{activeRoom?.name || 'Select a chat'}</h3>
      </div>
      
      <div className="messages-container">
        {messages.map(msg => (
          <div key={msg._id} className={\`message-bubble \${msg.sender._id === user._id ? 'sent' : 'received'}\`}>
            <img src={msg.sender.avatar} className="message-avatar" alt="avatar" />
            <div className="message-content">
              <span className="message-sender">{msg.sender.username}</span>
              <p className="message-text">{msg.text}</p>
            </div>
          </div>
        ))}
        {typingUser && <div className="typing-indicator">{typingUser} is typing...</div>}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="message-input-area">
        <input 
          type="text" 
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type a message..." 
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}`
            }
        ]
    },

    // ════════════════════════════════════════════════════════════════
    // 10. FULL STACK BLOG (CAPSTONE FOUNDATION)
    // ════════════════════════════════════════════════════════════════
    blog: {
        name: 'Pro Blog Platform',
        icon: '📝',
        color: '#8b5cf6',
        shortDesc: 'CMS architecture with Rich Text processing, SEO meta, and comment threading.',
        description: 'A Content Management System (CMS) architecture. This project tackles the complexity of saving and rendering Rich Text (HTML/Markdown) safely to prevent XSS attacks, managing file uploads for post thumbnails, and building nested comment threads.',
        techStack: ['React', 'Quill.js', 'Express', 'Mongoose', 'DOMPurify'],

        apiRoutes: [
            { method: 'GET', path: '/api/posts?page=1&tag=react', desc: 'Fetches paginated posts, optionally filtered by tag.' },
            { method: 'POST', path: '/api/posts', desc: 'Saves HTML string from Rich Text Editor securely into MongoDB.' },
            { method: 'POST', path: '/api/posts/:id/comments', desc: 'Pushes a new comment sub-document into the Post model.' }
        ],

        componentTree: `src/
├── pages/
│   ├── Home.jsx            (Grid of blog cards with pagination controls)
│   ├── CreatePost.jsx      (Rich Text Editor interface for authors)
│   └── ReadPost.jsx        (Full article view with sanitized HTML rendering)
└── components/
    ├── RichEditor.jsx      (React-Quill wrapper handling toolbar configurations)
    ├── CommentSection.jsx  (Recursive component for nested replies)
    └── TagInput.jsx        (Custom component to add/remove tags as arrays)`,

        fullCodebase: [
            {
                filename: 'server/models/Article.js',
                lang: 'javascript',
                code: `const mongoose = require('mongoose');
const slugify = require('slugify'); // Converts "My React Post" to "my-react-post"

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, index: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  thumbnailUrl: String,
  
  // The raw HTML string generated by the frontend Rich Text Editor
  contentHTML: { type: String, required: true },
  
  tags: [String],
  views: { type: Number, default: 0 },
  
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

// Pre-save middleware to automatically generate SEO-friendly URL slugs
articleSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    // Generate slug: lowercased, spaces replaced with dashes, special chars removed
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Article', articleSchema);`
            },
            {
                filename: 'client/src/pages/CreatePost.jsx',
                lang: 'javascript',
                code: `import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the editor's stylesheet
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); // This will store raw HTML
  const navigate = useNavigate();

  // Configure the toolbar options for the Rich Text Editor
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image', 'code-block'],
      ['clean']
    ],
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/posts', {
        title,
        contentHTML: content
      }, {
        headers: { Authorization: \`Bearer \${localStorage.getItem('token')}\` }
      });
      
      // Redirect to the newly created article's read page
      navigate(\`/blog/\${res.data.post.slug}\`);
    } catch (err) {
      alert('Failed to publish article');
    }
  };

  return (
    <div className="editor-container">
      <h2>Draft New Article</h2>
      <form onSubmit={handlePublish}>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Article Title..."
          className="title-input"
          required 
        />
        
        {/* The Rich Text Editor component */}
        <ReactQuill 
          theme="snow" 
          value={content} 
          onChange={setContent} 
          modules={modules}
          className="rich-editor"
        />
        
        <button type="submit" className="publish-btn">Publish Article</button>
      </form>
    </div>
  );
}`
            },
            {
                filename: 'client/src/pages/ReadPost.jsx',
                lang: 'javascript',
                code: `import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify'; // CRITICAL: Prevents XSS attacks

export default function ReadPost() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      // Lookup by the SEO-friendly slug instead of the Mongo ID
      const res = await axios.get(\`/api/posts/\${slug}\`);
      setArticle(res.data);
    };
    fetchArticle();
  }, [slug]);

  if (!article) return <div className="loader">Loading content...</div>;

  // SECURITY REQUIREMENT:
  // Since we are taking raw HTML from the database and injecting it into the DOM,
  // we MUST sanitize it first to strip out any malicious <script> tags a hacker might have saved.
  const cleanHTML = DOMPurify.sanitize(article.contentHTML);

  return (
    <main className="article-reader">
      <header className="article-header">
        <h1>{article.title}</h1>
        <div className="author-info">
          <span>Written by {article.author.username}</span>
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
        </div>
      </header>

      {/* Dangerously Set Inner HTML requires an object with __html key */}
      <article 
        className="article-body-content"
        dangerouslySetInnerHTML={{ __html: cleanHTML }} 
      />

      <hr />
      
      <section className="comments-section">
        <h3>Comments ({article.comments.length})</h3>
        {/* Map through comments here */}
      </section>
    </main>
  );
}`
            }
        ]
    }
};