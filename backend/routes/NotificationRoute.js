const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/NotificationController');

router.post('/', notificationController.createNotification);
router.get('/user/:userId', notificationController.getNotificationsByUserId);
router.put('/:id/read', notificationController.markAsRead);
router.get('/:id', notificationController.getNotificationById);
router.put('/:id', notificationController.updateNotification);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;