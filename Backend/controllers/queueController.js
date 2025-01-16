import Queue from "../models/Queue.js";

/**
 * Create a new queue
 */
export const createQueue = async (req, res) => {
  const { name, service, status = "waiting" } = req.body;

  try {
    // Validate required fields
    if (!name || !service) {
      return res.status(400).json({ error: "Name and service are required." });
    }

    const queue = await Queue.create({
      name,
      service,
      creator: req.user._id,
      status,
    });

    res.status(201).json(queue);
  } catch (error) {
    res.status(500).json({ error: "Failed to create queue." });
  }
};

/**
 * Get all queues
 */
export const getAllQueues = async (req, res) => {
  const { status, service } = req.query;

  try {
    const filter = {};
    if (status) filter.status = status;
    if (service) filter.service = new RegExp(service, "i"); // Case-insensitive search

    const queues = await Queue.find(filter).populate("creator", "name email");
    res.status(200).json(queues);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch queues." });
  }
};

/**
 * Get queues created by the logged-in user
 */
export const getCreatedQueues = async (req, res) => {
  try {
    const queues = await Queue.find({ creator: req.user._id });
    res.status(200).json(queues);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch created queues." });
  }
};

/**
 * Get queues the user is waiting for
 */
export const getWaitingQueues = async (req, res) => {
  try {
    const queues = await Queue.find({ participants: req.user._id });
    res.status(200).json(queues);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch waiting queues." });
  }
};

/**
 * Update queue status
 */
export const updateQueueStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!status) {
      return res.status(400).json({ error: "Status is required." });
    }

    const queue = await Queue.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!queue) {
      return res.status(404).json({ error: "Queue not found." });
    }

    res.status(200).json(queue);
  } catch (error) {
    res.status(500).json({ error: "Failed to update queue status." });
  }
};

/**
 * Delete a queue
 */
export const deleteQueue = async (req, res) => {
  const { id } = req.params;

  try {
    const queue = await Queue.findByIdAndDelete(id);

    if (!queue) {
      return res.status(404).json({ error: "Queue not found." });
    }

    res.status(200).json({ message: "Queue deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete queue." });
  }
};
