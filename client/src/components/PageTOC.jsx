import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';

export default function PageTOC() {
    const [items, setItems]     = useState([]);
    const [active, setActive]   = useState(null);
    const [hovered, setHovered] = useState(false);
    const location              = useLocation();
    const observerRef           = useRef(null);
    const containerRef          = useRef(null); // direct DOM ref for smooth movement

    // ── Scan h2 headings on route change ──────────────────────────────
    useEffect(() => {
        const timer = setTimeout(() => {
            const sections = document.querySelectorAll('.chapter');
            const found = [];
            sections.forEach((sec, idx) => {
                const h2  = sec.querySelector('h2');
                const num = sec.querySelector('.chapter-num');
                if (!h2) return;
                const id = `toc-section-${idx}`;
                sec.setAttribute('id', id);
                found.push({
                    id,
                    num:   num ? num.textContent.trim() : String(idx + 1).padStart(2, '0'),
                    label: h2.textContent.trim(),
                });
            });
            setItems(found);
            setActive(found[0]?.id ?? null);
        }, 150);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    // ── Smooth scroll-driven position — RAF + direct DOM update ───────
    // No React state involved, so NO re-renders on scroll = buttery smooth
    useEffect(() => {
        let rafId = null;

        const update = () => {
            const el = containerRef.current;
            if (!el) return;

            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress  = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;

            // Pill height estimate: clamp between 8vh and 92vh so it stays on screen
            const vh        = window.innerHeight;
            const pillH     = el.offsetHeight;
            const minTop    = pillH / 2;                   // px from top
            const maxTop    = vh - pillH / 2;              // px from top
            const topPx     = minTop + progress * (maxTop - minTop);

            el.style.top = `${topPx}px`;
            rafId = null;
        };

        const onScroll = () => {
            if (rafId) return;              // already scheduled
            rafId = requestAnimationFrame(update);
        };

        update(); // set initial position
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', update, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', update);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [items]); // re-run when items change (pill height may change)

    // ── IntersectionObserver — active section dot ─────────────────────
    useEffect(() => {
        if (!items.length) return;
        if (observerRef.current) observerRef.current.disconnect();
        observerRef.current = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
            { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
        );
        items.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observerRef.current.observe(el);
        });
        return () => observerRef.current?.disconnect();
    }, [items]);

    // ── Instant jump to section ───────────────────────────────────────
    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        window.scrollTo({ top: el.offsetTop - 64, behavior: 'instant' });
    };

    if (!items.length) return null;

    return ReactDOM.createPortal(
        <div
            ref={containerRef}
            className={`page-toc${hovered ? ' page-toc--open' : ''}`}
            onMouseLeave={() => setHovered(false)}
            aria-label="Page table of contents"
        >
            {/* ── Pill handle ── */}
            <div
                className="page-toc__handle"
                onMouseEnter={() => setHovered(true)}
                aria-hidden="true"
            >
                {items.map(({ id }) => (
                    <div
                        key={id}
                        className={`page-toc__pip${active === id ? ' page-toc__pip--active' : ''}`}
                    />
                ))}
            </div>

            {/* ── Expanded section list ── */}
            <nav className="page-toc__list">
                <div className="page-toc__header">On this page</div>
                {items.map(({ id, num, label }) => (
                    <button
                        key={id}
                        className={`page-toc__item${active === id ? ' page-toc__item--active' : ''}`}
                        onClick={() => scrollToSection(id)}
                        title={label}
                    >
                        <span className="page-toc__num">{num}</span>
                        <span className="page-toc__label">{label}</span>
                    </button>
                ))}
            </nav>
        </div>,
        document.body
    );
}
