import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEARCH_DATA, DIFFICULTY_COLOR } from '../data/searchData.js';

export default function SearchModal({ onClose }) {
    const [query, setQuery] = useState('');
    const navigate  = useNavigate();
    const inputRef  = useRef(null);
    const [sel, setSel] = useState(0);

    useEffect(() => { inputRef.current?.focus(); }, []);

    useEffect(() => {
        const fn = e => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', fn);
        return () => window.removeEventListener('keydown', fn);
    }, [onClose]);

    const results = query.trim().length < 1 ? SEARCH_DATA.slice(0, 8) :
        SEARCH_DATA.filter(p =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
            p.tags.some(t => t.includes(query.toLowerCase()))
        ).slice(0, 10);

    useEffect(() => { setSel(0); }, [query]);

    const go = (path) => { navigate(path); onClose(); };

    const onKey = e => {
        if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(s+1, results.length-1)); }
        if (e.key === 'ArrowUp')   { e.preventDefault(); setSel(s => Math.max(s-1, 0)); }
        if (e.key === 'Enter' && results[sel]) go(results[sel].path);
    };

    return (
        <div className="search-overlay" onClick={onClose}>
            <div className="search-modal" onClick={e => e.stopPropagation()}>
                <div className="search-bar">
                    <span className="search-icon">🔍</span>
                    <input
                        ref={inputRef}
                        className="search-input"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={onKey}
                        placeholder="Search pages, topics, tags…"
                    />
                    <kbd className="search-esc" onClick={onClose}>Esc</kbd>
                </div>
                <div className="search-results">
                    {results.length === 0 && (
                        <div className="search-empty">No results for "{query}"</div>
                    )}
                    {results.map((r, i) => (
                        <button
                            key={r.path}
                            className={`search-result${i === sel ? ' selected' : ''}`}
                            onClick={() => go(r.path)}
                            onMouseEnter={() => setSel(i)}
                        >
                            <div className="search-result-left">
                                <span className="search-result-title">{r.title}</span>
                                <span className="search-result-sub">{r.subtitle}</span>
                            </div>
                            <div className="search-result-right">
                                <span className="search-diff" style={{ color: DIFFICULTY_COLOR[r.difficulty] }}>
                                    {r.difficulty}
                                </span>
                                <span className="search-arrow">→</span>
                            </div>
                        </button>
                    ))}
                </div>
                <div className="search-footer">
                    <span>↑↓ navigate</span><span>↵ open</span><span>Esc close</span>
                </div>
            </div>
        </div>
    );
}
