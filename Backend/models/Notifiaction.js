import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Links to User model
    message: { type: String, required: true }, // Content of the notification
    type: { type: String, enum: ['email', 'sms', 'push'], required: true }, // Type of notification
    status: { type: String, enum: ['sent', 'failed'], default: 'sent' }, // Delivery status
    createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
