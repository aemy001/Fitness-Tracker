import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`http://localhost:5000/FitnessTracker/notifications/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [userId]);

  return (
    <div>
      <h4>Your Notifications</h4>
      <ul>
        {notifications.map(notification => (
          <li key={notification._id}>
            <strong>{notification.type}</strong>: {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
