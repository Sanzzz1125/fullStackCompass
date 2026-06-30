import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function TopBar({ onMenuClick, onSearchClick }) {
    const fillRef = useRef(null);
    const { theme, toggleTheme } = useTheme();
    const { user, logout, progress } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const onScroll = () => {
            const h   = document.documentElement;
            const pct = h.scrollTop / (h.scrollHeight - h.clientHeight);
            if (fillRef.current) fillRef.current.style.transform = `scaleX(${isNaN(pct) ? 0 : pct})`;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const xp  = progress?.xp    ?? 0;
    const lvl = progress?.level ?? 1;

    return (
        <div className="topbar-shell">
            <div className="top-bar-line"><div className="top-bar-fill" ref={fillRef} /></div>

            <div className="topbar-inner">
                <button className="topbar-hamburger" onClick={onMenuClick} aria-label="Menu">
                    <span /><span /><span />
                </button>

                {/* Search trigger */}
                <button className="topbar-search-btn" onClick={onSearchClick}>
                    <span>🔍</span>
                    <span className="topbar-search-text">Search pages…</span>
                    <kbd className="topbar-kbd">⌘K</kbd>
                </button>

                <div style={{ flex: 1 }} />

                <div className="topbar-right">
                    <button onClick={toggleTheme} className="topbar-btn" title="Toggle theme">
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                    <button onClick={() => navigate('/starred')} className="topbar-btn" title="Starred items">⭐</button>

                    {user ? (
                        <>
                            <div className="topbar-chip">
                                <div className="topbar-avatar">{user.name?.[0]?.toUpperCase()}</div>
                                <span className="topbar-name">{user.name.split(' ')[0]}</span>
                                <span className="topbar-xp">Lv.{lvl} · {xp}xp</span>
                            </div>
                            <button className="topbar-btn" onClick={logout}>Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="topbar-btn topbar-signin">Sign In</Link>
                    )}
                </div>
            </div>
        </div>
    );
}
