import { useState } from 'react';
import { CLONE_CHECKLISTS, CHECKLIST_STORAGE_PREFIX } from '../data/checklistData.js';

function getChecked(key) {
    try { return JSON.parse(localStorage.getItem(CHECKLIST_STORAGE_PREFIX + key)) || {}; } catch { return {}; }
}
function saveChecked(key, c) {
    localStorage.setItem(CHECKLIST_STORAGE_PREFIX + key, JSON.stringify(c));
}

export default function ProjectChecklist({ cloneId }) {
    const steps = CLONE_CHECKLISTS[cloneId];
    const [checked, setChecked] = useState(() => getChecked(cloneId));

    if (!steps) return null;

    const toggle = i => {
        const next = { ...checked, [i]: !checked[i] };
        setChecked(next); saveChecked(cloneId, next);
    };

    const doneCount = Object.values(checked).filter(Boolean).length;
    const pct = Math.round((doneCount / steps.length) * 100);

    return (
        <div className="checklist-box">
            <div className="checklist-header">
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '11px', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text3)' }}>
                    📋 Build Checklist
                </span>
                <span style={{ fontSize: '12px', color: 'var(--green)', fontFamily: "'Space Mono',monospace" }}>
                    {doneCount}/{steps.length} · {pct}%
                </span>
            </div>
            <div className="checklist-progress">
                <div className="checklist-progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="checklist-steps">
                {steps.map((step, i) => (
                    <label key={i} className={`checklist-step${checked[i] ? ' done' : ''}`}>
                        <input type="checkbox" checked={!!checked[i]} onChange={() => toggle(i)} style={{ display: 'none' }} />
                        <span className="checklist-box-icon">{checked[i] ? '✓' : i + 1}</span>
                        <span className="checklist-text">{step}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}
