import Notification from '../models/Notifiaction.js';
import sendEmail from '../utils/sendEmail.js';

export const createNotification = async (req, res) => {
    const { userId, message, type } = req.body;

    try {
        const notification = await Notification.create({ user: userId, message, type });

        if (type === 'email') {
            const emailSubject = 'Notification from Werefa Queue Management System';
            const emailBody = `<p>${message}</p>`;
            await sendEmail(req.user.email, emailSubject, emailBody);
        }

        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getUserNotifications = async (req, res) => {
    const { userId } = req.params;

    try {
        const notifications = await Notification.find({ user: userId });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
