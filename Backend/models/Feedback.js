import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, // Links feedback to a specific user
    },
    service: {
        type: String,
        required: true, // Name of the service for which feedback is provided
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5, // Rating should be between 1 and 5
    },
    comment: {
        type: String,
        maxlength: 500, // Optional comment, limited to 500 characters
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically records when the feedback is submitted
    },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
