import React from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';

const COLOR = 'var(--pink)';

const RESOURCES = [
    { type: 'docs',      title: 'Socket.io Docs',         description: 'Official documentation — covers all APIs, rooms, namespaces, and adapters.',          url: 'https://socket.io/docs/v4/' },
    { type: 'tutorial',  title: 'Socket.io Chat Tutorial', description: 'Build a real-time chat app from scratch — the canonical Socket.io getting started guide.', url: 'https://socket.io/get-started/chat' },
    { type: 'reference', title: 'WebSocket API (MDN)',     description: 'Understand the raw WebSocket API that Socket.io builds on top of.',                   url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSocket' },
    { type: 'tool',      title: 'Socket.io Admin UI',      description: 'Monitor connected clients, rooms, and events visually in the browser.',               url: 'https://socket.io/docs/v4/admin-ui/' },
    { type: 'docs',      title: '@socket.io/redis-adapter', description: 'Scale Socket.io across multiple server instances using Redis pub/sub.',               url: 'https://socket.io/docs/v4/redis-adapter/' },
];

function Callout({ type = 'tip', title, children }) {
    const labels = { tip: '💡 Tip', warn: '⚠️ Warning', info: 'ℹ️ Info', key: '🔑 Key Concept' };
    return (
        <div className={`callout ${type}`}>
            <div className="callout-title">{title || labels[type]}</div>
            <p>{children}</p>
        </div>
    );
}

function Table({ headers, rows }) {
    return (
        <div className="table-wrap">
            <table>
                <thead><tr>{headers.map(h => <th key={h}>{h}</th>)}</tr></thead>
                <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
            </table>
        </div>
    );
}

export default function SocketIO() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{ color: COLOR }}>Socket.io</span> — Chapter 14</div>
                <h1><span className="accent" style={{ color: COLOR }}>Real-Time</span><br /><em>WebSockets with Socket.io.</em></h1>
                <p className="hero-desc">
                    Real-time features — chat, live notifications, collaborative editing, dashboards — all run on WebSockets.
                    Socket.io wraps the WebSocket protocol with rooms, namespaces, auto-reconnect, and fallbacks.
                    This chapter builds a complete real-time chat system.
                </p>
                <div className="hero-stack">
                    {['WebSockets', 'socket.io', 'Rooms', 'Namespaces', 'Broadcast', 'React Hook', 'Authentication', 'Live Notifications'].map(t => (
                        <span key={t} className="stack-chip">{t}</span>
                    ))}
                </div>
            </section>

            {/* ── 01 HOW IT WORKS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>01</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Concepts</div>
                        <h2>HTTP vs WebSockets</h2>
                    </div>
                </div>
                <div className="topic">
                    <Table
                        headers={['', 'HTTP', 'WebSocket']}
                        rows={[
                            ['Connection', 'New connection per request', 'Persistent connection'],
                            ['Direction', 'Client → Server only', 'Both directions (bidirectional)'],
                            ['Use case', 'REST API calls', 'Chat, notifications, live data'],
                            ['Overhead', 'Headers on every request', 'Low (after initial handshake)'],
                            ['Scaling', 'Easy — any server handles any request', 'Harder — client must stay on same server'],
                        ]}
                    />
                    <Callout type="info" title="ℹ️ Socket.io vs raw WebSocket">
                        Socket.io adds rooms, namespaces, automatic reconnection, event names, and fallback to HTTP long-polling.
                        Use raw WebSocket for simplicity; use Socket.io for anything complex.
                    </Callout>
                </div>
            </section>

            {/* ── 02 SETUP ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>02</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Setup</div>
                        <h2>Install & Basic Setup</h2>
                    </div>
                </div>
                <div className="topic">
                    <CodeBlock lang="bash" code={`# Backend
npm install socket.io

# Frontend
npm install socket.io-client`} />
                </div>
                <div className="topic">
                    <h3>Server Setup with Express</h3>
                    <CodeBlock lang="javascript" code={`// server.js — integrate Socket.io with Express
const express = require('express');
const http    = require('http');            // Socket.io needs a raw http server
const { Server } = require('socket.io');
const cors    = require('cors');

const app    = express();
const server = http.createServer(app);     // wrap express with http

// ── Initialize Socket.io ──────────────────────────────────────────────
const io = new Server(server, {
    cors: {
        origin:  process.env.CLIENT_URL || 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

// ── Connection handler ─────────────────────────────────────────────────
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Listen for events FROM this client
    socket.on('message', (data) => {
        console.log('Received:', data);
        io.emit('message', data);  // broadcast to ALL clients
    });

    socket.on('disconnect', (reason) => {
        console.log('Client disconnected:', socket.id, reason);
    });
});

// ── Start server (socket.io needs server.listen, not app.listen) ──────
server.listen(5000, () => console.log('Server on :5000'));

// ── Export io for use in controllers ──────────────────────────────────
module.exports = { io };`} />
                </div>
            </section>

            {/* ── 03 CHAT APP ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>03</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Project</div>
                        <h2>Real-Time Chat — Full Example</h2>
                        <p className="chapter-intro">
                            The classic Socket.io use case: multi-room chat with user join/leave events, typing indicators, and message history.
                        </p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Chat Server — Rooms & Events</h3>
                    <CodeBlock lang="javascript" code={`// socket/chatHandler.js
const Message = require('../models/Message');

module.exports = (io) => {
    // Track online users: Map<socketId, { userId, username, room }>
    const onlineUsers = new Map();

    io.on('connection', (socket) => {

        // ── Join a chat room ────────────────────────────────────────
        socket.on('join_room', async ({ roomId, userId, username }) => {
            socket.join(roomId);   // subscribe to room events
            onlineUsers.set(socket.id, { userId, username, roomId });

            // Send last 50 messages from DB to the joining user
            const history = await Message.find({ roomId })
                .sort({ createdAt: -1 })
                .limit(50)
                .populate('sender', 'name avatar');
            socket.emit('message_history', history.reverse());

            // Notify others in the room
            socket.to(roomId).emit('user_joined', {
                userId,
                username,
                message: \`\${username} joined the room\`,
            });

            // Send updated online users list to room
            const roomUsers = [...onlineUsers.values()].filter(u => u.roomId === roomId);
            io.to(roomId).emit('online_users', roomUsers);
        });

        // ── Send a message ───────────────────────────────────────────
        socket.on('send_message', async ({ roomId, content }) => {
            const user = onlineUsers.get(socket.id);
            if (!user) return;

            // Save to database
            const message = await Message.create({
                roomId,
                sender:  user.userId,
                content: content.trim(),
            });

            await message.populate('sender', 'name avatar');

            // Broadcast to everyone in the room (including sender)
            io.to(roomId).emit('new_message', {
                _id:       message._id,
                content:   message.content,
                sender:    message.sender,
                createdAt: message.createdAt,
            });
        });

        // ── Typing indicator ─────────────────────────────────────────
        socket.on('typing', ({ roomId, isTyping }) => {
            const user = onlineUsers.get(socket.id);
            if (!user) return;
            // Broadcast to others (not sender)
            socket.to(roomId).emit('user_typing', {
                username: user.username,
                isTyping,
            });
        });

        // ── Leave room ───────────────────────────────────────────────
        socket.on('leave_room', ({ roomId }) => {
            socket.leave(roomId);
            const user = onlineUsers.get(socket.id);
            if (user) {
                socket.to(roomId).emit('user_left', { username: user.username });
            }
        });

        // ── Disconnect (browser closed, network lost) ─────────────────
        socket.on('disconnect', () => {
            const user = onlineUsers.get(socket.id);
            if (user) {
                socket.to(user.roomId).emit('user_left', { username: user.username });
                onlineUsers.delete(socket.id);
                const roomUsers = [...onlineUsers.values()].filter(u => u.roomId === user.roomId);
                io.to(user.roomId).emit('online_users', roomUsers);
            }
        });
    });
};

// ── In server.js: ────────────────────────────────────────────────────
// const chatHandler = require('./socket/chatHandler');
// chatHandler(io);`} />
                </div>

                <div className="topic">
                    <h3>React — useSocket Custom Hook</h3>
                    <CodeBlock lang="jsx" code={`// hooks/useSocket.js
import { useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';

export function useSocket(serverUrl) {
    const socketRef = useRef(null);

    useEffect(() => {
        // Connect to socket server
        socketRef.current = io(serverUrl, {
            withCredentials: true,
            transports: ['websocket'],  // skip polling, go straight to WS
        });

        return () => {
            socketRef.current?.disconnect();  // cleanup on unmount
        };
    }, [serverUrl]);

    const on  = useCallback((event, handler) => {
        socketRef.current?.on(event, handler);
        return () => socketRef.current?.off(event, handler);  // returns cleanup fn
    }, []);

    const emit = useCallback((event, data) => {
        socketRef.current?.emit(event, data);
    }, []);

    return { socket: socketRef.current, on, emit };
}

// ── Chat component using the hook ─────────────────────────────────────
import { useState, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import { useAuth }   from '../context/AuthContext';

export default function ChatRoom({ roomId }) {
    const { user }                = useAuth();
    const { on, emit }            = useSocket(import.meta.env.VITE_API_URL);
    const [messages, setMessages] = useState([]);
    const [input,    setInput]    = useState('');
    const [typing,   setTyping]   = useState('');
    const [online,   setOnline]   = useState([]);

    useEffect(() => {
        // Join the room when component mounts
        emit('join_room', { roomId, userId: user.id, username: user.name });

        // Listen for events
        const cleanup1 = on('message_history', setMessages);
        const cleanup2 = on('new_message',     (msg) => setMessages(prev => [...prev, msg]));
        const cleanup3 = on('user_typing',     ({ username, isTyping }) => {
            setTyping(isTyping ? \`\${username} is typing...\` : '');
        });
        const cleanup4 = on('online_users', setOnline);

        return () => {
            emit('leave_room', { roomId });
            cleanup1(); cleanup2(); cleanup3(); cleanup4();
        };
    }, [roomId]);

    // Typing indicator with debounce
    let typingTimer;
    const handleInput = (e) => {
        setInput(e.target.value);
        emit('typing', { roomId, isTyping: true });
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => emit('typing', { roomId, isTyping: false }), 1000);
    };

    const sendMessage = () => {
        if (!input.trim()) return;
        emit('send_message', { roomId, content: input });
        setInput('');
    };

    return (
        <div>
            <aside>{online.map(u => <span key={u.userId}>🟢 {u.username}</span>)}</aside>
            <div>
                {messages.map(m => (
                    <div key={m._id}>
                        <strong>{m.sender.name}</strong>: {m.content}
                    </div>
                ))}
                {typing && <em>{typing}</em>}
            </div>
            <input value={input} onChange={handleInput} onKeyDown={e => e.key === 'Enter' && sendMessage()} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}`} />
                </div>
            </section>

            {/* ── 04 EVENTS REFERENCE ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>04</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Reference</div>
                        <h2>Emit Cheatsheet — Who Receives What</h2>
                    </div>
                </div>
                <div className="topic">
                    <CodeBlock lang="javascript" code={`// ── Server-side emitting ──────────────────────────────────────────────

// To the specific connected client:
socket.emit('event', data);

// To everyone EXCEPT the sender:
socket.broadcast.emit('event', data);

// To ALL connected clients (including sender):
io.emit('event', data);

// To everyone in a room (including sender if in room):
io.to('room-name').emit('event', data);

// To everyone in a room EXCEPT sender:
socket.to('room-name').emit('event', data);

// To multiple rooms:
io.to('room1').to('room2').emit('event', data);

// To a specific socket by ID:
io.to(socketId).emit('event', data);

// ── Room management ───────────────────────────────────────────────────
socket.join('room-name');          // join a room
socket.leave('room-name');         // leave a room
socket.rooms;                      // Set of room names this socket is in
io.in('room').fetchSockets();      // get all sockets in a room

// ── Client-side ───────────────────────────────────────────────────────
socket.emit('event', data);              // send to server
socket.on('event', (data) => {});        // listen for server events
socket.off('event', handler);            // remove listener
socket.disconnect();                     // disconnect manually
socket.connected;                        // boolean: is connected?`} />
                </div>

                <div className="topic">
                    <h3>Live Notifications (Non-Chat Use Case)</h3>
                    <CodeBlock lang="javascript" code={`// Sending a notification from a REST route (after a DB action)
// server.js exports io, then controllers import it

// controllers/postController.js
const { io } = require('../server');

const createPost = async (req, res) => {
    const post = await Post.create({ ...req.body, author: req.user._id });

    // Notify all followers of this user in real-time
    const author = await User.findById(req.user._id).populate('followers');
    author.followers.forEach(follower => {
        // Each user connects to their own "user room" named by their ID
        io.to(\`user:\${follower._id}\`).emit('new_notification', {
            type:    'new_post',
            message: \`\${author.name} published a new post\`,
            postId:  post._id,
        });
    });

    res.status(201).json({ post });
};

// Client: join personal notification room after login
socket.emit('join_user_room', { userId: user.id });

// Server: join personal room on auth
socket.on('join_user_room', ({ userId }) => {
    socket.join(\`user:\${userId}\`);   // e.g. "user:64a1b2c3d4e5f"
});`} />
                </div>
            </section>

            {/* ── RESOURCES ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>05</div>
                    <div className="chapter-meta"><h2>Resources</h2></div>
                </div>
                <div className="resource-grid">
                    {RESOURCES.map((r, i) => <ResourceCard key={i} {...r} />)}
                </div>
            </section>

            <footer className="footer">
                <p>Socket.io · Chapter 14 · FullStack Compass</p>
            </footer>
        </>
    );
}
