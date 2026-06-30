import { useState } from 'react';
import { INTERVIEW_QA } from '../data/interviewData.js';

export default function InterviewPrep() {
    const [activeTech, setActiveTech] = useState('javascript');
    const [revealed,   setRevealed]   = useState({});
    const [filter,     setFilter]     = useState('all');

    const tech    = INTERVIEW_QA[activeTech];
    const togRev  = i => setRevealed(r => ({ ...r, [activeTech + i]: !r[activeTech + i] }));
    const revAll  = () => {
        const next = {};
        tech.questions.forEach((_, i) => { next[activeTech + i] = true; });
        setRevealed(r => ({ ...r, ...next }));
    };
    const hideAll = () => {
        const next = {};
        tech.questions.forEach((_, i) => { next[activeTech + i] = false; });
        setRevealed(r => ({ ...r, ...next }));
    };

    const doneKey = (i) => `ivdone__${activeTech}__${i}`;
    const isDone  = (i) => localStorage.getItem(doneKey(i)) === '1';
    const togDone = (i) => {
        localStorage.setItem(doneKey(i), isDone(i) ? '0' : '1');
        setRevealed(r => ({ ...r, _tick: Date.now() })); // force re-render
    };
    const doneCount = tech.questions.filter((_, i) => isDone(i)).length;

    return (
        <div style={{ padding: '32px 40px', maxWidth: '860px' }}>
            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: '32px', marginBottom: '8px' }}>
                    🎯 Interview Prep
                </h1>
                <p style={{ color: 'var(--text2)', fontSize: '14px' }}>
                    Click a question to reveal the answer. Tick ✓ when you know it confidently.
                </p>
            </div>

            {/* Tech tabs */}
            <div className="iv-tabs">
                {Object.entries(INTERVIEW_QA).map(([key, val]) => {
                    const done = val.questions.filter((_, i) => localStorage.getItem(`ivdone__${key}__${i}`) === '1').length;
                    return (
                        <button
                            key={key}
                            className={`iv-tab${activeTech === key ? ' active' : ''}`}
                            style={{ '--tc': val.color }}
                            onClick={() => { setActiveTech(key); setRevealed({}); }}
                        >
                            {val.label}
                            {done > 0 && <span className="iv-tab-done">{done}/{val.questions.length}</span>}
                        </button>
                    );
                })}
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text3)', fontFamily: "'Space Mono',monospace", marginBottom: '6px' }}>
                    <span>{tech.label} — {doneCount}/{tech.questions.length} confident</span>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="iv-action" onClick={revAll}>Reveal all</button>
                        <button className="iv-action" onClick={hideAll}>Hide all</button>
                    </div>
                </div>
                <div style={{ height: '3px', background: 'var(--surface2)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(doneCount / tech.questions.length) * 100}%`, background: tech.color, borderRadius: '2px', transition: 'width .3s' }} />
                </div>
            </div>

            {/* Questions */}
            <div className="iv-list">
                {tech.questions.map((qa, i) => {
                    const open = !!revealed[activeTech + i];
                    const done = isDone(i);
                    return (
                        <div key={i} className={`iv-card${done ? ' iv-card--done' : ''}`}>
                            <div className="iv-q" onClick={() => togRev(i)}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1 }}>
                                    <span className="iv-num">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="iv-question">{qa.q}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                                    <button
                                        className={`iv-check${done ? ' iv-check--done' : ''}`}
                                        onClick={e => { e.stopPropagation(); togDone(i); }}
                                        title={done ? 'Mark as not confident' : 'Mark as confident'}
                                    >{done ? '✓' : '○'}</button>
                                    <span style={{ color: 'var(--text3)', fontSize: '12px' }}>{open ? '▲' : '▼'}</span>
                                </div>
                            </div>
                            {open && (
                                <div className="iv-answer">
                                    <div className="iv-answer-label">Answer</div>
                                    {qa.a}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
