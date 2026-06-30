import React from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';
import PracticeArena from '../components/PracticeArena.jsx';

const COLOR = 'var(--html-color)';

const RESOURCES = [
    { type: 'docs',      title: 'MDN Web Docs — HTML',               description: 'The definitive HTML reference. Every element, attribute, and global API — always kept up to date by Mozilla.',   url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    { type: 'reference', title: 'htmlreference.io',                  description: 'A free, visual guide to every HTML5 element with illustrated examples and browser support notes.',              url: 'https://htmlreference.io/' },
    { type: 'tutorial',  title: 'HTML.com — Beginner Guide',         description: 'Beginner-friendly HTML tutorials with visual step-by-step examples and interactive editors.',                   url: 'https://html.com/' },
    { type: 'reference', title: 'W3Schools HTML Reference',          description: 'Quick reference for every HTML tag with live "Try it Yourself" examples you can edit in the browser.',          url: 'https://www.w3schools.com/tags/' },
    { type: 'course',    title: 'freeCodeCamp — Responsive Web',     description: 'Free, project-based certification covering HTML and CSS from zero. Build real projects to earn the cert.',      url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/' },
    { type: 'course',    title: 'The Odin Project — HTML Foundations', description: 'Open-source full-stack curriculum. The HTML module covers structure, semantics, and working with text.',    url: 'https://www.theodinproject.com/paths/foundations/courses/foundations#html-foundations' },
    { type: 'tool',      title: 'W3C HTML Validator',                description: 'The official validator — paste your HTML or enter a URL to check for markup errors and warnings.',             url: 'https://validator.w3.org/' },
    { type: 'tool',      title: 'Can I Use',                         description: 'Browser support tables for every HTML5 element and attribute so you know what is safe to use in production.',  url: 'https://caniuse.com/' },
    { type: 'reference', title: 'HTML Cheat Sheet',                  description: 'One-page printable HTML5 cheat sheet covering all elements, attributes, character entities, and events.',      url: 'https://htmlcheatsheet.com/' },
    { type: 'tool',      title: 'CodePen',                           description: 'Online HTML/CSS/JS playground — great for experimenting with HTML snippets without setting up a project.',     url: 'https://codepen.io/' },
];

const GAMES = [
    { emoji: '🏗️', name: 'Frontend Mentor',      description: 'Real-world HTML + CSS challenges built from professional Figma designs. The best way to build a portfolio.',  url: 'https://www.frontendmentor.io/challenges' },
    { emoji: '🏆', name: 'HTML Quiz — W3Schools', description: 'Test your HTML fundamentals with an interactive scored quiz. Covers tags, attributes, and document structure.',   url: 'https://www.w3schools.com/quiztest/quiztest.asp?qtest=HTML' },
    { emoji: '🔰', name: 'W3C HTML Validator',    description: 'Paste your HTML markup and get instant feedback on errors — great for learning what valid HTML looks like.',     url: 'https://validator.w3.org/' },
    { emoji: '🎯', name: 'MarkSheet.io',          description: 'Free online HTML and CSS tutorial with short focused chapters and quizzes at the end of each topic.',            url: 'https://marksheet.io/' },
    { emoji: '🐸', name: 'Erase All Kittens',     description: 'Save kittens by writing correct HTML code in a game environment. Great for absolute beginners and younger learners.', url: 'https://eraseallkittens.com/' },
];

/* ─────────────── CODE SNIPPETS ─────────────── */

const SNIPPET_WHAT_IS_HTML = `<!-- HTML = HyperText Markup Language -->
<!-- It describes the STRUCTURE of a web page using "tags" -->

<!-- A tag wraps content and gives it meaning -->
<p>This is a paragraph.</p>

<!-- Opening tag   Content   Closing tag -->
<!--    ↑              ↑          ↑      -->
<!--  <p>    This is a paragraph.  </p>  -->

<!-- Some tags are self-closing — they have no content -->
<img src="photo.jpg" alt="A photo" />
<br />
<input type="text" />

<!-- Tags can have ATTRIBUTES that provide extra information -->
<a href="https://example.com" target="_blank">Click me</a>
<!--  ↑ attribute name  ↑ attribute value                  -->`;

const SNIPPET_BOILERPLATE = `<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Everything in <head> is NOT visible on the page -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="150–160 character page description for SEO" />
    <title>My Page Title — shown in browser tab</title>

    <!-- External CSS -->
    <link rel="stylesheet" href="style.css" />

    <!-- Favicon -->
    <link rel="icon" href="/favicon.ico" />
  </head>

  <body>
    <!-- Everything in <body> IS visible on the page -->

    <header>
      <nav>...</nav>
    </header>

    <main>
      <h1>Page Heading</h1>
      <p>Content goes here.</p>
    </main>

    <footer>...</footer>

    <!-- Scripts go at the BOTTOM so HTML loads first -->
    <script src="app.js"></script>
  </body>
</html>`;

const SNIPPET_DOCTYPE = `<!-- DOCTYPE declaration — MUST be the very first line -->
<!-- Tells the browser: "use modern HTML5 standards" -->
<!DOCTYPE html>

<!-- Without DOCTYPE, the browser enters "quirks mode" -->
<!-- — which renders pages like it's 1999. Always include it. -->

<!-- The html element wraps EVERYTHING -->
<!-- lang="en" is important for screen readers and SEO -->
<html lang="en">

  <head>...</head>   <!-- invisible metadata -->
  <body>...</body>   <!-- visible page content -->

</html>`;

const SNIPPET_HEADINGS = `<!-- Six levels of headings — h1 is the most important -->
<h1>Page Title — ONE per page for SEO</h1>
<h2>Section Heading</h2>
<h3>Sub-section Heading</h3>
<h4>Sub-sub-section Heading</h4>
<h5>Rarely needed</h5>
<h6>Rarely needed</h6>

<!-- ✅ Correct: hierarchy makes sense -->
<h1>Blog Post Title</h1>
  <h2>Introduction</h2>
  <h2>Main Point</h2>
    <h3>Supporting Detail</h3>
  <h2>Conclusion</h2>

<!-- ❌ Wrong: skipping levels breaks accessibility -->
<h1>Title</h1>
<h4>Sub-section</h4>   <!-- skipped h2 and h3! -->`;

const SNIPPET_TEXT_ELEMENTS = `<!-- Paragraph -->
<p>This is a paragraph. It creates a block of text.</p>

<!-- Line break (use sparingly — prefer CSS margin) -->
<p>Line one.<br />Line two on a new line.</p>

<!-- Horizontal rule -->
<hr />   <!-- Creates a visual divider line -->

<!-- Inline semantic elements -->
<p>
  This is <strong>bold/important</strong> text.
  This is <em>italic/emphasized</em> text.
  This is <mark>highlighted</mark> text.
  This is <del>deleted/strikethrough</del> text.
  This is <ins>inserted/underlined</ins> text.
  This is <small>smaller</small> text.
  This is <sub>subscript</sub> — H<sub>2</sub>O
  This is <sup>superscript</sup> — x<sup>2</sup>
  This is <code>inline code</code> — use for filenames, commands.
  This is <kbd>Ctrl + C</kbd> — keyboard input.
  This is <abbr title="HyperText Markup Language">HTML</abbr>.
</p>

<!-- Block quotation (for long quotes from external sources) -->
<blockquote cite="https://source.com">
  <p>"The web is for everyone."</p>
  <footer>— Tim Berners-Lee</footer>
</blockquote>

<!-- Preformatted text — preserves whitespace and newlines -->
<pre>
  Name:  Alice
  Role:  Developer
  Score: 100
</pre>`;

const SNIPPET_LINKS = `<!-- Basic link -->
<a href="https://example.com">Visit Example</a>

<!-- Open in new tab (always add rel for security) -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Open in new tab
</a>

<!-- Internal page links (same site) -->
<a href="/about">About Page</a>
<a href="/blog/my-post">A Blog Post</a>

<!-- Jump to an element on the SAME page (anchor link) -->
<a href="#contact">Jump to Contact Section</a>
<section id="contact">...</section>   <!-- target element needs matching id -->

<!-- Email link -->
<a href="mailto:hello@example.com">Send Email</a>
<a href="mailto:hello@example.com?subject=Hello&body=Hi there">
  Email with pre-filled subject
</a>

<!-- Phone link (important for mobile users) -->
<a href="tel:+911234567890">Call Us</a>

<!-- Download link -->
<a href="/resume.pdf" download="Sanketh-Resume.pdf">Download Resume</a>

<!-- Link states you can style with CSS -->
a:link    { }   /* unvisited */
a:visited { }   /* already clicked */
a:hover   { }   /* mouse over */
a:active  { }   /* being clicked */
a:focus   { }   /* keyboard focus — never remove this! */`;

const SNIPPET_IMAGES = `<!-- Basic image -->
<img src="photo.jpg" alt="A dog playing in the park" />
<!-- alt text is REQUIRED — describes image for screen readers and when image fails to load -->

<!-- Decorative image (screen readers skip it) -->
<img src="divider.png" alt="" role="presentation" />

<!-- Specifying dimensions (prevents layout shift) -->
<img src="banner.jpg" alt="Summer sale banner" width="800" height="400" />

<!-- Lazy loading (don't load off-screen images) -->
<img src="photo.jpg" alt="..." loading="lazy" />

<!-- Responsive image with srcset -->
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 900px) 800px, 1200px"
  alt="Responsive photo"
/>

<!-- Art direction with <picture> (different image per screen size) -->
<picture>
  <source media="(max-width: 600px)" srcset="mobile.jpg" />
  <source media="(max-width: 1024px)" srcset="tablet.jpg" />
  <img src="desktop.jpg" alt="Hero image" />
</picture>

<!-- Figure with caption -->
<figure>
  <img src="diagram.png" alt="MERN stack architecture diagram" />
  <figcaption>Fig 1. How the MERN stack components connect.</figcaption>
</figure>`;

const SNIPPET_VIDEO_AUDIO = `<!-- HTML5 Video -->
<video width="640" height="360" controls poster="thumbnail.jpg">
  <source src="video.mp4" type="video/mp4" />
  <source src="video.webm" type="video/webm" />
  <!-- Fallback text if browser can't play video -->
  Your browser does not support the video element.
</video>

<!-- Video attributes -->
<video
  src="video.mp4"
  controls      <!-- show play/pause/volume controls -->
  autoplay      <!-- play on load (usually blocked without muted) -->
  muted         <!-- needed for autoplay to work -->
  loop          <!-- repeat when finished -->
  playsinline   <!-- important for iOS — don't go fullscreen -->
  poster="thumbnail.jpg"  <!-- show this image before play -->
  preload="metadata"      <!-- only load metadata, not the full file -->
></video>

<!-- HTML5 Audio -->
<audio controls>
  <source src="audio.mp3" type="audio/mpeg" />
  <source src="audio.ogg" type="audio/ogg" />
  Your browser does not support the audio element.
</audio>

<!-- Embedding YouTube (use iframe) -->
<iframe
  width="560" height="315"
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
  allowfullscreen
></iframe>`;

const SNIPPET_LISTS = `<!-- Unordered list (bullets) -->
<ul>
  <li>MongoDB</li>
  <li>Express</li>
  <li>React</li>
  <li>Node.js</li>
</ul>

<!-- Ordered list (numbered) -->
<ol>
  <li>Install Node.js</li>
  <li>Create a new React app</li>
  <li>Set up MongoDB Atlas</li>
  <li>Build your API</li>
</ol>

<!-- Ordered list attributes -->
<ol type="A" start="3">   <!-- A, B, C... starting at C -->
  <li>Third item</li>
  <li>Fourth item</li>
</ol>
<!-- type can be: 1 (default), a, A, i (roman), I -->

<!-- Nested lists -->
<ul>
  <li>Frontend
    <ul>
      <li>React</li>
      <li>CSS</li>
    </ul>
  </li>
  <li>Backend
    <ul>
      <li>Node.js</li>
      <li>Express</li>
    </ul>
  </li>
</ul>

<!-- Description list (term + definition pairs) -->
<dl>
  <dt>API</dt>
  <dd>Application Programming Interface — a way for programs to communicate.</dd>

  <dt>REST</dt>
  <dd>Representational State Transfer — an architectural style for APIs.</dd>

  <dt>JSON</dt>
  <dd>JavaScript Object Notation — a data format for APIs.</dd>
</dl>`;

const SNIPPET_TABLES = `<!-- Full table structure -->
<table>
  <caption>Monthly Revenue Report</caption>   <!-- optional title above table -->

  <thead>   <!-- Header row(s) -->
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Revenue</th>
      <th scope="col">Orders</th>
      <th scope="col">Growth</th>
    </tr>
  </thead>

  <tbody>   <!-- Data rows -->
    <tr>
      <td>January</td>
      <td>$12,400</td>
      <td>248</td>
      <td>+12%</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$15,200</td>
      <td>304</td>
      <td>+22%</td>
    </tr>
  </tbody>

  <tfoot>   <!-- Footer row (totals, summaries) -->
    <tr>
      <td>Total</td>
      <td>$27,600</td>
      <td>552</td>
      <td>—</td>
    </tr>
  </tfoot>
</table>

<!-- Spanning cells -->
<table>
  <tr>
    <th colspan="2">Full Name</th>   <!-- spans 2 columns -->
    <th>Age</th>
  </tr>
  <tr>
    <td>Alice</td>
    <td>Johnson</td>
    <td rowspan="2">25</td>           <!-- spans 2 rows -->
  </tr>
</table>`;

const SNIPPET_FORMS = `<form action="/submit" method="POST" novalidate>

  <!-- Grouping related fields with fieldset + legend -->
  <fieldset>
    <legend>Personal Information</legend>

    <!-- Text input — always pair with a label! -->
    <label for="name">Full Name *</label>
    <input
      type="text"
      id="name"
      name="name"
      placeholder="e.g. Alice Johnson"
      required
      minlength="2"
      maxlength="60"
      autocomplete="name"
    />

    <!-- Email -->
    <label for="email">Email *</label>
    <input type="email" id="email" name="email" required autocomplete="email" />

    <!-- Password with meter -->
    <label for="pwd">Password *</label>
    <input type="password" id="pwd" name="password" minlength="8" required />

    <!-- Number with constraints -->
    <label for="age">Age</label>
    <input type="number" id="age" name="age" min="18" max="120" step="1" />

    <!-- Date picker -->
    <label for="dob">Date of Birth</label>
    <input type="date" id="dob" name="dob" />

    <!-- Phone -->
    <label for="phone">Phone</label>
    <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" autocomplete="tel" />

    <!-- URL -->
    <label for="website">Website</label>
    <input type="url" id="website" name="website" placeholder="https://example.com" />

    <!-- Color picker -->
    <label for="theme">Favourite Color</label>
    <input type="color" id="theme" name="theme" value="#00e59b" />

    <!-- Range slider -->
    <label for="rating">Rating: <span id="ratingVal">5</span></label>
    <input type="range" id="rating" name="rating" min="1" max="10" step="1" value="5"
      oninput="document.getElementById('ratingVal').textContent = this.value" />

    <!-- File upload -->
    <label for="avatar">Profile Photo</label>
    <input type="file" id="avatar" name="avatar" accept="image/*" />

    <!-- Multi-file -->
    <input type="file" name="gallery" accept="image/*" multiple />
  </fieldset>

  <fieldset>
    <legend>Preferences</legend>

    <!-- Textarea -->
    <label for="bio">Bio</label>
    <textarea id="bio" name="bio" rows="5" maxlength="500"
      placeholder="Tell us about yourself..."></textarea>

    <!-- Select dropdown -->
    <label for="country">Country</label>
    <select id="country" name="country" required>
      <option value="">-- Select country --</option>
      <optgroup label="Asia">
        <option value="IN" selected>India</option>
        <option value="JP">Japan</option>
      </optgroup>
      <optgroup label="Americas">
        <option value="US">United States</option>
        <option value="CA">Canada</option>
      </optgroup>
    </select>

    <!-- Datalist (autocomplete suggestions) -->
    <label for="tech">Favourite Technology</label>
    <input list="techs" id="tech" name="tech" />
    <datalist id="techs">
      <option value="React" />
      <option value="Node.js" />
      <option value="MongoDB" />
      <option value="TypeScript" />
    </datalist>

    <!-- Radio buttons (only one can be selected) -->
    <p>Experience Level</p>
    <input type="radio" id="beg" name="level" value="beginner" checked />
    <label for="beg">Beginner</label>
    <input type="radio" id="int" name="level" value="intermediate" />
    <label for="int">Intermediate</label>
    <input type="radio" id="adv" name="level" value="advanced" />
    <label for="adv">Advanced</label>

    <!-- Checkboxes (multiple can be selected) -->
    <p>Topics of Interest</p>
    <input type="checkbox" id="chk-react" name="topics" value="react" />
    <label for="chk-react">React</label>
    <input type="checkbox" id="chk-node" name="topics" value="node" />
    <label for="chk-node">Node.js</label>

    <!-- Terms agreement -->
    <input type="checkbox" id="terms" name="terms" required />
    <label for="terms">I agree to the <a href="/terms">Terms of Service</a> *</label>
  </fieldset>

  <!-- Hidden field (sends data user doesn't see) -->
  <input type="hidden" name="csrf_token" value="abc123xyz" />

  <!-- Buttons -->
  <button type="submit">Create Account</button>
  <button type="reset">Clear All</button>
  <button type="button" onclick="saveDraft()">Save Draft</button>

</form>`;

const SNIPPET_INPUT_VALIDATION = `<!-- HTML5 Built-in Validation Attributes -->

<!-- required — field cannot be empty -->
<input type="text" name="name" required />

<!-- minlength / maxlength — character count limits -->
<input type="text" name="username" minlength="3" maxlength="20" />

<!-- min / max — for numbers and dates -->
<input type="number" name="age" min="18" max="100" />
<input type="date" name="checkin" min="2025-01-01" max="2025-12-31" />

<!-- step — valid increments for number/range inputs -->
<input type="number" name="price" step="0.01" />  <!-- allows decimals -->
<input type="number" name="qty" step="5" />        <!-- 0, 5, 10, 15... -->

<!-- pattern — regular expression the value must match -->
<input type="tel" name="phone" pattern="[0-9]{10}" title="10 digits only" />
<input type="text" name="postcode" pattern="[A-Z]{2}[0-9]{4}" />

<!-- Disable autocomplete for sensitive fields -->
<input type="text" name="card" autocomplete="off" />

<!-- novalidate on <form> — disables browser validation (handle it yourself) -->
<form novalidate>...</form>

<!-- Styling validation states with CSS -->
input:valid   { border-color: green; }
input:invalid { border-color: red; }
input:required { border-left: 3px solid orange; }`;

const SNIPPET_SEMANTIC_LAYOUT = `<body>

  <!-- Site-wide header — appears on every page -->
  <header>
    <a href="/" class="logo">FullStack Compass</a>
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/courses">Courses</a></li>
        <li><a href="/about" aria-current="page">About</a></li>
      </ul>
    </nav>
  </header>

  <!-- Skip link for keyboard / screen reader users -->
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <!-- Main content — ONE <main> per page -->
  <main id="main-content">

    <!-- Standalone piece of content (could be read on its own) -->
    <article>
      <header>
        <h1>How to Build a REST API</h1>
        <address>
          <a href="https://sanketh.live" rel="author">Sanketh</a>
        </address>
        <time datetime="2025-06-01">June 1, 2025</time>
      </header>

      <section>
        <h2>Setting Up Express</h2>
        <p>...</p>
      </section>

      <section>
        <h2>Connecting MongoDB</h2>
        <p>...</p>
      </section>

      <footer>
        <p>Tags: <a href="/tag/node">Node.js</a>, <a href="/tag/express">Express</a></p>
      </footer>
    </article>

  </main>

  <!-- Sidebar / related content -->
  <aside aria-label="Related articles">
    <h2>Also in this series</h2>
    <ul>
      <li><a href="/post/react-hooks">React Hooks Deep Dive</a></li>
    </ul>
  </aside>

  <!-- Site-wide footer -->
  <footer>
    <p>&copy; 2025 FullStack Compass. Built by <a href="https://sanketh.live">Sanketh</a>.</p>
    <nav aria-label="Footer navigation">
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms</a>
    </nav>
  </footer>

</body>`;

const SNIPPET_SEMANTIC_TEXT = `<p>
  Use <strong>strong</strong> for content that is critically important.
  Use <em>em</em> for stress emphasis (changes meaning of the sentence).
  Use <b>b</b> for bold without extra importance (keywords, product names).
  Use <i>i</i> for italic without emphasis (foreign words, technical terms).
</p>

<!-- Time — always add machine-readable datetime attribute -->
<p>Published <time datetime="2025-06-01T09:00:00Z">June 1, 2025</time></p>
<p>Event starts in <time datetime="PT2H">2 hours</time></p>

<!-- Address — for contact info of the nearest article/body ancestor -->
<address>
  Written by <a href="https://sanketh.live">Sanketh</a>.<br />
  Chennai, Tamil Nadu, India.
</address>

<!-- Figure — any self-contained media with a caption -->
<figure>
  <img src="chart.png" alt="Bar chart showing monthly signups" />
  <figcaption>Monthly signups grew 40% in Q3 2025.</figcaption>
</figure>

<!-- Details / Summary — native accordion (no JS needed!) -->
<details>
  <summary>What is the MERN stack?</summary>
  <p>MERN stands for MongoDB, Express.js, React, and Node.js — a popular JavaScript stack for building full-stack web applications.</p>
</details>

<!-- Dialog — native modal (no JS library needed!) -->
<dialog id="myDialog">
  <h2>Confirm Delete</h2>
  <p>Are you sure? This cannot be undone.</p>
  <button onclick="document.getElementById('myDialog').close()">Cancel</button>
  <button>Delete</button>
</dialog>
<button onclick="document.getElementById('myDialog').showModal()">Delete Item</button>`;

const SNIPPET_DATA_ATTRIBUTES = `<!-- data-* attributes let you embed custom data on any element -->
<!-- No extra HTTP requests, no hidden inputs — data lives in the DOM -->

<button
  data-user-id="42"
  data-role="admin"
  data-action="delete"
  class="btn btn-danger"
>
  Delete User
</button>

<!-- Access with JavaScript -->
<script>
const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
  const userId = btn.dataset.userId;   // "42"
  const role   = btn.dataset.role;     // "admin"
  const action = btn.dataset.action;   // "delete"
  console.log(\`\${action} user \${userId} (role: \${role})\`);
});
</script>

<!-- Common uses for data attributes -->
<div data-theme="dark">...</div>
<li data-product-id="SKU-001" data-price="29.99">...</li>
<img data-src="lazy.jpg" class="lazyload" />   <!-- lazy load pattern -->
<div data-component="accordion" data-open="false">...</div>`;

const SNIPPET_IFRAMES = `<!-- Embed another page inside yours -->
<iframe
  src="https://www.google.com/maps/embed?pb=..."
  width="600"
  height="450"
  style="border: 0;"
  allowfullscreen
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  title="Google Map showing our office location"
></iframe>

<!-- YouTube embed -->
<iframe
  width="560" height="315"
  src="https://www.youtube.com/embed/VIDEO_ID?rel=0"
  title="React Tutorial for Beginners"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>

<!-- CodePen embed -->
<iframe
  height="400" style="width: 100%;"
  src="https://codepen.io/username/embed/HASH?theme-id=dark"
  title="My CodePen Demo"
  loading="lazy"
  allowtransparency allowfullscreen
></iframe>

<!-- Security: sandbox attribute restricts what an iframe can do -->
<iframe src="untrusted.html" sandbox="allow-scripts allow-same-origin"></iframe>`;

const SNIPPET_ENTITIES = `<!-- HTML Entities — for characters that have special meaning in HTML -->

<!-- These MUST be escaped (they are HTML syntax): -->
&lt;   → <    (less-than)
&gt;   → >    (greater-than)
&amp;  → &    (ampersand)
&quot; → "    (double quote)
&apos; → '    (apostrophe)

<!-- Whitespace and layout characters: -->
&nbsp;   → non-breaking space (prevents line break between words)
&ensp;   → en space (medium)
&emsp;   → em space (wide)
&shy;    → soft hyphen (only shows if word wraps)

<!-- Common symbols: -->
&copy;   → ©    (copyright)
&reg;    → ®    (registered trademark)
&trade;  → ™    (trademark)
&euro;   → €    (euro)
&pound;  → £    (pound)
&dollar; → $    (dollar — but $ works fine directly)
&deg;    → °    (degree sign: 30°C)
&times;  → ×    (multiplication sign)
&divide; → ÷    (division sign)
&mdash;  → —    (em dash — used in sentences)
&ndash;  → –    (en dash: page ranges 10–20)
&hellip; → …    (ellipsis)
&rarr;   → →    (right arrow)
&larr;   → ←    (left arrow)
&hearts; → ♥    (heart)
&star;   → ★    (star)

<!-- Example usage in HTML -->
<p>Use &lt;strong&gt; for important text &amp; &lt;em&gt; for emphasis.</p>
<p>Price: &euro;29.99 &mdash; limited time offer!</p>
<p>Temperature: 37&deg;C</p>`;

const SNIPPET_ACCESSIBILITY = `<!-- ── 1. SEMANTIC HTML FIRST ── -->
<!-- Prefer native semantic elements over ARIA roles -->
<button>Submit</button>           <!-- ✅ native, keyboard-accessible -->
<div role="button" tabindex="0">Submit</div>  <!-- ❌ needs extra ARIA work -->

<!-- ── 2. LABEL EVERY INTERACTIVE ELEMENT ── -->
<!-- Method A: label[for] + input[id] (most common) -->
<label for="search">Search</label>
<input type="search" id="search" />

<!-- Method B: wrap input inside label -->
<label>
  Username
  <input type="text" name="username" />
</label>

<!-- Method C: aria-label (for icon buttons, no visible text) -->
<button aria-label="Close dialog">✕</button>
<button aria-label="Search">🔍</button>

<!-- ── 3. ARIA LIVE REGIONS ── -->
<!-- Screen readers announce changes to these regions automatically -->
<div role="alert" aria-live="assertive">
  Error: Invalid email address
</div>
<div role="status" aria-live="polite">
  Form saved successfully
</div>

<!-- ── 4. KEYBOARD NAVIGATION ── -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- tabindex: 0 = natural order, -1 = JS-only, >0 = avoid -->
<div tabindex="0" role="listbox">Custom accessible widget</div>

<!-- ── 5. FOCUS MANAGEMENT ── -->
<!-- NEVER do this — it removes keyboard visibility -->
:focus { outline: none; }

<!-- Instead, style it beautifully -->
:focus-visible {
  outline: 2px solid var(--green);
  outline-offset: 3px;
  border-radius: 4px;
}

<!-- ── 6. IMAGES ── -->
<!-- Meaningful image: describe what it shows -->
<img src="chart.png" alt="Bar chart: signups grew 40% in Q3" />
<!-- Decorative image: empty alt so screen reader skips it -->
<img src="flourish.png" alt="" role="presentation" />

<!-- ── 7. ARIA EXPANDED / CONTROLS ── -->
<button aria-expanded="false" aria-controls="menu">Navigation Menu</button>
<ul id="menu" hidden>...</ul>

<!-- ── 8. LANGUAGE ── -->
<!-- Set lang on <html> for the whole page -->
<html lang="en">
<!-- Override for a foreign-language phrase -->
<p>The French say <span lang="fr">bonjour</span>.</p>`;

const SNIPPET_META_SEO = `<head>
  <!-- ── ESSENTIALS (always include) ── -->
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FullStack Compass — Learn MERN from Scratch</title>

  <!-- ── SEO META TAGS ── -->
  <meta name="description" content="A complete MERN stack learning platform covering HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB with examples, resources, and projects." />
  <!-- Keep description 150–160 characters. This shows in Google search results. -->

  <meta name="author" content="Sanketh" />
  <meta name="robots" content="index, follow" />
  <!-- noindex = don't add to search; nofollow = don't follow links on this page -->
  <meta name="robots" content="noindex, nofollow" />  <!-- for private/staging pages -->

  <!-- Canonical URL — tells Google which URL is the "real" one (avoids duplicate content) -->
  <link rel="canonical" href="https://fullstackcompass.dev/html" />

  <!-- ── OPEN GRAPH (Facebook, LinkedIn, Discord, WhatsApp previews) ── -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://fullstackcompass.dev/html" />
  <meta property="og:title" content="HTML — FullStack Compass" />
  <meta property="og:description" content="Learn HTML from scratch — structure, semantic elements, forms, accessibility, and SEO." />
  <meta property="og:image" content="https://fullstackcompass.dev/og/html.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="FullStack Compass" />
  <meta property="og:locale" content="en_US" />

  <!-- ── TWITTER CARD ── -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@yourhandle" />
  <meta name="twitter:title" content="HTML — FullStack Compass" />
  <meta name="twitter:description" content="Learn HTML from scratch." />
  <meta name="twitter:image" content="https://fullstackcompass.dev/og/html.jpg" />

  <!-- ── FAVICON SET ── -->
  <link rel="icon" href="/favicon.ico" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />   <!-- PWA support -->

  <!-- ── PRELOADING (performance) ── -->
  <link rel="preload" as="font" href="/fonts/inter.woff2" type="font/woff2" crossorigin />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="dns-prefetch" href="//api.example.com" />

  <!-- ── STRUCTURED DATA (JSON-LD) ── -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "HTML Guide — FullStack Compass",
    "description": "Complete HTML reference from basics to advanced",
    "author": {
      "@type": "Person",
      "name": "Sanketh",
      "url": "https://sanketh.live"
    }
  }
  </script>
</head>`;

const SNIPPET_BEST_PRACTICES = `<!-- ── DOCUMENT OUTLINE ── -->
<!-- Every page should have a clear heading hierarchy: -->
<!-- h1 (one only) > h2 > h3 > h4 — never skip levels -->

<!-- ── ALWAYS INCLUDE ── -->
<!DOCTYPE html>                    <!-- prevent quirks mode -->
<html lang="en">                   <!-- language for screen readers -->
<meta charset="UTF-8">             <!-- correct character encoding -->
<meta name="viewport" ...>         <!-- responsive on mobile -->
<title>Descriptive Page Title</title>

<!-- ── FORMS ── -->
<!-- Every input MUST have a label -->
<!-- Every label MUST match input via for/id -->
<!-- Group related inputs with fieldset + legend -->
<!-- Add autocomplete attributes for better UX -->

<!-- ── IMAGES ── -->
<!-- Every img MUST have alt="" (even if empty for decorative) -->
<!-- Specify width + height to prevent layout shift (CLS) -->
<!-- Use loading="lazy" for below-the-fold images -->
<!-- Use <picture> for art direction; srcset for resolution switching -->

<!-- ── LINKS ── -->
<!-- Link text should be descriptive — NOT "click here" or "read more" -->
<a href="/blog/html-basics">Read: HTML Basics Guide</a>   <!-- ✅ -->
<a href="/blog/html-basics">Click here</a>                <!-- ❌ -->
<!-- target="_blank" always needs rel="noopener noreferrer" -->

<!-- ── PERFORMANCE ── -->
<!-- Put <script> before </body>, not in <head> (unless defer/async) -->
<script src="app.js" defer></script>     <!-- defer: runs after HTML parses -->
<script src="track.js" async></script>   <!-- async: runs as soon as downloaded -->

<!-- ── VALIDATION ── -->
<!-- Run your HTML through https://validator.w3.org regularly -->
<!-- Valid HTML renders more consistently across browsers -->`;

/* ─────────────────────────────────────────────────────── */
/*  COMPONENT                                              */
/* ─────────────────────────────────────────────────────── */

export default function HTML() {
    return (
        <>
            {/* ═══════════════ HERO ═══════════════ */}
            <section className="hero">
                <div className="hero-eyebrow">
                    <span style={{ color: COLOR }}>HTML</span> — Chapter 01
                </div>
                <h1>
                    <span className="accent" style={{ color: COLOR }}>HTML</span>
                    <br />
                    <em>The skeleton of the web.</em>
                </h1>
                <p className="hero-desc">
                    HTML (HyperText Markup Language) is the raw material of every webpage. It
                    defines the structure and meaning of content — headings, paragraphs, images,
                    links, forms, tables. CSS and JavaScript operate on top of it.
                    Learn HTML right and everything else becomes easier.
                </p>
                <div className="hero-stack">
                    {[
                        'Document Structure', 'Semantic Elements', 'Text & Typography',
                        'Links & Navigation', 'Images & Media', 'Lists', 'Tables',
                        'Forms & Inputs', 'Validation', 'Accessibility', 'Meta & SEO',
                        'Data Attributes', 'HTML Entities', 'Best Practices',
                    ].map(t => (
                        <span key={t} className="stack-chip">{t}</span>
                    ))}
                </div>
            </section>

            {/* ═══════════════ 01 — WHAT IS HTML ═══════════════ */}
            <section className="chapter" id="what-is-html">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>01</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>The Basics</div>
                        <h2>What is HTML?</h2>
                        <p className="chapter-intro">
                            HTML is not a programming language — it is a <strong>markup language</strong>.
                            You wrap content in tags to give it structure and meaning. Browsers read
                            that markup and render it as a visual webpage.
                        </p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Tags, Elements & Attributes</h3>
                    <p>
                        An <strong>element</strong> is an opening tag + content + closing tag.
                        <strong>Attributes</strong> go inside the opening tag and provide extra
                        information about the element.
                    </p>
                    <CodeBlock lang="html" code={SNIPPET_WHAT_IS_HTML} />
                </div>

                <div className="topic">
                    <h3>How a Browser Renders HTML</h3>
                    <div className="concept-grid">
                        <div className="concept-card">
                            <div className="concept-icon">1️⃣</div>
                            <h4>Parse</h4>
                            <p>The browser downloads your HTML file and reads it top-to-bottom, building the DOM (Document Object Model) tree.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">2️⃣</div>
                            <h4>Style</h4>
                            <p>It downloads CSS and applies styles to the DOM nodes, calculating layout positions for every element.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">3️⃣</div>
                            <h4>Paint</h4>
                            <p>The browser converts the layout into actual pixels on screen. This is the page you see.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">4️⃣</div>
                            <h4>Execute</h4>
                            <p>JavaScript runs and can modify the DOM dynamically — adding, removing, or updating elements after the initial paint.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ 02 — DOCUMENT STRUCTURE ═══════════════ */}
            <section className="chapter" id="structure">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>02</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>The Basics</div>
                        <h2>Document Structure</h2>
                        <p className="chapter-intro">
                            Every HTML file shares the same foundational structure. Memorise this
                            boilerplate — you'll type a variation of it in every project.
                        </p>
                    </div>
                </div>

                <div className="topic">
                    <h3>The HTML Boilerplate</h3>
                    <CodeBlock lang="html" code={SNIPPET_BOILERPLATE} />
                    <div className="callout tip">
                        <div className="callout-title">💡 VS Code Shortcut</div>
                        <p>
                            In VS Code, create an empty <code>.html</code> file, type <code>!</code>
                            and press <kbd>Tab</kbd> or <kbd>Enter</kbd>. Emmet will generate the
                            full boilerplate for you instantly.
                        </p>
                    </div>
                </div>

                <div className="topic">
                    <h3>DOCTYPE & the html Element</h3>
                    <CodeBlock lang="html" code={SNIPPET_DOCTYPE} />
                </div>

                <div className="topic">
                    <h3>What Goes in the &lt;head&gt;?</h3>
                    <div className="concept-grid">
                        <div className="concept-card">
                            <div className="concept-icon">🔤</div>
                            <h4><code>&lt;title&gt;</code></h4>
                            <p>The text shown in the browser tab and in Google search results. Keep it under 60 characters.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">🔗</div>
                            <h4><code>&lt;link&gt;</code></h4>
                            <p>Links external CSS files, fonts, favicons, and RSS feeds to the page. Does not display anything itself.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">📋</div>
                            <h4><code>&lt;meta&gt;</code></h4>
                            <p>Provides metadata — charset, viewport settings, SEO description, and Open Graph tags for social sharing.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">⚡</div>
                            <h4><code>&lt;script&gt;</code></h4>
                            <p>Embeds or links JavaScript. Use <code>defer</code> or <code>async</code> when placed in <code>&lt;head&gt;</code>. Otherwise put scripts before <code>&lt;/body&gt;</code>.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ 03 — SEMANTIC ELEMENTS ═══════════════ */}
            <section className="chapter" id="semantic">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>03</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>HTML Fundamentals</div>
                        <h2>Semantic Elements</h2>
                        <p className="chapter-intro">
                            Semantic HTML means using elements that convey meaning — not just for
                            visual styling, but for browsers, search engines, and screen readers.
                            It makes your code self-documenting.
                        </p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Page Layout Semantics</h3>
                    <CodeBlock lang="html" code={SNIPPET_SEMANTIC_LAYOUT} />
                </div>

                <div className="topic">
                    <h3>div vs Semantic Elements</h3>
                    <div className="concept-grid">
                        <div className="concept-card">
                            <div className="concept-icon">🏗️</div>
                            <h4><code>&lt;header&gt;</code></h4>
                            <p>Introductory content for a page or section. Can contain a logo, nav, and search bar. Multiple per page are OK.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">🧭</div>
                            <h4><code>&lt;nav&gt;</code></h4>
                            <p>A group of navigation links. Use <code>aria-label</code> if you have more than one nav on a page.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">📄</div>
                            <h4><code>&lt;main&gt;</code></h4>
                            <p>The primary content unique to this page. Only ONE per page. Not for headers, footers, or sidebars.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">📰</div>
                            <h4><code>&lt;article&gt;</code></h4>
                            <p>Self-contained content that makes sense on its own — blog posts, news items, product cards, forum posts.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">📑</div>
                            <h4><code>&lt;section&gt;</code></h4>
                            <p>A thematic grouping within a page. Should contain a heading. If it has no heading, use a <code>&lt;div&gt;</code> instead.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">💬</div>
                            <h4><code>&lt;aside&gt;</code></h4>
                            <p>Tangentially related content — sidebars, pull quotes, related links, ads. Not part of the main flow.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">🔚</div>
                            <h4><code>&lt;footer&gt;</code></h4>
                            <p>Footer content for a page or section. Can contain copyright, links, and contact information. Multiple per page are OK.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">⬜</div>
                            <h4><code>&lt;div&gt;</code></h4>
                            <p>A generic, non-semantic container. Use ONLY when no semantic element fits. It carries no meaning on its own.</p>
                        </div>
                    </div>
                </div>

                <div className="topic">
                    <h3>Inline Semantic Text Elements</h3>
                    <CodeBlock lang="html" code={SNIPPET_SEMANTIC_TEXT} />
                </div>

                <div className="topic">
                    <h3>Text Semantics Reference</h3>
                    <div className="table-wrap">
                        <table>
                            <thead>
                            <tr><th>Element</th><th>Meaning / Use</th><th>Display</th></tr>
                            </thead>
                            <tbody>
                            {[
                                ['<strong>', 'Strong importance — critical text', 'Bold'],
                                ['<em>', 'Stress emphasis — changes sentence meaning', 'Italic'],
                                ['<b>', 'Bold stylistically, no extra importance', 'Bold'],
                                ['<i>', 'Italic stylistically — foreign words, terms', 'Italic'],
                                ['<mark>', 'Highlighted text — search results', 'Yellow highlight'],
                                ['<del>', 'Deleted/removed text', 'Strikethrough'],
                                ['<ins>', 'Inserted/added text', 'Underline'],
                                ['<s>', 'No longer accurate/relevant', 'Strikethrough'],
                                ['<small>', 'Fine print, legal notices', 'Smaller text'],
                                ['<sub>', 'Subscript — H₂O, chemical formulas', 'Below baseline'],
                                ['<sup>', 'Superscript — x², footnote references', 'Above baseline'],
                                ['<code>', 'Inline code, variable names', 'Monospace'],
                                ['<kbd>', 'Keyboard input — Ctrl+C', 'Monospace'],
                                ['<samp>', 'Sample program output', 'Monospace'],
                                ['<var>', 'Mathematical variable', 'Italic'],
                                ['<abbr>', 'Abbreviation with title tooltip', 'Dotted underline'],
                                ['<cite>', 'Reference to a creative work', 'Italic'],
                                ['<q>', 'Short inline quotation', 'Adds quotes'],
                                ['<time>', 'Date/time — machine-readable via datetime attr', 'Inline'],
                                ['<address>', 'Contact info for nearest article/body', 'Italic'],
                                ['<dfn>', 'Term being defined', 'Italic'],
                            ].map(([el, meaning, display]) => (
                                <tr key={el}>
                                    <td><code>{el}</code></td>
                                    <td>{meaning}</td>
                                    <td style={{ color: 'var(--text3)', fontSize: '0.85em' }}>{display}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ═══════════════ 04 — TEXT & HEADINGS ═══════════════ */}
            <section className="chapter" id="text">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>04</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>HTML Fundamentals</div>
                        <h2>Text & Typography</h2>
                        <p className="chapter-intro">
                            Headings, paragraphs, and inline text elements form the foundation
                            of almost every page. Get the hierarchy right and both SEO and
                            accessibility improve automatically.
                        </p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Headings — h1 through h6</h3>
                    <CodeBlock lang="html" code={SNIPPET_HEADINGS} />
                    <div className="callout tip">
                        <div className="callout-title">💡 SEO Rule</div>
                        <p>
                            Use exactly ONE <code>&lt;h1&gt;</code> per page — it tells search engines
                            what the page is about. Use <code>h2</code>–<code>h6</code> for sub-sections.
                            Never choose a heading level for its visual size — use CSS for that.
                        </p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Paragraphs & Inline Elements</h3>
                    <CodeBlock lang="html" code={SNIPPET_TEXT_ELEMENTS} />
                </div>
            </section>

            {/* ═══════════════ 05 — LINKS ═══════════════ */}
            <section className="chapter" id="links">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>05</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>HTML Fundamentals</div>
                        <h2>Links & Navigation</h2>
                        <p className="chapter-intro">
                            Hyperlinks are what make the web a web. The <code>&lt;a&gt;</code> element
                            can link to pages, sections of a page, email addresses, phone numbers,
                            files for download — and more.
                        </p>
                    </div>
                </div>
                <div className="topic">
                    <h3>The Anchor Element — Every Link Type</h3>
                    <CodeBlock lang="html" code={SNIPPET_LINKS} />
                    <div className="callout warn">
                        <div className="callout-title">⚠️ Security: target="_blank"</div>
                        <p>
                            Always pair <code>target="_blank"</code> with
                            <code>rel="noopener noreferrer"</code>. Without it, the opened page
                            can access your page via <code>window.opener</code> — a security risk.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════════════ 06 — IMAGES & MEDIA ═══════════════ */}
            <section className="chapter" id="images">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>06</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>HTML Fundamentals</div>
                        <h2>Images & Media</h2>
                        <p className="chapter-intro">
                            Images, video, and audio bring pages to life. HTML5 provides
                            native elements for all of them — no plugins required.
                        </p>
                    </div>
                </div>

                <div className="topic">
                    <h3>The img Element — All Options</h3>
                    <CodeBlock lang="html" code={SNIPPET_IMAGES} />
                    <div className="concept-grid">
                        <div className="concept-card">
                            <div className="concept-icon">🖼️</div>
                            <h4>JPEG / .jpg</h4>
                            <p>Best for photos. Lossy compression — great quality at small file sizes. No transparency support.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">🎨</div>
                            <h4>PNG</h4>
                            <p>Best for graphics, logos, icons. Lossless — no quality loss. Supports transparency. Larger file size than JPEG.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">⚡</div>
                            <h4>WebP</h4>
                            <p>Modern format — smaller than JPEG and PNG at same quality. Supports transparency and animation. Use this when possible.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">📐</div>
                            <h4>SVG</h4>
                            <p>Vector format — scales to any size with no quality loss. Best for logos, icons, and illustrations. Can be embedded directly in HTML.</p>
                        </div>
                    </div>
                </div>

                <div className="topic">
                    <h3>Video & Audio</h3>
                    <CodeBlock lang="html" code={SNIPPET_VIDEO_AUDIO} />
                </div>

                <div className="topic">
                    <h3>Embedding with iframes</h3>
                    <CodeBlock lang="html" code={SNIPPET_IFRAMES} />
                </div>
            </section>

            {/* ═══════════════ 07 — LISTS ═══════════════ */}
            <section className="chapter" id="lists">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>07</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>HTML Fundamentals</div>
                        <h2>Lists</h2>
                        <p className="chapter-intro">
                            HTML has three types of list. Navigation menus, FAQs, glossaries,
                            and feature bullet points are all built on list elements.
                        </p>
                    </div>
                </div>
                <div className="topic">
                    <h3>ul, ol, and dl — Complete Reference</h3>
                    <CodeBlock lang="html" code={SNIPPET_LISTS} />
                    <div className="callout tip">
                        <div className="callout-title">💡 Did You Know?</div>
                        <p>
                            Navigation menus should be wrapped in a <code>&lt;nav&gt;</code> element
                            containing a <code>&lt;ul&gt;</code>. This is the standard semantic
                            pattern — screen readers will announce it as a navigation list.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════════════ 08 — TABLES ═══════════════ */}
            <section className="chapter" id="tables">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>08</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>HTML Fundamentals</div>
                        <h2>Tables</h2>
                        <p className="chapter-intro">
                            Tables are for <strong>tabular data</strong> — data that belongs in
                            rows and columns. Never use them for page layout (use CSS Grid or
                            Flexbox instead).
                        </p>
                    </div>
                </div>
                <div className="topic">
                    <h3>Full Table Structure</h3>
                    <CodeBlock lang="html" code={SNIPPET_TABLES} />
                    <div className="concept-grid">
                        <div className="concept-card">
                            <div className="concept-icon">📊</div>
                            <h4><code>&lt;table&gt;</code></h4>
                            <p>The root element. All table elements must be inside it.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">🟦</div>
                            <h4><code>&lt;thead&gt;</code></h4>
                            <p>Groups header rows. Browsers repeat this on each page when printing long tables.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">⬜</div>
                            <h4><code>&lt;tbody&gt;</code></h4>
                            <p>Groups the data rows. You can have multiple <code>tbody</code> elements in one table.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">🟫</div>
                            <h4><code>&lt;tfoot&gt;</code></h4>
                            <p>Groups footer rows — totals, summaries. Browsers also repeat this when printing.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">➡️</div>
                            <h4><code>&lt;tr&gt;</code></h4>
                            <p>Table row. Must be inside thead, tbody, or tfoot.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">🔵</div>
                            <h4><code>&lt;th&gt;</code></h4>
                            <p>Header cell — bold and centered by default. Add <code>scope="col"</code> or <code>scope="row"</code> for accessibility.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">⚪</div>
                            <h4><code>&lt;td&gt;</code></h4>
                            <p>Data cell. Use <code>colspan</code> and <code>rowspan</code> to span multiple columns or rows.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">🏷️</div>
                            <h4><code>&lt;caption&gt;</code></h4>
                            <p>Table title — visible and announced by screen readers. Place it as the first child of <code>&lt;table&gt;</code>.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ 09 — FORMS ═══════════════ */}
            <section className="chapter" id="forms">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>09</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>HTML Fundamentals</div>
                        <h2>Forms & Inputs</h2>
                        <p className="chapter-intro">
                            Forms are how users send data to your server — login, registration,
                            search, checkout, feedback. Proper HTML form markup improves
                            accessibility, mobile UX, and reduces JavaScript needed for validation.
                        </p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Complete Form — Every Input Type</h3>
                    <CodeBlock lang="html" code={SNIPPET_FORMS} />
                </div>

                <div className="topic">
                    <h3>All Input Types at a Glance</h3>
                    <div className="concept-grid">
                        {[
                            { name: 'text',           use: 'Generic single-line text. The default input type.' },
                            { name: 'email',          use: 'Email validation built in. Mobile shows email keyboard.' },
                            { name: 'password',       use: 'Characters masked. Never store in plain text.' },
                            { name: 'number',         use: 'Numeric input. Supports min, max, step attributes.' },
                            { name: 'tel',            use: 'Phone number. Mobile shows phone keyboard. Use pattern for validation.' },
                            { name: 'url',            use: 'URL validation built in. Must start with http:// or https://.' },
                            { name: 'search',         use: 'Styled as a search box. May show a clear (×) button.' },
                            { name: 'date',           use: 'Date picker. Value format: YYYY-MM-DD.' },
                            { name: 'time',           use: 'Time picker. Value format: HH:MM.' },
                            { name: 'datetime-local', use: 'Combined date and time picker, no timezone.' },
                            { name: 'month',          use: 'Month + year picker.' },
                            { name: 'week',           use: 'Week + year picker.' },
                            { name: 'color',          use: 'Color picker. Value is a hex string like #ff0000.' },
                            { name: 'range',          use: 'Slider. Use min, max, step. Always show current value.' },
                            { name: 'file',           use: 'File upload. Use accept to filter file types.' },
                            { name: 'checkbox',       use: 'Multi-select toggle. Group by name for semantic meaning.' },
                            { name: 'radio',          use: 'Single select within a group. All in group share same name.' },
                            { name: 'hidden',         use: 'Not visible. Sends data the user shouldn\'t modify (CSRF tokens).' },
                            { name: 'submit',         use: 'Submits the form. Prefer <button type="submit"> for styling.' },
                            { name: 'reset',          use: 'Resets all fields to default. Use sparingly — confuses users.' },
                            { name: 'button',         use: 'General button. No default action — use with JS.' },
                            { name: 'image',          use: 'Submits form when clicked. Displays an image as the button.' },
                        ].map(t => (
                            <div key={t.name} className="concept-card">
                                <code>{t.name}</code>
                                <p style={{ marginTop: '6px', fontSize: '0.88em' }}>{t.use}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="topic">
                    <h3>HTML5 Built-in Validation</h3>
                    <CodeBlock lang="html" code={SNIPPET_INPUT_VALIDATION} />
                    <div className="callout tip">
                        <div className="callout-title">💡 Validate Server-Side Too</div>
                        <p>
                            HTML validation is easy to bypass — never rely on it alone. Always
                            validate and sanitize data on your Express/Node.js server as well.
                            HTML validation is UX, not security.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════════════ 10 — HTML ENTITIES ═══════════════ */}
            <section className="chapter" id="entities">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>10</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Reference</div>
                        <h2>HTML Entities & Special Characters</h2>
                        <p className="chapter-intro">
                            Some characters have special meaning in HTML and must be escaped.
                            Others (like © or →) are represented as named or numeric entities
                            to ensure they render correctly across all browsers and encodings.
                        </p>
                    </div>
                </div>
                <div className="topic">
                    <h3>Essential Entity Reference</h3>
                    <CodeBlock lang="html" code={SNIPPET_ENTITIES} />
                </div>
            </section>

            {/* ═══════════════ 11 — DATA ATTRIBUTES ═══════════════ */}
            <section className="chapter" id="data-attrs">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>11</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>HTML5 Features</div>
                        <h2>Data Attributes & HTML5 Features</h2>
                        <p className="chapter-intro">
                            HTML5 introduced many powerful features — data attributes let you
                            embed custom data in HTML that JavaScript can easily read, without
                            polluting the DOM with fake attributes.
                        </p>
                    </div>
                </div>

                <div className="topic">
                    <h3>data-* Attributes</h3>
                    <CodeBlock lang="html" code={SNIPPET_DATA_ATTRIBUTES} />
                </div>

                <div className="topic">
                    <h3>Other HTML5 Elements You Should Know</h3>
                    <div className="concept-grid">
                        <div className="concept-card">
                            <div className="concept-icon">📦</div>
                            <h4><code>&lt;details&gt; + &lt;summary&gt;</code></h4>
                            <p>Native accordion / disclosure widget. No JavaScript needed. Click summary to expand/collapse the details content.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">🪟</div>
                            <h4><code>&lt;dialog&gt;</code></h4>
                            <p>Native modal dialog. Call <code>.showModal()</code> to open. Handles focus trapping and Escape key automatically.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">📊</div>
                            <h4><code>&lt;progress&gt;</code></h4>
                            <p>Progress bar for tasks. <code>value</code> and <code>max</code> attributes control the fill. Screen readers announce it.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">📏</div>
                            <h4><code>&lt;meter&gt;</code></h4>
                            <p>Scalar measurement within a known range — disk usage, ratings, scores. Not for progress bars (use <code>&lt;progress&gt;</code> instead).</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">🔍</div>
                            <h4><code>&lt;datalist&gt;</code></h4>
                            <p>Provides autocomplete suggestions for a text input. Link it with <code>list</code> attribute on input and an <code>id</code> on datalist.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">🎨</div>
                            <h4><code>&lt;canvas&gt;</code></h4>
                            <p>2D/3D drawing surface controlled entirely with JavaScript. Used for games, charts, image manipulation.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">📐</div>
                            <h4><code>&lt;svg&gt;</code></h4>
                            <p>Embed Scalable Vector Graphics directly in HTML. Can be styled with CSS and animated with JS.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">🗂️</div>
                            <h4><code>&lt;template&gt;</code></h4>
                            <p>Holds HTML that is not rendered until activated by JavaScript. Used in Web Components and dynamic rendering.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ 12 — ACCESSIBILITY ═══════════════ */}
            <section className="chapter" id="accessibility">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>12</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Best Practices</div>
                        <h2>Accessibility (a11y)</h2>
                        <p className="chapter-intro">
                            Accessible HTML ensures your site works for everyone — including
                            screen reader users, keyboard navigators, and people with visual or
                            motor impairments. It also directly improves SEO.
                        </p>
                    </div>
                </div>

                <div className="topic">
                    <h3>ARIA, Labels, Keyboard & Focus</h3>
                    <CodeBlock lang="html" code={SNIPPET_ACCESSIBILITY} />

                    <div className="callout tip">
                        <div className="callout-title">💡 The First Rule of ARIA</div>
                        <p>
                            Don't use ARIA if you can use a native HTML element instead.
                            A <code>&lt;button&gt;</code> is better than a{' '}
                            <code>&lt;div role="button" tabindex="0"&gt;</code> because you
                            get keyboard support, focus management, and semantics for free.
                        </p>
                    </div>
                </div>

                <div className="topic">
                    <h3>Accessibility Quick Checklist</h3>
                    <div className="table-wrap">
                        <table>
                            <thead><tr><th>Rule</th><th>Why It Matters</th></tr></thead>
                            <tbody>
                            {[
                                ['Every image has alt=""', 'Screen readers describe images via alt text'],
                                ['Every input has a label', 'Screen readers announce the label when field is focused'],
                                ['Heading hierarchy is correct (h1→h2→h3)', 'Screen readers navigate by headings'],
                                ['Colour contrast ≥ 4.5:1 (normal text)', 'Readable for low-vision users'],
                                ['Interactive elements are keyboard operable', 'Motor-impaired users rely on keyboard'],
                                ['Focus ring is visible', 'Keyboard users must see where focus is'],
                                ['Form errors are described with aria-describedby', 'Screen readers read the error message'],
                                ['lang attribute on <html>', 'Screen readers use correct language/pronunciation'],
                                ['Skip navigation link at the top', 'Keyboard users skip repetitive nav'],
                                ['Videos have captions / transcripts', 'Deaf users need alternative to audio'],
                            ].map(([rule, why]) => (
                                <tr key={rule}><td>{rule}</td><td style={{ color: 'var(--text3)' }}>{why}</td></tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ═══════════════ 13 — META & SEO ═══════════════ */}
            <section className="chapter" id="meta-seo">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>13</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Best Practices</div>
                        <h2>Meta Tags & SEO</h2>
                        <p className="chapter-intro">
                            Meta tags in <code>&lt;head&gt;</code> control how your page appears
                            in search results, link previews (Open Graph), browser tabs, and
                            favourites. Getting them right is the easiest SEO win.
                        </p>
                    </div>
                </div>
                <div className="topic">
                    <h3>The Complete Head — SEO, OG, Twitter, Favicon, Structured Data</h3>
                    <CodeBlock lang="html" code={SNIPPET_META_SEO} />
                </div>
            </section>

            {/* ═══════════════ 14 — BEST PRACTICES ═══════════════ */}
            <section className="chapter" id="best-practices">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>14</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Professional HTML</div>
                        <h2>Best Practices</h2>
                        <p className="chapter-intro">
                            These rules separate professional HTML from beginner HTML.
                            Follow them on every project from day one.
                        </p>
                    </div>
                </div>
                <div className="topic">
                    <h3>Rules to Write By</h3>
                    <CodeBlock lang="html" code={SNIPPET_BEST_PRACTICES} />
                </div>

                <div className="topic">
                    <h3>HTML Validation</h3>
                    <p>
                        Run your HTML through the{' '}
                        <a href="https://validator.w3.org" target="_blank" rel="noopener noreferrer">
                            W3C Validator
                        </a>{' '}
                        regularly. Valid HTML renders more consistently across browsers, is easier to
                        style with CSS, and is more accessible. Common errors include:
                    </p>
                    <div className="concept-grid">
                        <div className="concept-card">
                            <div className="concept-icon">❌</div>
                            <h4>Missing alt on img</h4>
                            <p>Every img must have an alt attribute, even if it's empty (<code>alt=""</code>) for decorative images.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">❌</div>
                            <h4>Unclosed Tags</h4>
                            <p>Every opening tag (except void elements) must have a closing tag. Browsers try to fix this but results vary.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">❌</div>
                            <h4>Nesting Errors</h4>
                            <p>Tags must be closed in the correct order: <code>&lt;p&gt;&lt;strong&gt;text&lt;/strong&gt;&lt;/p&gt;</code> not <code>&lt;p&gt;&lt;strong&gt;text&lt;/p&gt;&lt;/strong&gt;</code>.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">❌</div>
                            <h4>Duplicate IDs</h4>
                            <p>Every <code>id</code> must be unique per page. Using the same id twice breaks JS selectors and accessibility.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">❌</div>
                            <h4>Input Without Label</h4>
                            <p>Every <code>&lt;input&gt;</code> needs an associated <code>&lt;label&gt;</code>. Using placeholder only is not sufficient.</p>
                        </div>
                        <div className="concept-card">
                            <div className="concept-icon">❌</div>
                            <h4>Inline Styles Everywhere</h4>
                            <p>Inline <code>style=""</code> attributes are hard to override and maintain. Use CSS classes instead.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ 15 — RESOURCES ═══════════════ */}
            <section className="chapter" id="resources">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>15</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Learn More</div>
                        <h2>Resources & Practice</h2>
                        <p className="chapter-intro">
                            Curated links to go deeper — official docs, free courses, validators,
                            cheat sheets, and interactive games to test your knowledge.
                        </p>
                    </div>
                </div>
                <div className="resource-grid">
                    {RESOURCES.map((r, i) => <ResourceCard key={i} {...r} />)}
                </div>
                <PracticeArena games={GAMES} />
            </section>

            {/* ═══════════════ FOOTER ═══════════════ */}
            <footer className="footer">
                <p>HTML · Chapter 01 · FullStack Compass</p>
                <a
                    href="https://sanketh.live/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--green)', textDecoration: 'none', marginTop: '6px', display: 'block' }}
                >
                    sanketh.live ↗
                </a>
            </footer>
        </>
    );
}
