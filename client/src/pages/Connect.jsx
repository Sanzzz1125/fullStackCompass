import React from 'react';

const LINKS = [
    { label: 'Portfolio',  icon: '🌐', url: 'https://sanketh.live/',                                    desc: 'Projects, skills & contact' },
    { label: 'GitHub',     icon: '🐙', url: 'https://github.com/Sanzzz1125',                      desc: 'Open source & project code' },
    { label: 'LinkedIn',   icon: '💼', url: 'https://www.linkedin.com/in/sanketh-thatikonda', desc: 'Professional network' },
];

const STACK = [
    { tech: 'React + Vite',   role: 'Frontend framework & build tool' },
    { tech: 'React Router v6',role: 'Client-side routing' },
    { tech: 'Node.js',        role: 'JavaScript runtime' },
    { tech: 'Express.js',     role: 'REST API server' },
    { tech: 'MongoDB Atlas',  role: 'Cloud database' },
    { tech: 'Mongoose ODM',   role: 'Schema & model layer' },
    { tech: 'CSS Variables',  role: 'Theming (dark + light)' },
    { tech: 'Space Mono',     role: 'Monospace font for code' },
    { tech: 'Fraunces',       role: 'Display serif for headings' },
];

export default function Connect() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow">
                    <span style={{ color: 'var(--green)' }}>↗</span> Connect
                </div>
                <h1>
                    Hi, I'm <span className="accent">Sanketh</span>.<br />
                    <em>Let's talk.</em>
                </h1>
                <p className="hero-desc">
                    I built FullStack Compass as a comprehensive MERN stack reference — the kind of resource I wished existed when I was learning.
                    If it helped you, if you've got feedback, or if you're looking to collaborate, I'd love to hear from you.
                </p>
                <a
                    href="https://sanketh.live/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display:       'inline-flex',
                        alignItems:    'center',
                        gap:           '8px',
                        background:    'var(--green)',
                        color:         '#000',
                        textDecoration:'none',
                        padding:       '14px 32px',
                        borderRadius:  '8px',
                        fontWeight:    '700',
                        fontFamily:    "'Space Mono', monospace",
                        fontSize:      '13px',
                    }}
                >
                    Visit sanketh.live ↗
                </a>
            </section>

            {/* ── LINKS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-meta">
                        <h2 style={{ fontFamily: "'Fraunces', serif" }}>Find Me Online</h2>
                        <p className="chapter-intro">Whether you want to see my work, check my code, or connect professionally — here's where to find me.</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
                    {LINKS.map((link, i) => (
                        <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resource-card"
                        >
                            <div style={{ fontSize: '28px', marginBottom: '12px' }}>{link.icon}</div>
                            <h4 style={{ fontSize: '16px', marginBottom: '6px', fontFamily: "'Fraunces', serif" }}>{link.label}</h4>
                            <p>{link.desc}</p>
                        </a>
                    ))}
                </div>
            </section>

            {/* ── ABOUT THE PROJECT ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-meta">
                        <h2 style={{ fontFamily: "'Fraunces', serif" }}>About FullStack Compass</h2>
                        <p className="chapter-intro">This is a real MERN application — not just a static site. Here's the tech stack powering it.</p>
                    </div>
                </div>

                <div className="concept-grid">
                    {STACK.map((s, i) => (
                        <div key={i} className="concept-card">
                            <code style={{ fontSize: '12px', display: 'block', marginBottom: '6px' }}>{s.tech}</code>
                            <p>{s.role}</p>
                        </div>
                    ))}
                </div>

                <div className="callout tip" style={{ marginTop: '32px' }}>
                    <div className="callout-title">🧭 Project Goal</div>
                    <p>
                        FullStack Compass was built to be the single reference I'd keep open while building MERN projects.
                        Deep content (not just definitions), real code examples, practice resources, and full clone blueprints
                        in one place. Think Roadmap.sh + MDN + FreeCodeCamp, but tighter and MERN-focused.
                    </p>
                </div>
            </section>

            <footer className="footer">
                <div className="logo-badge" style={{ marginBottom: '12px' }}>FSC</div>
                <p>FullStack Compass — Zero to Full-Stack Engineer</p>
                <p style={{ marginTop: '8px' }}>
                    Built with ❤️ by{' '}
                    <a href="https://sanketh.live/" target="_blank" rel="noopener noreferrer"
                       style={{ color: 'var(--green)', textDecoration: 'none' }}>
                        Sanketh ↗
                    </a>
                </p>
            </footer>
        </>
    );
}