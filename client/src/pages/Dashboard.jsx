import React from 'react';
import Hero from '../components/Hero.jsx';
import { Link } from 'react-router-dom';

const PATHS = [
    {
        group: 'Frontend Foundation',
        items: [
            { label: 'HTML', to: '/learn/html', color: '#ff6b35', icon: '🔶', topics: 12, desc: 'Semantic markup, forms, tables, accessibility' },
            { label: 'CSS', to: '/learn/css', color: '#4da6ff', icon: '🎨', topics: 18, desc: 'Box model, Flexbox, Grid, animations, responsive' },
            { label: 'Bootstrap', to: '/learn/bootstrap', color: '#7952b3', icon: '🅱️', topics: 10, desc: 'Grid, components, utilities, templates' },
            { label: 'Tailwind', to: '/learn/tailwind', color: '#38bdf8', icon: '🌊', topics: 12, desc: 'Utility-first CSS framework for rapid UI development' },
            { label: 'JavaScript', to: '/learn/javascript', color: '#ffd166', icon: '⚡', topics: 22, desc: 'Variables, functions, async, DOM, ES6+' },
        ],
    },
    {
        group: 'React Ecosystem',
        items: [
            { label: 'React', to: '/learn/react', color: '#00d4aa', icon: '⚛️', topics: 20, desc: 'JSX, hooks, router, context, patterns' },
        ],
    },
    {
        group: 'Backend',
        items: [
            { label: 'Node.js', to: '/learn/nodejs', color: '#5bc17a', icon: '🟢', topics: 14, desc: 'Modules, npm, file system, streams, HTTP' },
            { label: 'Express', to: '/learn/express', color: '#b57aff', icon: '🚂', topics: 12, desc: 'Routing, middleware, REST API, auth' },
            { label: 'APIs', to: '/learn/apis', color: '#00b4d8', icon: '🔌', topics: 16, desc: 'REST from scratch, HTTP, Fetch, Axios, JWT' },
            { label: 'Nodemailer', to: '/learn/nodemailer', color: '#0ea5e9', icon: '📧', topics: 8, desc: 'Send emails, templates, attachments, SMTP config' },
        ],
    },
    {
        group: 'Databases',
        items: [
            { label: 'MongoDB', to: '/learn/mongodb', color: '#47a855', icon: '🍃', topics: 18, desc: 'CRUD, indexes, aggregation, Atlas, performance' },
            { label: 'Mongoose', to: '/learn/mongoose', color: '#47a855', icon: '🦦', topics: 14, desc: 'Schemas, models, hooks, populate, validation' },
            { label: 'SQL', to: '/learn/sql', color: '#f7941d', icon: '🗄️', topics: 16, desc: 'SELECT, JOINs, PostgreSQL, MySQL, ORMs' },
            { label: 'Redis', to: '/learn/redis', color: '#ff4444', icon: '🔴', topics: 10, desc: 'In-memory data structure store, caching, pub/sub' },
        ],
    },
    {
        group: 'Build',
        items: [
            { label: 'App Clones', to: '/clones', color: '#ff6eb4', icon: '🏗️', topics: 10, desc: 'Netflix, Spotify, Instagram, YouTube + more' },
            { label: 'Mini Projects', to: '/mini-projects', color: '#ff6eb4', icon: '🎯', topics: 5, desc: 'Weather app, Task Tracker, Blog API + more' },
        ],
    },
];

export default function Dashboard() {
    return (
        <>
            <Hero /> {/* New Hero Section */}

            <section style={{ padding: '0px 20px' }}>
                <h3 style={{ marginBottom: '30px', color: 'var(--text3)', fontFamily: "'Space Mono', monospace", fontSize: '12px' }}>
                </h3>

                {PATHS.map((group, gi) => (
                    <section key={gi} className="chapter" style={{ marginBottom: '10px' }}>
                        <div className="chapter-header">
                            <div>
                                <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '24px', fontWeight: 700 }}>
                                    {group.group}
                                </h2>
                            </div>
                        </div>
                        <div className="project-grid">
                            {group.items.map((item, i) => (
                                <Link key={i} to={item.to} className="project-card" style={{ textDecoration: 'none' }}>
                                    <div className="project-card-badge" style={{ background: item.color + '22', color: item.color }}>
                                        {item.icon} {item.label}
                                    </div>
                                    <h4 style={{ fontFamily: "'Fraunces', serif" }}>{item.label}</h4>
                                    <p>{item.desc}</p>
                                    <div className="project-tags">
                                        <span className="project-tag">{item.topics} topics</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </section>

            <footer className="footer" style={{ marginTop: '80px', paddingBottom: '40px' }}>
                <p style={{ marginBottom: '8px' }}>FullStack Compass</p>
                <a href="https://fullstackcompass.in/" target="_blank" rel="noopener noreferrer"
                   style={{ color: 'var(--green)', textDecoration: 'none', fontSize: '11px' }}>
                    fullstackcompass.in ↗
                </a>
            </footer>
        </>
    );
}