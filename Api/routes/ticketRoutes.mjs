import express from 'express';
// import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.mjs';
import { createTicket  , getTickets  , getTicket ,updateTicket,  deleteTicket } from './../controllers/ticketController.mjs'


const router = express.Router();

//@desc Create a ticket
//@route POST /api/tickets/create
//@access Private

router.post('/create',createTicket);

//@desc Get all tickets
//@route GET /api/tickets
//@access Private

router.get('/list',getTickets);

//@desc Get a ticket
//@route GET /api/tickets/:id
//@access Private

router.get('/:id',getTicket);

//@desc Update a ticket
//@route PUT /api/tickets/:id
//@access Private

router.put('/:id',updateTicket);

//@desc Delete a ticket
//@route DELETE /api/tickets/:id
//@access Private

router.delete('/:id',deleteTicket);

//@desc make a qr code for a ticket
//@route GET /api/tickets/:id/qrcode
//@access Private

// router.get('/:name/qrcode',getQRCode);


export default router;