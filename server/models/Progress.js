const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema(
    {
        sessionId: {
            type: String,
            required: true,
            index: true,
        },
        technology: {
            type: String,
            required: true,
            enum: ['html', 'css', 'bootstrap', 'javascript', 'react', 'nodejs', 'express', 'apis', 'mongodb', 'mongoose', 'sql'],
        },
        topicId: {
            type: String,
            required: true,
        },
        topicName: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: true,
        },
        completedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

// Compound index to prevent duplicate entries
progressSchema.index({ sessionId: 1, technology: 1, topicId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);