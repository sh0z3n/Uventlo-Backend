// import express from 'express';
// // import { broadcastNotification, sendNotificationToUser, getUserNotifications } from '../controllers/notificationController.js';
// // import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';


// const router = express.Router();

// // @desc Send a notification to all users
// // @route POST /api/v1/notifications/broadcast
// // @access Admin
// router.post('/broadcast', authMiddleware, isAdmin, broadcastNotification);

// // @desc Send a notification to a specific user
// // @route POST /api/v1/notifications/:userId
// // @access Admin
// router.post('/:userId', authMiddleware, isAdmin, sendNotificationToUser);

// // @desc Get all notifications for a user
// // @route GET /api/v1/users/:userId/notifications
// // @access Private
// router.get('/users/:userId/notifications', authMiddleware, getUserNotifications);



// export default router;