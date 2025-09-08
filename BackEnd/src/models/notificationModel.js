import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    // The user who receives the notification
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true,
    },
    // The user or entity that triggered the notification
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth', // Can also refer to a CompanyProfile if a system sends it
        required: true,
    },
    // Type of notification to handle different actions on the frontend
    type: {
        type: String,
        enum: ['TEAM_INVITATION', 'MESSAGE', 'SYSTEM_UPDATE'],
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    // To link directly to the item, e.g., the invitation or a job post
    referenceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    read: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;