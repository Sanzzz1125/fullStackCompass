import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import CodeBlock from '../components/CodeBlock.jsx';

const TOPICS = ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'CSS', 'TypeScript', 'REST APIs'];

function getTodayKey() {
    return 'challenge__' + new Date().toISOString().slice(0, 10);
}

export default function DailyChallenge() {
    const { progress, updateProgress } = useAuth();
    const [challenge, setChallenge] = useState(() => {
        try { return JSON.parse(localStorage.getItem(getTodayKey())); } catch { return null; }
    });
    const [topic,     setTopic]     = useState('JavaScript');
    const [loading,   setLoading]   = useState(false);
    const [error,     setError]     = useState('');
    const [showHint,  setShowHint]  = useState(false);
    const [showSol,   setShowSol]   = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [userCode,  setUserCode]  = useState('');

    const generate = async () => {
        setLoading(true); setError(''); setShowHint(false); setShowSol(false); setSubmitted(false); setUserCode('');
        try {
            const prompt = `Generate a ${topic} coding challenge for a MERN stack student. 
Return ONLY valid JSON (no markdown, no backticks) with this exact structure:
{"title":"Challenge title","difficulty":"Easy|Medium|Hard","description":"Clear problem description in 2-3 sentences","example":"Input/output example","hint":"One helpful hint without giving the answer","solution":"Complete working solution code","explanation":"Brief explanation of the solution approach"}`;

            const r = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: prompt }],
                    pageContext: `${topic} Daily Challenge`,
                }),
            });
            const d    = await r.json();
            const raw  = d.reply?.replace(/```json\n?|```\n?/g, '').trim();
            const data = JSON.parse(raw);
            data.topic = topic;
            data.date  = new Date().toLocaleDateString();
            setChallenge(data);
            localStorage.setItem(getTodayKey(), JSON.stringify(data));
        } catch (e) {
            setError('Failed to generate challenge. Check your Gemini API key and try again.');
        } finally { setLoading(false); }
    };

    const submit = () => {
        setSubmitted(true);
        updateProgress('complete_page', { page: '/challenge' });
    };

    const DIFF_COLOR = { Easy: '#16a34a', Medium: '#ca8a04', Hard: '#ea580c' };

    return (
        <div style={{ padding: '32px 40px', maxWidth: '860px' }}>
            <div style={{ marginBottom: '28px' }}>
                <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: '32px', marginBottom: '8px' }}>⚡ Daily Challenge</h1>
                <p style={{ color: 'var(--text2)', fontSize: '14px' }}>AI-generated coding challenge. New one every day. Complete it to earn +50 XP.</p>
            </div>

            {!challenge ? (
                <div className="challenge-start">
                    <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎯</div>
                    <h2 style={{ fontFamily: "'Fraunces',serif", marginBottom: '8px' }}>Ready for today's challenge?</h2>
                    <p style={{ color: 'var(--text2)', marginBottom: '28px' }}>Pick a topic and generate your challenge.</p>
                    <div className="challenge-topics">
                        {TOPICS.map(t => (
                            <button key={t} className={`challenge-topic${topic === t ? ' active' : ''}`} onClick={() => setTopic(t)}>{t}</button>
                        ))}
                    </div>
                    <button className="challenge-generate" onClick={generate} disabled={loading}>
                        {loading ? '⏳ Generating…' : `Generate ${topic} Challenge →`}
                    </button>
                    {error && <div className="auth-error" style={{ marginTop: '16px' }}>⚠ {error}</div>}
                </div>
            ) : (
                <div className="challenge-body">
                    {/* Header */}
                    <div className="challenge-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                            <span className="challenge-tag">{challenge.topic}</span>
                            <span className="challenge-diff" style={{ color: DIFF_COLOR[challenge.difficulty] }}>
                                {challenge.difficulty}
                            </span>
                            <span style={{ fontSize: '11px', color: 'var(--text3)', fontFamily: "'Space Mono',monospace" }}>
                                {challenge.date}
                            </span>
                        </div>
                        <button className="iv-action" onClick={() => { setChallenge(null); localStorage.removeItem(getTodayKey()); }}>
                            New challenge
                        </button>
                    </div>

                    <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: '22px', margin: '16px 0 8px' }}>{challenge.title}</h2>
                    <p style={{ color: 'var(--text2)', lineHeight: '1.7', marginBottom: '16px' }}>{challenge.description}</p>

                    {challenge.example && (
                        <div className="challenge-example">
                            <div style={{ fontSize: '11px', color: 'var(--text3)', fontFamily: "'Space Mono',monospace", marginBottom: '6px' }}>EXAMPLE</div>
                            <pre style={{ fontSize: '13px', color: 'var(--text)', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{challenge.example}</pre>
                        </div>
                    )}

                    {/* User code area */}
                    <div style={{ margin: '20px 0' }}>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text3)', fontFamily: "'Space Mono',monospace", display: 'block', marginBottom: '8px' }}>
                            YOUR SOLUTION
                        </label>
                        <textarea
                            className="challenge-textarea"
                            value={userCode}
                            onChange={e => setUserCode(e.target.value)}
                            placeholder="Write your solution here…"
                            rows={10}
                            spellCheck={false}
                        />
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
                        <button className="challenge-hint-btn" onClick={() => setShowHint(h => !h)}>
                            {showHint ? 'Hide hint' : '💡 Show hint'}
                        </button>
                        {!submitted ? (
                            <button className="challenge-submit" onClick={submit} disabled={!userCode.trim()}>
                                ✓ Submit & reveal solution
                            </button>
                        ) : (
                            <button className="challenge-hint-btn" onClick={() => setShowSol(s => !s)}>
                                {showSol ? 'Hide solution' : '👁 Show solution'}
                            </button>
                        )}
                    </div>

                    {showHint && <div className="challenge-hint">💡 {challenge.hint}</div>}

                    {submitted && showSol && (
                        <div>
                            <CodeBlock lang="javascript" code={challenge.solution} title="Solution" />
                            {challenge.explanation && (
                                <div className="challenge-explanation">
                                    <div style={{ fontSize: '11px', color: 'var(--text3)', fontFamily: "'Space Mono',monospace", marginBottom: '6px' }}>EXPLANATION</div>
                                    {challenge.explanation}
                                </div>
                            )}
                        </div>
                    )}

                    {submitted && !showSol && (
                        <div className="challenge-done">
                            ✓ Challenge submitted! +50 XP earned. Come back tomorrow for a new one.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
