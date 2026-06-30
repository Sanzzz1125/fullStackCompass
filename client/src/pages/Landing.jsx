import React from 'react';
import { Link } from 'react-router-dom';

const TECH_PILLS = ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'SQL', 'REST APIs'];

const FEATURES = [
    { icon: '📚', title: 'Deep-Dive Content', desc: 'Every topic covered from first principles — syntax, patterns, gotchas, and best practices. Not shallow notes.' },
    { icon: '🎮', title: 'Practice Arenas', desc: 'Interactive games for CSS, JavaScript, SQL, Git, and more. Learn by doing, not just reading.' },
    { icon: '🔗', title: 'Curated Resources', desc: 'Hand-picked generators, cheat sheets, official docs, and free courses for every technology.' },
    { icon: '🏗️', title: 'Clone Blueprints', desc: 'Full architecture, schemas, folder structures, and code for Netflix, Spotify, Instagram, and 8 more.' },
    { icon: '🌓', title: 'Dark & Light Mode', desc: 'Toggle themes anytime. Your preference is saved across sessions.' },
    { icon: '🛢️', title: 'SQL + NoSQL', desc: 'PostgreSQL, MySQL, SQLite, MongoDB — understand when to use what and how to use it well.' },
];

export default function Landing() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow">
                    <span>⬡</span> FullStack Compass — v2.0
                </div>
                <h1>
                    From zero to <span className="accent">full-stack</span><br />
                    <em>engineer.</em>
                </h1>
                <p className="hero-desc">
                    A MERN-powered learning platform covering every technology in the modern web stack.
                    Deep content, practice games, curated resources, and full clone blueprints — all in one place.
                </p>
                <div className="hero-stack">
                    {TECH_PILLS.map(t => <span key={t} className="stack-chip">{t}</span>)}
                </div>
                <div className="hero-stats">
                    <div>
                        <div className="hero-stat-num">13</div>
                        <div className="hero-stat-lbl">Technologies</div>
                    </div>
                    <div>
                        <div className="hero-stat-num">10+</div>
                        <div className="hero-stat-lbl">Clone Blueprints</div>
                    </div>
                    <div>
                        <div className="hero-stat-num">20+</div>
                        <div className="hero-stat-lbl">Practice Games</div>
                    </div>
                    <div>
                        <div className="hero-stat-num">100+</div>
                        <div className="hero-stat-lbl">Resources</div>
                    </div>
                </div>
                <div style={{ marginTop: '48px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Link to="/dashboard" style={{
                        background: 'var(--green)',
                        color: '#000',
                        textDecoration: 'none',
                        padding: '12px 28px',
                        borderRadius: '6px',
                        fontWeight: '700',
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '13px',
                    }}>
                        Start Learning →
                    </Link>
                    <Link to="/clones" style={{
                        background: 'var(--surface)',
                        color: 'var(--text)',
                        textDecoration: 'none',
                        padding: '12px 28px',
                        borderRadius: '6px',
                        fontWeight: '700',
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '13px',
                        border: '1px solid var(--border2)',
                    }}>
                        App Clones
                    </Link>
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div>
                        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>
                            What's inside
                        </h2>
                        <p className="chapter-intro">
                            FullStack Compass is your all-in-one MERN stack reference. Everything from raw HTML
                            fundamentals to full MongoDB aggregation pipelines, with real code and genuine depth.
                        </p>
                    </div>
                </div>
                <div className="concept-grid">
                    {FEATURES.map((f, i) => (
                        <div key={i} className="concept-card">
                            <div className="concept-icon">{f.icon}</div>
                            <h5>{f.title}</h5>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div>
                        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>
                            The MERN Stack
                        </h2>
                        <p className="chapter-intro">
                            Four technologies. One cohesive full-stack. Here's how they connect:
                        </p>
                    </div>
                </div>
                <div className="flow">
                    <div className="flow-step" style={{ borderColor: 'var(--react-color)', color: 'var(--react-color)' }}>React<br /><span style={{ fontSize: '10px', color: 'var(--text3)' }}>Frontend UI</span></div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-step" style={{ borderColor: 'var(--express-color)', color: 'var(--express-color)' }}>Express<br /><span style={{ fontSize: '10px', color: 'var(--text3)' }}>REST API</span></div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-step" style={{ borderColor: 'var(--node-color)', color: 'var(--node-color)' }}>Node.js<br /><span style={{ fontSize: '10px', color: 'var(--text3)' }}>Runtime</span></div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-step" style={{ borderColor: 'var(--mongo-color)', color: 'var(--mongo-color)' }}>MongoDB<br /><span style={{ fontSize: '10px', color: 'var(--text3)' }}>Database</span></div>
                </div>
                <div className="callout tip" style={{ marginTop: '24px' }}>
                    <div className="callout-title">💡 Why MERN?</div>
                    <p>One language (JavaScript) across the entire stack. Fast to prototype, widely adopted in industry,
                        massive ecosystem, and every part is JavaScript — so context-switching is minimal.</p>
                </div>
            </section>

            <footer className="footer">
                <div className="logo-badge" style={{ marginBottom: '12px' }}>FSC</div>
                <p>FullStack Compass — Zero to Full-Stack Engineer</p>
                <p style={{ marginTop: '8px' }}>
                    Built by{' '}
                    <a href="https://sanketh.live/" target="_blank" rel="noopener noreferrer"
                       style={{ color: 'var(--green)', textDecoration: 'none' }}>
                        Sanketh ↗
                    </a>
                </p>
            </footer>
        </>
    );
}