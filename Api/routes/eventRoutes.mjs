import express from 'express';
import {isAdmin} from '../middlewares/isAdmin.mjs';
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent  } from '../controllers/eventController.mjs';

const router = express.Router();

// @desc Create a new event
// @route POST /api/v1/events
// @access Admin
router.post('/create',  createEvent); // done

// @desc Get all events
// @route GET /api/v1/events
// @access Public
router.get('/list', getAllEvents); // done

// @desc Get a specific event
// @route GET /api/v1/events/:id
// @access Public
router.get('/:id', getEventById); // done

// @desc Update an event
// @route PUT /api/v1/events/:id
// @access Admin
router.put('/:id',  updateEvent); // done

// @desc Delete an event
// @route DELETE /api/v1/events/:id
// @access Admin
router.delete('/:id' , deleteEvent); // done




export default router;





