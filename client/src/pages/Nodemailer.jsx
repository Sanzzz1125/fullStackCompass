import React from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';

const COLOR = '#0ea5e9';

const RESOURCES = [
    { type: 'docs',     title: 'Nodemailer Official Docs',  description: 'Full Nodemailer documentation — transports, templates, attachments, SMTP config.', url: 'https://nodemailer.com/about/' },
    { type: 'tool',     title: 'Mailtrap — Email Testing',  description: 'Catches all outgoing emails in dev so you never spam real users. Free plan available.', url: 'https://mailtrap.io/' },
    { type: 'tutorial', title: 'Gmail SMTP Setup Guide',    description: 'How to configure Gmail as your SMTP provider with App Passwords.', url: 'https://support.google.com/accounts/answer/185833' },
    { type: 'tool',     title: 'React Email',               description: 'Build beautiful HTML email templates with React components.', url: 'https://react.email/' },
];

export default function Nodemailer() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{ color: COLOR }}>Nodemailer</span> — Email</div>
                <h1><span className="accent" style={{ color: COLOR }}>Nodemailer</span><br /><em>Send emails from Node.js</em></h1>
                <p className="hero-desc">Every production app sends emails — verification, password reset, order confirmation, welcome emails. Nodemailer is the standard Node.js library for sending emails via SMTP.</p>
                <div className="hero-stack">
                    {['SMTP','HTML Templates','OTP Emails','Password Reset','Attachments','Gmail'].map(t => <span key={t} className="stack-chip">{t}</span>)}
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>01</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Setup</div>
                        <h2>Installation & Configuration</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Setup Transporter</h3>
                    <CodeBlock lang="bash" code={`npm install nodemailer`} />
                    <CodeBlock lang="javascript" code={`// services/email.service.js
const nodemailer = require('nodemailer');

// ── PRODUCTION: Gmail SMTP ──
// Steps: Google Account → Security → 2-Step Verification ON
//        → App Passwords → Generate 16-char password → paste below
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // yourapp@gmail.com
        pass: process.env.EMAIL_PASS,  // 16-char App Password (NOT your gmail password)
    },
});

// ── DEVELOPMENT: Mailtrap (catches all emails, never sends real ones) ──
const devTransporter = nodemailer.createTransport({
    host:   'sandbox.smtp.mailtrap.io',
    port:   2525,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
    },
});

// ── Use right transporter based on environment ──
const transport = process.env.NODE_ENV === 'production' ? transporter : devTransporter;

// Verify connection on startup
transport.verify((err, success) => {
    if (err) console.error('❌ Email transport error:', err);
    else     console.log('✅ Email transport ready');
});

module.exports = transport;`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>02</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Templates</div>
                        <h2>Sending Emails — HTML Templates</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Complete Email Service</h3>
                    <CodeBlock lang="javascript" code={`// services/email.service.js (continued)
const transport = require('./transporter');

// ── Base HTML template (reusable wrapper) ──
function emailTemplate({ title, content, ctaText, ctaUrl }) {
    return \`
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>\${title}</title>
    </head>
    <body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center" style="padding:40px 16px;">
                <table width="580" cellpadding="0" cellspacing="0"
                       style="background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,.05);">

                    <!-- Header -->
                    <tr><td style="background:#1e40af;padding:32px 40px;">
                        <h1 style="margin:0;color:white;font-size:24px;">FullStack Compass</h1>
                    </td></tr>

                    <!-- Body -->
                    <tr><td style="padding:40px;">
                        <h2 style="color:#111827;margin-top:0;">\${title}</h2>
                        \${content}
                    </td></tr>

                    <!-- CTA Button -->
                    \${ctaText ? \`<tr><td align="center" style="padding:0 40px 40px;">
                        <a href="\${ctaUrl}"
                           style="background:#1e40af;color:white;padding:14px 32px;
                                  border-radius:8px;text-decoration:none;font-weight:600;
                                  display:inline-block;">
                            \${ctaText}
                        </a>
                    </td></tr>\` : ''}

                    <!-- Footer -->
                    <tr><td style="background:#f9fafb;padding:20px 40px;text-align:center;">
                        <p style="color:#6b7280;font-size:12px;margin:0;">
                            &copy; \${new Date().getFullYear()} FullStack Compass · All rights reserved
                        </p>
                    </td></tr>
                </table>
            </td></tr>
        </table>
    </body>
    </html>\`;
}

// ── 1. Welcome Email ──
async function sendWelcomeEmail(user) {
    await transport.sendMail({
        from:    \`"FullStack Compass" <\${process.env.EMAIL_USER}>\`,
        to:      user.email,
        subject: 'Welcome to FullStack Compass! 🎉',
        html: emailTemplate({
            title:   \`Welcome, \${user.name}!\`,
            content: \`
                <p style="color:#374151;line-height:1.6;">
                    Your account has been created successfully.
                    Start your MERN stack journey today.
                </p>
                <p style="color:#374151;line-height:1.6;">
                    <strong>Your email:</strong> \${user.email}<br>
                    <strong>Joined:</strong> \${new Date().toLocaleDateString()}
                </p>
            \`,
            ctaText: 'Go to Dashboard',
            ctaUrl:  \`\${process.env.FRONTEND_URL}/dashboard\`,
        }),
    });
}

// ── 2. OTP / Verification Email ──
async function sendOTPEmail(email, otp) {
    await transport.sendMail({
        from:    \`"FullStack Compass" <\${process.env.EMAIL_USER}>\`,
        to:      email,
        subject: \`\${otp} — Your verification code\`,
        html: emailTemplate({
            title:   'Email Verification',
            content: \`
                <p style="color:#374151;">Enter this code to verify your email:</p>
                <div style="background:#f3f4f6;border-radius:8px;padding:24px;
                            text-align:center;margin:24px 0;">
                    <span style="font-size:40px;font-weight:700;letter-spacing:12px;
                                 color:#1e40af;font-family:monospace;">
                        \${otp}
                    </span>
                </div>
                <p style="color:#6b7280;font-size:14px;">
                    This code expires in <strong>10 minutes</strong>.
                    Do not share it with anyone.
                </p>
            \`,
        }),
    });
}

// ── 3. Password Reset Email ──
async function sendPasswordResetEmail(email, resetToken) {
    const resetUrl = \`\${process.env.FRONTEND_URL}/reset-password?token=\${resetToken}\`;
    await transport.sendMail({
        from:    \`"FullStack Compass" <\${process.env.EMAIL_USER}>\`,
        to:      email,
        subject: 'Reset your password',
        html: emailTemplate({
            title:   'Password Reset Request',
            content: \`
                <p style="color:#374151;">
                    We received a request to reset your password.
                    Click below to create a new password.
                </p>
                <p style="color:#6b7280;font-size:14px;">
                    This link expires in <strong>1 hour</strong>.
                    If you didn't request this, ignore this email.
                </p>
            \`,
            ctaText: 'Reset Password',
            ctaUrl:  resetUrl,
        }),
    });
}

// ── 4. Order Confirmation with Attachments ──
async function sendOrderConfirmation(user, order, invoicePdfBuffer) {
    await transport.sendMail({
        from:    \`"FullStack Compass" <\${process.env.EMAIL_USER}>\`,
        to:      user.email,
        subject: \`Order Confirmed — #\${order._id}\`,
        html: emailTemplate({
            title:   'Order Confirmed! 🎉',
            content: \`
                <p>Thank you for your order. Here's your summary:</p>
                <table style="width:100%;border-collapse:collapse;">
                    \${order.items.map(item => \`
                        <tr>
                            <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;">
                                \${item.name}
                            </td>
                            <td style="text-align:right;border-bottom:1px solid #e5e7eb;">
                                ₹\${item.price}
                            </td>
                        </tr>
                    \`).join('')}
                    <tr>
                        <td style="padding:12px 0;font-weight:bold;">Total</td>
                        <td style="text-align:right;font-weight:bold;">₹\${order.total}</td>
                    </tr>
                </table>
            \`,
            ctaText: 'Track Order',
            ctaUrl:  \`\${process.env.FRONTEND_URL}/orders/\${order._id}\`,
        }),
        attachments: [{
            filename:    \`invoice-\${order._id}.pdf\`,
            content:     invoicePdfBuffer,
            contentType: 'application/pdf',
        }],
    });
}

module.exports = { sendWelcomeEmail, sendOTPEmail, sendPasswordResetEmail, sendOrderConfirmation };`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{ borderColor: COLOR, color: COLOR }}>03</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{ color: COLOR }}>Integration</div>
                        <h2>Using Email in Express Routes</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Wiring Email into Auth Flow</h3>
                    <CodeBlock lang="javascript" code={`const { sendWelcomeEmail, sendOTPEmail, sendPasswordResetEmail } = require('../services/email.service');
const { generateAndStoreOTP, validateResetToken } = require('../services/otp.service'); // Redis-based

// ── Register ──
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: 'Email already registered' });

        const hash = await bcrypt.hash(password, 12);
        const user = await User.create({ name, email, password: hash, isVerified: false });

        // Generate OTP and send email
        const otp = await generateAndStoreOTP(user._id);
        await sendOTPEmail(email, otp);

        // Send welcome email (non-blocking — don't await to keep response fast)
        sendWelcomeEmail(user).catch(err => console.error('Welcome email failed:', err));

        res.status(201).json({ message: 'Account created. Check your email for OTP.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ── Verify Email ──
router.post('/verify-email', async (req, res) => {
    const { userId, otp } = req.body;
    await verifyOTP(userId, otp); // throws if invalid
    await User.findByIdAndUpdate(userId, { isVerified: true });
    res.json({ message: 'Email verified successfully' });
});

// ── Forgot Password ──
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    // Always return same message — don't reveal if email exists
    if (user) {
        const token = await createPasswordResetToken(user._id);
        await sendPasswordResetEmail(email, token);
    }
    res.json({ message: 'If that email exists, a reset link has been sent.' });
});

// ── Reset Password ──
router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    const userId = await validateResetToken(token); // throws if expired
    const hash   = await bcrypt.hash(newPassword, 12);
    await User.findByIdAndUpdate(userId, { password: hash });
    res.json({ message: 'Password reset successful' });
});`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header"><div><h2 style={{ fontFamily: "'Fraunces', serif" }}>Resources</h2></div></div>
                <div className="resource-grid">{RESOURCES.map((r, i) => <ResourceCard key={i} {...r} />)}</div>
            </section>

            <footer className="footer">
                <p>Nodemailer · FullStack Compass</p>
                <a href="https://sanketh.live/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'none', marginTop: '6px', display: 'block' }}>sanketh.live ↗</a>
            </footer>
        </>
    );
}
