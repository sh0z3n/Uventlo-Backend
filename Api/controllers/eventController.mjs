import Event from '../models/Event.mjs';
import Feedback from '../models/Feedback.mjs';
import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';

const stripe = Stripe("sk_test_51PBEikRwJlue2n0pHhZOSZAuro9Llo2CLCW4vviyUkKyJjckaScO5Xtra269wZzDR0AOkLStsb2nEDVZkOoKlrSN00hXOpi4VQ")

export const createEvent = asyncHandler(async (req, res) => {
  try {
      const { name, description, date, organzied_by, mode, location, image } = req.body;
      const event = new Event({
          name,
          description,
          date,
          location,
          organzied_by, 
          mode,
          image
      });
      await event.save(); 
      res.status(201).json(event);
  } catch (error) {
      res.status(500).json({ message: 'Error while creating event', error: error.message });
  }
});

export const getAllEvents = asyncHandler(async (req, res) => {
    try {
        const events = await Event.find();
        if (!events) {
            return res.status(404).json({ message: 'No events found' });
        }
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching events', error: error.message });
    }
});

export const getEventById = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching event', error: error.message });
    }
});

export const updateEvent = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const { name, description, date, mode, location, image, organzied_by } = req.body;
    event.name = name;
    event.description = description;
    event.date = date;
    event.mode = mode;
    event.location = location;
    event.image = image;
    event.organizedBy = organzied_by;

    await event.save();
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error while updating event', error: error.message });
  }
});

export const deleteEvent = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error while deleting event', error: error.message });
    }
});

export const payment = asyncHandler (async (req,res) =>{
    const { amount, currency, token } = req.body;

  try {
    // Create a payment intent using the Stripe API
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: token,
      confirm: true,
    });

    // Return the payment intent status to the client
    res.json({ status: paymentIntent.status });

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing the payment.' });
  }
});

