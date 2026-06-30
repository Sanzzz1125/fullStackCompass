import React from 'react';
import { Link } from 'react-router-dom';
import { cloneData } from '../data/cloneData';

export default function Clones() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{ color: 'var(--projects-color)' }}>🏗️ Systems Engineering</span></div>
                <h1><span className="accent" style={{ color: 'var(--projects-color)' }}>App Clones</span><br /><em>Production Blueprints.</em></h1>
                <p className="hero-desc">Move past simple layouts. Analyze real engineering diagrams, schema structures, controller layers, and frontend trees for complex systems.</p>
            </section>

            <section className="chapter">
                <div className="project-grid">
                    {/* Object.entries maps through your cloneData to generate the clickable cards */}
                    {Object.entries(cloneData).map(([id, project]) => (
                        <Link key={id} to={`/clones/${id}`} className="project-card" style={{ textDecoration: 'none' }}>
                            <div className="project-card-badge" style={{ background: project.color + '22', color: project.color }}>
                                {project.icon} {project.name}
                            </div>
                            <h4>{project.name} Blueprint</h4>
                            <p>{project.shortDesc}</p>
                            <div className="project-tags">
                                {project.techStack.map(tech => (
                                    <span key={tech} className="project-tag">{tech}</span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
}