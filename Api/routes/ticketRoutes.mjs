import express from 'express';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.mjs';
import { createTicket  , getTickets  , getTicket ,updateTicket,  deleteTicket } from './../controllers/ticketController.mjs'


const router = express.Router();

//@desc Create a ticket
//@route POST /api/tickets/create
//@access Private

router.post('/create',authMiddleware,createTicket);

//@desc Get all tickets
//@route GET /api/tickets
//@access Admin

router.get('/list',authMiddleware,getTickets);

//@desc Get a ticket
//@route GET /api/tickets/:id
//@access Private

router.get('/:id',authMiddleware,getTicket);

//@desc Update a ticket
//@route PUT /api/tickets/:id
//@access Private

router.put('/:id',authMiddleware ,updateTicket);

//@desc Delete a ticket
//@route DELETE /api/tickets/:id
//@access Private

router.delete('/:id',authMiddleware , deleteTicket);

//@desc make a qr code for a ticket
//@route GET /api/tickets/:id/qrcode
//@access Private

// router.get('/:name/qrcode',getQRCode);


export default router;