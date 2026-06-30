import React from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';

const COLOR = '#2496ed';
const RESOURCES = [
    { type:'docs',     title:'Docker Official Docs',         description:'Complete Docker documentation — installation, CLI reference, Dockerfile syntax.', url:'https://docs.docker.com/' },
    { type:'tutorial', title:'Play with Docker (Free Lab)',  description:'Browser-based Docker playground. No installation needed. Run containers instantly.', url:'https://labs.play-with-docker.com/' },
    { type:'tutorial', title:'Docker for Node.js Guide',    description:'Official Node.js Docker best practices guide — multi-stage builds, security, optimization.', url:'https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md' },
];

export default function Docker() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{color:COLOR}}>Docker</span> — Containers</div>
                <h1><span className="accent" style={{color:COLOR}}>Docker</span><br/><em>Package & ship anything</em></h1>
                <p className="hero-desc">Docker packages your app with all its dependencies into a container — it runs identically on your laptop, teammate's machine, or production server. Solves "works on my machine" forever.</p>
                <div className="hero-stack">{['Dockerfile','Docker Compose','Images','Containers','Volumes','Networks'].map(t=><span key={t} className="stack-chip">{t}</span>)}</div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>01</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{color:COLOR}}>Core Concepts</div>
                        <h2>Images, Containers & Key Commands</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Essential Docker CLI</h3>
                    <CodeBlock lang="bash" code={`# Image — blueprint (read-only snapshot of filesystem)
# Container — running instance of an image

# Pull & run
docker pull node:20-alpine             # download image
docker run node:20-alpine node --version # run & execute command
docker run -it node:20-alpine sh       # interactive shell

# List
docker images                          # all local images
docker ps                              # running containers
docker ps -a                           # all containers (including stopped)

# Manage
docker stop <container-id>
docker rm   <container-id>
docker rmi  <image-id>                 # remove image
docker system prune                    # remove all stopped containers + unused images

# Exec into running container
docker exec -it <container-id> sh`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>02</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{color:COLOR}}>Dockerfile</div>
                        <h2>Dockerfile — Containerise Your MERN App</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Backend Dockerfile (Express API)</h3>
                    <CodeBlock lang="bash" code={`# server/Dockerfile

# ── Stage 1: Dependencies ──
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production      # install ONLY prod deps

# ── Stage 2: Production image ──
FROM node:20-alpine AS runner
WORKDIR /app

# Non-root user for security
RUN addgroup -S nodejs && adduser -S nodeuser -G nodejs

# Copy only what's needed
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Remove dev files
RUN rm -rf tests/ .env.example

USER nodeuser
EXPOSE 5000
CMD ["node", "server.js"]`} />
                    <CodeBlock lang="bash" code={`# client/Dockerfile

# ── Stage 1: Build React app ──
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build                 # outputs to /app/dist

# ── Stage 2: Serve with Nginx ──
FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`} />
                    <CodeBlock lang="bash" code={`# client/nginx.conf
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    # Handle React Router — all routes serve index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>03</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{color:COLOR}}>Compose</div>
                        <h2>Docker Compose — Run Full MERN Stack</h2>
                        <p className="chapter-intro">Compose defines and runs multi-container apps. One command starts React + Express + MongoDB + Redis together.</p>
                    </div>
                </div>
                <div className="topic">
                    <h3>docker-compose.yml</h3>
                    <CodeBlock lang="bash" code={`# docker-compose.yml (project root)
version: '3.9'

services:
    # ── MongoDB ──
    mongo:
        image: mongo:7
        container_name: mern_mongo
        restart: unless-stopped
        environment:
            MONGO_INITDB_ROOT_USERNAME: admin
            MONGO_INITDB_ROOT_PASSWORD: secret
            MONGO_INITDB_DATABASE: myapp
        volumes:
            - mongo_data:/data/db     # persist data between restarts
        ports:
            - "27017:27017"
        networks:
            - mern_net

    # ── Redis ──
    redis:
        image: redis:7-alpine
        container_name: mern_redis
        restart: unless-stopped
        volumes:
            - redis_data:/data
        ports:
            - "6379:6379"
        networks:
            - mern_net

    # ── Backend API ──
    api:
        build: ./server
        container_name: mern_api
        restart: unless-stopped
        env_file: ./server/.env
        environment:
            MONGODB_URI: mongodb://admin:secret@mongo:27017/myapp?authSource=admin
            REDIS_URL:   redis://redis:6379
        ports:
            - "5000:5000"
        depends_on:
            - mongo
            - redis
        networks:
            - mern_net
        volumes:
            - ./server/uploads:/app/uploads  # persist file uploads

    # ── Frontend ──
    client:
        build: ./client
        container_name: mern_client
        restart: unless-stopped
        ports:
            - "80:80"
        depends_on:
            - api
        networks:
            - mern_net

volumes:
    mongo_data:
    redis_data:

networks:
    mern_net:
        driver: bridge`} />
                    <CodeBlock lang="bash" code={`# Commands
docker compose up --build          # build & start all services
docker compose up -d               # run in background
docker compose logs -f api         # tail API logs
docker compose down                # stop all
docker compose down -v             # stop + delete volumes (reset DB)
docker compose exec api sh         # shell inside api container`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>04</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{color:COLOR}}>Dev Workflow</div>
                        <h2>.dockerignore & Dev Compose Override</h2>
                    </div>
                </div>
                <div className="topic">
                    <CodeBlock lang="bash" code={`# server/.dockerignore
node_modules/
.env
.env.*
*.log
tests/
.git/
README.md`} />
                    <CodeBlock lang="bash" code={`# docker-compose.dev.yml — override for development (hot reload)
version: '3.9'
services:
    api:
        build:
            context: ./server
            target: deps          # only install deps stage
        command: npx nodemon server.js
        volumes:
            - ./server:/app       # mount source code for live reload
            - /app/node_modules   # don't overwrite installed modules
        environment:
            NODE_ENV: development

# Run: docker compose -f docker-compose.yml -f docker-compose.dev.yml up`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header"><div><h2 style={{fontFamily:"'Fraunces', serif"}}>Resources</h2></div></div>
                <div className="resource-grid">{RESOURCES.map((r,i)=><ResourceCard key={i} {...r}/>)}</div>
            </section>
            <footer className="footer"><p>Docker · FullStack Compass</p></footer>
        </>
    );
}
