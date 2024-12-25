import mongoose from 'mongoose';

const queueSchema = new mongoose.Schema({
    service: { type: String, required: true }, // Service name
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User reference
    status: { 
        type: String, 
        enum: ['waiting', 'completed', 'cancelled'], 
        default: 'waiting' 
    }, // Current status of the queue
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Queue = mongoose.model('Queue', queueSchema);

export default Queue;
