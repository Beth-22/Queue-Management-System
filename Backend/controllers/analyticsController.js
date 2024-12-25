import Analytics from '../models/Analytics.js';

// Create or update analytics data
export const updateAnalytics = async (req, res) => {
    const { metric, value } = req.body;

    try {
        let analytics = await Analytics.findOneAndUpdate(
            { metric },
            { value, timestamp: new Date() },
            { new: true, upsert: true }
        );
        res.json(analytics);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get analytics data
export const getAnalytics = async (req, res) => {
    try {
        const analytics = await Analytics.find();
        res.json(analytics);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
