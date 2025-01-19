import Queue from "../models/Queue.js";
import User from "../models/User.js";

// Admin Creates a Queue
export const createQueue = async (req, res) => {
  const { name, service } = req.body;

  try {
    const queue = await Queue.create({
      name,
      service,
      creator: req.user._id,
      participants: []
    });

    res.status(201).json(queue);
  } catch (error) {
    res.status(500).json({ message: "Failed to create queue." });
  }
};

// Customer Joins a Queue (Max 60 Participants)
export const joinQueue = async (req, res) => {
  try {
    const queue = await Queue.findById(req.params.queueId);

    if (!queue) {
      return res.status(404).json({ message: "Queue not found." });
    }

    if (queue.participants.length >= 60) {
      return res.status(400).json({ message: "Queue is full (Max 60)." });
    }

    if (queue.participants.includes(req.user._id)) {
      return res.status(400).json({ message: "You are already in this queue." });
    }

    queue.participants.push({ user: req.user._id, joinedAt: new Date() });
    await queue.save();

    res.status(200).json({ message: "Joined queue successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to join queue." });
  }
};

// Customer Completes a Queue
export const completeQueue = async (req, res) => {
  try {
    const queue = await Queue.findById(req.params.queueId);
    if (!queue) return res.status(404).json({ message: "Queue not found." });

    queue.participants = queue.participants.filter(
      (p) => p.user.toString() !== req.user._id.toString()
    );
    await queue.save();

    res.status(200).json({ message: "Queue completed and removed." });
  } catch (error) {
    res.status(500).json({ message: "Failed to complete queue." });
  }
};

// Automatically Remove Expired Customers Every 15 Min
export const removeExpiredCustomers = async () => {
  try {
    const now = new Date();
    const expirationTime = new Date(now.getTime() - 15 * 60 * 1000);

    const queues = await Queue.find({});
    queues.forEach(async (queue) => {
      queue.participants = queue.participants.filter(
        (p) => p.joinedAt > expirationTime
      );
      await queue.save();
    });

    console.log("Expired customers removed.");
  } catch (error) {
    console.error("Failed to remove expired customers:", error);
  }
};

// Get Queues for Customers
export const getCustomerQueues = async (req, res) => {
  try {
    const queues = await Queue.find({ "participants.user": req.user._id });
    res.status(200).json(queues);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch queues." });
  }
};

// Get Queues for Admin
export const getAdminQueues = async (req, res) => {
  try {
    const queues = await Queue.find({ creator: req.user._id });
    res.status(200).json(queues);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch queues." });
  }
};
