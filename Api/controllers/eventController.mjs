import Event from '../models/Event.mjs';
import Feedback from '../models/Feedback.mjs';
import asyncHandler from 'express-async-handler';



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
          const name = req.params.name;
          const filter = { name: name };

         const event = await Event.findOne(filter); // if any one is coding through this  ,  my db ain't having the index till now i will add it later or maybe not 
        // const event = await Event.findById(req.params.id); m3ndich id XD
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
     const temp = req.params.name; // same here khoya
     const filter = { name: temp };

    const event = await Event.findOne(filter)
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
        const event = await Event.findOneAndDelete({ name: req.params.name });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        // if (req.user.role !=='admin')
        // {  it will help ya later f auth khoya jawad
        //     return res.status(403).json({ message: 'Not authorized to delete this event' });
        // }
        res.status(200).json({ message: 'Event dleted succefully' });
    } catch (error) {
        res.status(500).json({ message: 'Error while deleting event', error: error.message });
    }
});


