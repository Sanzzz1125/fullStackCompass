import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PAGE_META = {
    '/learn/html':           { name:'HTML',             sections:['Boilerplate','Semantic Tags','Forms','Tables','Accessibility'] },
    '/learn/css':            { name:'CSS',              sections:['Box Model','Flexbox','Grid','Animations','Variables','Sass','BEM'] },
    '/learn/javascript':     { name:'JavaScript',       sections:['Variables','Functions','Arrays','Closures','Event Loop','Async/Await','Regex','Patterns'] },
    '/learn/bootstrap':      { name:'Bootstrap',        sections:['Grid','Components','Utilities'] },
    '/learn/tailwind':       { name:'Tailwind CSS',     sections:['Setup','Core Classes','Responsive','Dark Mode','Config'] },
    '/learn/react':          { name:'React',            sections:['useState','useEffect','useRef','useReducer','Context API','Router','React Query','Performance'] },
    '/learn/nodejs':         { name:'Node.js',          sections:['Event Loop','Modules','fs','Streams','Crypto','PM2','Debugging'] },
    '/learn/express':        { name:'Express',          sections:['Server Setup','Routing','Middleware','REST API','Validation','Error Handling'] },
    '/learn/apis':           { name:'REST APIs',        sections:['HTTP Methods','Status Codes','Postman','Axios','Rate Limiting'] },
    '/learn/nestjs':         { name:'NestJS',           sections:['Modules','Controllers','Services','Guards','Pipes','TypeORM'] },
    '/learn/auth':           { name:'Authentication',   sections:['bcrypt','JWT','Protected Routes','Refresh Tokens','Security'] },
    '/learn/uploads':        { name:'File Uploads',     sections:['Multer','Cloudinary','Validation','S3'] },
    '/learn/nodemailer':     { name:'Nodemailer',       sections:['Setup','Templates','OTP','Password Reset'] },
    '/learn/payments':       { name:'Payments',         sections:['Razorpay','React Checkout','Webhooks','Stripe'] },
    '/learn/socketio':       { name:'Socket.io',        sections:['Events','Rooms','Auth','Chat'] },
    '/learn/mongodb':        { name:'MongoDB',          sections:['CRUD','Aggregation','Indexes','Transactions'] },
    '/learn/mongoose':       { name:'Mongoose',         sections:['Schemas','Models','Middleware','Populate','Virtuals'] },
    '/learn/redis':          { name:'Redis',            sections:['Data Types','Caching','Rate Limiting','OTPs'] },
    '/learn/sql':            { name:'SQL',              sections:['Queries','Joins','Indexes','PostgreSQL','ORMs'] },
    '/learn/llms':           { name:'LLMs & AI APIs',   sections:['Gemini API','OpenAI','Prompt Engineering','Streaming','RAG'] },
    '/learn/deepgram':       { name:'Deepgram',         sections:['Setup','Pre-recorded STT','Live Transcription','Voice Bot'] },
    '/learn/ngrok':          { name:'ngrok',            sections:['Installation','Tunneling','Webhooks','OAuth Callbacks'] },
    '/learn/docker':         { name:'Docker',           sections:['Images','Dockerfile','Docker Compose','Dev Workflow'] },
    '/learn/cicd':           { name:'CI/CD',            sections:['GitHub Actions','CI Workflow','CD Workflow','Secrets'] },
    '/learn/deploy':         { name:'Deployment',       sections:['Vercel','Render','PM2','Nginx','SSL'] },
    '/learn/typescript':     { name:'TypeScript',       sections:['Types','Interfaces','Generics','React+TS','Express+TS'] },
    '/learn/testing':        { name:'Testing',          sections:['Jest','React Testing Library','Supertest','Mocking'] },
    '/learn/error-tracking': { name:'Logging & Errors', sections:['Winston','Morgan','Sentry Backend','Sentry React'] },
    '/learn/git':            { name:'Git & GitHub',     sections:['Basic Commands','Branching','PRs','GitHub Actions'] },
};

const QUICK = ['Explain this in simple terms with an example','Show me a real-world code snippet','What are common mistakes here?','Give me a practice challenge'];

function Bubble({ msg }) {
    const isUser = msg.role === 'user';
    return (
        <div className={`chat-msg chat-msg--${isUser ? 'user' : 'ai'}`}>
            <div className="chat-bubble">
                {msg.content.split(/(```[\s\S]*?```)/g).map((p, i) =>
                    p.startsWith('```')
                        ? <pre key={i} className="chat-code"><code>{p.replace(/^```\w*\n?/,'').replace(/```$/,'')}</code></pre>
                        : <span key={i} style={{whiteSpace:'pre-wrap'}}>{p}</span>
                )}
            </div>
        </div>
    );
}

export default function ChatAssistant() {
    const location = useLocation();
    const meta     = PAGE_META[location.pathname] || { name:'MERN Stack', sections:[] };
    const [open,    setOpen]    = useState(false);
    const [msgs,    setMsgs]    = useState([]);
    const [input,   setInput]   = useState('');
    const [section, setSection] = useState('');
    const [showSec, setShowSec] = useState(false);
    const [busy,    setBusy]    = useState(false);
    const endRef   = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => { endRef.current?.scrollIntoView({ behavior:'smooth' }); }, [msgs, busy]);
    useEffect(() => {
        if (!open) return;
        setMsgs([{ role:'assistant', content:`Hi! Ask me anything about **${meta.name}** or any MERN concept.${meta.sections.length ? '\n\nClick 📑 to focus on a specific section.' : ''}` }]);
        setSection(''); setShowSec(false);
        setTimeout(() => inputRef.current?.focus(), 100);
    }, [open, location.pathname]);

    const send = async (text) => {
        const content = (text || input).trim();
        if (!content || busy) return;
        setInput('');
        const history = [...msgs, { role:'user', content }];
        setMsgs(history); setBusy(true);
        try {
            const r = await fetch('/api/chat', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ messages:history, pageContext:meta.name, section:section||undefined }) });
            const d = await r.json();
            setMsgs(prev => [...prev, { role:'assistant', content: d.reply || 'No response.' }]);
        } catch {
            setMsgs(prev => [...prev, { role:'assistant', content:'Connection error. Try again.' }]);
        } finally { setBusy(false); }
    };

    return (
        <>
            <button className={`chat-fab${open?' chat-fab--open':''}`} onClick={() => setOpen(o => !o)}>
                {open ? '✕' : '✨'}
                {!open && <span className="chat-fab-badge">AI</span>}
            </button>

            {open && (
                <div className="chat-panel">
                    <div className="chat-header">
                        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                            <div className="chat-avatar">✨</div>
                            <div>
                                <div className="chat-header-title">AI Assistant</div>
                                <div className="chat-header-sub">{section || meta.name}</div>
                            </div>
                        </div>
                        <div style={{display:'flex',gap:'6px'}}>
                            {meta.sections.length > 0 && <button className="chat-icon-btn" onClick={() => setShowSec(s=>!s)}>📑</button>}
                            <button className="chat-icon-btn" onClick={() => setOpen(false)}>✕</button>
                        </div>
                    </div>

                    {showSec && (
                        <div className="chat-sections">
                            <div className="chat-sec-grid">
                                <button className={`chat-sec-chip${!section?' active':''}`} onClick={()=>{setSection('');setShowSec(false);}}>All</button>
                                {meta.sections.map(s => (
                                    <button key={s} className={`chat-sec-chip${section===s?' active':''}`} onClick={()=>{setSection(s);setShowSec(false);}}>{s}</button>
                                ))}
                            </div>
                        </div>
                    )}

                    {section && (
                        <div className="chat-sec-active">
                            Section: <strong>{section}</strong>
                            <button onClick={()=>setSection('')}>✕</button>
                        </div>
                    )}

                    <div className="chat-messages">
                        {msgs.map((m,i) => <Bubble key={i} msg={m} />)}
                        {busy && <div className="chat-msg chat-msg--ai"><div className="chat-bubble"><div className="chat-dots"><span/><span/><span/></div></div></div>}
                        {msgs.length === 1 && !busy && (
                            <div className="chat-quick">{QUICK.map(q => <button key={q} className="chat-quick-btn" onClick={()=>send(q)}>{q}</button>)}</div>
                        )}
                        <div ref={endRef} />
                    </div>

                    <div className="chat-input-row">
                        <input ref={inputRef} className="chat-input" value={input} onChange={e=>setInput(e.target.value)}
                               onKeyDown={e=>e.key==='Enter'&&!e.shiftKey&&send()} placeholder="Ask anything…" disabled={busy} />
                        <button className="chat-send" onClick={()=>send()} disabled={busy||!input.trim()}>↑</button>
                    </div>
                </div>
            )}
        </>
    );
}
