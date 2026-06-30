import { useState } from 'react';

const SKILLS = {
    'Frontend': [
        { id:'html', label:'HTML5 & Semantic HTML' },
        { id:'css', label:'CSS3, Flexbox & Grid' },
        { id:'bootstrap', label:'Bootstrap 5' },
        { id:'tailwind', label:'Tailwind CSS' },
        { id:'js', label:'JavaScript (ES6+)' },
        { id:'ts', label:'TypeScript' },
        { id:'react', label:'React.js (Hooks, Router, Context)' },
        { id:'rq', label:'React Query / TanStack Query' },
        { id:'zustand', label:'Zustand / Redux Toolkit' },
    ],
    'Backend': [
        { id:'nodejs', label:'Node.js' },
        { id:'express', label:'Express.js' },
        { id:'nestjs', label:'NestJS' },
        { id:'restapi', label:'REST API Design' },
        { id:'auth', label:'JWT Authentication & bcrypt' },
        { id:'socket', label:'Socket.io (Real-time)' },
        { id:'nodemailer', label:'Nodemailer (Email)' },
        { id:'payments', label:'Razorpay / Stripe Integration' },
        { id:'uploads', label:'File Uploads (Multer, Cloudinary)' },
    ],
    'Database': [
        { id:'mongodb', label:'MongoDB' },
        { id:'mongoose', label:'Mongoose ODM' },
        { id:'redis', label:'Redis (Caching & Sessions)' },
        { id:'postgresql', label:'PostgreSQL / MySQL' },
        { id:'sql', label:'SQL Queries & Joins' },
    ],
    'AI & Tools': [
        { id:'llms', label:'LLM APIs (Gemini, OpenAI)' },
        { id:'deepgram', label:'Deepgram Speech-to-Text' },
        { id:'prompteng', label:'Prompt Engineering' },
        { id:'rag', label:'RAG & Embeddings' },
    ],
    'DevOps': [
        { id:'git', label:'Git & GitHub' },
        { id:'docker', label:'Docker & Docker Compose' },
        { id:'cicd', label:'CI/CD (GitHub Actions)' },
        { id:'vercel', label:'Vercel Deployment' },
        { id:'nginx', label:'Nginx & PM2' },
        { id:'ngrok', label:'ngrok (Tunneling)' },
    ],
    'Testing & Quality': [
        { id:'jest', label:'Jest & React Testing Library' },
        { id:'supertest', label:'Supertest (API Testing)' },
        { id:'sentry', label:'Sentry & Error Monitoring' },
        { id:'winston', label:'Winston Logging' },
    ],
};

function getChecked() {
    try { return JSON.parse(localStorage.getItem('fc_resume')) || {}; } catch { return {}; }
}
function saveChecked(c) { localStorage.setItem('fc_resume', JSON.stringify(c)); }

export default function ResumeTracker() {
    const [checked, setChecked] = useState(getChecked);
    const [copied,  setCopied]  = useState(false);

    const toggle = id => {
        const next = { ...checked, [id]: !checked[id] };
        setChecked(next); saveChecked(next);
    };

    const totalSkills  = Object.values(SKILLS).flat().length;
    const totalChecked = Object.values(checked).filter(Boolean).length;

    const exportResume = () => {
        const lines = Object.entries(SKILLS).map(([cat, skills]) => {
            const done = skills.filter(s => checked[s.id]);
            if (!done.length) return '';
            return `${cat}:\n${done.map(s => `  • ${s.label}`).join('\n')}`;
        }).filter(Boolean);
        const text = `TECHNICAL SKILLS\n${'─'.repeat(40)}\n\n${lines.join('\n\n')}`;
        navigator.clipboard.writeText(text);
        setCopied(true); setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ padding: '32px 40px', maxWidth: '800px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: '32px', marginBottom: '6px' }}>📄 Resume Skills Tracker</h1>
                    <p style={{ color: 'var(--text2)', fontSize: '13px' }}>Check off skills you're confident in. Copy to paste into your resume.</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text3)', fontFamily: "'Space Mono',monospace" }}>
                        {totalChecked}/{totalSkills} skills
                    </span>
                    <button className="challenge-submit" onClick={exportResume} disabled={totalChecked === 0}>
                        {copied ? '✓ Copied!' : '📋 Copy to clipboard'}
                    </button>
                </div>
            </div>

            {/* Overall progress */}
            <div style={{ marginBottom: '28px' }}>
                <div style={{ height: '6px', background: 'var(--surface2)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(totalChecked / totalSkills) * 100}%`, background: 'linear-gradient(90deg, var(--green), var(--teal))', transition: 'width .3s', borderRadius: '3px' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text3)', fontFamily: "'Space Mono',monospace", marginTop: '6px' }}>
                    <span>Beginner</span>
                    <span>{Math.round((totalChecked / totalSkills) * 100)}% proficiency</span>
                    <span>Full Stack Engineer</span>
                </div>
            </div>

            {Object.entries(SKILLS).map(([category, skills]) => {
                const catDone = skills.filter(s => checked[s.id]).length;
                return (
                    <div key={category} className="resume-section">
                        <div className="resume-cat-header">
                            <span className="resume-cat-name">{category}</span>
                            <span className="resume-cat-count">{catDone}/{skills.length}</span>
                        </div>
                        <div className="resume-skills">
                            {skills.map(skill => (
                                <label key={skill.id} className={`resume-skill${checked[skill.id] ? ' checked' : ''}`}>
                                    <input
                                        type="checkbox"
                                        checked={!!checked[skill.id]}
                                        onChange={() => toggle(skill.id)}
                                        style={{ display: 'none' }}
                                    />
                                    <span className="resume-skill-box">{checked[skill.id] ? '✓' : ''}</span>
                                    <span className="resume-skill-label">{skill.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                );
            })}

            <div className="challenge-hint" style={{ marginTop: '24px' }}>
                💡 Only check skills you can confidently use in a project. Interviewers will ask about anything on your resume.
            </div>
        </div>
    );
}
