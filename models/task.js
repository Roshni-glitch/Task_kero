const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    priority: String,
    dueDate: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId, // Linking to User model
        ref: 'User', // Reference to User collection
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', taskSchema);
