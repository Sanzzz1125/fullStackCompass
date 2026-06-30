import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Flashcards() {
    const { progress } = useAuth();
    const items = progress?.starredItems || [];
    const [idx,    setIdx]    = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [known,   setKnown]   = useState([]);
    const [review,  setReview]  = useState([]);
    const [done,    setDone]    = useState(false);

    if (items.length === 0) return (
        <div style={{ padding: '60px 40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>🃏</div>
            <h2 style={{ fontFamily: "'Fraunces',serif", marginBottom: '8px' }}>No flashcards yet</h2>
            <p style={{ color: 'var(--text2)', marginBottom: '20px' }}>Star ⭐ code blocks on any page to add them here as flashcards.</p>
            <Link to="/dashboard" className="challenge-submit" style={{ textDecoration: 'none', display: 'inline-block' }}>Browse pages →</Link>
        </div>
    );

    const remaining = items.filter((_, i) => !known.includes(i) && !review.includes(i));
    const card      = remaining[idx % Math.max(remaining.length, 1)];

    if (done || remaining.length === 0) return (
        <div style={{ padding: '60px 40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>🎉</div>
            <h2 style={{ fontFamily: "'Fraunces',serif", marginBottom: '8px' }}>Session complete!</h2>
            <p style={{ color: 'var(--text2)', marginBottom: '4px' }}>✓ Known: {known.length} · 🔁 Review later: {review.length}</p>
            <p style={{ color: 'var(--text2)', fontSize: '13px', marginBottom: '24px' }}>
                {review.length > 0 ? `You marked ${review.length} for review — practice these again tomorrow.` : 'Perfect session! All starred items reviewed.'}
            </p>
            <button className="challenge-submit" onClick={() => { setIdx(0); setFlipped(false); setKnown([]); setReview([]); setDone(false); }}>
                Restart session
            </button>
        </div>
    );

    const markKnown  = () => { setKnown(k => [...k, items.indexOf(card)]); setFlipped(false); setIdx(i => i); };
    const markReview = () => { setReview(r => [...r, items.indexOf(card)]); setFlipped(false); setIdx(i => i); };

    return (
        <div style={{ padding: '32px 40px', maxWidth: '700px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <div>
                    <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: '28px', marginBottom: '4px' }}>🃏 Flashcards</h1>
                    <p style={{ color: 'var(--text3)', fontSize: '11px', fontFamily: "'Space Mono',monospace" }}>
                        {remaining.length} remaining · {known.length} known · {review.length} to review
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text3)', fontFamily: "'Space Mono',monospace", alignSelf: 'center' }}>
                        {items.length - remaining.length}/{items.length}
                    </span>
                </div>
            </div>

            {/* Progress */}
            <div style={{ height: '3px', background: 'var(--surface2)', borderRadius: '2px', overflow: 'hidden', marginBottom: '32px' }}>
                <div style={{ height: '100%', width: `${((items.length - remaining.length) / items.length) * 100}%`, background: 'var(--green)', transition: 'width .3s' }} />
            </div>

            {/* Card */}
            <div className={`flashcard${flipped ? ' flipped' : ''}`} onClick={() => setFlipped(f => !f)}>
                <div className="flashcard-inner">
                    <div className="flashcard-front">
                        <div className="flashcard-label">From {card?.page}</div>
                        <div className="flashcard-hint">Click to reveal the code</div>
                        <div style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: '1.6', textAlign: 'center' }}>
                            {card?.text?.split(':').slice(0, 1).join(':') || 'Code snippet'}
                        </div>
                    </div>
                    <div className="flashcard-back">
                        <pre className="flashcard-code">{card?.text?.split(':').slice(1).join(':').trim() || card?.text}</pre>
                    </div>
                </div>
            </div>

            <p style={{ textAlign: 'center', color: 'var(--text3)', fontSize: '12px', marginBottom: '20px' }}>
                {flipped ? 'How well did you know this?' : 'Tap to reveal →'}
            </p>

            {/* Actions after flip */}
            {flipped && (
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <button className="fc-btn fc-btn--review" onClick={markReview}>🔁 Review again</button>
                    <button className="fc-btn fc-btn--known"  onClick={markKnown}>✓ Got it!</button>
                </div>
            )}
        </div>
    );
}
