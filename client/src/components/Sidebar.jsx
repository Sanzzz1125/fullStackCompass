import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const NAV = [
    { section: 'Start Here' },
    { label: '🧭 Dashboard',          to: '/dashboard',            dot: '#00e59b' },
    { label: '🔍 Search (⌘K)',        action: 'search' },

    { section: 'Foundations' },
    { label: 'HTML',                   to: '/learn/html',           dot: '#ff6b35' },
    { label: 'CSS',                    to: '/learn/css',            dot: '#4da6ff' },
    { label: 'Bootstrap',              to: '/learn/bootstrap',      dot: '#7952b3' },
    { label: 'Tailwind CSS',           to: '/learn/tailwind',       dot: '#38bdf8' },
    { label: 'JavaScript',             to: '/learn/javascript',     dot: '#ffd166' },

    { section: 'React Ecosystem' },
    { label: 'React',                  to: '/learn/react',          dot: '#00d4aa' },

    { section: 'Backend' },
    { label: 'Node.js',                to: '/learn/nodejs',         dot: '#5bc17a' },
    { label: 'Express',                to: '/learn/express',        dot: '#b57aff' },
    { label: 'REST APIs',              to: '/learn/apis',           dot: '#00b4d8' },
    { label: 'NestJS',                 to: '/learn/nestjs',         dot: '#e0234e' },
    { label: '🔐 Authentication',      to: '/learn/auth',           dot: '#00e59b' },
    { label: '📁 File Uploads',        to: '/learn/uploads',        dot: '#b57aff' },
    { label: '📧 Nodemailer',          to: '/learn/nodemailer',     dot: '#0ea5e9' },
    { label: '💳 Payments',            to: '/learn/payments',       dot: '#16a34a' },
    { label: '🔄 Socket.io',           to: '/learn/socketio',       dot: '#ff6eb4' },

    { section: 'Database' },
    { label: 'MongoDB',                to: '/learn/mongodb',        dot: '#47a855' },
    { label: 'Mongoose ODM',           to: '/learn/mongoose',       dot: '#47a855' },
    { label: 'Redis',                  to: '/learn/redis',          dot: '#ff4444' },
    { label: 'SQL & Databases',        to: '/learn/sql',            dot: '#f7941d' },

    { section: 'AI & Intern Tools' },
    { label: '🤖 LLMs & AI APIs',      to: '/learn/llms',           dot: '#a855f7' },
    { label: '🎙️ Deepgram',           to: '/learn/deepgram',       dot: '#06b6d4' },
    { label: '🌐 ngrok',               to: '/learn/ngrok',          dot: '#1d4ed8' },

    { section: 'DevOps' },
    { label: '🐳 Docker',              to: '/learn/docker',         dot: '#2496ed' },
    { label: '⚙️ CI/CD',               to: '/learn/cicd',           dot: '#2088ff' },
    { label: '🚀 Deploy to Prod',      to: '/learn/deploy',         dot: '#6366f1' },

    { section: 'Quality' },
    { label: '🔷 TypeScript',          to: '/learn/typescript',     dot: '#3178c6' },
    { label: '🧪 Testing',             to: '/learn/testing',        dot: '#5bc17a' },
    { label: '📊 Logging & Errors',    to: '/learn/error-tracking', dot: '#7c3aed' },
    { label: '🌿 Git & GitHub',        to: '/learn/git',            dot: '#ff6b35' },

    { section: 'Master Builds' },
    { label: '🏗️ App Clones',          to: '/clones' },
    { label: '🎯 Mini Projects',       to: '/mini-projects' },

    { section: 'Practice & Track' },
    { label: '💼 Interview Prep',      to: '/interview' },
    { label: '⚡ Daily Challenge',     to: '/challenge' },
    { label: '📦 My Snippets',         to: '/snippets' },
    { label: '🃏 Flashcards',          to: '/flashcards' },
    { label: '📄 Resume Tracker',      to: '/resume' },
    { label: '⭐ Starred Items',        to: '/starred' },

    { section: 'More' },
    { label: '✉️ Connect',             to: '/connect' },
];

const PAGE_ROUTES = NAV.filter(i => i.to).map(i => i.to);

export default function Sidebar({ isOpen, onClose, onSearchClick }) {
    const location = useLocation();
    const { progress, isPageDone } = useAuth();
    const [pct, setPct] = useState(0);

    useEffect(() => {
        const idx = PAGE_ROUTES.indexOf(location.pathname);
        setPct(idx <= 0 ? 0 : Math.round((idx / (PAGE_ROUTES.length - 1)) * 100));
    }, [location.pathname]);

    const done = (progress?.completedPages || []).length;

    return (
        <nav className={`sidebar${isOpen ? ' open' : ''}`}>
            <div className="sidebar-logo">
                <div className="logo-mark">
                    <div className="logo-text-group">
                        <h1>FullStack <span>Compass</span></h1>
                    </div>
                </div>
            </div>

            <div className="sidebar-progress">
                <div className="progress-label">
                    <span>Progress{done > 0 ? ` · ${done} done` : ''}</span>
                    <span>{pct}%</span>
                </div>
                <div className="progress-track"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
            </div>

            <div style={{ flex:1, overflowY:'auto' }}>
                {NAV.map((item, i) => {
                    if (item.section) return <div key={i} className="nav-section">{item.section}</div>;
                    if (item.action === 'search') {
                        return (
                            <button key={i} className="nav-item nav-item--btn" onClick={() => { onSearchClick(); onClose(); }}>
                                {item.label}
                            </button>
                        );
                    }
                    const active = location.pathname === item.to;
                    const pageDone = item.to ? isPageDone(item.to) : false;
                    return (
                        <NavLink key={i} to={item.to} onClick={onClose} className={`nav-item${active ? ' active' : ''}`}>
                            {item.dot && <span className="nav-dot" style={{ background: item.dot, boxShadow: active ? `0 0 6px ${item.dot}` : 'none' }} />}
                            {item.label}
                            {pageDone && <span className="nav-done">✓</span>}
                        </NavLink>
                    );
                })}
            </div>

            <div style={{ padding:'16px 20px', borderTop:'1px solid var(--border)' }}>
                <a href="https://fullstackcompass.in" target="_blank" rel="noopener noreferrer"
                   style={{ fontSize:'11px', color:'var(--text3)', fontFamily:"'Space Mono',monospace", textDecoration:'none', display:'flex', alignItems:'center', gap:'6px' }}>
                    <span>↗</span> fullstackcompass.in
                </a>
            </div>
        </nav>
    );
}
