import { createContext, useContext, useState, useEffect, useCallback } from 'react';
const Ctx = createContext(null);
const API = '/api';

export function AuthProvider({ children }) {
    const [user,     setUser]     = useState(null);
    const [loading,  setLoading]  = useState(true);
    const [progress, setProgress] = useState(() => {
        try { return JSON.parse(localStorage.getItem('fc_progress')) || {}; } catch { return {}; }
    });

    const saveProgress = (p) => { setProgress(p); localStorage.setItem('fc_progress', JSON.stringify(p)); };

    const syncProgress = useCallback(async (token) => {
        try {
            const r = await fetch(`${API}/progress`, { headers: { Authorization: `Bearer ${token}` } });
            if (r.ok) { const p = await r.json(); saveProgress(p); }
        } catch {}
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('fc_token');
        const saved = localStorage.getItem('fc_user');
        if (token && saved) {
            setUser(JSON.parse(saved));
            syncProgress(token);
            fetch(`${API}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
                .then(r => r.ok ? r.json() : Promise.reject())
                .then(d => setUser(d.user))
                .catch(() => { localStorage.removeItem('fc_token'); localStorage.removeItem('fc_user'); setUser(null); });
        }
        setLoading(false);
    }, [syncProgress]);

    const register = async (name, email, password) => {
        const r    = await fetch(`${API}/auth/register`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name,email,password}) });
        const data = await r.json();
        if (!r.ok) throw new Error(data.error || 'Register failed');
        localStorage.setItem('fc_token', data.token);
        localStorage.setItem('fc_user',  JSON.stringify(data.user));
        setUser(data.user);
        await syncProgress(data.token);
    };

    const login = async (email, password) => {
        const r    = await fetch(`${API}/auth/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email,password}) });
        const data = await r.json();
        if (!r.ok) throw new Error(data.error || 'Login failed');
        localStorage.setItem('fc_token', data.token);
        localStorage.setItem('fc_user',  JSON.stringify(data.user));
        setUser(data.user);
        await syncProgress(data.token);
    };

    const logout = () => {
        localStorage.removeItem('fc_token'); localStorage.removeItem('fc_user');
        setUser(null); saveProgress({});
    };

    // Update both localStorage and MongoDB
    const updateProgress = async (action, payload) => {
        // Optimistic local update
        const local = { ...progress };
        if (action === 'complete_page')   local.completedPages   = [...(local.completedPages||[]), payload.page];
        if (action === 'uncomplete_page') local.completedPages   = (local.completedPages||[]).filter(p => p !== payload.page);
        if (action === 'star')            local.starredItems     = [...(local.starredItems||[]),   { ...payload, createdAt: new Date() }];
        if (action === 'unstar')          local.starredItems     = (local.starredItems||[]).filter(i => i.id !== payload.itemId);
        if (action === 'note')            local.notes            = { ...(local.notes||{}), [payload.noteKey]: payload.noteText };
        saveProgress(local);

        // Sync to MongoDB if logged in
        const token = localStorage.getItem('fc_token');
        if (!token) return;
        try {
            await fetch(`${API}/progress`, {
                method:'POST', headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`},
                body: JSON.stringify({ action, ...payload }),
            });
        } catch {}
    };

    const isPageDone    = (path) => (progress?.completedPages||[]).includes(path);
    const isStarred     = (id)   => (progress?.starredItems||[]).some(i => i.id === id);
    const getNote       = (key)  => progress?.notes?.[key] || '';
    const getToken      = ()     => localStorage.getItem('fc_token');

    return (
        <Ctx.Provider value={{ user, loading, progress, register, login, logout, updateProgress, isPageDone, isStarred, getNote, getToken }}>
            {children}
        </Ctx.Provider>
    );
}
export const useAuth = () => useContext(Ctx);
