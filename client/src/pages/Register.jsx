import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const PERKS = [
    { icon: '⭐', text: 'Star code blocks & sections' },
    { icon: '📝', text: 'Add personal notes anywhere' },
    { icon: '✓',  text: 'Track completed topics' },
    { icon: '🏆', text: 'Earn XP and level up' },
    { icon: '🔄', text: 'Sync across all devices' },
];

export default function Register() {
    const { register } = useAuth();
    const navigate     = useNavigate();
    const [form,  setForm]  = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [busy,  setBusy]  = useState(false);

    const h = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const submit = async e => {
        e.preventDefault(); setBusy(true); setError('');
        try { await register(form.name, form.email, form.password); navigate('/dashboard'); }
        catch (err) { setError(err.message); }
        finally { setBusy(false); }
    };

    return (
        <div className="auth-page auth-page--split">
            {/* Left panel — perks */}
            <div className="auth-left">
                <div className="auth-orb auth-orb-1" />
                <div className="auth-orb auth-orb-2" />
                <Link to="/" className="auth-brand auth-brand--light">
                    <span className="auth-brand-icon">🧭</span>
                    <div>
                        <div className="auth-brand-name">FullStack <span>Compass</span></div>
                        <div className="auth-brand-sub">Zero → Engineer</div>
                    </div>
                </Link>
                <div className="auth-left-body">
                    <h2 className="auth-left-heading">Learn smarter.<br />Track everything.</h2>
                    <p className="auth-left-sub">Free account. No credit card. Sync instantly.</p>
                    <div className="auth-perks">
                        {PERKS.map(p => (
                            <div key={p.text} className="auth-perk">
                                <span className="auth-perk-icon">{p.icon}</span>
                                <span>{p.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right panel — form */}
            <div className="auth-right">
                <div className="auth-card auth-card--flat">
                    <h2 className="auth-heading">Create account</h2>
                    <p className="auth-desc">Takes 30 seconds. Free forever.</p>

                    <form onSubmit={submit} className="auth-form">
                        <div className="auth-field">
                            <label>Your name</label>
                            <div className="auth-input-wrap">
                                <span className="auth-input-icon">👤</span>
                                <input name="name" type="text" value={form.name} onChange={h}
                                       placeholder="Sanketh" required autoComplete="name" />
                            </div>
                        </div>

                        <div className="auth-field">
                            <label>Email address</label>
                            <div className="auth-input-wrap">
                                <span className="auth-input-icon">✉</span>
                                <input name="email" type="email" value={form.email} onChange={h}
                                       placeholder="you@example.com" required autoComplete="email" />
                            </div>
                        </div>

                        <div className="auth-field">
                            <label>
                                Password
                                <span style={{ color: 'var(--text3)', fontWeight: 400, fontSize: '11px', marginLeft: '6px' }}>
                                    (min 6 chars)
                                </span>
                            </label>
                            <div className="auth-input-wrap">
                                <span className="auth-input-icon">🔒</span>
                                <input name="password" type="password" value={form.password} onChange={h}
                                       placeholder="••••••••" required minLength={6} autoComplete="new-password" />
                            </div>
                        </div>

                        {error && (
                            <div className="auth-error"><span>⚠</span> {error}</div>
                        )}

                        <button className="auth-submit" disabled={busy}>
                            {busy ? <span className="auth-spinner" /> : null}
                            {busy ? 'Creating account…' : 'Create Free Account →'}
                        </button>
                    </form>

                    <p className="auth-foot">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                    <p className="auth-foot" style={{ marginTop: '6px' }}>
                        <Link to="/dashboard">← Continue without account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
