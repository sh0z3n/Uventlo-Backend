//This controller will handle the logic for ticket-related operations, such as creating new tickets , updating ticket prices and availability, and retrieving ticket information.
import Ticket from '../models/Ticket.mjs';
import User from '../models/User.mjs';
import Event from '../models/Event.mjs';
import qrcode from 'qrcode'

// @desc Create a new ticket
export const createTicket = async (req, res) => {
  try {
    const { owner, event, ticketData } = req.body;

    const user = await User.findById(owner);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const events = await Event.findById(event);
    if (!events) {
      return res.status(400).json({ message: "Event not found" });
    }

    // const qrCodeData = JSON.stringify({ userName: user.name, eventDate: events.date, userEmail: user.email, ...ticketData });
    // const qrCode = await qrcode.toDataURL(qrCodeData);

    const newTicketData = { owner, event, ...ticketData };
    const newTicket = new Ticket(newTicketData);
    await newTicket.save();

    await User.findByIdAndUpdate(owner, { $push: { tickets: newTicket._id, attendedEvents: { event: event, date: new Date() } } });
   
    res.status(201).json({
      message: 'Ticket created successfully',
      ticket: newTicket
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create ticket',
      error: error.message
    });
  }
};

// @desc   Get all tickets
export const getTickets = async (req, res) => {
    try {
      const tickets = await Ticket.find();
      if (!tickets) {
        return res.status(404).json({ message: 'No tickets found' });
      }
      res.status(200).json(tickets);
      console.log("Tickets fetched successfully");
    } catch (error) {
      res.status(400).json({ message: 'Failed while fetching tickets', error: error.message });
    }
  };


  export const deleteTicket = async (req, res) => {
    try {
      const ticketId = req.params.id;
  
      const ticket = await Ticket.findById(ticketId);
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      const user = await User.findById(ticket.owner);
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      // Check if the user is the owner of the ticket
    //   if (user._id.toString() !== req.user._id.toString()) {
    //     return res.status(403).json({ message: 'Forbidden' });
    //   }
  
      // Delete the ticket
      await Ticket.findByIdAndDelete(ticketId);
  
      return res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error while deleting ticket', error: error.message });
    }
  };

  export const updateTicket = async (req, res) => {
    try {
      const ticketId = req.params.id;
      const updatedTicketData = req.body;
  
      const ticket = await Ticket.findById(ticketId);
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      const user = await User.findById(ticket.owner);
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      // Check if the user is the owner of the ticket
    //   if (user._id.toString() !== req.user._id.toString()) {
    //     return res.status(403).json({ message: 'Forbidden' });
    //   }
  
      // Update the ticket
      const updatedTicket = await Ticket.findByIdAndUpdate(
        ticketId,
        updatedTicketData,
        { new: true }
      );
  
      return res.status(200).json({ message: 'Ticket updated successfully', updatedTicket });
    } catch (error) {
      return res.status(500).json({ message: 'Error while updating ticket', error: error.message });
    }
  };


  export const getTicket = async (req, res) => {
    try {
      const ticketId = req.params.id;
  
      const ticket = await Ticket.findById(ticketId);
  
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      const user = await User.findById(ticket.owner);
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      // Check if the user is the owner of the ticket or an admin
    //   if (user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    //     return res.status(403).json({ message: 'Forbidden' });
    //   }
  
      res.status(200).json(ticket);
      console.log("Ticket fetched successfully");
    } catch (error) {
      res.status(400).json({ message: 'Failed while fetching ticket', error: error.message });
    }
  };









// we need to import that qr string whatever

// export const getqrforticket = async (req, res) => {
//     try {
//         const ticket = await Ticket.findById(req.params.id);
//         if (!ticket) {
//             return res.status(404).json({ message: 'Ticket not found' });
//         }
//         // Generate a QR code for the ticket
//         const qrCode = await ticket.generateQRCode();
//         res.status(200).json({ message: 'QR code generated successfully', qrCode });
//     } catch (error) {
//         res.status(400).json({ message: 'Failed to generate QR code', error: error.message });
//     }
// };

