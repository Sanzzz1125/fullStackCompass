import React from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';

const COLOR = '#a855f7';
const RESOURCES = [
    { type:'docs',     title:'Google AI Studio (Gemini)',  description:'Get your free Gemini API key, test prompts live, see pricing.', url:'https://aistudio.google.com/app/apikey' },
    { type:'docs',     title:'OpenAI API Docs',            description:'GPT-4, embeddings, assistants API, vision — full reference.', url:'https://platform.openai.com/docs' },
    { type:'docs',     title:'Anthropic Claude API',       description:'Claude API — the AI powering FullStack Compass itself.', url:'https://docs.anthropic.com/' },
    { type:'tutorial', title:'LangChain JS Docs',          description:'Framework to chain LLM calls, add memory, connect tools and databases.', url:'https://js.langchain.com/docs/' },
    { type:'tool',     title:'Vercel AI SDK',              description:'Streaming AI responses in Next.js/React with one hook. Best DX for AI apps.', url:'https://sdk.vercel.ai/docs' },
];

export default function LLMs() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{color:COLOR}}>LLMs & AI APIs</span> — Intern Tools</div>
                <h1><span className="accent" style={{color:COLOR}}>LLMs & AI APIs</span><br/><em>Build with AI</em></h1>
                <p className="hero-desc">Large Language Models (LLMs) are the backbone of modern AI products. As an intern you're already working with them. This section teaches you how to integrate Gemini, GPT-4, and Claude into real MERN applications.</p>
                <div className="hero-stack">{['Gemini','OpenAI','Claude','Prompt Engineering','Streaming','RAG','Embeddings','LangChain'].map(t=><span key={t} className="stack-chip">{t}</span>)}</div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>01</div>
                    <div className="chapter-meta"><div className="chapter-track" style={{color:COLOR}}>Concepts</div>
                        <h2>How LLMs Work — What You Actually Need to Know</h2>
                    </div>
                </div>
                <div className="topic">
                    <CodeBlock lang="javascript" code={`// LLMs are stateless functions:
// (system_prompt + conversation_history + new_message) → response

// Key concepts:
// Tokens      — chunks of text (~4 chars). Billing and limits use tokens.
// Context window — max tokens the model can "see" at once. GPT-4: 128k, Gemini 1.5: 1M
// Temperature — 0 = deterministic/factual, 1 = creative/random. Use 0.3-0.7 for most apps.
// Top-p       — nucleus sampling. Controls diversity. Usually leave at default.
// System prompt — persistent instructions. Sets model persona, rules, output format.

// API call is just an HTTP POST:
// URL: provider's endpoint
// Body: { model, messages: [{role, content}], max_tokens, temperature }
// Response: { choices: [{ message: { content } }] } (OpenAI format)
//           { candidates: [{ content: { parts: [{ text }] } }] } (Gemini format)`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>02</div>
                    <div className="chapter-meta"><div className="chapter-track" style={{color:COLOR}}>Gemini</div>
                        <h2>Gemini API — Free & Powerful</h2>
                        <p className="chapter-intro">Gemini 1.5 Flash is free with generous limits. Perfect for side projects and prototypes.</p>
                    </div>
                </div>
                <div className="topic">
                    <h3>Direct REST Call (no SDK needed)</h3>
                    <CodeBlock lang="javascript" code={`// Free: gemini-1.5-flash — 15 RPM, 1M TPM, 1500 RPD
// API key: https://aistudio.google.com/app/apikey

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

async function callGemini(messages, systemPrompt = '') {
    const res = await fetch(\`\${GEMINI_URL}?key=\${process.env.GEMINI_API_KEY}\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            systemInstruction: systemPrompt
                ? { parts: [{ text: systemPrompt }] }
                : undefined,
            contents: messages.map(m => ({
                role:  m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.content }],
            })),
            generationConfig: {
                temperature:     0.7,
                maxOutputTokens: 1000,
            },
        }),
    });

    if (!res.ok) throw new Error(\`Gemini error: \${res.status}\`);
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
}

// Usage in Express route
app.post('/api/chat', async (req, res) => {
    const { messages, systemPrompt } = req.body;
    const reply = await callGemini(messages, systemPrompt);
    res.json({ reply });
});`} />
                    <h3>With Official SDK</h3>
                    <CodeBlock lang="javascript" code={`npm install @google/generative-ai

const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function chat(history, newMessage) {
    const model   = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const chat    = model.startChat({ history });
    const result  = await chat.sendMessage(newMessage);
    return result.response.text();
}

// Multimodal — send image + text
async function analyzeImage(imageBuffer, mimeType, prompt) {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent([
        prompt,
        { inlineData: { data: imageBuffer.toString('base64'), mimeType } },
    ]);
    return result.response.text();
}`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>03</div>
                    <div className="chapter-meta"><div className="chapter-track" style={{color:COLOR}}>OpenAI</div>
                        <h2>OpenAI GPT API</h2>
                    </div>
                </div>
                <div className="topic">
                    <CodeBlock lang="bash" code={`npm install openai`} />
                    <CodeBlock lang="javascript" code={`const OpenAI = require('openai');
const openai  = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Basic chat
const response = await openai.chat.completions.create({
    model:       'gpt-4o-mini',    // cheapest GPT-4 class model
    messages: [
        { role: 'system',    content: 'You are a helpful coding assistant.' },
        { role: 'user',      content: 'Explain async/await in 3 lines' },
    ],
    max_tokens:  200,
    temperature: 0.5,
});
const answer = response.choices[0].message.content;

// ── STREAMING — show tokens as they arrive (better UX) ──
app.post('/api/chat/stream', async (req, res) => {
    res.setHeader('Content-Type',  'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection',    'keep-alive');

    const stream = await openai.chat.completions.create({
        model:    'gpt-4o-mini',
        messages: req.body.messages,
        stream:   true,
    });

    for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || '';
        if (text) res.write(\`data: \${JSON.stringify({ text })}\n\n\`);
    }
    res.write('data: [DONE]\n\n');
    res.end();
});

// React client for streaming:
const res = await fetch('/api/chat/stream', { method: 'POST', body: JSON.stringify({ messages }) });
const reader = res.body.getReader();
let aiMessage = '';
while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const text = new TextDecoder().decode(value);
    text.split('\n').filter(l => l.startsWith('data: ')).forEach(line => {
        const data = line.slice(6);
        if (data !== '[DONE]') aiMessage += JSON.parse(data).text;
        setMessages(prev => [...prev.slice(0, -1), { role: 'assistant', content: aiMessage }]);
    });
}`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>04</div>
                    <div className="chapter-meta"><div className="chapter-track" style={{color:COLOR}}>Prompt Engineering</div>
                        <h2>Prompt Engineering — Getting Good Output</h2>
                    </div>
                </div>
                <div className="topic">
                    <CodeBlock lang="javascript" code={`// ── SYSTEM PROMPT PATTERNS ──

// 1. Persona + Rules
const systemPrompt = \`You are a senior MERN stack developer reviewing code.
Rules:
- Point out security issues first
- Suggest performance improvements
- Provide corrected code
- Be concise — no fluff
Output format: JSON with keys: issues[], improvements[], correctedCode\`;

// 2. Few-shot examples (show examples of desired output)
const systemPrompt2 = \`Convert plain English to MongoDB queries.

Example:
Input: "Find all users older than 25 from Chennai"
Output: { age: { $gt: 25 }, city: "Chennai" }

Example:
Input: "Get top 5 products by price"
Output: Product.find().sort({ price: -1 }).limit(5)\`;

// 3. Chain-of-thought (force reasoning before answer)
const systemPrompt3 = \`Before answering, think step by step:
1. Understand what is being asked
2. Consider edge cases
3. Then provide your answer
Format: <thinking>...</thinking><answer>...</answer>\`;

// ── OUTPUT FORMATTING ──
// Force JSON output (more reliable than asking nicely):
const systemPromptJSON = \`You MUST respond ONLY with valid JSON. No markdown, no explanations.
Schema: { "analysis": string, "score": number, "suggestions": string[] }\`;

const raw    = await callGemini(messages, systemPromptJSON);
const result = JSON.parse(raw.replace(/\`\`\`json|\`\`\`/g, '').trim());

// ── CONTEXT INJECTION (RAG basics) ──
// When you have documents, inject relevant content into the prompt:
function buildPromptWithContext(userQuery, relevantDocs) {
    return \`Answer the question based ONLY on the following context.
If the answer isn't in the context, say "I don't know".

Context:
\${relevantDocs.map(d => d.content).join('\n---\n')}

Question: \${userQuery}\`;
}`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>05</div>
                    <div className="chapter-meta"><div className="chapter-track" style={{color:COLOR}}>Embeddings & RAG</div>
                        <h2>Embeddings & RAG — AI That Knows Your Data</h2>
                        <p className="chapter-intro">RAG (Retrieval Augmented Generation) lets LLMs answer questions about YOUR documents — product manuals, codebase, internal docs. This is what most real AI products do.</p>
                    </div>
                </div>
                <div className="topic">
                    <CodeBlock lang="javascript" code={`// Embeddings = turn text into a vector (array of numbers)
// Similar text → similar vectors → find related content via cosine similarity

// ── Step 1: Embed your documents ──
async function embedText(text) {
    const res = await fetch(
        \`https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=\${process.env.GEMINI_API_KEY}\`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ model: 'models/text-embedding-004', content: { parts: [{ text }] } }) }
    );
    const data = await res.json();
    return data.embedding.values; // array of 768 numbers
}

// ── Step 2: Store embeddings in MongoDB ──
const docSchema = new mongoose.Schema({
    content:   String,
    source:    String,
    embedding: [Number],   // 768-dim vector
});
docSchema.index({ embedding: 1 }); // for vector search (use Atlas Vector Search)

// ── Step 3: Find relevant docs for a query ──
function cosineSimilarity(a, b) {
    const dot   = a.reduce((sum, v, i) => sum + v * b[i], 0);
    const normA = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
    const normB = Math.sqrt(b.reduce((s, v) => s + v * v, 0));
    return dot / (normA * normB);
}

async function findRelevantDocs(query, topK = 3) {
    const queryEmbedding = await embedText(query);
    const allDocs        = await Document.find().lean();
    return allDocs
        .map(doc => ({ ...doc, score: cosineSimilarity(queryEmbedding, doc.embedding) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, topK);
}

// ── Step 4: Answer with context ──
async function answerWithRAG(userQuery) {
    const relevantDocs = await findRelevantDocs(userQuery);
    const prompt       = buildPromptWithContext(userQuery, relevantDocs);
    return callGemini([{ role: 'user', content: prompt }]);
}`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header"><div><h2 style={{fontFamily:"'Fraunces',serif"}}>Resources</h2></div></div>
                <div className="resource-grid">{RESOURCES.map((r,i)=><ResourceCard key={i} {...r}/>)}</div>
            </section>
            <footer className="footer"><p>LLMs & AI APIs · FullStack Compass</p></footer>
        </>
    );
}
