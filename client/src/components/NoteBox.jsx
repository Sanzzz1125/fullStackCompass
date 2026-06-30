import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useLocation } from 'react-router-dom';

export default function NoteBox({ sectionId }) {
    const { getNote, updateProgress } = useAuth();
    const location  = useLocation();
    const noteKey   = `note__${location.pathname}__${sectionId}`;
    const [open,    setOpen]    = useState(false);
    const [text,    setText]    = useState(() => getNote(noteKey));
    const [saved,   setSaved]   = useState(false);

    const save = () => {
        updateProgress('note', { noteKey, noteText: text });
        setSaved(true);
        setTimeout(() => setSaved(false), 1500);
    };

    return (
        <div style={{ display:'inline-block' }}>
            <button
                onClick={() => setOpen(o => !o)}
                title="Add note"
                style={{ background:'none', border:'none', cursor:'pointer', fontSize:'13px', opacity:.4, transition:'opacity .15s', padding:'2px 4px' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '.4'}
            >
                📝
            </button>

            {open && (
                <div className="note-box">
                    <div className="note-box-header">
                        <span>My Note</span>
                        <button onClick={() => setOpen(false)}>✕</button>
                    </div>
                    <textarea
                        className="note-textarea"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="Write your notes here…"
                        rows={4}
                        autoFocus
                    />
                    <button className="note-save" onClick={save}>{saved ? '✓ Saved!' : 'Save'}</button>
                </div>
            )}
        </div>
    );
}
