const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');

// GET /api/progress?sessionId=xxx
router.get('/', async (req, res) => {
    try {
        const { sessionId } = req.query;
        if (!sessionId) return res.status(400).json({ error: 'sessionId required' });

        const progress = await Progress.find({ sessionId }).sort({ completedAt: -1 });
        res.json({ success: true, data: progress });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/progress — mark a topic complete
router.post('/', async (req, res) => {
    try {
        const { sessionId, technology, topicId, topicName } = req.body;
        if (!sessionId || !technology || !topicId || !topicName) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Upsert: create or update
        const entry = await Progress.findOneAndUpdate(
            { sessionId, technology, topicId },
            { sessionId, technology, topicId, topicName, completed: true, completedAt: new Date() },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        res.status(201).json({ success: true, data: entry });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /api/progress/:id — unmark a topic
router.delete('/:id', async (req, res) => {
    try {
        await Progress.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Progress entry removed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/progress/summary?sessionId=xxx — get completion stats per technology
router.get('/summary', async (req, res) => {
    try {
        const { sessionId } = req.query;
        if (!sessionId) return res.status(400).json({ error: 'sessionId required' });

        const summary = await Progress.aggregate([
            { $match: { sessionId } },
            { $group: { _id: '$technology', count: { $sum: 1 } } },
        ]);

        res.json({ success: true, data: summary });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;