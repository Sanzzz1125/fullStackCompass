import React from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';

const COLOR = '#16a34a';
const RESOURCES = [
    { type:'docs', title:'Razorpay Docs', description:'Official Razorpay integration guide for Node.js and React.', url:'https://razorpay.com/docs/' },
    { type:'docs', title:'Stripe Docs', description:'Stripe payments — the global standard. Best documentation in fintech.', url:'https://stripe.com/docs' },
    { type:'tool', title:'Razorpay Test Cards', description:'Use test card 4111 1111 1111 1111 for development testing.', url:'https://razorpay.com/docs/payments/payments/test-card-details/' },
];

export default function Payments() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{color:COLOR}}>Payments</span> — Razorpay & Stripe</div>
                <h1><span className="accent" style={{color:COLOR}}>Payment Integration</span></h1>
                <p className="hero-desc">Add real payments to your MERN app. Razorpay for India, Stripe globally. Both follow the same pattern: create order on backend → collect card on frontend → verify on backend.</p>
                <div className="hero-stack">{['Razorpay','Stripe','Webhooks','Order Verification','Refunds'].map(t=><span key={t} className="stack-chip">{t}</span>)}</div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>01</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{color:COLOR}}>Razorpay</div>
                        <h2>Razorpay — India's Payment Gateway</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Backend — Create Order</h3>
                    <CodeBlock lang="bash" code={`npm install razorpay`} />
                    <CodeBlock lang="javascript" code={`// config/razorpay.js
const Razorpay = require('razorpay');
module.exports = new Razorpay({
    key_id:     process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// routes/payment.js
const razorpay = require('../config/razorpay');
const crypto   = require('crypto');
const Order    = require('../models/Order');

// Step 1 — Create Razorpay order
router.post('/create-order', protect, async (req, res) => {
    const { amount, cartItems } = req.body; // amount in rupees

    const razorpayOrder = await razorpay.orders.create({
        amount:   amount * 100,        // Razorpay uses paise (1 INR = 100 paise)
        currency: 'INR',
        receipt:  \`receipt_\${Date.now()}\`,
        notes:    { userId: req.user.id },
    });

    // Save pending order to DB
    const order = await Order.create({
        user:          req.user.id,
        items:         cartItems,
        totalAmount:   amount,
        razorpayOrderId: razorpayOrder.id,
        status:        'pending',
    });

    res.json({
        orderId:   razorpayOrder.id,
        amount:    razorpayOrder.amount,
        currency:  razorpayOrder.currency,
        dbOrderId: order._id,
    });
});

// Step 3 — Verify payment signature
router.post('/verify', protect, async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, dbOrderId } = req.body;

    // Verify signature
    const expectedSig = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(\`\${razorpay_order_id}|\${razorpay_payment_id}\`)
        .digest('hex');

    if (expectedSig !== razorpay_signature) {
        return res.status(400).json({ error: 'Payment verification failed' });
    }

    // Mark order as paid
    await Order.findByIdAndUpdate(dbOrderId, {
        status:             'paid',
        razorpayPaymentId:  razorpay_payment_id,
        razorpaySignature:  razorpay_signature,
        paidAt:             new Date(),
    });

    res.json({ success: true, message: 'Payment verified' });
});`} />
                </div>
                <div className="topic">
                    <h3>Frontend — React Checkout</h3>
                    <CodeBlock lang="html" code={`<!-- index.html — add Razorpay SDK -->
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>`} />
                    <CodeBlock lang="javascript" code={`// components/PaymentButton.jsx
import axios from 'axios';

export default function PaymentButton({ cartItems, totalAmount }) {
    const handlePayment = async () => {
        try {
            // Step 1: Create order on backend
            const { data } = await axios.post('/api/payments/create-order', {
                amount: totalAmount,
                cartItems,
            });

            // Step 2: Open Razorpay checkout modal
            const options = {
                key:         import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount:      data.amount,
                currency:    data.currency,
                name:        'My Store',
                description: 'Order Payment',
                order_id:    data.orderId,
                handler: async (response) => {
                    // Step 3: Verify payment on backend
                    const verify = await axios.post('/api/payments/verify', {
                        ...response,
                        dbOrderId: data.dbOrderId,
                    });
                    if (verify.data.success) {
                        alert('Payment successful!');
                        window.location.href = '/orders';
                    }
                },
                prefill: {
                    name:  'Sanketh',
                    email: 'sanketh@example.com',
                    contact: '9999999999',
                },
                theme: { color: '#2563eb' },
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', (resp) => alert('Payment failed: ' + resp.error.description));
            rzp.open();
        } catch (err) {
            console.error('Payment error:', err);
        }
    };

    return (
        <button onClick={handlePayment} className="btn btn-primary w-full">
            Pay ₹{totalAmount.toLocaleString()}
        </button>
    );
}`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>02</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{color:COLOR}}>Webhooks</div>
                        <h2>Webhooks — Handle Async Payment Events</h2>
                        <p className="chapter-intro">Webhooks are HTTP callbacks Razorpay/Stripe sends to your server when payment events occur — even if the user closed the browser.</p>
                    </div>
                </div>
                <div className="topic">
                    <h3>Razorpay Webhook Handler</h3>
                    <CodeBlock lang="javascript" code={`// Webhooks must use raw body — before express.json() middleware
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));

router.post('/webhook', (req, res) => {
    const signature = req.headers['x-razorpay-signature'];
    const secret    = process.env.RAZORPAY_WEBHOOK_SECRET;

    const expectedSig = crypto
        .createHmac('sha256', secret)
        .update(req.body.toString())
        .digest('hex');

    if (expectedSig !== signature) {
        return res.status(400).json({ error: 'Invalid signature' });
    }

    const event = JSON.parse(req.body);

    switch (event.event) {
        case 'payment.captured':
            const payment = event.payload.payment.entity;
            await Order.findOneAndUpdate(
                { razorpayOrderId: payment.order_id },
                { status: 'paid', paidAt: new Date() }
            );
            break;

        case 'payment.failed':
            await Order.findOneAndUpdate(
                { razorpayOrderId: event.payload.payment.entity.order_id },
                { status: 'failed' }
            );
            break;

        case 'refund.created':
            await Order.findOneAndUpdate(
                { razorpayPaymentId: event.payload.refund.entity.payment_id },
                { status: 'refunded' }
            );
            break;
    }

    res.json({ received: true });
});`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header"><div><h2 style={{fontFamily:"'Fraunces', serif"}}>Resources</h2></div></div>
                <div className="resource-grid">{RESOURCES.map((r,i)=><ResourceCard key={i} {...r}/>)}</div>
            </section>

            <footer className="footer">
                <p>Payments · FullStack Compass</p>
            </footer>
        </>
    );
}
