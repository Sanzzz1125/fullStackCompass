import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Estimates reading time from visible text on the page, shows last-visited date.
export default function ReadingMeta() {
    const location = useLocation();
    const [meta, setMeta] = useState({ minutes: 0, lastVisit: null });

    useEffect(() => {
        // Estimate reading time: count words in <main>, ~200 wpm
        const main = document.querySelector('main');
        const words = main ? main.innerText.trim().split(/\s+/).length : 0;
        const minutes = Math.max(1, Math.round(words / 200));

        const key = 'fc_lastvisit__' + location.pathname;
        const prevVisit = localStorage.getItem(key);
        localStorage.setItem(key, new Date().toISOString());

        setMeta({ minutes, lastVisit: prevVisit });
    }, [location.pathname]);

    if (!meta.minutes) return null;

    const lastVisitText = meta.lastVisit ? timeAgo(new Date(meta.lastVisit)) : null;

    return (
        <div className="reading-meta">
            <span>📖 ~{meta.minutes} min read</span>
            {lastVisitText && <span>· Last visited {lastVisitText}</span>}
        </div>
    );
}

function timeAgo(date) {
    const diff = Math.floor((Date.now() - date.getTime()) / 1000);
    if (diff < 60)    return 'just now';
    if (diff < 3600)  return `${Math.floor(diff/60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
    const days = Math.floor(diff / 86400);
    if (days === 1) return 'yesterday';
    if (days < 30)  return `${days}d ago`;
    return date.toLocaleDateString();
}
