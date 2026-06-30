import { useAuth } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import { exportNotesAsMarkdown } from '../utils/exportNotes.js';

export default function Starred() {
    const { progress, updateProgress } = useAuth();
    const items = progress?.starredItems || [];

    const groupByPage = items.reduce((acc, item) => {
        if (!acc[item.page]) acc[item.page] = [];
        acc[item.page].push(item);
        return acc;
    }, {});

    return (
        <div style={{ padding:'32px 40px', maxWidth:'800px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'28px', flexWrap:'wrap', gap:'12px' }}>
                <div>
                    <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:'32px', marginBottom:'4px' }}>⭐ Starred Items</h1>
                    {items.length > 0 && <span style={{ fontSize:'12px', color:'var(--text3)', fontFamily:"'Space Mono',monospace" }}>{items.length} items</span>}
                </div>
                {items.length > 0 && (
                    <div style={{ display:'flex', gap:'8px' }}>
                        <button className="iv-action" onClick={() => exportNotesAsMarkdown(progress)}>📋 Export notes</button>
                        <Link to="/flashcards" className="challenge-submit" style={{ textDecoration:'none' }}>🃏 Practice as Flashcards</Link>
                    </div>
                )}
            </div>

            {items.length === 0 ? (
                <div style={{ color:'var(--text2)', fontSize:'14px', marginTop:'40px', textAlign:'center' }}>
                    <div style={{ fontSize:'48px', marginBottom:'16px' }}>⭐</div>
                    <p>No starred items yet.</p>
                    <p style={{ marginTop:'8px', color:'var(--text3)' }}>Click the ⭐ button next to any code block to save it here, then practice with Flashcards.</p>
                </div>
            ) : (
                Object.entries(groupByPage).map(([page, pageItems]) => (
                    <div key={page} style={{ marginBottom:'32px' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'12px' }}>
                            <Link to={page} style={{ color:'var(--green)', fontFamily:"'Space Mono',monospace", fontSize:'12px', textDecoration:'none' }}>{page} ↗</Link>
                            <span style={{ fontSize:'11px', color:'var(--text3)' }}>{pageItems.length} items</span>
                        </div>
                        <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                            {pageItems.map(item => (
                                <div key={item.id} style={{ background:'var(--surface)', border:'1px solid var(--border2)', borderRadius:'10px', padding:'14px 16px', display:'flex', gap:'12px', alignItems:'flex-start' }}>
                                    <span style={{ fontSize:'16px', flexShrink:0 }}>⭐</span>
                                    <div style={{ flex:1, fontSize:'13px', color:'var(--text2)', lineHeight:'1.6', fontFamily:"'Space Mono',monospace" }}>{item.text || '(no preview)'}</div>
                                    <button onClick={() => updateProgress('unstar', { itemId: item.id })} style={{ background:'none', border:'none', color:'var(--text3)', cursor:'pointer', fontSize:'12px', flexShrink:0 }} title="Remove">✕</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
