import React from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';

const COLOR = 'var(--purple)';

const RESOURCES = [
    { type: 'docs',      title: 'Multer (npm)',        description: 'Node.js middleware for handling multipart/form-data (file uploads).',              url: 'https://github.com/expressjs/multer' },
    { type: 'docs',      title: 'Cloudinary Node SDK', description: 'Official SDK for uploading, transforming, and delivering media from the cloud.',   url: 'https://cloudinary.com/documentation/node_integration' },
    { type: 'docs',      title: 'Sharp (npm)',          description: 'High-performance Node.js image processing — resize, compress, convert formats.',  url: 'https://sharp.pixelplumbing.com/' },
    { type: 'reference', title: 'Cloudinary Free Tier', description: 'Free: 25GB storage + 25GB monthly bandwidth. Perfect for personal projects.',     url: 'https://cloudinary.com/pricing' },
    { type: 'tutorial',  title: 'Multer + Cloudinary',  description: 'Full tutorial: upload to Cloudinary via Multer with memory storage.',             url: 'https://cloudinary.com/blog/node-js-file-upload-with-multer' },
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

export default function FileUploads() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{ color: COLOR }}>File Uploads</span> — Chapter 13</div>
                <h1><span className="accent" style={{ color: COLOR }}>File Uploads</span><br /><em>Images, documents, cloud storage.</em></h1>
                <p className="hero-desc">
                    Almost every real app lets users upload files — profile pictures, post images, documents.
                    This chapter covers the complete stack: HTML file input → Multer middleware → Cloudinary cloud storage,
                    plus image optimization and frontend upload progress.
                </p>
                <div className="hero-stack">
                    {['Multer', 'Cloudinary', 'Sharp', 'File Input', 'Upload Progress', 'Image Optimization', 'File Validation'].map(t => (
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
                        <h2>Packages & Cloudinary Config</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Installation</h3>
                    <CodeBlock lang="bash" code={`npm install multer cloudinary multer-storage-cloudinary
npm install -D @types/multer   # if using TypeScript

# Optional: local image processing before upload
npm install sharp`} />
                </div>
                <div className="topic">
                    <h3>Cloudinary Configuration</h3>
                    <CodeBlock lang="javascript" code={`// config/cloudinary.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure:     true,   // always use HTTPS
});

module.exports = cloudinary;

// .env additions:
// CLOUDINARY_CLOUD_NAME=your_cloud_name
// CLOUDINARY_API_KEY=123456789012345
// CLOUDINARY_API_SECRET=your_api_secret
// (Find these in Cloudinary Dashboard → Account Details)`} />
                </div>
            </section>

            {/* ── 02 MULTER ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>02</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Backend</div>
                        <h2>Multer — Upload Middleware</h2>
                        <p className="chapter-intro">
                            Multer parses <code>multipart/form-data</code> requests and makes the file available on <code>req.file</code> (single)
                            or <code>req.files</code> (multiple). It supports disk storage, memory storage, or direct cloud storage.
                        </p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Multer + Cloudinary Storage (Recommended)</h3>
                    <CodeBlock lang="javascript" code={`// middleware/upload.js
const multer     = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// ── Storage: directly upload to Cloudinary ────────────────────────────
const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
        folder:   'my-mern-app/avatars',      // Cloudinary folder
        public_id: \`user_\${req.user._id}\`,   // overwrite same user's avatar
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [
            { width: 400, height: 400, crop: 'fill', gravity: 'face' }, // auto-crop to face
            { quality: 'auto', fetch_format: 'auto' },  // auto-optimize quality + format
        ],
    }),
});

// ── File filter: accept images only ────────────────────────────────────
const fileFilter = (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);   // accept
    } else {
        cb(new Error('Only images are allowed (jpg, png, webp, gif)'), false);
    }
};

// ── Create Multer instance ─────────────────────────────────────────────
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,  // 5MB max
        files:    1,                 // max 1 file
    },
});

module.exports = upload;`} />
                </div>

                <div className="topic">
                    <h3>Upload Routes</h3>
                    <CodeBlock lang="javascript" code={`// routes/uploadRoutes.js
const express = require('express');
const router  = express.Router();
const upload  = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const User    = require('../models/User');

// ── Single file upload: POST /api/upload/avatar ───────────────────────
router.post('/avatar',
    protect,                       // must be logged in
    upload.single('avatar'),       // 'avatar' = form field name
    async (req, res) => {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // req.file.path = Cloudinary URL (when using CloudinaryStorage)
        // req.file.filename = public_id on Cloudinary
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { avatar: req.file.path },
            { new: true }
        );

        res.json({
            message:   'Avatar updated',
            avatarUrl: req.file.path,
            user,
        });
    }
);

// ── Multiple files: POST /api/upload/gallery ──────────────────────────
router.post('/gallery',
    protect,
    upload.array('images', 10),    // 'images' field, max 10 files
    async (req, res) => {
        const urls = req.files.map(f => f.path);
        // Save urls to your Post/Gallery model...
        res.json({ images: urls });
    }
);

// ── Error handler for Multer errors ───────────────────────────────────
router.use((err, req, res, next) => {
    if (err.name === 'MulterError') {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File too large. Max 5MB.' });
        }
        return res.status(400).json({ message: err.message });
    }
    if (err.message.includes('Only images')) {
        return res.status(400).json({ message: err.message });
    }
    next(err);
});

module.exports = router;`} />
                </div>

                <div className="topic">
                    <h3>Delete from Cloudinary</h3>
                    <CodeBlock lang="javascript" code={`// When user updates or deletes their avatar, remove old one from Cloudinary
const cloudinary = require('../config/cloudinary');

// ── Extract public_id from Cloudinary URL ─────────────────────────────
// URL: https://res.cloudinary.com/mycloud/image/upload/v123/my-app/avatars/user_123.jpg
// public_id = "my-app/avatars/user_123"

function getPublicId(cloudinaryUrl) {
    const parts   = cloudinaryUrl.split('/');
    const filename = parts[parts.length - 1].split('.')[0]; // remove extension
    const folder  = parts.slice(parts.indexOf('upload') + 2).slice(0, -1).join('/');
    return folder ? \`\${folder}/\${filename}\` : filename;
}

// In your update avatar controller:
const updateAvatar = async (req, res) => {
    const user = await User.findById(req.user._id);

    // Delete old avatar from Cloudinary if it exists
    if (user.avatar) {
        const publicId = getPublicId(user.avatar);
        await cloudinary.uploader.destroy(publicId);
    }

    // Save new avatar URL
    user.avatar = req.file.path;
    await user.save();

    res.json({ avatarUrl: user.avatar });
};`} />
                </div>
            </section>

            {/* ── 03 FRONTEND ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>03</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>React Frontend</div>
                        <h2>Frontend File Upload</h2>
                        <p className="chapter-intro">
                            Sending files from React requires <code>FormData</code> instead of JSON.
                            You can add a preview before upload and track progress with Axios.
                        </p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Avatar Upload Component with Preview</h3>
                    <CodeBlock lang="jsx" code={`// components/AvatarUpload.jsx
import { useState, useRef } from 'react';
import api from '../lib/api';

export default function AvatarUpload({ currentAvatar, onSuccess }) {
    const [preview,  setPreview]  = useState(currentAvatar || null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress]  = useState(0);
    const [error,    setError]     = useState('');
    const fileInputRef = useRef(null);

    // Show preview immediately when user picks a file
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate client-side before uploading
        if (file.size > 5 * 1024 * 1024) {
            setError('File must be under 5MB');
            return;
        }
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
            setError('Only JPG, PNG, and WebP images allowed');
            return;
        }

        setError('');
        // Create a local URL for preview (doesn't upload yet)
        setPreview(URL.createObjectURL(file));

        // Auto-upload when file is selected
        handleUpload(file);
    };

    const handleUpload = async (file) => {
        setUploading(true);
        setProgress(0);

        // MUST use FormData — not JSON — for file uploads
        const formData = new FormData();
        formData.append('avatar', file);  // 'avatar' = field name multer expects

        try {
            const { data } = await api.post('/upload/avatar', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (e) => {
                    const pct = Math.round((e.loaded / e.total) * 100);
                    setProgress(pct);
                },
            });

            onSuccess?.(data.avatarUrl);
        } catch (err) {
            setError(err.response?.data?.message || 'Upload failed');
            setPreview(currentAvatar);  // revert preview
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            {/* Clickable avatar preview */}
            <div onClick={() => fileInputRef.current?.click()} style={{ cursor: 'pointer' }}>
                {preview
                    ? <img src={preview} alt="Avatar" style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover' }} />
                    : <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        📷
                      </div>
                }
                <p>{uploading ? \`Uploading \${progress}%\` : 'Click to change'}</p>
            </div>

            {/* Progress bar */}
            {uploading && (
                <div style={{ background: '#333', borderRadius: 4, height: 6, marginTop: 8 }}>
                    <div style={{ background: 'var(--green)', height: '100%', width: \`\${progress}%\`, borderRadius: 4, transition: 'width 0.2s' }} />
                </div>
            )}

            {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}
        </div>
    );
}`} />
                </div>

                <div className="topic">
                    <h3>Drag & Drop Upload Zone</h3>
                    <CodeBlock lang="jsx" code={`// components/DropZone.jsx
import { useState, useCallback } from 'react';

export default function DropZone({ onFilesSelected, accept = 'image/*', multiple = false }) {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = Array.from(e.dataTransfer.files);
        if (!multiple && files.length > 1) {
            alert('Please drop only one file');
            return;
        }
        onFilesSelected(multiple ? files : files[0]);
    }, [multiple, onFilesSelected]);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={() => setIsDragOver(false)}
            style={{
                border:       \`2px dashed \${isDragOver ? 'var(--green)' : 'var(--border)'}\`,
                borderRadius: '12px',
                padding:      '40px',
                textAlign:    'center',
                background:   isDragOver ? 'rgba(0,229,155,0.05)' : 'transparent',
                cursor:       'pointer',
                transition:   'all 0.2s',
            }}
            onClick={() => document.getElementById('file-input').click()}
        >
            <p>📁 Drag & drop files here, or click to select</p>
            <input
                id="file-input"
                type="file"
                accept={accept}
                multiple={multiple}
                style={{ display: 'none' }}
                onChange={(e) => {
                    const files = Array.from(e.target.files);
                    onFilesSelected(multiple ? files : files[0]);
                }}
            />
        </div>
    );
}`} />
                </div>
            </section>

            {/* ── 04 IMAGE OPTIMIZATION ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>04</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Optimization</div>
                        <h2>Image Optimization with Sharp</h2>
                        <p className="chapter-intro">
                            Use Sharp to resize and compress images on the server before uploading to Cloudinary. This reduces storage costs and load times.
                        </p>
                    </div>
                </div>
                <div className="topic">
                    <h3>Sharp + Memory Storage Multer</h3>
                    <CodeBlock lang="javascript" code={`// middleware/uploadWithOptimize.js
const multer     = require('multer');
const sharp      = require('sharp');
const cloudinary = require('../config/cloudinary');
const { Readable } = require('stream');

// Use memoryStorage so we can process with Sharp before uploading
const multerMemory = multer({
    storage: multer.memoryStorage(),
    limits:  { fileSize: 10 * 1024 * 1024 },  // allow up to 10MB input
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('Images only'), false);
    },
});

// ── Middleware: resize + optimize → upload to Cloudinary ──────────────
const processAndUpload = (folder) => async (req, res, next) => {
    if (!req.file) return next();

    try {
        // 1. Process with Sharp: resize to 800px wide, convert to WebP, compress
        const optimized = await sharp(req.file.buffer)
            .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 85 })
            .toBuffer();

        // 2. Upload buffer to Cloudinary via a stream
        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder, resource_type: 'image', format: 'webp' },
                (err, result) => err ? reject(err) : resolve(result)
            );
            Readable.from(optimized).pipe(uploadStream);
        });

        // 3. Attach result to req for the route handler
        req.cloudinaryUrl    = uploadResult.secure_url;
        req.cloudinaryPublicId = uploadResult.public_id;
        next();
    } catch (err) {
        next(err);
    }
};

// ── Usage in a route ──────────────────────────────────────────────────
// router.post('/post-image',
//     protect,
//     multerMemory.single('image'),
//     processAndUpload('my-app/posts'),
//     (req, res) => {
//         res.json({ imageUrl: req.cloudinaryUrl });
//     }
// );

module.exports = { multerMemory, processAndUpload };`} />
                    <Callout type="tip" title="💡 Cloudinary auto-optimization">
                        If you add <code>quality: 'auto'</code> and <code>fetch_format: 'auto'</code> to your Cloudinary transformation, Cloudinary will automatically serve WebP to browsers that support it and optimize quality — even for already-uploaded images.
                    </Callout>
                </div>
            </section>

            {/* ── RESOURCES ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>05</div>
                    <div className="chapter-meta"><h2>Resources</h2></div>
                </div>
                <div className="resource-grid">
                    {RESOURCES.map((r, i) => <ResourceCard key={i} {...r} />)}
                </div>
            </section>

            <footer className="footer">
                <p>File Uploads · Chapter 13 · FullStack Compass</p>
            </footer>
        </>
    );
}
