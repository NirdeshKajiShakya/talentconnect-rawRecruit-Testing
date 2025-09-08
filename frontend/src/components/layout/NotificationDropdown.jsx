import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUserPlus } from 'react-icons/fi';
import axios from 'axios';

function NotificationsDropdown({ notifications, setNotifications, setUnreadCount }) {
    const navigate = useNavigate();

    const handleNotificationClick = async (notification) => {
        // Mark as read on the backend if it's unread
        if (!notification.read) {
            try {
                await axios.patch(
                    `${import.meta.env.VITE_Backend_URL}/api/notifications/${notification._id}/read`,
                    {},
                    { withCredentials: true }
                );
                // Update state locally
                setNotifications(prev => 
                    prev.map(n => n._id === notification._id ? { ...n, read: true } : n)
                );
                setUnreadCount(prev => prev - 1);
            } catch (error) {
                console.error("Failed to mark notification as read:", error);
            }
        }

        // Navigate to the correct page based on type
        if (notification.type === 'TEAM_INVITATION') {
            navigate('/invitations');
        }
        // Add other notification types here
    };

    return (
        <div className="absolute right-0 z-50 mt-2 w-80 origin-top-right bg-white rounded-md shadow-lg dropdown-menu">
            <div className="py-1 bg-white rounded-md ring-1 ring-black ring-opacity-5">
                <div className="px-4 py-2 font-bold text-gray-700 border-b">Notifications</div>
                <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-gray-500">No new notifications.</div>
                    ) : (
                        notifications.map((notification) => (
                            <div
                                key={notification._id}
                                onClick={() => handleNotificationClick(notification)}
                                className={`flex items-start px-4 py-3 text-sm cursor-pointer hover:bg-gray-100 ${!notification.read ? 'bg-blue-50' : ''}`}
                            >
                                <div className="p-2 mr-3 text-blue-500 bg-blue-100 rounded-full">
                                    <FiUserPlus />
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-800">{notification.message}</p>
                                    <p className="text-xs text-gray-400">
                                        {new Date(notification.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                {!notification.read && (
                                    <div className="w-2 h-2 ml-2 bg-blue-500 rounded-full self-center"></div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default NotificationsDropdown;