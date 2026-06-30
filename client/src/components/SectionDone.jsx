import { useAuth } from '../context/AuthContext.jsx';
import { useLocation } from 'react-router-dom';

export default function SectionDone({ sectionId }) {
    const { progress, updateProgress } = useAuth();
    const location = useLocation();
    const key      = `${location.pathname}__${sectionId}`;
    const done     = (progress?.notes || {})[key] === 'done';

    const toggle = () => updateProgress('note', { noteKey: key, noteText: done ? '' : 'done' });

    return (
        <button
            onClick={toggle}
            title={done ? 'Mark as not done' : 'Mark section as done'}
            style={{
                background:   done ? 'rgba(0,229,155,.12)' : 'var(--surface)',
                border:       `1px solid ${done ? 'var(--green)' : 'var(--border2)'}`,
                borderRadius: '6px',
                color:        done ? 'var(--green)' : 'var(--text3)',
                fontSize:     '11px',
                fontFamily:   "'Space Mono', monospace",
                padding:      '4px 10px',
                cursor:       'pointer',
                transition:   'all .15s',
                display:      'flex',
                alignItems:   'center',
                gap:          '5px',
                whiteSpace:   'nowrap',
            }}
        >
            {done ? '✓ Done' : '○ Mark done'}
        </button>
    );
}
