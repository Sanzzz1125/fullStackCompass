import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useLocation } from 'react-router-dom';

const COLORS = {
    kw:'#c792ea', fn:'#82aaff', str:'#c3e88d', num:'#f78c6c',
    cm:'#546e7a', bool:'#ff5572', cls:'#ffcb6b', prop:'#80cbc4',
    tag:'#f07178', attr:'#c792ea', val:'#c3e88d', sel:'#f07178',
    cv:'#82aaff', cs:'#c3e88d',
};
const O  = (cls) => `\x02${cls}\x02`;
const C  = '\x03';
const PH = (i)   => `\x04p${i}p\x04`;

const toSpans = (s) =>
    s.replace(/\x02([a-z]+)\x02/g, (_, cls) => {
        const color = COLORS[cls] || 'inherit';
        return cls === 'cm'
            ? `<span style="color:${color};font-style:italic">`
            : `<span style="color:${color}">`;
    }).replace(/\x03/g, '</span>');

function hl_html(s) {
    return s
        .replace(/(&lt;!--[\s\S]*?--&gt;)/g, `${O('cm')}$1${C}`)
        .replace(/(&lt;\/?)([\w:-]+)/g, `$1${O('tag')}$2${C}`)
        .replace(/ ([\w:-]+)(=)/g, ` ${O('attr')}$1${C}$2`)
        .replace(/=("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, `=${O('val')}$1${C}`);
}
function hl_css(s) {
    const sv = [];
    s = s.replace(/\/\*[\s\S]*?\*\//g, m => { sv.push(m); return PH(sv.length-1); });
    s = s.replace(/([^{};/\n][^{};/]*?)(\s*\{)/g, (_, sel, b) => `${O('sel')}${sel}${C}${b}`);
    s = s.replace(/\{([^}]*)\}/g, (_, blk) => `{${blk.replace(/([\w-]+)(\s*:)([^;{}]*)(;)/g, `${O('cv')}$1${C}$2${O('cs')}$3${C}$4`)}}`);
    sv.forEach((v,i) => { s = s.replace(PH(i), `${O('cm')}${v}${C}`); });
    return s;
}
function hl_js(s) {
    const sv = [];
    s = s.replace(/(\/\/.*)/g, m => { sv.push({t:'cm',v:m}); return PH(sv.length-1); });
    s = s.replace(/(\/\*[\s\S]*?\*\/)/g, m => { sv.push({t:'cm',v:m}); return PH(sv.length-1); });
    s = s.replace(/(`(?:[^`\\]|\\.)*`)/g, m => { sv.push({t:'str',v:m}); return PH(sv.length-1); });
    s = s.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, m => { sv.push({t:'str',v:m}); return PH(sv.length-1); });
    s = s
        .replace(/\b(const|let|var|function|return|import|export|from|default|class|extends|new|async|await|try|catch|finally|throw|if|else|switch|case|break|continue|for|while|do|of|in|typeof|instanceof|void|delete|yield|static|super|this|module|require)\b/g, `${O('kw')}$1${C}`)
        .replace(/\b(true|false|null|undefined|NaN|Infinity)\b/g, `${O('bool')}$1${C}`)
        .replace(/\b(\d+\.?\d*)\b/g, `${O('num')}$1${C}`)
        .replace(/\b([A-Z][a-zA-Z0-9_]*)\b/g, `${O('cls')}$1${C}`)
        .replace(/\b([a-z_$][a-zA-Z0-9_$]*)(?=\s*\()/g, `${O('fn')}$1${C}`)
        .replace(/\.([a-zA-Z_$][a-zA-Z0-9_$]*)(?!\s*\()/g, `.${O('prop')}$1${C}`)
        .replace(/\b(SELECT|INSERT|INTO|VALUES|WHERE|ORDER|BY|DESC|ASC|LIMIT|UPDATE|SET|DELETE|FROM|INNER|LEFT|JOIN|ON|WITH|AS|CREATE|TABLE|VARCHAR|INT|PRIMARY|KEY|FOREIGN|TIMESTAMP|ENUM)\b/g, `${O('kw')}$1${C}`);
    sv.forEach(({t,v},i) => { s = s.replace(PH(i), `${O(t)}${v}${C}`); });
    return s;
}

function StarBtn({ id, previewText }) {
    const { isStarred, updateProgress } = useAuth();
    const location = useLocation();
    const starred  = isStarred(id);
    const toggle   = () => {
        if (starred) updateProgress('unstar', { itemId: id });
        else         updateProgress('star', { page: location.pathname, itemId: id, text: previewText });
    };
    return (
        <button
            onClick={toggle}
            title={starred ? 'Remove from starred' : 'Star this code block'}
            style={{
                background:'none', border:'none', cursor:'pointer',
                fontSize:'13px', padding:'2px 5px',
                opacity: starred ? 1 : 0.3,
                transition:'opacity .15s, transform .15s',
                transform: starred ? 'scale(1.15)' : 'scale(1)',
                flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.opacity='1'}
            onMouseLeave={e => e.currentTarget.style.opacity = starred ? '1' : '0.3'}
        >
            ⭐
        </button>
    );
}

export default function CodeBlock({ code, lang = 'javascript', title }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        });
    };

    const highlightCode = (raw) => {
        if (!raw) return '';
        if (raw.includes('<span ')) return raw;
        let s = raw.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        const l = lang.toLowerCase();
        if (l === 'html' || l === 'bootstrap') s = hl_html(s);
        else if (l === 'css' || l === 'scss')   s = hl_css(s);
        else                                      s = hl_js(s);
        return toSpans(s);
    };

    // Stable ID: title or first 40 chars of code
    const blockId      = `cb__${(title || code || '').slice(0, 40).replace(/\s+/g, '_')}`;
    const previewText  = (title || lang) + ': ' + code.slice(0, 80).replace(/\n/g, ' ');

    return (
        <div className="code-block">
            <div className="code-header">
                <span className="code-label">{title || lang}</span>
                <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                    {/* Star button */}
                    <StarBtn id={blockId} previewText={previewText} />

                    <div className="code-dots">
                        <div className="code-dot" style={{ background:'#ff5f56' }} />
                        <div className="code-dot" style={{ background:'#ffbd2e' }} />
                        <div className="code-dot" style={{ background:'#27c93f' }} />
                    </div>
                    <button className={`code-copy${copied ? ' copied' : ''}`} onClick={handleCopy}>
                        {copied ? '✓ copied' : 'copy'}
                    </button>
                </div>
            </div>
            <pre style={{ margin:0, padding:'20px', overflowX:'auto', background:'#0d0d0d' }}>
                <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
            </pre>
        </div>
    );
}
