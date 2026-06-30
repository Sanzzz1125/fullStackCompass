import React from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';
import PracticeArena from '../components/PracticeArena.jsx';

const COLOR = 'var(--css-color)';

const RESOURCES = [
    { type: 'docs',     title: 'MDN CSS Reference',          description: 'Every CSS property documented with browser support, syntax and live examples.', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference' },
    { type: 'docs',     title: 'CSS-Tricks',                  description: 'Guides, almanac, and snippets. The flexbox and grid guides alone are worth bookmarking.', url: 'https://css-tricks.com/' },
    { type: 'tool',     title: 'CSS Box Shadow Generator',    description: 'Visual box-shadow builder — copy the CSS directly.', url: 'https://shadows.brumm.af/' },
    { type: 'tool',     title: 'CSS Gradient Generator',      description: 'Build linear, radial and conic gradients visually.', url: 'https://cssgradient.io/' },
    { type: 'tool',     title: 'Clippy — CSS clip-path',      description: 'Create complex clip-path shapes visually.', url: 'https://bennettfeely.com/clippy/' },
    { type: 'tool',     title: 'Grid Generator',              description: 'Visual CSS Grid layout builder with code output.', url: 'https://cssgrid-generator.netlify.app/' },
    { type: 'tool',     title: 'Animista',                    description: 'Pre-built CSS animations you can customise and copy.', url: 'https://animista.net/' },
    { type: 'tutorial', title: 'Kevin Powell — YouTube',      description: 'Best CSS teacher on YouTube. His flexbox and grid series are essential.', url: 'https://www.youtube.com/@KevinPowell' },
];

const GAMES = [
    { emoji: '🥦', name: 'CSS Diner',      description: 'Master CSS selectors by selecting food items. 32 levels of increasing difficulty.', url: 'https://flukeout.github.io/' },
    { emoji: '🐸', name: 'Flexbox Froggy', description: 'Move frogs to lily pads using flexbox. Best way to learn justify-content and align-items.', url: 'https://flexboxfroggy.com/' },
    { emoji: '🌻', name: 'Grid Garden',    description: 'Water your garden with CSS Grid properties. 28 levels covering all grid concepts.', url: 'https://cssgridgarden.com/' },
    { emoji: '⚔️', name: 'CSS Battle',    description: 'Recreate target images using CSS. Competitive and addictive.', url: 'https://cssbattle.dev/' },
];

export default function CSS() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{ color: COLOR }}>CSS</span> — Chapter 02</div>
                <h1><span className="accent" style={{ color: COLOR }}>CSS</span><br /><em>Style the web</em></h1>
                <p className="hero-desc">CSS controls every visual aspect of your app — layout, color, spacing, animation, responsiveness. Strong CSS separates good-looking apps from great ones. This guide covers everything from the box model to modern container queries.</p>
                <div className="hero-stack">
                    {['Box Model','Flexbox','Grid','Animations','Variables','Sass','BEM','Responsive','Modern CSS'].map(t => <span key={t} className="stack-chip">{t}</span>)}
                </div>
            </section>

            {/* ── BOX MODEL ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>01</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Foundation</div>
                        <h2>The Box Model — How Space Works</h2>
                        <p className="chapter-intro">Every element is a rectangular box. The box model defines how its dimensions are calculated. Get this wrong and nothing lines up.</p>
                    </div>
                </div>
                <div className="topic">
                    <h3>Content → Padding → Border → Margin</h3>
                    <CodeBlock lang="css" code={`/* The CSS Reset — add to every project */
*, *::before, *::after {
    box-sizing: border-box; /* padding & border INCLUDED in width */
    margin: 0;
    padding: 0;
}

.card {
    width: 320px;        /* content area */
    padding: 24px;       /* space INSIDE the border */
    border: 2px solid #e5e5e5; /* the visible boundary */
    margin: 16px;        /* space OUTSIDE the border */

    /* With border-box: total rendered width = 320px (not 320+48+4) */
}

/* Shorthand patterns */
.el {
    padding: 20px;                  /* all 4 sides */
    padding: 10px 20px;             /* top/bottom | left/right */
    padding: 10px 15px 20px 25px;   /* top right bottom left (clockwise) */
    margin: 0 auto;                 /* center horizontally */
}

/* Display types */
.block   { display: block;        } /* takes full width, stacks vertically */
.inline  { display: inline;       } /* flows with text, no width/height */
.inblk   { display: inline-block; } /* flows with text BUT respects width/height */
.flex    { display: flex;         } /* flexbox container */
.grid    { display: grid;         } /* grid container */
.none    { display: none;         } /* removed from layout */
.hidden  { visibility: hidden;    } /* invisible but still takes up space */`} />
                </div>
            </section>

            {/* ── SELECTORS & SPECIFICITY ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>02</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Selectors</div>
                        <h2>Selectors, Specificity & the Cascade</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Every Selector Type</h3>
                    <CodeBlock lang="css" code={`/* Element */          p { color: #333; }
/* Class (reusable) */ .card { border-radius: 8px; }
/* ID (unique) */      #hero { font-size: 48px; }
/* Universal */        * { box-sizing: border-box; }
/* Attribute */        [type="text"] { border: 1px solid #ccc; }
/* Descendant */       .nav a { color: white; }       /* any a inside .nav */
/* Direct child */     .nav > a { font-weight: 700; } /* DIRECT a children only */
/* Adjacent sibling */ h2 + p { margin-top: 8px; }   /* p immediately after h2 */
/* General sibling */  h2 ~ p { color: #555; }        /* all p after h2 */

/* Pseudo-classes — element state */
a:hover        { color: blue; }
a:focus        { outline: 2px solid blue; }
a:active       { opacity: 0.8; }
input:disabled { background: #f5f5f5; cursor: not-allowed; }
li:first-child { border-top: none; }
li:last-child  { border-bottom: none; }
li:nth-child(odd)  { background: #f9f9f9; }
li:nth-child(3n+1) { color: red; }        /* every 3rd, starting at 1 */
p:not(.special)    { color: #666; }       /* everything NOT .special */
.form:has(input:invalid) { border-color: red; } /* parent if child matches */

/* Pseudo-elements — virtual elements */
p::first-line   { font-weight: bold; }
p::first-letter { font-size: 2em; float: left; }
.required::after  { content: ' *'; color: red; }
.clearfix::after  {
    content: '';
    display: block;
    clear: both;
}`} />
                </div>
                <div className="topic">
                    <h3>Specificity — Which Style Wins</h3>
                    <CodeBlock lang="css" code={`/* Specificity is calculated as: (inline, id, class/attr/pseudo, element)
   Higher number wins. Equal specificity = last one in file wins. */

p            { color: black; }   /* (0,0,0,1) — 1 point */
.text        { color: blue;  }   /* (0,0,1,0) — 10 points */
#hero        { color: green; }   /* (0,1,0,0) — 100 points */
/* style="..." */                /* (1,0,0,0) — 1000 points */

/* Combined selectors ADD specificity */
div p        /* (0,0,0,2) */
.nav .link   /* (0,0,2,0) */
#nav .link   /* (0,1,1,0) */
.btn:hover   /* (0,0,2,0) */

/* !important — overrides everything (avoid using it) */
.override { color: red !important; } /* last resort only */

/* PRACTICAL RULE: Keep specificity low.
   Prefer class selectors over ID selectors.
   Avoid !important.
   Use BEM naming (see below) to prevent conflicts. */`} />
                </div>
            </section>

            {/* ── FLEXBOX ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>03</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Layout</div>
                        <h2>Flexbox — 1D Layouts</h2>
                        <p className="chapter-intro">Flexbox handles one dimension: a row OR a column. Use it for navbars, button groups, centering, and any component that arranges items in a line.</p>
                    </div>
                </div>
                <div className="topic">
                    <h3>Complete Flexbox Reference</h3>
                    <CodeBlock lang="css" code={`/* ── CONTAINER PROPERTIES ── */
.container {
    display: flex;

    /* Direction */
    flex-direction: row;            /* row (default) | row-reverse | column | column-reverse */

    /* Wrapping */
    flex-wrap: nowrap;              /* nowrap (default) | wrap | wrap-reverse */
    /* shorthand: */
    flex-flow: row wrap;

    /* Main axis (direction axis) alignment */
    justify-content: flex-start;   /* flex-start | flex-end | center
                                      space-between | space-around | space-evenly */

    /* Cross axis alignment (single line) */
    align-items: stretch;          /* stretch (default) | flex-start | flex-end
                                      center | baseline */

    /* Cross axis alignment (multiple lines) */
    align-content: flex-start;     /* same values as justify-content */

    gap: 16px;                     /* space between items */
    gap: 16px 24px;                /* row-gap column-gap */
}

/* ── ITEM PROPERTIES ── */
.item {
    flex-grow: 0;       /* how much to grow relative to siblings (0=don't) */
    flex-shrink: 1;     /* how much to shrink (1=can shrink) */
    flex-basis: auto;   /* initial size before grow/shrink */
    flex: 1;            /* shorthand: grow=1, shrink=1, basis=0 */
    flex: 0 0 200px;    /* fixed width, never grow or shrink */

    align-self: center; /* override container's align-items for this item */
    order: 2;           /* change visual order (default=0) */
}

/* ── MOST USED PATTERNS ── */

/* Center anything */
.center { display: flex; justify-content: center; align-items: center; }

/* Sticky footer */
body { display: flex; flex-direction: column; min-height: 100vh; }
main { flex: 1; } /* grows to fill space, pushes footer down */

/* Navbar */
nav { display: flex; justify-content: space-between; align-items: center; }

/* Equal-width buttons */
.btn-group { display: flex; gap: 8px; }
.btn-group button { flex: 1; }`} />
                </div>
            </section>

            {/* ── GRID ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>04</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Layout</div>
                        <h2>CSS Grid — 2D Layouts</h2>
                        <p className="chapter-intro">Grid handles both rows AND columns simultaneously. Use it for page layouts, dashboards, and product grids.</p>
                    </div>
                </div>
                <div className="topic">
                    <h3>Grid Reference + Real Patterns</h3>
                    <CodeBlock lang="css" code={`/* ── CONTAINER ── */
.grid {
    display: grid;

    /* Define columns */
    grid-template-columns: 250px 1fr 200px;          /* 3 cols: fixed | flexible | fixed */
    grid-template-columns: repeat(3, 1fr);            /* 3 equal columns */
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); /* responsive grid */

    /* Define rows */
    grid-template-rows: auto 1fr auto;               /* header | content | footer */

    /* Named template areas */
    grid-template-areas:
        "header header header"
        "sidebar main    aside"
        "footer footer footer";

    gap: 24px;                /* row and column gap */
    row-gap: 24px;
    column-gap: 16px;
}

/* ── ITEM PLACEMENT ── */
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }

/* Manual placement */
.hero {
    grid-column: 1 / -1;     /* span full width (1 to last line) */
    grid-column: 1 / 3;      /* columns 1 to 3 */
    grid-row: 1 / 3;         /* rows 1 to 3 */
    grid-column: span 2;     /* span 2 columns from current position */
}

/* ── REAL WORLD PATTERNS ── */

/* Responsive product grid (no media queries!) */
.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 24px;
}

/* Holy grail layout */
.page {
    display: grid;
    grid-template:
        "header" 64px
        "main"   1fr
        "footer" 48px / 1fr;
    min-height: 100vh;
}

/* Sidebar layout */
.app {
    display: grid;
    grid-template-columns: 260px 1fr;
    grid-template-rows: 60px 1fr;
    min-height: 100vh;
}`} />
                </div>
            </section>

            {/* ── RESPONSIVE ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>05</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Responsive</div>
                        <h2>Responsive Design — Mobile First</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Media Queries, Fluid Units & Clamp</h3>
                    <CodeBlock lang="css" code={`/* Mobile-first: base styles are for mobile.
   Use min-width queries to add styles for LARGER screens. */

.container {
    padding: 16px;
    font-size: 14px;
}

/* Tablet (768px and up) */
@media (min-width: 768px) {
    .container { padding: 32px; font-size: 15px; }
    .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop (1024px and up) */
@media (min-width: 1024px) {
    .container { padding: 48px; max-width: 1200px; margin: 0 auto; }
    .grid { grid-template-columns: repeat(3, 1fr); }
}

/* Wide screen */
@media (min-width: 1440px) {
    .container { max-width: 1400px; }
}

/* Dark mode preference */
@media (prefers-color-scheme: dark) {
    :root { --bg: #0a0a0a; --text: #f0f0f0; }
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}

/* ── FLUID UNITS ── */
.responsive-text {
    /* clamp(min, preferred, max) — fluid scaling without media queries */
    font-size: clamp(1rem, 2.5vw, 2rem);   /* min 1rem, grows with viewport, max 2rem */
    padding: clamp(16px, 4vw, 48px);

    /* vh, vw — viewport units */
    width: 50vw;     /* 50% of viewport width */
    height: 100vh;   /* full viewport height */
    height: 100dvh;  /* dynamic viewport height (fixes mobile browser bars) */

    /* rem — relative to root font size (16px default) */
    font-size: 1.5rem;  /* 24px */
    margin: 2rem;       /* 32px */

    /* em — relative to element's own font size */
    padding: 0.75em; /* 75% of element's font-size */
}`} />
                </div>
            </section>

            {/* ── CSS VARIABLES ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>06</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Variables</div>
                        <h2>CSS Custom Properties (Variables)</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Design Tokens & Theming</h3>
                    <CodeBlock lang="css" code={`/* Define in :root for global access */
:root {
    /* Colors */
    --color-primary:    #2563eb;
    --color-secondary:  #7c3aed;
    --color-success:    #16a34a;
    --color-danger:     #dc2626;
    --color-bg:         #ffffff;
    --color-text:       #111827;
    --color-muted:      #6b7280;
    --color-border:     #e5e7eb;

    /* Typography */
    --font-sans:   'Inter', -apple-system, sans-serif;
    --font-mono:   'JetBrains Mono', monospace;
    --text-xs:     0.75rem;
    --text-sm:     0.875rem;
    --text-base:   1rem;
    --text-lg:     1.125rem;
    --text-xl:     1.25rem;
    --text-2xl:    1.5rem;
    --text-4xl:    2.25rem;

    /* Spacing (8px base) */
    --space-1:  4px;
    --space-2:  8px;
    --space-3:  12px;
    --space-4:  16px;
    --space-6:  24px;
    --space-8:  32px;
    --space-12: 48px;
    --space-16: 64px;

    /* Effects */
    --radius-sm:  4px;
    --radius:     8px;
    --radius-lg:  12px;
    --radius-xl:  20px;
    --radius-full: 9999px;
    --shadow-sm:  0 1px 2px rgba(0,0,0,.05);
    --shadow:     0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1);
    --shadow-lg:  0 10px 15px -3px rgba(0,0,0,.1);
    --transition: all 0.2s ease;
}

/* Dark theme — just override variables */
[data-theme="dark"], .dark {
    --color-bg:     #0f172a;
    --color-text:   #f8fafc;
    --color-muted:  #94a3b8;
    --color-border: #1e293b;
}

/* Using variables */
.button {
    background:    var(--color-primary);
    color:         white;
    padding:       var(--space-3) var(--space-6);
    border-radius: var(--radius);
    font-family:   var(--font-sans);
    transition:    var(--transition);
    box-shadow:    var(--shadow);
}

/* Modify locally — scoped override */
.danger-zone {
    --color-primary: var(--color-danger);
}`} />
                </div>
            </section>

            {/* ── ANIMATIONS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>07</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Animations</div>
                        <h2>Transitions & Animations</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Transitions, Keyframes & Transform</h3>
                    <CodeBlock lang="css" code={`/* ── TRANSITIONS — smooth state changes ── */
.button {
    background: #2563eb;
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: background 0.2s ease,
                transform  0.15s ease,
                box-shadow 0.2s ease;
}
.button:hover {
    background: #1d4ed8;
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}
.button:active { transform: translateY(0); }

/* ── KEYFRAME ANIMATIONS ── */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
}

@keyframes slideIn {
    from { transform: translateX(-100%); }
    to   { transform: translateX(0); }
}

.card-enter  { animation: fadeIn 0.3s ease forwards; }
.spinner     { animation: spin 1s linear infinite; }
.skeleton    { animation: pulse 1.5s ease-in-out infinite; }

/* animation shorthand: name duration timing-function delay iterations */
.hero-text { animation: fadeIn 0.6s ease 0.2s both; }

/* ── TRANSFORM ── */
.element {
    transform: translateX(20px) translateY(-10px);
    transform: scale(1.05);
    transform: rotate(45deg);
    transform: skewX(15deg);
    transform: matrix(1, 0, 0, 1, 0, 0); /* full matrix */

    /* 3D transforms */
    transform: perspective(500px) rotateY(30deg);
    transform-style: preserve-3d;

    /* Origin of transform */
    transform-origin: top left;
    transform-origin: 50% 50%; /* center (default) */
}

/* ── PERFORMANCE TIP ──
   Only animate these two properties for 60fps animations:
   1. transform
   2. opacity
   Everything else causes layout recalculation or paint.
   Use will-change sparingly for known animations. */
.card:hover { will-change: transform; }`} />
                </div>
            </section>

            {/* ── PSEUDO ELEMENTS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>08</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Advanced</div>
                        <h2>::before & ::after — CSS Superpowers</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Creative Uses of Pseudo-Elements</h3>
                    <CodeBlock lang="css" code={`/* ::before and ::after create virtual child elements.
   They MUST have content: '' to render.
   Positioned relative to the parent. */

/* Badge / notification dot */
.notification {
    position: relative;
}
.notification::after {
    content: '';
    position: absolute;
    top: -4px; right: -4px;
    width: 10px; height: 10px;
    background: #ef4444;
    border-radius: 50%;
    border: 2px solid white;
}

/* Underline animation on hover */
.nav-link {
    position: relative;
    text-decoration: none;
}
.nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 0;
    width: 0; height: 2px;
    background: currentColor;
    transition: width 0.3s ease;
}
.nav-link:hover::after { width: 100%; }

/* Gradient overlay on images */
.hero-image {
    position: relative;
}
.hero-image::after {
    content: '';
    position: absolute;
    inset: 0; /* top:0 right:0 bottom:0 left:0 */
    background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%);
    pointer-events: none;
}

/* Required field marker */
.required::before {
    content: '* ';
    color: #ef4444;
    font-weight: bold;
}

/* Custom checkbox / toggle */
.custom-check input[type="checkbox"] { display: none; }
.custom-check label { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.custom-check label::before {
    content: '';
    width: 20px; height: 20px;
    border: 2px solid #d1d5db;
    border-radius: 4px;
    transition: all 0.2s;
}
.custom-check input:checked + label::before {
    background: #2563eb;
    border-color: #2563eb;
    background-image: url("data:image/svg+xml,..."); /* checkmark SVG */
}`} />
                </div>
            </section>

            {/* ── BEM ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>09</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Architecture</div>
                        <h2>BEM — CSS Naming Convention</h2>
                        <p className="chapter-intro">BEM (Block Element Modifier) is a naming convention that keeps CSS scalable and self-documenting. Used by large teams worldwide.</p>
                    </div>
                </div>
                <div className="topic">
                    <h3>Block__Element--Modifier</h3>
                    <CodeBlock lang="css" code={`/* BLOCK — standalone component */
.card { ... }
.button { ... }
.nav { ... }

/* ELEMENT — part of a block, separated by __ */
.card__image    { ... }
.card__title    { ... }
.card__body     { ... }
.card__footer   { ... }
.button__icon   { ... }
.nav__item      { ... }
.nav__link      { ... }

/* MODIFIER — variation of block or element, separated by -- */
.card--featured    { border: 2px solid gold; }
.card--horizontal  { flex-direction: row; }
.button--primary   { background: blue; }
.button--danger    { background: red; }
.button--sm        { padding: 4px 8px; font-size: 0.8rem; }
.button--lg        { padding: 12px 24px; font-size: 1.1rem; }
.nav__item--active { font-weight: bold; }

/* Never nest BEM classes — keeps specificity flat */
/* ❌ Bad */
.card .card__title { ... }

/* ✅ Good */
.card__title { ... }

/* HTML usage */
/* <div class="card card--featured">
     <img class="card__image" src="..." />
     <div class="card__body">
       <h2 class="card__title">Title</h2>
       <p class="card__text">...</p>
     </div>
     <div class="card__footer">
       <button class="button button--primary button--sm">Buy</button>
     </div>
   </div> */`} />
                </div>
            </section>

            {/* ── SASS/SCSS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>10</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Sass / SCSS</div>
                        <h2>Sass/SCSS — CSS with Superpowers</h2>
                        <p className="chapter-intro">Sass adds variables, nesting, mixins, functions and more to CSS. SCSS is the modern syntax — files end in .scss.</p>
                    </div>
                </div>
                <div className="topic">
                    <h3>Core Sass Features</h3>
                    <CodeBlock lang="css" code={`// Install: npm install -D sass
// Vite supports .scss out of the box

// ── VARIABLES (prefer CSS variables for runtime theming) ──
$primary:   #2563eb;
$font-base: 16px;
$breakpoint-md: 768px;

// ── NESTING ──
.nav {
    display: flex;
    gap: 16px;

    &__item { // &  = .nav (parent reference)
        padding: 8px 12px;

        &:hover { background: rgba(0,0,0,.05); }

        &--active { font-weight: bold; color: $primary; }
    }

    &__link {
        text-decoration: none;
        color: inherit;
    }
}

// ── MIXINS — reusable blocks ──
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

@mixin respond-to($bp) {
    @if $bp == 'md'   { @media (min-width: 768px)  { @content; } }
    @if $bp == 'lg'   { @media (min-width: 1024px) { @content; } }
    @if $bp == 'xl'   { @media (min-width: 1280px) { @content; } }
}

@mixin truncate($lines: 1) {
    @if $lines == 1 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    } @else {
        display: -webkit-box;
        -webkit-line-clamp: $lines;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
}

.hero   { @include flex-center; }
.title  { @include truncate(2); }
.section {
    padding: 16px;
    @include respond-to('md') { padding: 32px; }
    @include respond-to('lg') { padding: 64px; }
}

// ── FUNCTIONS ──
@function rem($px) { @return #{$px / 16}rem; }
.heading { font-size: rem(24); } // → 1.5rem

// ── EXTENDS / PLACEHOLDERS ──
%button-reset {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
}
.btn-primary { @extend %button-reset; background: $primary; }
.btn-danger  { @extend %button-reset; background: #dc2626; }

// ── EACH LOOP — generate utility classes ──
$sizes: (1: 4px, 2: 8px, 3: 12px, 4: 16px, 6: 24px, 8: 32px);
@each $key, $val in $sizes {
    .mt-#{$key} { margin-top: $val; }
    .mb-#{$key} { margin-bottom: $val; }
    .p-#{$key}  { padding: $val; }
}`} />
                </div>
            </section>

            {/* ── MODERN CSS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>11</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Modern CSS</div>
                        <h2>Modern CSS — 2024 Features</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Container Queries, :has(), CSS Nesting</h3>
                    <CodeBlock lang="css" code={`/* ── CONTAINER QUERIES — respond to parent size, not viewport ── */
.card-wrapper {
    container-type: inline-size;
    container-name: card;
}

@container card (min-width: 400px) {
    .card { flex-direction: row; }
    .card__image { width: 160px; height: 100%; }
}

/* ── :has() — parent selector ── */
/* Apply styles to parent based on its children */
.form-group:has(input:invalid) {
    border-color: red;
}
.card:has(img) {
    padding-top: 0;
}
nav:has(.nav__item--active) {
    background: rgba(0,0,0,0.05);
}

/* ── CSS NESTING (native, no Sass needed) ── */
.card {
    background: white;
    padding: 24px;

    & .title {     /* child */
        font-size: 1.25rem;
    }
    &:hover {      /* pseudo-class */
        transform: translateY(-2px);
    }
    &.featured {   /* compound selector */
        border: 2px solid gold;
    }
    @media (min-width: 768px) {  /* media query inside rule */
        padding: 32px;
    }
}

/* ── LOGICAL PROPERTIES — language-agnostic layout ── */
.el {
    /* Instead of left/right, use start/end */
    margin-inline: auto;        /* = margin-left + margin-right */
    padding-block: 24px;        /* = padding-top + padding-bottom */
    border-inline-start: 3px solid blue; /* = border-left (in LTR) */
    inset: 0;                   /* = top:0; right:0; bottom:0; left:0 */
    inset-block: 0;             /* top and bottom */
    inset-inline: 0;            /* left and right */
}

/* ── SCROLL SNAP ── */
.carousel {
    display: flex;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
}
.slide {
    flex: 0 0 100%;
    scroll-snap-align: start;
}

/* ── ASPECT RATIO ── */
.video-container { aspect-ratio: 16 / 9; }
.avatar          { aspect-ratio: 1;      border-radius: 50%; }

/* ── LAYER — manage cascade order ── */
@layer reset, base, components, utilities;
@layer components { .btn { ... } }
@layer utilities  { .hidden { display: none !important; } }`} />
                </div>
            </section>

            {/* ── RESOURCES ── */}
            <section className="chapter">
                <div className="chapter-header"><div><h2 style={{ fontFamily: "'Fraunces', serif" }}>Resources & Games</h2></div></div>
                <div className="resource-grid">{RESOURCES.map((r, i) => <ResourceCard key={i} {...r} />)}</div>
                <PracticeArena games={GAMES} />
            </section>

            <footer className="footer">
                <p>CSS · Chapter 02 · FullStack Compass</p>
                <a href="https://sanketh.live/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'none', marginTop: '6px', display: 'block' }}>sanketh.live ↗</a>
            </footer>
        </>
    );
}
