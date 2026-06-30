import React from 'react';

const TECH_PILLS = [
    { name: 'HTML5', color: '#e34f26' },
    { name: 'CSS3', color: '#264de4' },
    { name: 'JavaScript', color: '#f7df1e' },
    { name: 'React', color: '#61dafb' },
    { name: 'Node.js', color: '#3c873a' },
    { name: 'Express', color: '#ffffff' },
    { name: 'MongoDB', color: '#47a248' },
];

export default function Hero() {
    return (
        <section className="hero" style={{ padding: '60px 60px', borderBottom: '1px solid var(--border)' }}>
            {/* LIVE Badge */}
            <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(0, 229, 155, 0.1)', color: 'var(--green)', borderRadius: '4px', fontSize: '10px', marginBottom: '16px', fontFamily: "'Space Mono', monospace", fontWeight: 700, border: '1px solid var(--green)' }}>
                ● LIVE
            </div>

            {/* Headline */}
            <h1 style={{ fontSize: '64px', lineHeight: '1.1', marginBottom: '20px', fontFamily: "'Fraunces', serif" }}>
                Master <span style={{ color: 'var(--green)' }}>MERN Stack</span><br />
                <span style={{ color: 'var(--text3)', fontStyle: 'italic' }}>from absolute scratch</span>
            </h1>

            {/* Description */}
            <p className="hero-desc" style={{ maxWidth: '600px', fontSize: '16px', marginBottom: '30px' }}>
                MongoDB · Express · React · Node.js — every concept from HTML basics to
                production deployment. This is your single source of truth.
            </p>

            {/* Tech Pills */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '50px' }}>
                {TECH_PILLS.map((tech) => (
                    <span key={tech.name} style={{
                        padding: '6px 16px',
                        borderRadius: '4px',
                        background: tech.color + '22',
                        color: tech.color,
                        fontSize: '11px',
                        fontWeight: 'bold',
                        border: `1px solid ${tech.color}44`
                    }}>
            {tech.name}
          </span>
                ))}
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'flex', gap: '60px' }}>
                {[
                    { val: '18+', label: 'Chapters' },
                    { val: '50+', label: 'Code Examples' },
                    { val: '12+', label: 'Projects' },
                    { val: '100%', label: 'From Scratch' },
                ].map((stat, i) => (
                    <div key={i}>
                        <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text)' }}>{stat.val}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}