import Feedback from '../models/Feedback.js';
import validateInputs from '../utils/validateInputs.js';

export const submitFeedback = async (req, res) => {
    const { userId, service, rating, comment } = req.body;

    try {
        validateInputs(req.body, ['userId', 'service', 'rating']);

        const feedback = await Feedback.create({ user: userId, service, rating, comment });
        res.status(201).json(feedback);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getServiceFeedback = async (req, res) => {
    const { service } = req.params;

    try {
        const feedbacks = await Feedback.find({ service }).populate('user', 'name email');
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
