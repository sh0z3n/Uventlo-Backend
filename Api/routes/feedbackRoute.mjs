import express from 'express';
import { createFeedback, getFeedbackById, updateFeedback , getEventRatings , getEventFeedback } from '../controllers/feedbackController.mjs';
import { isAdmin , authMiddleware } from '../middlewares/authMiddleware.mjs';
const router = express.Router();

// @desc Create a new feedback
// @route POST /api/v1/feedback
// @access Private
router.post('/', authMiddleware, createFeedback);

// @desc Get all feedback for an event
// @route GET /api/v1/events/:eventId/feedback
// @access Admin
router.get('/events/:eventId/feedback', authMiddleware, isAdmin, getEventFeedback);

// @desc Get a specific feedback
// @route GET /api/v1/feedback/:id
// @access Admin
router.get('/:id', authMiddleware, isAdmin, getFeedbackById);

// @desc Update a feedback
// @route PUT /api/v1/feedback/:id
// @access Admin
router.put('/:id', authMiddleware, isAdmin, updateFeedback);

// @desc Delete a feedback
// @route DELETE /api/v1/feedback/:id
// @access Admin

router.get('/:id', authMiddleware, isAdmin, getEventRatings);


export default router;