import React from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';

const COLOR = '#1d4ed8';
const RESOURCES = [
    { type:'docs', title:'ngrok Docs', description:'Official ngrok documentation — CLI, tunnels, config, dashboard.', url:'https://ngrok.com/docs' },
    { type:'tool', title:'ngrok Dashboard', description:'Inspect every request/response passing through your tunnel in real time.', url:'https://dashboard.ngrok.com/' },
    { type:'tool', title:'localtunnel', description:'Free ngrok alternative — no account required.', url:'https://localtunnel.github.io/www/' },
];

export default function Ngrok() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{color:COLOR}}>ngrok</span> — Local to Public</div>
                <h1><span className="accent" style={{color:COLOR}}>ngrok</span><br/><em>Expose localhost to the internet</em></h1>
                <p className="hero-desc">ngrok creates a secure tunnel from a public URL to your localhost. Essential for testing webhooks (Razorpay, Stripe, WhatsApp), OAuth callbacks, and sharing work-in-progress with clients — without deploying.</p>
                <div className="hero-stack">{['Tunneling','Webhooks','OAuth Callbacks','HTTPS','Custom Domains','Request Inspector'].map(t=><span key={t} className="stack-chip">{t}</span>)}</div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>01</div>
                    <div className="chapter-meta"><div className="chapter-track" style={{color:COLOR}}>Setup</div>
                        <h2>Installation & Basic Usage</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Windows</h3>
                    <CodeBlock lang="bash" code={`# Option 1: Chocolatey
choco install ngrok

# Option 2: Winget
winget install ngrok

# Option 3: Download .exe from https://ngrok.com/download
# Extract → move ngrok.exe to C:\\Windows\\System32\\

# Verify
ngrok version`} />
                    <h3>Mac</h3>
                    <CodeBlock lang="bash" code={`# Homebrew
brew install ngrok/ngrok/ngrok

# Verify
ngrok version`} />
                    <h3>Auth & Start Tunnel</h3>
                    <CodeBlock lang="bash" code={`# 1. Sign up → https://dashboard.ngrok.com/ → copy your authtoken

# 2. Authenticate (one-time)
ngrok config add-authtoken YOUR_AUTH_TOKEN

# 3. Tunnel your Express server running on port 5000
ngrok http 5000

# Output:
# Forwarding  https://abc123.ngrok-free.app → http://localhost:5000
# Use the https URL anywhere on the internet`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>02</div>
                    <div className="chapter-meta"><div className="chapter-track" style={{color:COLOR}}>Use Cases</div>
                        <h2>Real Use Cases at Your Internship</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>1. Testing Razorpay Webhooks Locally</h3>
                    <CodeBlock lang="bash" code={`# Problem: Razorpay needs to POST to YOUR server when payment succeeds.
# Your localhost is not reachable from Razorpay's servers.
# Solution: ngrok

# 1. Start your server
npm run dev   # Express running on port 5000

# 2. Start tunnel
ngrok http 5000
# → https://xyz.ngrok-free.app

# 3. In Razorpay Dashboard → Settings → Webhooks → Add:
#    https://xyz.ngrok-free.app/api/payments/webhook

# 4. Make a test payment — Razorpay POSTs to your ngrok URL → hits localhost
# 5. Watch ngrok inspect dashboard: http://localhost:4040`} />

                    <h3>2. Testing WhatsApp / Twilio Webhooks</h3>
                    <CodeBlock lang="bash" code={`# WhatsApp Business API needs a public URL to send messages to your server

ngrok http 3000
# → https://abc.ngrok-free.app

# In Meta Developer Console → WhatsApp → Configuration → Webhook URL:
#   https://abc.ngrok-free.app/api/whatsapp/webhook

# Your Node.js receives WhatsApp messages on localhost`} />

                    <h3>3. OAuth Redirect URIs (Google, GitHub)</h3>
                    <CodeBlock lang="bash" code={`# Google OAuth needs the redirect URI registered in Google Console.
# You can't register localhost in production OAuth.

ngrok http 5173  # tunnel Vite frontend
# → https://def.ngrok-free.app

# In Google Cloud Console → OAuth Client → Authorized redirect URIs:
#   https://def.ngrok-free.app/auth/google/callback

# In your .env:
GOOGLE_CALLBACK_URL=https://def.ngrok-free.app/auth/google/callback`} />

                    <h3>4. Share WIP with Client / Manager</h3>
                    <CodeBlock lang="bash" code={`# No deployment needed — just share the ngrok URL
ngrok http 5173   # your React dev server
# → https://ghi.ngrok-free.app
# Share this URL — anyone can see your local React app`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>03</div>
                    <div className="chapter-meta"><div className="chapter-track" style={{color:COLOR}}>Config</div>
                        <h2>ngrok Config File & Advanced Usage</h2>
                    </div>
                </div>
                <div className="topic">
                    <CodeBlock lang="bash" code={`# ngrok.yml — tunnel multiple ports at once
version: "2"
authtoken: YOUR_AUTH_TOKEN
tunnels:
    frontend:
        proto: http
        addr:  5173
        bind_tls: true
    backend:
        proto: http
        addr:  5000
        bind_tls: true

# Start all tunnels
ngrok start --all

# ── Request Inspector ──
# Every request through ngrok is inspectable at:
http://localhost:4040

# You can see: headers, body, response, timing
# Replay any request — useful for debugging webhooks

# ── Custom domain (paid plans) ──
ngrok http --domain=myapp.ngrok.dev 5000

# ── Static IP / Reserved URL (free accounts get new URL each restart) ──
# Upgrade to Starter plan ($8/mo) for fixed subdomain`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header"><div><h2 style={{fontFamily:"'Fraunces',serif"}}>Resources</h2></div></div>
                <div className="resource-grid">{RESOURCES.map((r,i)=><ResourceCard key={i} {...r}/>)}</div>
            </section>
            <footer className="footer"><p>ngrok · FullStack Compass</p></footer>
        </>
    );
}
