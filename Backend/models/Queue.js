import mongoose from "mongoose";

const queueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true }, // Stores scheduled date
  time: { type: String, required: true }, // Stores scheduled time
  services: [{ type: String, required: true }], // ✅ Array of services
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users in the queue
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Admin who created the queue
}, { timestamps: true });

const Queue = mongoose.model("Queue", queueSchema);
export default Queue;
