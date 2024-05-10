import moment from 'moment'
import Event from '../models/Event.mjs';
import User from '../models/User.mjs';
import ticket from '../models/Ticket.mjs';
import asyncHandler from 'express-async-handler';

export const createEvent = asyncHandler(async (req, res) => {
  try {
    //  for yasseur so he can get to know which dat to get or smthng
      // const {name, description, date, organzied_by, mode, location, image } = req.body;
      // const event = new Event({
      //     name,
      //     description,
      //     date,
      //     location,
      //     organzied_by, 
      //     mode,
      //     image
      // });
      // await event.save(); 
    const Eventdata = req.body;
    const newevent = new Event(Eventdata);
    const savedevent = await newevent.save();
    res.status(201).json(savedevent);
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
    const updates = req.body;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const updatedEvent = await Event.findByIdAndUpdate(id, updates, { 
      new: true,
      runValidators: true,
    });
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


export const getEventAttendeeTypeCounts = async (req,res) => {
  try{
    const eventAttendeeTypeCounts = await Event.getAttendeeTypeCounts();
    res.json(eventAttendeeTypeCounts);
  }
  catch(error)
  {
    res.status(500).json({message:"Error while fetching the event attendee type counts"})
  }
};

export const NextEventDate = async (req,res)=> {
  try{
    const currentEventId = req.params.eventId;
    const nextEventDate = await Event.getNextEventDate(currentEventId);
    res.json({ nextEventDate });
  }
  catch(error){res.status(500).json({message:"Error While Fetching the next event date", error:error.message})}
};
export const getLastEventRemainingTasks = async (req, res) => {
  try {
    const lastEvent = await Event.findOne({}, {}, { sort: { 'createdAt': -1 } }).populate('tasks');
    
    const overallAccomplishment = lastEvent.calculateOverallAccomplishment();
    
    const remainingTasks = lastEvent.tasks.filter(task => task.status !== 'Completed');
    const remainingTaskTitles = remainingTasks.map(task => task.title);

    const tagCounts = remainingTasks.reduce((acc, task) => { 
      acc[task.tag] = (acc[task.tag] || 0) + 1;
      return acc;
    }, {});

    const totalRemainingTasks = remainingTasks.length;

    const tagPercentages = {};
    for (const tag in tagCounts) {
      tagPercentages[tag] = ((tagCounts[tag] / totalRemainingTasks) * 100).toFixed(2); 
    }

    const totalTimeOfAccomplishment = remainingTasks.reduce((total, task) => {
      const weeksSinceStart = moment().diff(moment(task.start), 'weeks');
      return total + weeksSinceStart;
    }, 0);


    res.json({ 
      overallAccomplishment: `${overallAccomplishment.toFixed(2)}%`,
      remainingTasksTitles: remainingTaskTitles,

      remainingTasks: {
        total: totalRemainingTasks,
        tags: tagPercentages,
        totalTimeOfAccomplishmentInWeeks: totalTimeOfAccomplishment
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching remaining tasks", error });
  }
};

export const number_attendences = async (req,res)=> {
  const event = req.params.eventId

  const total = await User.countDocuments({ attendedEvents : {$exists:true , $not:{$size:0}}});
  const classification = await User.find({attandences : {$exists:true}})
  res.json({total:total,list:classification})
}
