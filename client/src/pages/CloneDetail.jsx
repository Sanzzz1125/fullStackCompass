import React from 'react';
import { useParams, Link } from 'react-router-dom';
import CodeBlock from '../components/CodeBlock.jsx';
import { cloneData } from '../data/cloneData.js';
import ProjectChecklist from '../components/ProjectChecklist.jsx';
import { CLONE_CHECKLISTS } from '../data/checklistData.js';

export default function CloneDetail() {
    const { id } = useParams();
    const project = Array.isArray(cloneData)
        ? cloneData.find(item => item.id === id || item.name.toLowerCase().replace(/\s+/g, '') === id)
        : cloneData[id];

    if (!project) {
        return (
            <div className="chapter" style={{ textAlign: 'center', paddingTop: '100px' }}>
                <h2>Clone not found</h2>
                <Link to="/clones" style={{ color: 'var(--green)' }}>← Back to Clones</Link>
            </div>
        );
    }

    return (
        <>
            <section className="hero" style={{ paddingBottom: '40px' }}>
                <Link to="/clones" style={{ color: 'var(--text3)', textDecoration: 'none', fontSize: '12px', display: 'inline-block', marginBottom: '20px', fontFamily: "'Space Mono', monospace" }}>
                    ← Back to Clones
                </Link>
                <div className="hero-eyebrow">
                    <span style={{ color: project.color }}>{project.icon} Master Blueprint</span>
                </div>
                <h1 style={{ fontSize: '48px' }}>{project.name} <span className="accent" style={{ color: project.color }}>Architecture</span></h1>
                <p className="hero-desc">{project.description}</p>
                <div className="hero-stack" style={{ marginBottom: '0' }}>
                    {project.techStack.map(t => <span key={t} className="stack-chip">{t}</span>)}
                </div>
            </section>

            {/* Step-by-step build checklist */}
            {CLONE_CHECKLISTS[id] && (
                <section className="chapter" style={{ paddingTop: '0' }}>
                    <ProjectChecklist cloneId={id} />
                </section>
            )}

            {/* Backend API Routes */}
            <section className="chapter">
                <div className="chapter-header">
                    <div><h2 style={{ fontFamily: "'Fraunces', serif" }}>REST API Specification</h2></div>
                </div>
                <div className="topic">
                    <div className="table-wrap">
                        <table>
                            <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
                            <tbody>
                            {project.apiRoutes.map((route, i) => (
                                <tr key={i}>
                                    <td><span className="badge" style={{ background: 'var(--bg3)', color: project.color }}>{route.method}</span></td>
                                    <td><code>{route.path}</code></td>
                                    <td>{route.desc}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Frontend Component Tree */}
            <section className="chapter">
                <div className="chapter-header">
                    <div><h2 style={{ fontFamily: "'Fraunces', serif" }}>System Architecture Tree</h2></div>
                </div>
                <div className="topic">
                    <CodeBlock lang="text" code={project.componentTree} title="Directory Structure" />
                </div>
            </section>

            {/* THE NEW FULL CODEBASE SECTION */}
            <section className="chapter">
                <div className="chapter-header">
                    <div><h2 style={{ fontFamily: "'Fraunces', serif" }}>Complete Source Code</h2></div>
                </div>
                <div className="topic">
                    <p style={{ color: 'var(--text2)', marginBottom: '32px', fontSize: '15px' }}>
                        Review the complete, end-to-end implementation. This includes the database schemas, backend controllers, React context providers, and functional UI components.
                    </p>

                    {project.fullCodebase && project.fullCodebase.map((file, i) => (
                        <div key={i} style={{ marginBottom: '40px' }}>
                            <CodeBlock lang={file.lang} code={file.code} title={file.filename} />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}