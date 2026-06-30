import React from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';
import PracticeArena from '../components/PracticeArena.jsx';

const COLOR = 'var(--bootstrap-color)';

const RESOURCES = [
    { type: 'docs', title: 'Bootstrap 5 Docs', description: 'Official documentation — all components, utilities, grid, and customisation.', url: 'https://getbootstrap.com/docs/5.3/getting-started/introduction/' },
    { type: 'reference', title: 'Bootstrap Cheatsheet', description: 'All Bootstrap 5 utility classes on one page.', url: 'https://bootstrap-cheatsheet.themeselection.com/' },
    { type: 'tool', title: 'Free Bootstrap Templates', description: 'Hundreds of free HTML templates built with Bootstrap — download and modify.', url: 'https://startbootstrap.com/themes' },
    { type: 'tool', title: 'BootstrapMade Templates', description: 'Free Bootstrap themes for portfolio, business, ecommerce, and more.', url: 'https://bootstrapmade.com/' },
    { type: 'tool', title: 'Bootstrap Icons', description: '1,800+ SVG icons that work perfectly with Bootstrap.', url: 'https://icons.getbootstrap.com/' },
    { type: 'tutorial', title: 'React Bootstrap', description: 'Bootstrap 5 components rebuilt for React — no jQuery required.', url: 'https://react-bootstrap.netlify.app/' },
];

const GAMES = [
    { emoji: '🎨', name: 'Bootstrap Build Challenge', description: 'Clone real UI designs using only Bootstrap utility classes.', url: 'https://www.frontendmentor.io/' },
];

const COMPONENTS = [
    { name: 'Alert', desc: 'Dismissible messages for feedback', code: 'alert alert-success' },
    { name: 'Badge', desc: 'Small labels for counts or status', code: 'badge bg-primary' },
    { name: 'Button', desc: 'Multiple styles and sizes', code: 'btn btn-primary btn-lg' },
    { name: 'Card', desc: 'Flexible content container', code: 'card card-body' },
    { name: 'Carousel', desc: 'Image/content slideshow', code: 'carousel slide' },
    { name: 'Collapse', desc: 'Toggle visibility of content', code: 'collapse show' },
    { name: 'Dropdown', desc: 'Toggle contextual menus', code: 'dropdown dropdown-menu' },
    { name: 'Modal', desc: 'Dialog boxes and popovers', code: 'modal modal-dialog' },
    { name: 'Navbar', desc: 'Responsive navigation header', code: 'navbar navbar-expand-lg' },
    { name: 'Pagination', desc: 'Multi-page navigation', code: 'pagination page-item' },
    { name: 'Progress', desc: 'Progress bar indicators', code: 'progress progress-bar' },
    { name: 'Spinner', desc: 'Loading indicators', code: 'spinner-border' },
    { name: 'Toast', desc: 'Lightweight notification popups', code: 'toast toast-header' },
    { name: 'Tooltip', desc: 'Text hints on hover', code: 'data-bs-toggle="tooltip"' },
    { name: 'Table', desc: 'Styled data tables', code: 'table table-striped' },
    { name: 'Form controls', desc: 'Input groups and validation', code: 'form-control is-valid' },
];

export default function Bootstrap() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{ color: COLOR }}>Bootstrap 5</span> — Chapter 03</div>
                <h1><span className="accent" style={{ color: COLOR }}>Bootstrap</span><br /><em>Ship UI fast.</em></h1>
                <p className="hero-desc">Bootstrap is the world's most popular CSS framework. It gives you a responsive 12-column grid, 30+ pre-built components, and a huge set of utility classes — so you can build polished UIs without writing CSS from scratch.</p>
                <div className="hero-stack">
                    {['Grid System', 'Components', 'Utilities', 'Forms', 'Templates', 'React Bootstrap'].map(t => <span key={t} className="stack-chip">{t}</span>)}
                </div>
            </section>

            {/* ── INSTALLATION ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>01</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Getting Started</div>
                        <h2>Installation</h2>
                        <p className="chapter-intro">Bootstrap can be included via CDN (instant, no build step) or installed via npm for customisation.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>CDN — Quickest Way</h3>
                    <CodeBlock lang="html" code={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bootstrap 5</title>
  <!-- Bootstrap 5 CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" 
        rel="stylesheet">
</head>
<body>
  <!-- Your content -->

  <!-- Bootstrap Bundle JS (includes Popper.js) -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">
  </script>
</body>
</html>`} />
                </div>

                <div className="topic">
                    <h3>npm Install (Recommended for Projects)</h3>
                    <CodeBlock lang="bash" code={`npm install bootstrap
# Import in your main JS/CSS file:`} />
                    <CodeBlock lang="javascript" code={`// In main.js or App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Or import specific parts
import { Modal, Tooltip } from 'bootstrap';`} />
                </div>
            </section>

            {/* ── GRID ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>02</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Grid System</div>
                        <h2>The 12-Column Grid</h2>
                        <p className="chapter-intro">Bootstrap's grid uses flexbox and 12 columns. You control how many columns each element takes at each breakpoint.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Breakpoints</h3>
                    <div className="table-wrap">
                        <table>
                            <thead><tr><th>Prefix</th><th>Breakpoint</th><th>Width</th></tr></thead>
                            <tbody>
                            <tr><td>(none)</td><td>xs — Extra small</td><td>&lt; 576px</td></tr>
                            <tr><td>sm</td><td>Small</td><td>≥ 576px</td></tr>
                            <tr><td>md</td><td>Medium</td><td>≥ 768px</td></tr>
                            <tr><td>lg</td><td>Large</td><td>≥ 992px</td></tr>
                            <tr><td>xl</td><td>Extra large</td><td>≥ 1200px</td></tr>
                            <tr><td>xxl</td><td>Extra extra large</td><td>≥ 1400px</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="topic">
                    <h3>Grid Examples</h3>
                    <CodeBlock lang="html" code={`<!-- Full-width container -->
<div class="container">
  <div class="row">
    <!-- 12 columns wide on all screens -->
    <div class="col-12">Full width</div>
  </div>
  <div class="row">
    <!-- 4 cols on mobile, 6 on tablet, 3 on desktop -->
    <div class="col-4 col-md-6 col-lg-3">Card 1</div>
    <div class="col-4 col-md-6 col-lg-3">Card 2</div>
    <div class="col-4 col-md-6 col-lg-3">Card 3</div>
    <div class="col-4 col-md-6 col-lg-3">Card 4</div>
  </div>
  <div class="row g-4">  <!-- g-4 = gap between items -->
    <!-- auto layout columns -->
    <div class="col">Equal width</div>
    <div class="col">Equal width</div>
    <div class="col-6">Half width</div>
  </div>
</div>

<!-- Fluid container (full viewport width) -->
<div class="container-fluid">...</div>`} />
                </div>

                <div className="topic">
                    <h3>Utility Classes — The Real Power</h3>
                    <CodeBlock lang="html" code={`<!-- Display -->
<div class="d-none d-md-block">Hidden on mobile, visible on md+</div>
<div class="d-flex align-items-center justify-content-between gap-3">Flex row</div>

<!-- Spacing (0-5 scale) -->
<div class="mt-4 mb-2 px-3 py-2">margin-top:4, padding-x:3</div>

<!-- Text -->
<p class="text-center text-muted fw-bold fs-4 text-truncate">Text utilities</p>

<!-- Colors -->
<div class="bg-primary text-white p-3 rounded">Blue bg</div>
<div class="bg-success bg-opacity-25 text-success">Light green</div>

<!-- Borders & Rounded -->
<div class="border border-primary rounded-3 p-3">Bordered box</div>
<img class="rounded-circle" src="avatar.jpg" width="80" alt="Avatar">

<!-- Shadow -->
<div class="shadow-sm">Small shadow</div>
<div class="shadow-lg">Large shadow</div>

<!-- Position -->
<div class="position-relative">
  <span class="position-absolute top-0 end-0 badge bg-danger">3</span>
</div>

<!-- Width / Height -->
<div class="w-100 h-50">Full width, half height</div>`} />
                </div>
            </section>

            {/* ── COMPONENTS ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>03</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Components</div>
                        <h2>All Bootstrap Components</h2>
                    </div>
                </div>

                <div className="concept-grid">
                    {COMPONENTS.map((c, i) => (
                        <div key={i} className="concept-card">
                            <h5>{c.name}</h5>
                            <p>{c.desc}</p>
                            <code style={{ fontSize: '10.5px' }}>{c.code}</code>
                        </div>
                    ))}
                </div>

                <div className="topic" style={{ marginTop: '32px' }}>
                    <h3>Navbar Example</h3>
                    <CodeBlock lang="html" code={`<nav class="navbar navbar-expand-lg bg-dark navbar-dark">
  <div class="container">
    <a class="navbar-brand fw-bold" href="#">MyApp</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navMenu">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navMenu">
      <ul class="navbar-nav ms-auto gap-2">
        <li class="nav-item"><a class="nav-link active" href="/">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="/about">About</a></li>
        <li class="nav-item">
          <a class="btn btn-success btn-sm" href="/signup">Get Started</a>
        </li>
      </ul>
    </div>
  </div>
</nav>`} />
                </div>
            </section>

            {/* ── REACT BOOTSTRAP ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>04</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>React Integration</div>
                        <h2>Bootstrap with React</h2>
                        <p className="chapter-intro">React Bootstrap replaces Bootstrap JS with React components — no jQuery, no imperative DOM manipulation.</p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Setup & Usage</h3>
                    <CodeBlock lang="bash" code={`npm install react-bootstrap bootstrap`} />
                    <CodeBlock lang="jsx" code={`// main.jsx — import the CSS globally
import 'bootstrap/dist/css/bootstrap.min.css';

// In any component — import what you need
import { Button, Modal, Form, Navbar, Nav, Container } from 'react-bootstrap';

function LoginModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Sign In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}`} />
                </div>
            </section>

            {/* ── TEMPLATES ── */}
            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>05</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Free Templates</div>
                        <h2>Bootstrap Templates to Explore</h2>
                    </div>
                </div>
                <div className="concept-grid">
                    {[
                        { name: 'SB Admin 2', use: 'Full admin dashboard — sidebar, charts, tables', url: 'https://startbootstrap.com/theme/sb-admin-2' },
                        { name: 'Resume', use: 'One-page portfolio/resume template', url: 'https://startbootstrap.com/theme/resume' },
                        { name: 'Agency', use: 'Marketing agency landing page', url: 'https://startbootstrap.com/theme/agency' },
                        { name: 'Shop Homepage', use: 'E-commerce product listing page', url: 'https://startbootstrap.com/template/shop-homepage' },
                        { name: 'Grayscale', use: 'Clean minimal landing page', url: 'https://startbootstrap.com/theme/grayscale' },
                        { name: 'Creative', use: 'One-page creative portfolio', url: 'https://startbootstrap.com/theme/creative' },
                    ].map((t, i) => (
                        <a key={i} href={t.url} target="_blank" rel="noopener noreferrer" className="concept-card" style={{ textDecoration: 'none' }}>
                            <h5>{t.name}</h5>
                            <p>{t.use}</p>
                        </a>
                    ))}
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div>
                        <h2 style={{ fontFamily: "'Fraunces', serif" }}>Resources</h2>
                    </div>
                </div>
                <div className="resource-grid">
                    {RESOURCES.map((r, i) => <ResourceCard key={i} {...r} />)}
                </div>
                <PracticeArena games={GAMES} />
            </section>

            <footer className="footer">
                <p>Bootstrap · Chapter 03 · FullStack Compass</p>
            </footer>
        </>
    );
}