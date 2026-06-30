import React from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';

const COLOR = '#06b6d4';
const RESOURCES = [
    { type:'docs', title:'Deepgram Docs', description:'Official Deepgram documentation — STT, TTS, live transcription, language support.', url:'https://developers.deepgram.com/docs/' },
    { type:'tool', title:'Deepgram Console', description:'Get your free API key, test audio files, monitor usage.', url:'https://console.deepgram.com/' },
    { type:'docs', title:'Deepgram Node.js SDK', description:'Official Node.js SDK — easiest way to integrate.', url:'https://github.com/deepgram/deepgram-node-sdk' },
];

export default function Deepgram() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{color:COLOR}}>Deepgram</span> — Speech AI</div>
                <h1><span className="accent" style={{color:COLOR}}>Deepgram</span><br/><em>Speech-to-text & beyond</em></h1>
                <p className="hero-desc">Deepgram converts audio to text in real-time or from files. Used at your internship for voice bots, transcription, and voice-enabled AI features. Fastest + most accurate STT API available.</p>
                <div className="hero-stack">{['Live STT','Pre-recorded','WebSocket','Node SDK','React Mic','Language Detection'].map(t=><span key={t} className="stack-chip">{t}</span>)}</div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>01</div>
                    <div className="chapter-meta"><div className="chapter-track" style={{color:COLOR}}>Setup</div>
                        <h2>Setup & Pre-recorded Transcription</h2>
                    </div>
                </div>
                <div className="topic">
                    <CodeBlock lang="bash" code={`npm install @deepgram/sdk

# Get free API key → https://console.deepgram.com/
# Add to .env:
DEEPGRAM_API_KEY=your_api_key_here`} />
                    <h3>Transcribe an audio file</h3>
                    <CodeBlock lang="javascript" code={`const { createClient } = require('@deepgram/sdk');
const fs = require('fs');

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

// ── Transcribe a local file ──
async function transcribeFile(filePath) {
    const audioBuffer = fs.readFileSync(filePath);

    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
        audioBuffer,
        {
            model:       'nova-2',       // best accuracy model
            language:    'en-US',
            smart_format: true,          // auto punctuation + formatting
            diarize:     true,           // detect different speakers
            punctuate:   true,
            paragraphs:  true,
        }
    );

    if (error) throw new Error(error.message);

    const transcript = result.results.channels[0].alternatives[0];
    return {
        text:        transcript.transcript,
        confidence:  transcript.confidence,
        words:       transcript.words,       // each word with timestamps
        paragraphs:  transcript.paragraphs,
    };
}

// ── Transcribe from URL ──
async function transcribeUrl(audioUrl) {
    const { result } = await deepgram.listen.prerecorded.transcribeUrl(
        { url: audioUrl },
        { model: 'nova-2', smart_format: true, language: 'hi' } // Hindi support
    );
    return result.results.channels[0].alternatives[0].transcript;
}

// ── Express route ──
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/transcribe', upload.single('audio'), async (req, res) => {
    const { result } = await deepgram.listen.prerecorded.transcribeFile(
        req.file.buffer,
        { model: 'nova-2', smart_format: true }
    );
    const text = result.results.channels[0].alternatives[0].transcript;
    res.json({ transcript: text });
});`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>02</div>
                    <div className="chapter-meta"><div className="chapter-track" style={{color:COLOR}}>Live</div>
                        <h2>Live Transcription via WebSocket</h2>
                        <p className="chapter-intro">Stream microphone audio from the browser → Node.js → Deepgram WebSocket → get transcriptions back in real time. This is what voice bots use.</p>
                    </div>
                </div>
                <div className="topic">
                    <h3>Node.js Server — Proxy WebSocket</h3>
                    <CodeBlock lang="javascript" code={`// server.js — WebSocket proxy (browser → your server → Deepgram)
// Why proxy? Keeps your API key off the client.
const { WebSocketServer } = require('ws');
const { createClient }    = require('@deepgram/sdk');

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);
const wss      = new WebSocketServer({ port: 3001 });

wss.on('connection', (clientWs) => {
    console.log('Client connected for live transcription');

    // Open Deepgram live connection
    const dgLive = deepgram.listen.live({
        model:          'nova-2',
        language:       'en-US',
        smart_format:   true,
        interim_results: true,  // get partial results as user speaks
        vad_events:     true,   // voice activity detection events
        endpointing:    300,    // ms of silence before utterance ends
    });

    dgLive.on('open', () => console.log('Deepgram connected'));

    // Forward Deepgram transcript → client
    dgLive.on('Results', (data) => {
        const transcript = data.channel.alternatives[0].transcript;
        const isFinal    = data.is_final;
        if (transcript) {
            clientWs.send(JSON.stringify({ transcript, isFinal }));
        }
    });

    dgLive.on('SpeechStarted', () => clientWs.send(JSON.stringify({ event: 'speech_started' })));
    dgLive.on('UtteranceEnd',  () => clientWs.send(JSON.stringify({ event: 'utterance_end'  })));
    dgLive.on('error',  (err) => console.error('Deepgram error:', err));
    dgLive.on('close',  ()    => console.log('Deepgram closed'));

    // Forward audio from client → Deepgram
    clientWs.on('message', (audioChunk) => {
        if (dgLive.getReadyState() === 1) dgLive.send(audioChunk);
    });

    clientWs.on('close', () => dgLive.finish());
});`} />
                    <h3>React Client — Capture Microphone</h3>
                    <CodeBlock lang="javascript" code={`// hooks/useLiveTranscription.js
import { useState, useRef, useCallback } from 'react';

export function useLiveTranscription() {
    const [transcript, setTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);
    const wsRef       = useRef(null);
    const mediaRef    = useRef(null);
    const recorderRef = useRef(null);

    const start = useCallback(async () => {
        // 1. Get microphone access
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRef.current = stream;

        // 2. Connect to your WebSocket proxy
        wsRef.current = new WebSocket('ws://localhost:3001');

        wsRef.current.onopen = () => {
            // 3. Start recording and send audio chunks
            recorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
            recorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0 && wsRef.current?.readyState === WebSocket.OPEN) {
                    wsRef.current.send(e.data);
                }
            };
            recorderRef.current.start(250); // send chunk every 250ms
        };

        // 4. Receive transcriptions
        wsRef.current.onmessage = (e) => {
            const data = JSON.parse(e.data);
            if (data.transcript) {
                if (data.isFinal) {
                    setTranscript(prev => prev + ' ' + data.transcript);
                }
            }
        };

        setIsListening(true);
    }, []);

    const stop = useCallback(() => {
        recorderRef.current?.stop();
        mediaRef.current?.getTracks().forEach(t => t.stop());
        wsRef.current?.close();
        setIsListening(false);
    }, []);

    return { transcript, isListening, start, stop };
}

// Component usage
function VoiceInput({ onTranscript }) {
    const { transcript, isListening, start, stop } = useLiveTranscription();

    return (
        <div>
            <button onClick={isListening ? stop : start}>
                {isListening ? '🔴 Stop' : '🎤 Start Recording'}
            </button>
            {isListening && <div className="recording-indicator">● LIVE</div>}
            <p>{transcript}</p>
            {transcript && (
                <button onClick={() => onTranscript(transcript)}>Use this text</button>
            )}
        </div>
    );
}`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>03</div>
                    <div className="chapter-meta"><div className="chapter-track" style={{color:COLOR}}>Real World</div>
                        <h2>Voice Bot Architecture</h2>
                        <p className="chapter-intro">This is the full flow your internship product likely uses — voice in, AI brain, voice out.</p>
                    </div>
                </div>
                <div className="topic">
                    <CodeBlock lang="javascript" code={`// Full Voice Bot Pipeline:
// 1. User speaks       → browser mic captures audio
// 2. Audio stream      → Deepgram WebSocket → text
// 3. Text              → LLM (Gemini/GPT) → response text
// 4. Response text     → TTS (Deepgram Aura / ElevenLabs) → audio
// 5. Audio             → play in browser

// ── Step 3+4: LLM + TTS in one route ──
app.post('/api/voice-bot', async (req, res) => {
    const { userTranscript, conversationHistory } = req.body;

    // Call LLM
    const aiText = await callGemini([
        ...conversationHistory,
        { role: 'user', content: userTranscript },
    ], 'You are a helpful voice assistant. Keep responses short and conversational.');

    // Convert AI text to speech with Deepgram Aura
    const ttsRes = await fetch('https://api.deepgram.com/v1/speak?model=aura-asteria-en', {
        method:  'POST',
        headers: { Authorization: \`Token \${process.env.DEEPGRAM_API_KEY}\`, 'Content-Type': 'application/json' },
        body:    JSON.stringify({ text: aiText }),
    });

    res.setHeader('Content-Type', 'audio/mpeg');
    ttsRes.body.pipe(res);  // stream audio directly to client
});

// React: play the audio
async function handleVoiceResponse(userText) {
    const res = await fetch('/api/voice-bot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userTranscript: userText, conversationHistory }),
    });
    const blob = await res.blob();
    const url  = URL.createObjectURL(blob);
    new Audio(url).play();
}`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header"><div><h2 style={{fontFamily:"'Fraunces',serif"}}>Resources</h2></div></div>
                <div className="resource-grid">{RESOURCES.map((r,i)=><ResourceCard key={i} {...r}/>)}</div>
            </section>
            <footer className="footer"><p>Deepgram · FullStack Compass</p></footer>
        </>
    );
}
