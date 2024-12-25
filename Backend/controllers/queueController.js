import Queue from '../models/Queue.js';
import validateInputs from '../utils/validateInputs.js';

// Create a new queue entry
export const createQueue = async (req, res) => {
    const { service, userId } = req.body;

    try {
        validateInputs(req.body, ['service', 'userId']);

        const queue = await Queue.create({ service, user: userId });
        res.status(201).json(queue);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all queue entries (with optional filters)
export const getAllQueues = async (req, res) => {
    const { status, service } = req.query; // Optional filters from query parameters

    try {
        // Build filter object based on provided query parameters
        const filter = {};
        if (status) filter.status = status;
        if (service) filter.service = service;

        const queues = await Queue.find(filter).populate('user', 'name email'); // Populate user details
        res.json(queues);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update queue status
export const updateQueueStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        validateInputs(req.body, ['status']);

        const queue = await Queue.findByIdAndUpdate(id, { status }, { new: true });
        if (!queue) return res.status(404).json({ error: 'Queue not found' });

        res.json(queue);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a queue entry
export const deleteQueue = async (req, res) => {
    const { id } = req.params;

    try {
        const queue = await Queue.findByIdAndDelete(id);
        if (!queue) return res.status(404).json({ error: 'Queue not found' });

        res.json({ message: 'Queue deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
