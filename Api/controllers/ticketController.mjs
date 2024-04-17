//This controller will handle the logic for ticket-related operations, such as creating new tickets , updating ticket prices and availability, and retrieving ticket information.
import Ticket from '../models/Ticket.mjs';
import User from '../models/User.mjs';
import Event from '../models/Event.mjs';

// @desc Create a new ticket
export const createTicket = async (req, res) => {
    try {
      // Extract ticket data from the request body
      const { title, owner, email, type, date, location, eventname } = req.body;
  
      // Create a new ticket object using the Ticket model
      const newTicket = new Ticket({
        title,
        owner,
        email,
        type,
        eventname,
        date,
        location,
      });
  
      // Check if the owner exists
      const check = await User.findOne({ _id: owner });
      if (!check) {
        return res.status(400).json({ message: "User not found" });
      }
  
      // Check if the event exists
      const checkEvent = await Event.findOne({ _id: eventname });
      if (!checkEvent) {
        return res.status(400).json({ message: "Event not found" });
      }
  
      // Save the new ticket to the database
      await newTicket.save();
      console.log('Ticket saved to the database:', newTicket);
  
      // Respond with a success message and the created ticket object
      res.status(201).json({
        message: 'Ticket created successfully',
        ticket: newTicket
      });
    } catch (error) {
      // Handle any errors that occur during ticket creation
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
  
      // Check if the ticket exists
      const ticket = await Ticket.findById(ticketId);
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      // Check if the user making the request is authorized to delete the ticket
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
  
      // Check if the ticket exists
      const ticket = await Ticket.findById(ticketId);
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      // Check if the user making the request is authorized to update the ticket
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
  
      // Find the ticket by ID
      const ticket = await Ticket.findById(ticketId);
  
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      // Check if the user making the request is authorized to view the ticket
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

