import express from 'express';
// import { createFeedback, getFeedbackById, updateFeedback, deleteFeedback } from '../controllers/feedbackController.js';


const router = express.Router();

// @desc Create a new feedback
// @route POST /api/v1/feedback
// @access Private
router.post('/feedback', authMiddleware, createFeedback);

// @desc Get all feedback for an event
// @route GET /api/v1/events/:eventId/feedback
// @access Admin
router.get('/events/:eventId/feedback', authMiddleware, isAdmin, getEventFeedback);

// @desc Get a specific feedback
// @route GET /api/v1/feedback/:id
// @access Admin
router.get('/feedback/:id', authMiddleware, isAdmin, getFeedbackById);

// @desc Update a feedback
// @route PUT /api/v1/feedback/:id
// @access Admin
router.put('/feedback/:id', authMiddleware, isAdmin, updateFeedback);

// @desc Delete a feedback
// @route DELETE /api/v1/feedback/:id
// @access Admin

router.delete('/feedback/:id', authMiddleware, isAdmin, deleteFeedback);

export default router;