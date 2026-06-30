import React from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';

const COLOR = 'var(--orange)';

const RESOURCES = [
    { type: 'docs',      title: 'Pro Git Book (free)',    description: 'The definitive, free git book. Chapters 1-3 cover everything you need day-to-day.',   url: 'https://git-scm.com/book/en/v2' },
    { type: 'tool',      title: 'GitHub',                 description: 'The standard platform for hosting Git repositories and collaborating on code.',          url: 'https://github.com' },
    { type: 'tutorial',  title: 'Learn Git Branching',    description: 'Interactive visual game that teaches branching, rebasing, and merging in the browser.',  url: 'https://learngitbranching.js.org/' },
    { type: 'reference', title: 'git - the simple guide', description: 'No deep shit. Just a simple guide for getting started with git.',                       url: 'https://rogerdudler.github.io/git-guide/' },
    { type: 'tool',      title: 'GitHub Desktop',         description: 'A visual GUI for Git — great while you\'re learning the command-line workflow.',         url: 'https://desktop.github.com/' },
    { type: 'reference', title: 'Conventional Commits',   description: 'A specification for adding human and machine-readable meaning to commit messages.',       url: 'https://www.conventionalcommits.org/' },
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

export default function Git() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{ color: COLOR }}>Git & GitHub</span> — Chapter 11</div>
                <h1><span className="accent" style={{ color: COLOR }}>Git</span><br /><em>Version control for developers.</em></h1>
                <p className="hero-desc">
                    Git is how professional developers track changes, collaborate with teams, and never lose work.
                    GitHub is where the code lives. You cannot work on a real project without both. This chapter
                    covers everything from first commit to pull requests and GitHub Actions CI/CD.
                </p>
                <div className="hero-stack">
                    {['git init', 'commit', 'push', 'branch', 'merge', 'pull request', 'GitHub Actions', '.gitignore'].map(t => (
                        <span key={t} className="stack-chip">{t}</span>
                    ))}
                </div>
            </section>

            {/* ── 01 SETUP ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>01</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Setup</div>
                        <h2>Install & Configure Git</h2>
                    </div>
                </div>

                <div className="topic">
                    <h3>Installation & First-Time Config</h3>
                    <CodeBlock lang="bash" code={`# Check if git is installed
git --version

# ── Install ───────────────────────────────────────────────────────────
# Windows: download from https://git-scm.com/download/win
# macOS:   brew install git   (or comes with Xcode tools)
# Linux:   sudo apt install git

# ── One-time global setup (do this before your first commit) ──────────
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global core.editor "code --wait"   # use VS Code as editor
git config --global init.defaultBranch main      # default branch name

# Verify your settings
git config --list`} />
                </div>

                <div className="topic">
                    <h3>The .gitignore File — Critical for Every MERN Project</h3>
                    <CodeBlock lang="bash" code={`# .gitignore — create this BEFORE your first commit
# It tells git which files to never track

# ── Dependencies ──────────────────────────────────────────────────────
node_modules/
.npm

# ── Environment variables (NEVER commit these) ────────────────────────
.env
.env.local
.env.development
.env.production
*.env

# ── Build outputs ─────────────────────────────────────────────────────
dist/
build/
.cache/

# ── IDE / OS files ────────────────────────────────────────────────────
.DS_Store         # macOS
Thumbs.db         # Windows
.vscode/settings.json
*.swp

# ── Logs ──────────────────────────────────────────────────────────────
*.log
npm-debug.log*
logs/`} />
                    <Callout type="warn" title="⚠️ Create .gitignore first">
                        Add your <code>.gitignore</code> as the very first file before running <code>git add .</code>.
                        Once <code>node_modules</code> or <code>.env</code> is committed, it's a pain to remove from history.
                    </Callout>
                </div>
            </section>

            {/* ── 02 CORE COMMANDS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>02</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Core Workflow</div>
                        <h2>The Core Git Workflow</h2>
                        <p className="chapter-intro">
                            The day-to-day git loop: make changes → stage them → commit → push. Understanding the three areas
                            (working directory, staging area, repository) is the foundation of everything.
                        </p>
                    </div>
                </div>

                <div className="topic">
                    <h3>The Three Areas</h3>
                    <div className="flow" style={{ flexWrap: 'wrap', gap: '8px' }}>
                        {['Working Directory\n(your files)', '→  git add  →', 'Staging Area\n(index)', '→  git commit  →', 'Local Repo\n(.git folder)', '→  git push  →', 'Remote\n(GitHub)'].map((s, i) => (
                            <div key={i} className="flow-step" style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>{s}</div>
                        ))}
                    </div>
                </div>

                <div className="topic">
                    <h3>Starting a Project</h3>
                    <CodeBlock lang="bash" code={`# ── Option A: Start from scratch ─────────────────────────────────────
mkdir my-mern-app
cd my-mern-app
git init                     # create .git folder — repo is born
touch .gitignore             # create FIRST, before adding anything

# ── Option B: Clone an existing repo ─────────────────────────────────
git clone https://github.com/username/repo-name.git
cd repo-name
npm install                  # always install dependencies after cloning

# ── Check the current state of your repo ─────────────────────────────
git status                   # what's changed? what's staged?
git log --oneline            # history of commits (compact view)
git log --oneline --graph    # visual branch diagram`} />
                </div>

                <div className="topic">
                    <h3>Stage, Commit, Push</h3>
                    <CodeBlock lang="bash" code={`# ── Stage changes ────────────────────────────────────────────────────
git add filename.js          # stage one file
git add src/                 # stage entire folder
git add .                    # stage ALL changes (careful — review first!)
git add -p                   # interactive: pick which changes to stage

# ── Unstage (before committing) ───────────────────────────────────────
git restore --staged file.js # unstage a file (keep the changes)
git restore file.js          # discard changes entirely (CANNOT undo!)

# ── Commit ────────────────────────────────────────────────────────────
git commit -m "feat: add user authentication with JWT"
git commit -m "fix: resolve CORS error on /api/auth/login"
git commit -m "docs: update README with deployment steps"

# Good commit message format (Conventional Commits):
# <type>: <description>
# Types: feat, fix, docs, style, refactor, test, chore

# ── Connect to GitHub and push ────────────────────────────────────────
git remote add origin https://github.com/username/my-mern-app.git
git branch -M main                       # ensure branch is called 'main'
git push -u origin main                  # -u sets upstream tracking
git push                                 # subsequent pushes (after -u is set)

# ── Pull latest changes from GitHub ──────────────────────────────────
git pull                                 # fetch + merge in one command
git fetch                                # fetch only (no merge)
git pull origin main                     # explicit branch`} />
                </div>

                <div className="topic">
                    <h3>Inspecting Changes</h3>
                    <CodeBlock lang="bash" code={`# ── See what changed ─────────────────────────────────────────────────
git diff                     # unstaged changes (working dir vs staging)
git diff --staged            # staged changes (staging vs last commit)
git diff main..feature       # diff between two branches

# ── See commit history ────────────────────────────────────────────────
git log --oneline -10        # last 10 commits
git log --author="Sanketh"   # commits by a specific person
git log --since="2 weeks ago"
git show abc1234             # show details of a specific commit

# ── Check who changed a line ──────────────────────────────────────────
git blame filename.js        # who wrote each line (and when)

# ── Undo things ───────────────────────────────────────────────────────
git revert abc1234           # create a new commit that undoes a commit (safe)
git reset --soft HEAD~1      # undo last commit, keep changes staged
git reset --mixed HEAD~1     # undo last commit, unstage changes (default)
git reset --hard HEAD~1      # undo last commit, DISCARD changes (dangerous!)`} />
                    <Callout type="warn" title="⚠️ Never force push to main">
                        <code>git reset --hard</code> and <code>git push --force</code> on shared branches destroy team members' history. Only use these on your own feature branches.
                    </Callout>
                </div>
            </section>

            {/* ── 03 BRANCHING ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>03</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Branching</div>
                        <h2>Branching & Merging</h2>
                        <p className="chapter-intro">
                            Branches let you work on features, bug fixes, and experiments without touching working code.
                            The <strong>feature branch workflow</strong> is how every professional team operates.
                        </p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Branch Commands</h3>
                    <CodeBlock lang="bash" code={`# ── Create and switch branches ───────────────────────────────────────
git branch                          # list all local branches
git branch -a                       # list local + remote branches

git branch feature/user-auth        # create branch
git checkout feature/user-auth      # switch to it
git checkout -b feature/user-auth   # create AND switch (shortcut)
git switch -c feature/user-auth     # modern syntax (git 2.23+)

# ── Merge a branch into main ──────────────────────────────────────────
git checkout main                   # switch to destination branch
git pull                            # make sure main is up to date
git merge feature/user-auth         # merge the feature branch in

# ── Delete branches ───────────────────────────────────────────────────
git branch -d feature/user-auth     # delete (only if already merged)
git branch -D feature/user-auth     # force delete (even if not merged)
git push origin --delete feature/user-auth  # delete from GitHub too`} />
                </div>

                <div className="topic">
                    <h3>Resolving Merge Conflicts</h3>
                    <CodeBlock lang="bash" code={`# Conflict happens when two branches change the same lines
# Git marks the conflict in the file like this:

<<<<<<< HEAD (your current branch)
const PORT = process.env.PORT || 5000;
=======
const PORT = process.env.PORT || 3000;
>>>>>>> feature/new-port

# ── How to resolve ────────────────────────────────────────────────────
# 1. Open the file in VS Code (shows visual conflict editor)
# 2. Choose "Accept Current", "Accept Incoming", or "Accept Both"
#    OR manually edit to the correct final version
# 3. Remove ALL conflict markers (<<<<<<<, =======, >>>>>>>)
# 4. Stage and commit the resolved file:
git add server.js
git commit -m "fix: resolve merge conflict in server.js"

# ── Abort a merge mid-way ─────────────────────────────────────────────
git merge --abort`} />
                </div>

                <div className="topic">
                    <h3>Feature Branch Workflow — Standard Team Process</h3>
                    <CodeBlock lang="bash" code={`# ── Complete feature branch workflow ─────────────────────────────────

# 1. Always start from an up-to-date main
git checkout main
git pull origin main

# 2. Create a descriptive branch name
git checkout -b feature/add-post-comments

# 3. Work on your feature — commit often
git add .
git commit -m "feat: add Comment model with user reference"
git add .
git commit -m "feat: add GET /api/posts/:id/comments route"
git add .
git commit -m "feat: add CommentList component to PostPage"

# 4. Push your branch to GitHub
git push -u origin feature/add-post-comments

# 5. Open a Pull Request on GitHub
#    → Go to repo → "Compare & pull request"
#    → Write a description of your changes
#    → Request a code review from a teammate

# 6. After review + approval → merge on GitHub
#    (usually via "Squash and merge" to keep main history clean)

# 7. Pull the updated main, delete old branch
git checkout main
git pull
git branch -d feature/add-post-comments`} />
                </div>

                <div className="topic">
                    <h3>Stashing — Save Work Without Committing</h3>
                    <CodeBlock lang="bash" code={`# You're mid-feature but need to switch branches urgently
# Changes aren't ready to commit — use stash

git stash                       # save current changes temporarily
git stash push -m "WIP: auth middleware"  # with a description

git checkout hotfix/critical-bug
# ... fix the bug, commit, push ...
git checkout feature/my-feature

git stash list                  # see all stashes
git stash pop                   # restore latest stash (removes from list)
git stash apply stash@{0}       # apply specific stash (keeps in list)
git stash drop stash@{0}        # delete a stash
git stash clear                 # delete ALL stashes`} />
                </div>
            </section>

            {/* ── 04 GITHUB ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>04</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>GitHub</div>
                        <h2>GitHub — Collaboration & Code Review</h2>
                    </div>
                </div>

                <div className="topic">
                    <h3>SSH Keys — Authenticate Without Passwords</h3>
                    <CodeBlock lang="bash" code={`# ── Generate an SSH key ───────────────────────────────────────────────
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter for defaults (saves to ~/.ssh/id_ed25519)

# ── Copy the PUBLIC key ───────────────────────────────────────────────
# macOS:
cat ~/.ssh/id_ed25519.pub | pbcopy

# Windows (Git Bash):
cat ~/.ssh/id_ed25519.pub | clip

# ── Add to GitHub ─────────────────────────────────────────────────────
# GitHub → Settings → SSH and GPG keys → New SSH key → paste

# ── Test the connection ───────────────────────────────────────────────
ssh -T git@github.com
# "Hi username! You've successfully authenticated..."

# ── Use SSH clone URL instead of HTTPS ───────────────────────────────
git clone git@github.com:username/repo.git`} />
                </div>

                <div className="topic">
                    <h3>Forking & Contributing to Open Source</h3>
                    <CodeBlock lang="bash" code={`# ── Fork a repo (on GitHub UI) then clone your fork ─────────────────
git clone git@github.com:YOUR-USERNAME/original-repo.git
cd original-repo

# Keep your fork in sync with the original ("upstream")
git remote add upstream git@github.com:ORIGINAL-OWNER/original-repo.git

git fetch upstream                      # get latest from original
git checkout main
git merge upstream/main                 # sync your main
git push origin main                    # push to your fork

# ── Make your contribution ────────────────────────────────────────────
git checkout -b fix/typo-in-readme
# ... make changes ...
git add .
git commit -m "fix: correct typo in README installation section"
git push origin fix/typo-in-readme
# Now open a Pull Request from YOUR fork to the ORIGINAL repo`} />
                </div>

                <div className="topic">
                    <h3>GitHub Actions — Automated CI/CD</h3>
                    <CodeBlock lang="yaml" code={`# .github/workflows/ci.yml
# Runs automatically on every push and pull request

name: CI Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies (backend)
        run: cd server && npm ci

      - name: Run backend tests
        run: cd server && npm test
        env:
          MONGO_URI: \${{ secrets.MONGO_URI_TEST }}
          JWT_SECRET: test-secret-for-ci-only

      - name: Install dependencies (frontend)
        run: cd client && npm ci

      - name: Build frontend
        run: cd client && npm run build

      - name: Run frontend tests
        run: cd client && npm test -- --watchAll=false`} />
                    <Callout type="tip" title="💡 GitHub Secrets">
                        Store sensitive values (MONGO_URI, JWT_SECRET) in GitHub repository Settings → Secrets → Actions. Reference them as <code>{`\${{ secrets.MY_SECRET }}`}</code> in your workflow. Never hardcode them in YAML files.
                    </Callout>
                </div>
            </section>

            {/* ── 05 CHEATSHEET ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>05</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Reference</div>
                        <h2>Git Command Cheatsheet</h2>
                    </div>
                </div>
                <div className="topic">
                    <Table
                        headers={['Command', 'What It Does']}
                        rows={[
                            ['git init', 'Create a new git repository'],
                            ['git clone <url>', 'Copy a remote repo to your machine'],
                            ['git status', 'Show what changed / what\'s staged'],
                            ['git add .', 'Stage all changes'],
                            ['git commit -m "msg"', 'Save staged changes as a snapshot'],
                            ['git push', 'Upload commits to remote'],
                            ['git pull', 'Download + merge remote changes'],
                            ['git log --oneline', 'View commit history (compact)'],
                            ['git diff', 'Show unstaged changes'],
                            ['git branch -b name', 'Create and switch to new branch'],
                            ['git checkout main', 'Switch to main branch'],
                            ['git merge branch', 'Merge branch into current branch'],
                            ['git stash', 'Temporarily shelve uncommitted work'],
                            ['git reset --soft HEAD~1', 'Undo last commit, keep changes'],
                            ['git revert <hash>', 'Safely undo a commit (adds new commit)'],
                            ['git remote -v', 'List remote connections'],
                        ]}
                    />
                </div>
            </section>

            {/* ── RESOURCES ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>06</div>
                    <div className="chapter-meta"><h2>Resources</h2></div>
                </div>
                <div className="resource-grid">
                    {RESOURCES.map((r, i) => <ResourceCard key={i} {...r} />)}
                </div>
            </section>

            <footer className="footer">
                <p>Git & GitHub · Chapter 11 · FullStack Compass</p>
            </footer>
        </>
    );
}
