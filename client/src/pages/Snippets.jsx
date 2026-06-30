import { useState, useRef } from 'react';

const LANGS = ['javascript', 'jsx', 'css', 'html', 'bash', 'sql'];

function getSnippets() {
    try { return JSON.parse(localStorage.getItem('fc_snippets')) || []; } catch { return []; }
}
function saveSnippets(s) { localStorage.setItem('fc_snippets', JSON.stringify(s)); }

export default function Snippets() {
    const [snippets, setSnippets] = useState(getSnippets);
    const [form, setForm] = useState({ title:'', lang:'javascript', code:'', tags:'' });
    const [adding, setAdding]   = useState(false);
    const [search, setSearch]   = useState('');
    const [copied, setCopied]   = useState(null);

    const add = () => {
        if (!form.title || !form.code) return;
        const s = [...snippets, { ...form, id: Date.now(), tags: form.tags.split(',').map(t => t.trim()).filter(Boolean), createdAt: new Date().toLocaleDateString() }];
        setSnippets(s); saveSnippets(s);
        setForm({ title:'', lang:'javascript', code:'', tags:'' }); setAdding(false);
    };

    const del = id => { const s = snippets.filter(s => s.id !== id); setSnippets(s); saveSnippets(s); };

    const copy = (id, code) => {
        navigator.clipboard.writeText(code);
        setCopied(id); setTimeout(() => setCopied(null), 1800);
    };

    const exportMD = () => {
        const md = snippets.map(s => `## ${s.title}\n\`\`\`${s.lang}\n${s.code}\n\`\`\``).join('\n\n');
        const a  = document.createElement('a');
        a.href   = 'data:text/markdown;charset=utf-8,' + encodeURIComponent(md);
        a.download = 'my-snippets.md'; a.click();
    };

    const filtered = snippets.filter(s =>
        !search || s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.tags.some(t => t.includes(search.toLowerCase())) ||
        s.lang.includes(search.toLowerCase())
    );

    return (
        <div style={{ padding: '32px 40px', maxWidth: '900px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: '32px', marginBottom: '6px' }}>📦 My Snippets</h1>
                    <p style={{ color: 'var(--text2)', fontSize: '13px' }}>Your personal code library. Saved locally, always available.</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {snippets.length > 0 && <button className="iv-action" onClick={exportMD}>Export .md</button>}
                    <button className="challenge-submit" onClick={() => setAdding(a => !a)}>{adding ? 'Cancel' : '+ Add Snippet'}</button>
                </div>
            </div>

            {/* Add form */}
            {adding && (
                <div className="snippet-form">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', marginBottom: '12px' }}>
                        <input className="snippet-input" value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} placeholder="Snippet title e.g. Debounce function" />
                        <select className="snippet-input" value={form.lang} onChange={e => setForm(f => ({...f, lang: e.target.value}))}>
                            {LANGS.map(l => <option key={l}>{l}</option>)}
                        </select>
                    </div>
                    <textarea className="challenge-textarea" value={form.code} onChange={e => setForm(f => ({...f, code: e.target.value}))} placeholder="Paste your code here…" rows={8} spellCheck={false} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', marginTop: '12px' }}>
                        <input className="snippet-input" value={form.tags} onChange={e => setForm(f => ({...f, tags: e.target.value}))} placeholder="Tags: react, hooks, performance (comma separated)" />
                        <button className="challenge-submit" onClick={add}>Save Snippet</button>
                    </div>
                </div>
            )}

            {/* Search */}
            {snippets.length > 0 && (
                <div className="snippet-search">
                    <span>🔍</span>
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${snippets.length} snippets…`} />
                </div>
            )}

            {/* Snippets grid */}
            {filtered.length === 0 && snippets.length === 0 && (
                <div style={{ textAlign: 'center', marginTop: '60px', color: 'var(--text2)' }}>
                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>📦</div>
                    <p>No snippets yet. Add code blocks you want to reuse later.</p>
                </div>
            )}

            <div className="snippets-grid">
                {filtered.map(s => (
                    <div key={s.id} className="snippet-card">
                        <div className="snippet-card-header">
                            <div>
                                <div className="snippet-title">{s.title}</div>
                                <div style={{ display: 'flex', gap: '6px', marginTop: '5px', flexWrap: 'wrap' }}>
                                    <span className="snippet-lang">{s.lang}</span>
                                    {s.tags.map(t => <span key={t} className="snippet-tag">{t}</span>)}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                                <button className="iv-action" onClick={() => copy(s.id, s.code)}>{copied === s.id ? '✓' : 'Copy'}</button>
                                <button className="iv-action" style={{ color: '#ff5757' }} onClick={() => del(s.id)}>✕</button>
                            </div>
                        </div>
                        <pre className="snippet-preview">{s.code.slice(0, 200)}{s.code.length > 200 ? '…' : ''}</pre>
                        <div style={{ fontSize: '10px', color: 'var(--text3)', fontFamily: "'Space Mono',monospace", marginTop: '8px' }}>{s.createdAt}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
