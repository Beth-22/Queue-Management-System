import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
    metric: { type: String, required: true }, // Name of the metric (e.g., 'averageWaitTime')
    value: { type: Number, required: true }, // Value of the metric
    timestamp: { type: Date, default: Date.now }, // Time when the metric was recorded
});

const Analytics = mongoose.model('Analytics', analyticsSchema);

export default Analytics;
