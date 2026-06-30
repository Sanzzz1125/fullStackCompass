import React from "react";
import CodeBlock from "../components/CodeBlock.jsx";
import ResourceCard from "../components/ResourceCard.jsx";

const COLOR = "#2088ff";
const RESOURCES = [
  {
    type: "docs",
    title: "GitHub Actions Docs",
    description:
      "Official GitHub Actions documentation. Workflows, events, jobs, steps explained.",
    url: "https://docs.github.com/en/actions",
  },
  {
    type: "tutorial",
    title: "GitHub Actions Marketplace",
    description: "Browse 20,000+ pre-built actions to use in your workflows.",
    url: "https://github.com/marketplace?type=actions",
  },
  {
    type: "tool",
    title: "act — Run Actions Locally",
    description:
      "Test GitHub Actions on your machine before pushing. No wasted build minutes.",
    url: "https://github.com/nektos/act",
  },
];

export default function CICD() {
  return (
    <>
      <section className="hero">
        <div className="hero-eyebrow">
          <span style={{ color: COLOR }}>CI/CD</span> — GitHub Actions
        </div>
        <h1>
          <span className="accent" style={{ color: COLOR }}>
            CI/CD
          </span>
          <br />
          <em>Automate test & deploy</em>
        </h1>
        <p className="hero-desc">
          CI/CD automates testing and deployment every time you push code. Every
          broken commit is caught before it reaches production. Every green push
          deploys automatically.
        </p>
        <div className="hero-stack">
          {[
            "GitHub Actions",
            "Workflows",
            "Secrets",
            "Auto Deploy",
            "Testing",
            "Lint",
          ].map((t) => (
            <span key={t} className="stack-chip">
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="chapter">
        <div className="chapter-header">
          <div
            className="chapter-num"
            style={{ borderColor: COLOR, color: COLOR }}
          >
            01
          </div>
          <div className="chapter-meta">
            <div className="chapter-track" style={{ color: COLOR }}>
              Concepts
            </div>
            <h2>How GitHub Actions Works</h2>
          </div>
        </div>
        <div className="topic">
          <CodeBlock
            lang="javascript"
            code={`// Workflow anatomy:
//
// Trigger (on: push, pull_request, schedule)
//   └── Job (runs-on: ubuntu-latest)
//         └── Steps (uses: action | run: command)
//
// Workflow file: .github/workflows/ci.yml
// GitHub reads this file and runs it on their servers for free
// (2,000 free minutes/month on public repos, unlimited on public)`}
          />
        </div>
      </section>

      <section className="chapter">
        <div className="chapter-header">
          <div
            className="chapter-num"
            style={{ borderColor: COLOR, color: COLOR }}
          >
            02
          </div>
          <div className="chapter-meta">
            <div className="chapter-track" style={{ color: COLOR }}>
              CI Workflow
            </div>
            <h2>CI — Test on Every Push & PR</h2>
          </div>
        </div>
        <div className="topic">
          <CodeBlock
            lang="bash"
            code={`# .github/workflows/ci.yml

name: CI

on:
    push:
        branches: [main, develop]
    pull_request:
        branches: [main]

jobs:
    test-backend:
        name: Test Backend
        runs-on: ubuntu-latest

        services:
            mongodb:
                image: mongo:7
                ports: ['27017:27017']
            redis:
                image: redis:7-alpine
                ports: ['6379:6379']

        steps:
            - name: Checkout code
              uses: actions/checkout@v4

            - name: Setup Node.js
              uses: actions/setup-node@v4
              with:
                  node-version: '20'
                  cache: 'npm'
                  cache-dependency-path: server/package-lock.json

            - name: Install dependencies
              working-directory: server
              run: npm ci

            - name: Run ESLint
              working-directory: server
              run: npm run lint

            - name: Run tests
              working-directory: server
              env:
                  NODE_ENV:    test
                  MONGODB_URI: mongodb://localhost:27017/test
                  REDIS_URL:   redis://localhost:6379
                  JWT_SECRET:  test_secret_key_for_ci
              run: npm test

    test-frontend:
        name: Test Frontend
        runs-on: ubuntu-latest

        steps:
            - uses: actions/checkout@v4

            - uses: actions/setup-node@v4
              with:
                  node-version: '20'
                  cache: 'npm'
                  cache-dependency-path: client/package-lock.json

            - name: Install & build
              working-directory: client
              run: |
                  npm ci
                  npm run build

            - name: Run tests
              working-directory: client
              run: npm test -- --watchAll=false`}
          />
        </div>
      </section>

      <section className="chapter">
        <div className="chapter-header">
          <div
            className="chapter-num"
            style={{ borderColor: COLOR, color: COLOR }}
          >
            03
          </div>
          <div className="chapter-meta">
            <div className="chapter-track" style={{ color: COLOR }}>
              CD Workflow
            </div>
            <h2>CD — Deploy on Push to Main</h2>
          </div>
        </div>
        <div className="topic">
          <h3>Deploy to Render (backend) + Vercel (frontend)</h3>
          <CodeBlock
            lang="bash"
            code={`# .github/workflows/deploy.yml

name: Deploy

on:
    push:
        branches: [main]   # only deploy from main

jobs:
    deploy-backend:
        name: Deploy to Render
        runs-on: ubuntu-latest
        needs: []   # add 'test-backend' here once tests pass reliably

        steps:
            - name: Trigger Render deploy
              run: |
                  curl -X POST \\
                    -H "Authorization: Bearer \${{ secrets.RENDER_API_KEY }}" \\
                    "https://api.render.com/v1/services/\${{ secrets.RENDER_SERVICE_ID }}/deploys"

    deploy-frontend:
        name: Deploy to Vercel
        runs-on: ubuntu-latest

        steps:
            - uses: actions/checkout@v4

            - name: Deploy to Vercel
              uses: amondnet/vercel-action@v25
              with:
                  vercel-token:   \${{ secrets.VERCEL_TOKEN }}
                  vercel-org-id:  \${{ secrets.VERCEL_ORG_ID }}
                  vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
                  working-directory: ./client
                  vercel-args: '--prod'`}
          />
          <CodeBlock
            lang="bash"
            code={`# How to add GitHub Secrets:
# GitHub Repo → Settings → Secrets and variables → Actions → New secret
#
# Required secrets:
# RENDER_API_KEY         — Render Dashboard → Account Settings → API Keys
# RENDER_SERVICE_ID      — Render service URL contains the ID
# VERCEL_TOKEN           — Vercel Dashboard → Settings → Tokens
# VERCEL_ORG_ID          — vercel.json or Vercel project settings
# VERCEL_PROJECT_ID      — Vercel project settings`}
          />
        </div>
      </section>

      <section className="chapter">
        <div className="chapter-header">
          <div
            className="chapter-num"
            style={{ borderColor: COLOR, color: COLOR }}
          >
            04
          </div>
          <div className="chapter-meta">
            <div className="chapter-track" style={{ color: COLOR }}>
              Extras
            </div>
            <h2>Useful Workflow Patterns</h2>
          </div>
        </div>
        <div className="topic">
          <CodeBlock
            lang="bash"
            code={`# ── Auto-label PRs ──
name: Label PRs
on: [pull_request]
jobs:
    label:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/labeler@v5
              with:
                  repo-token: \${{ secrets.GITHUB_TOKEN }}

# ── Dependency security audit ──
- name: Security audit
  run: npm audit --audit-level=high

# ── Lighthouse CI (performance check) ──
- uses: treosh/lighthouse-ci-action@v11
  with:
      urls: 'https://www.fullstackcompass.in'
      uploadArtifacts: true

# ── Send Slack notification on deploy ──
- name: Notify Slack
  uses: rtCamp/action-slack-notify@v2
  env:
      SLACK_WEBHOOK: \${{ secrets.SLACK_WEBHOOK }}
      SLACK_MESSAGE: 'Deployed to production ✅'`}
          />
        </div>
      </section>

      <section className="chapter">
        <div className="chapter-header">
          <div>
            <h2 style={{ fontFamily: "'Fraunces', serif" }}>Resources</h2>
          </div>
        </div>
        <div className="resource-grid">
          {RESOURCES.map((r, i) => (
            <ResourceCard key={i} {...r} />
          ))}
        </div>
      </section>
      <footer className="footer">
        <p>CI/CD · FullStack Compass</p>
      </footer>
    </>
  );
}
