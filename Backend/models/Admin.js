import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Links to User model
    permissions: { type: [String], default: ['manageQueues', 'viewReports'] }, // List of admin capabilities
    createdAt: { type: Date, default: Date.now },
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
