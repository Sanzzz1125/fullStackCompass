import React from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';
import PracticeArena from '../components/PracticeArena.jsx';

const COLOR = '#38bdf8';

const RESOURCES = [
    { type: 'docs',     title: 'Tailwind CSS Official Docs',    description: 'The best CSS framework documentation in existence. Every utility class with live examples.', url: 'https://tailwindcss.com/docs' },
    { type: 'tool',     title: 'Tailwind Play',                 description: 'Official online playground — experiment with Tailwind without any setup.', url: 'https://play.tailwindcss.com/' },
    { type: 'tool',     title: 'Tailwind UI Components',        description: 'Official component library (paid) — but free examples exist on the docs.', url: 'https://tailwindui.com/components' },
    { type: 'tutorial', title: 'Flowbite — Free Components',   description: 'Free Tailwind component library. Cards, navbars, modals, tables — all copy-paste ready.', url: 'https://flowbite.com/' },
    { type: 'tool',     title: 'Headless UI',                   description: 'Unstyled accessible UI components (dropdowns, modals, tabs) ready for Tailwind styling.', url: 'https://headlessui.com/' },
    { type: 'tutorial', title: 'Tailwind Cheat Sheet',          description: 'Every Tailwind class in one searchable page.', url: 'https://nerdcave.com/tailwind-cheat-sheet' },
];

const GAMES = [
    { emoji: '🎨', name: 'Tailwind Play Challenges', description: 'Clone a real UI card or component in Tailwind Play within 10 minutes.', url: 'https://play.tailwindcss.com/' },
    { emoji: '🏆', name: 'Frontend Mentor',          description: 'Build pixel-perfect designs from Figma specs using Tailwind CSS.', url: 'https://www.frontendmentor.io/' },
];

export default function Tailwind() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{ color: COLOR }}>Tailwind CSS</span> — Styling</div>
                <h1><span className="accent" style={{ color: COLOR }}>Tailwind CSS</span><br /><em>Utility-first styling</em></h1>
                <p className="hero-desc">Tailwind CSS is a utility-first CSS framework. Instead of writing custom CSS, you compose small utility classes directly in your HTML/JSX. It's fast, consistent, and the most popular CSS approach in the React ecosystem.</p>
                <div className="hero-stack">
                    {['Utility Classes','Responsive','Dark Mode','Custom Config','React Integration','Animations'].map(t => <span key={t} className="stack-chip">{t}</span>)}
                </div>
            </section>

            {/* ── WHY TAILWIND ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>01</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Concepts</div>
                        <h2>Why Tailwind? Utility-First Explained</h2>
                        <p className="chapter-intro">Traditional CSS: you write class names, then write CSS for those names. Tailwind: class names ARE the CSS. No context switching, no naming things, no specificity wars.</p>
                    </div>
                </div>
                <div className="topic">
                    <h3>Traditional CSS vs Tailwind</h3>
                    <CodeBlock lang="css" code={`/* Traditional CSS approach */
/* You write HTML: */
/* <div class="card">...</div> */

/* Then write CSS: */
.card {
    background: white;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 4px 6px rgba(0,0,0,.1);
    border: 1px solid #e5e7eb;
}`} />
                    <CodeBlock lang="html" code={`<!-- Tailwind approach — styles ARE the classes -->
<div class="bg-white rounded-lg p-6 shadow-md border border-gray-200">
  ...
</div>

<!-- Same result, no context switching, no CSS file needed -->

<!-- ✅ Advantages:
     1. No dead CSS — only classes used are bundled
     2. No naming things (.card-wrapper-inner-top — gone)
     3. Consistent spacing/colors from design system
     4. Faster — everything inline, no file switching
     5. Easy responsive — just prefix: md:p-8 lg:p-12
-->

<!-- ❌ Disadvantages:
     1. HTML looks "busy" at first
     2. Learning curve for class names
     3. Repetition (use components for that)
-->`} />
                </div>
            </section>

            {/* ── SETUP ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>02</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Setup</div>
                        <h2>Installation with Vite + React</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Setup in 3 Minutes</h3>
                    <CodeBlock lang="bash" code={`# Create Vite React project
npm create vite@latest my-app -- --template react
cd my-app

# Install Tailwind + dependencies
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p   # creates tailwind.config.js + postcss.config.js`} />
                    <CodeBlock lang="javascript" code={`// tailwind.config.js — tell Tailwind where your files are
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // scan ALL these files for class names
    ],
    darkMode: 'class',    // or 'media' for system preference
    theme: {
        extend: {
            // Add your custom design tokens here
            colors: {
                brand: {
                    50:  '#eff6ff',
                    500: '#3b82f6',
                    900: '#1e3a8a',
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            borderRadius: {
                '4xl': '2rem',
            },
        },
    },
    plugins: [],
};`} />
                    <CodeBlock lang="css" code={`/* src/index.css — add these three lines (replace all existing CSS) */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Optional: add global base styles */
@layer base {
    html { font-family: 'Inter', sans-serif; }
    h1 { @apply text-4xl font-bold; }
    h2 { @apply text-3xl font-semibold; }
}`} />
                </div>
            </section>

            {/* ── CORE CLASSES ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>03</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Core</div>
                        <h2>Essential Utility Classes</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Spacing, Sizing, Typography & Colors</h3>
                    <CodeBlock lang="html" code={`<!-- ── SPACING (1 unit = 4px) ── -->
<div class="m-4">     <!-- margin: 16px all -->
<div class="mx-auto"> <!-- margin-left/right: auto (centering) -->
<div class="mt-8">    <!-- margin-top: 32px -->
<div class="p-6">     <!-- padding: 24px all -->
<div class="px-4 py-2">  <!-- padding: 8px 16px -->
<div class="gap-4">   <!-- gap: 16px (flexbox/grid) -->

<!-- ── SIZING ── -->
<div class="w-full">   <!-- width: 100% -->
<div class="w-1/2">    <!-- width: 50% -->
<div class="w-64">     <!-- width: 256px -->
<div class="w-screen"> <!-- width: 100vw -->
<div class="max-w-4xl"><!-- max-width: 896px -->
<div class="h-screen"> <!-- height: 100vh -->
<div class="h-16">     <!-- height: 64px -->
<div class="min-h-screen"> <!-- min-height: 100vh -->

<!-- ── TYPOGRAPHY ── -->
<p class="text-sm">     <!-- font-size: 14px -->
<p class="text-base">   <!-- 16px -->
<p class="text-lg">     <!-- 18px -->
<p class="text-xl">     <!-- 20px -->
<p class="text-2xl">    <!-- 24px -->
<p class="text-4xl">    <!-- 36px -->
<p class="font-normal"> <!-- font-weight: 400 -->
<p class="font-medium"> <!-- 500 -->
<p class="font-semibold"><!-- 600 -->
<p class="font-bold">   <!-- 700 -->
<p class="leading-tight"><!-- line-height: 1.25 -->
<p class="leading-relaxed"><!-- 1.625 -->
<p class="tracking-wide"> <!-- letter-spacing: 0.025em -->
<p class="uppercase">    <!-- text-transform: uppercase -->
<p class="truncate">     <!-- overflow ellipsis -->
<p class="text-center">  <!-- text-align -->

<!-- ── COLORS ── -->
<!-- Tailwind scale: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950 -->
<div class="bg-white">          <!-- background: #fff -->
<div class="bg-gray-100">       <!-- light gray background -->
<div class="bg-blue-500">       <!-- medium blue -->
<div class="bg-blue-600">       <!-- darker blue -->
<div class="text-gray-700">     <!-- dark text -->
<div class="text-gray-400">     <!-- muted text -->
<div class="text-blue-600">     <!-- blue text -->
<div class="border-gray-200">   <!-- border color -->
<div class="bg-opacity-50">     <!-- 50% opacity -->`} />
                </div>
                <div className="topic">
                    <h3>Layout — Flexbox & Grid with Tailwind</h3>
                    <CodeBlock lang="html" code={`<!-- ── FLEXBOX ── -->
<div class="flex">                       <!-- display: flex -->
<div class="flex items-center">          <!-- align-items: center -->
<div class="flex justify-between">       <!-- justify-content: space-between -->
<div class="flex items-center gap-3">    <!-- flex + align + gap -->
<div class="flex-col">                   <!-- flex-direction: column -->
<div class="flex-wrap">                  <!-- flex-wrap: wrap -->
<div class="flex-1">                     <!-- flex: 1 -->
<div class="shrink-0">                   <!-- flex-shrink: 0 -->

<!-- Navbar pattern -->
<nav class="flex items-center justify-between px-6 h-16 bg-white border-b">
    <div class="flex items-center gap-2">
        <img class="w-8 h-8" src="/logo.svg" />
        <span class="font-bold text-xl">App</span>
    </div>
    <div class="flex items-center gap-6">
        <a class="text-gray-600 hover:text-gray-900">Products</a>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg">Sign up</button>
    </div>
</nav>

<!-- ── GRID ── -->
<div class="grid grid-cols-3 gap-6">     <!-- 3-column grid -->
<div class="grid grid-cols-12">          <!-- 12-column grid -->
<div class="col-span-4">                 <!-- span 4 columns -->
<div class="col-span-full">             <!-- span all columns -->

<!-- Responsive product grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <!-- 1 col mobile → 2 col tablet → 3 col desktop → 4 col wide -->
</div>`} />
                </div>
            </section>

            {/* ── RESPONSIVE ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>04</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Responsive</div>
                        <h2>Responsive Design — Breakpoint Prefixes</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>sm:, md:, lg:, xl:, 2xl:</h3>
                    <CodeBlock lang="html" code={`<!-- Tailwind breakpoints (mobile-first):
     sm:  ≥640px
     md:  ≥768px
     lg:  ≥1024px
     xl:  ≥1280px
     2xl: ≥1536px  -->

<!-- Apply styles at specific breakpoints -->
<div class="text-sm md:text-base lg:text-lg">
    Text grows at larger screens
</div>

<div class="p-4 md:p-8 lg:p-12">
    More padding on larger screens
</div>

<!-- Show/hide based on screen size -->
<div class="hidden md:block">     <!-- hidden mobile, visible tablet+ -->
<div class="block md:hidden">     <!-- visible mobile, hidden tablet+ -->
<div class="flex md:hidden">      <!-- flex mobile, hidden tablet+ -->

<!-- Column layout responsive -->
<div class="flex flex-col md:flex-row gap-6">
    <!-- stacks on mobile, side-by-side on tablet -->
</div>

<!-- Sidebar layout -->
<div class="grid grid-cols-1 lg:grid-cols-[260px_1fr]">
    <aside class="hidden lg:block">Sidebar</aside>
    <main>Content</main>
</div>

<!-- Full real card component responsive -->
<article class="
    bg-white rounded-xl border border-gray-200 overflow-hidden
    flex flex-col sm:flex-row
    hover:shadow-lg transition-shadow duration-200
">
    <img class="
        w-full sm:w-48 h-48 sm:h-auto
        object-cover
    " src="..." />
    <div class="p-6 flex flex-col justify-between">
        <div>
            <span class="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Technology
            </span>
            <h2 class="mt-2 text-xl font-bold text-gray-900">Card Title</h2>
            <p class="mt-2 text-gray-600 line-clamp-3">Description text...</p>
        </div>
        <div class="mt-4 flex items-center justify-between">
            <span class="text-sm text-gray-500">5 min read</span>
            <button class="text-sm font-medium text-blue-600 hover:text-blue-800">
                Read more →
            </button>
        </div>
    </div>
</article>`} />
                </div>
            </section>

            {/* ── DARK MODE ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>05</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Dark Mode</div>
                        <h2>Dark Mode — The `dark:` Prefix</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Class-Based Dark Mode with React</h3>
                    <CodeBlock lang="javascript" code={`// tailwind.config.js — enable class-based dark mode
export default {
    darkMode: 'class', // add 'dark' class to <html> to activate
    // ...
};`} />
                    <CodeBlock lang="javascript" code={`// ThemeToggle.jsx — React dark mode hook
import { useState, useEffect } from 'react';

export function useTheme() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') ||
               (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') { root.classList.add('dark'); }
        else                  { root.classList.remove('dark'); }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
    return { theme, toggle };
}

// Usage in component
function ThemeToggle() {
    const { theme, toggle } = useTheme();
    return (
        <button onClick={toggle} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
            {theme === 'dark' ? '☀️' : '🌙'}
        </button>
    );
}`} />
                    <CodeBlock lang="html" code={`<!-- Using dark: prefix for any utility -->
<div class="bg-white dark:bg-gray-900">
    <h1 class="text-gray-900 dark:text-white">Title</h1>
    <p  class="text-gray-600 dark:text-gray-400">Body text</p>
    <div class="border border-gray-200 dark:border-gray-700">
        <button class="
            bg-blue-600 hover:bg-blue-700
            dark:bg-blue-500 dark:hover:bg-blue-400
            text-white px-4 py-2 rounded-lg
        ">
            Click me
        </button>
    </div>
</div>`} />
                </div>
            </section>

            {/* ── CUSTOM STYLES ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>06</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Advanced</div>
                        <h2>Custom Config & @apply Directive</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Extending Theme & Extracting Components</h3>
                    <CodeBlock lang="javascript" code={`// tailwind.config.js — extend the design system
export default {
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#6366f1',
                    hover:   '#4f46e5',
                    light:   '#e0e7ff',
                    dark:    '#4338ca',
                },
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
            },
            animation: {
                'fade-in':  'fadeIn 0.3s ease-out',
                'slide-up': 'slideUp 0.4s ease-out',
                'spin-slow': 'spin 3s linear infinite',
            },
            keyframes: {
                fadeIn:  { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
                slideUp: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
            },
        },
    },
};`} />
                    <CodeBlock lang="css" code={`/* src/index.css — @apply extracts repeated classes into reusable classes */
@layer components {
    .btn {
        @apply inline-flex items-center justify-center gap-2
               px-4 py-2 rounded-lg font-medium text-sm
               transition-colors duration-200
               focus:outline-none focus:ring-2 focus:ring-offset-2
               disabled:opacity-50 disabled:cursor-not-allowed;
    }

    .btn-primary {
        @apply btn bg-blue-600 text-white
               hover:bg-blue-700
               focus:ring-blue-500
               dark:bg-blue-500 dark:hover:bg-blue-600;
    }

    .btn-outline {
        @apply btn border border-gray-300 text-gray-700
               hover:bg-gray-50
               dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800;
    }

    .card {
        @apply bg-white dark:bg-gray-800
               rounded-xl border border-gray-200 dark:border-gray-700
               shadow-sm;
    }

    .input {
        @apply w-full px-3 py-2 rounded-lg text-sm
               border border-gray-300 dark:border-gray-600
               bg-white dark:bg-gray-900
               text-gray-900 dark:text-white
               placeholder:text-gray-400
               focus:outline-none focus:ring-2 focus:ring-blue-500
               disabled:bg-gray-100 dark:disabled:bg-gray-800;
    }
}`} />
                </div>
            </section>

            {/* ── TAILWIND IN REACT ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>07</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>React</div>
                        <h2>Tailwind with React — Best Practices</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Conditional Classes, CVA & cn()</h3>
                    <CodeBlock lang="javascript" code={`// ── CONDITIONAL CLASSES ──
// Bad: string concatenation
const cls = 'btn' + (active ? ' btn--active' : '');

// Good: use clsx or classnames library
// npm install clsx
import clsx from 'clsx';

function Button({ variant = 'primary', size = 'md', disabled, children }) {
    return (
        <button className={clsx(
            'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
            // size variants
            size === 'sm' && 'px-3 py-1.5 text-sm',
            size === 'md' && 'px-4 py-2 text-base',
            size === 'lg' && 'px-6 py-3 text-lg',
            // variant
            variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
            variant === 'danger'  && 'bg-red-600 text-white hover:bg-red-700',
            variant === 'ghost'   && 'text-gray-700 hover:bg-gray-100',
            // state
            disabled && 'opacity-50 cursor-not-allowed'
        )}>
            {children}
        </button>
    );
}

// ── cn() helper — merge with Tailwind merge (handles conflicts) ──
// npm install tailwind-merge clsx
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// Now conflicting classes are resolved properly:
cn('px-4', 'px-6')                  // 'px-6' (not 'px-4 px-6')
cn('text-sm', 'text-lg')            // 'text-lg'
cn('bg-blue-500', isError && 'bg-red-500') // bg-red-500 if isError

// ── CVA — Class Variance Authority ──
// npm install class-variance-authority
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
    // base classes
    'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
    {
        variants: {
            variant: {
                primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
                danger:  'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
                outline: 'border border-gray-300 hover:bg-gray-50 focus:ring-gray-500',
                ghost:   'hover:bg-gray-100 focus:ring-gray-500',
            },
            size: {
                sm: 'px-3 py-1.5 text-sm',
                md: 'px-4 py-2 text-base',
                lg: 'px-6 py-3 text-lg',
            },
        },
        defaultVariants: { variant: 'primary', size: 'md' },
    }
);

function Button({ variant, size, className, ...props }) {
    return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

// Usage
<Button>Default</Button>
<Button variant="danger" size="lg">Delete</Button>
<Button variant="outline" className="w-full">Full Width</Button>`} />
                </div>
            </section>

            {/* ── RESOURCES ── */}
            <section className="chapter">
                <div className="chapter-header"><div><h2 style={{ fontFamily: "'Fraunces', serif" }}>Resources & Practice</h2></div></div>
                <div className="resource-grid">{RESOURCES.map((r, i) => <ResourceCard key={i} {...r} />)}</div>
                <PracticeArena games={GAMES} />
            </section>

            <footer className="footer">
                <p>Tailwind CSS · FullStack Compass</p>
                <a href="https://sanketh.live/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'none', marginTop: '6px', display: 'block' }}>sanketh.live ↗</a>
            </footer>
        </>
    );
}
