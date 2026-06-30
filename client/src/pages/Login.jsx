import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
    const { login } = useAuth();
    const navigate  = useNavigate();
    const [form,  setForm]  = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [busy,  setBusy]  = useState(false);

    const h = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const submit = async e => {
        e.preventDefault(); setBusy(true); setError('');
        try { await login(form.email, form.password); navigate(-1); }
        catch (err) { setError(err.message); }
        finally { setBusy(false); }
    };

    return (
        <div className="auth-page">
            {/* Animated background blobs */}
            <div className="auth-orb auth-orb-1" />
            <div className="auth-orb auth-orb-2" />
            <div className="auth-orb auth-orb-3" />

            {/* Card */}
            <div className="auth-card">
                {/* Logo */}
                <Link to="/" className="auth-brand">
                    <span className="auth-brand-icon">🧭</span>
                    <div>
                        <div className="auth-brand-name">FullStack <span>Compass</span></div>
                        <div className="auth-brand-sub">Zero → Engineer</div>
                    </div>
                </Link>

                <div className="auth-divider" />

                <h2 className="auth-heading">Welcome back</h2>
                <p className="auth-desc">Sign in to sync your stars, notes and XP across all devices.</p>

                <form onSubmit={submit} className="auth-form">
                    <div className="auth-field">
                        <label>Email address</label>
                        <div className="auth-input-wrap">
                            <span className="auth-input-icon">✉</span>
                            <input name="email" type="email" value={form.email} onChange={h}
                                   placeholder="you@example.com" required autoComplete="email" />
                        </div>
                    </div>

                    <div className="auth-field">
                        <label>Password</label>
                        <div className="auth-input-wrap">
                            <span className="auth-input-icon">🔒</span>
                            <input name="password" type="password" value={form.password} onChange={h}
                                   placeholder="••••••••" required autoComplete="current-password" />
                        </div>
                    </div>

                    {error && (
                        <div className="auth-error">
                            <span>⚠</span> {error}
                        </div>
                    )}

                    <button className="auth-submit" disabled={busy}>
                        {busy ? <span className="auth-spinner" /> : null}
                        {busy ? 'Signing in…' : 'Sign In →'}
                    </button>
                </form>

                <p className="auth-foot">
                    No account? <Link to="/register">Create one free</Link>
                </p>
                <p className="auth-foot" style={{ marginTop: '6px' }}>
                    <Link to="/dashboard">← Continue without signing in</Link>
                </p>
            </div>
        </div>
    );
}
