import { useAuth } from '../context/AuthContext.jsx';
import { useLocation } from 'react-router-dom';

export default function StarButton({ id, text = '', style = {} }) {
    const { isStarred, updateProgress } = useAuth();
    const location = useLocation();
    const starred  = isStarred(id);

    const toggle = () => {
        if (starred) {
            updateProgress('unstar', { itemId: id });
        } else {
            updateProgress('star', { page: location.pathname, itemId: id, text });
        }
    };

    return (
        <button
            onClick={toggle}
            title={starred ? 'Remove star' : 'Star this'}
            style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                opacity: starred ? 1 : 0.35,
                transition: 'opacity .15s, transform .15s',
                transform: starred ? 'scale(1.1)' : 'scale(1)',
                padding: '2px 4px',
                ...style,
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = starred ? '1' : '0.35'}
        >
            ⭐
        </button>
    );
}
