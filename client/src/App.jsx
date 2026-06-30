import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

import HTML         from './pages/HTML';
import CSS          from './pages/CSS';
import JavaScript   from './pages/JavaScript';
import Bootstrap    from './pages/Bootstrap';
import Tailwind     from './pages/Tailwind';
import ReactPage    from './pages/ReactPage';
import NodeJS       from './pages/NodeJS';
import Express      from './pages/Express';
import APIs         from './pages/APIs';
import Auth         from './pages/Auth';
import FileUploads  from './pages/FileUploads';
import Nodemailer   from './pages/Nodemailer';
import Payments     from './pages/Payments';
import SocketIO     from './pages/SocketIO';
import MongoDB      from './pages/MongoDB';
import Mongoose     from './pages/Mongoose';
import Redis        from './pages/Redis';
import SQL          from './pages/SQL';
import Docker       from './pages/Docker';
import CICD         from './pages/CICD';
import Deployment   from './pages/Deployment';
import TypeScript   from './pages/TypeScript';
import Testing      from './pages/Testing';
import ErrorTracking from './pages/ErrorTracking';
import MiniProjects from './pages/MiniProjects';
import AppClones    from './pages/Clones';
import CloneDetail  from './pages/CloneDetail';
import Landing      from './pages/Landing';
import Dashboard    from './pages/Dashboard';
import Connect      from './pages/Connect';
import Git          from './pages/Git';
import NestJS       from './pages/NestJS';
import LLMs         from './pages/LLMs';
import Deepgram     from './pages/Deepgram';
import Ngrok        from './pages/Ngrok';
import Login        from './pages/Login';
import Register     from './pages/Register';
import Starred      from './pages/Starred';

// New feature pages
import InterviewPrep  from './pages/InterviewPrep';
import DailyChallenge from './pages/DailyChallenge';
import Snippets       from './pages/Snippets';
import Flashcards     from './pages/Flashcards';
import ResumeTracker  from './pages/ResumeTracker';

export default function App() {
    return (
        <Routes>
            <Route path="/"         element={<Landing />} />
            <Route path="/login"    element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<Layout />}>
                <Route path="/dashboard"             element={<Dashboard />} />
                <Route path="/learn/html"            element={<HTML />} />
                <Route path="/learn/css"             element={<CSS />} />
                <Route path="/learn/javascript"      element={<JavaScript />} />
                <Route path="/learn/bootstrap"       element={<Bootstrap />} />
                <Route path="/learn/tailwind"        element={<Tailwind />} />
                <Route path="/learn/react"           element={<ReactPage />} />
                <Route path="/learn/nodejs"          element={<NodeJS />} />
                <Route path="/learn/express"         element={<Express />} />
                <Route path="/learn/apis"            element={<APIs />} />
                <Route path="/learn/nestjs"          element={<NestJS />} />
                <Route path="/learn/auth"            element={<Auth />} />
                <Route path="/learn/uploads"         element={<FileUploads />} />
                <Route path="/learn/nodemailer"      element={<Nodemailer />} />
                <Route path="/learn/payments"        element={<Payments />} />
                <Route path="/learn/socketio"        element={<SocketIO />} />
                <Route path="/learn/mongodb"         element={<MongoDB />} />
                <Route path="/learn/mongoose"        element={<Mongoose />} />
                <Route path="/learn/redis"           element={<Redis />} />
                <Route path="/learn/sql"             element={<SQL />} />
                <Route path="/learn/llms"            element={<LLMs />} />
                <Route path="/learn/deepgram"        element={<Deepgram />} />
                <Route path="/learn/ngrok"           element={<Ngrok />} />
                <Route path="/learn/docker"          element={<Docker />} />
                <Route path="/learn/cicd"            element={<CICD />} />
                <Route path="/learn/deploy"          element={<Deployment />} />
                <Route path="/learn/typescript"      element={<TypeScript />} />
                <Route path="/learn/testing"         element={<Testing />} />
                <Route path="/learn/error-tracking"  element={<ErrorTracking />} />
                <Route path="/learn/git"             element={<Git />} />
                <Route path="/mini-projects"         element={<MiniProjects />} />
                <Route path="/clones"                element={<AppClones />} />
                <Route path="/clones/:id"            element={<CloneDetail />} />
                <Route path="/starred"               element={<Starred />} />
                <Route path="/connect"               element={<Connect />} />

                {/* New feature pages */}
                <Route path="/interview"             element={<InterviewPrep />} />
                <Route path="/challenge"             element={<DailyChallenge />} />
                <Route path="/snippets"              element={<Snippets />} />
                <Route path="/flashcards"            element={<Flashcards />} />
                <Route path="/resume"                element={<ResumeTracker />} />

                <Route path="*"                      element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}
