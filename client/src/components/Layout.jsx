import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import TopBar from './TopBar.jsx';
import PageTOC from './PageTOC.jsx';
import ChatAssistant from './ChatAssistant.jsx';
import SearchModal from './SearchModal.jsx';
import ReadingMeta from './ReadingMeta.jsx';

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchOpen,  setSearchOpen]  = useState(false);
    const location = useLocation();

    useEffect(() => { setSidebarOpen(false); window.scrollTo(0, 0); }, [location.pathname]);

    useEffect(() => {
        const onKey = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setSearchOpen(o => !o);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    return (
        <div className="app-layout">
            <TopBar onMenuClick={() => setSidebarOpen(o => !o)} onSearchClick={() => setSearchOpen(true)} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onSearchClick={() => setSearchOpen(true)} />
            <main className="main-content">
                <ReadingMeta />
                <Outlet />
            </main>
            <PageTOC />
            <ChatAssistant />
            {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
        </div>
    );
}
