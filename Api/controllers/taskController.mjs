import morgan from 'morgan';
import Task from '../models/Task.mjs';
import User from '../models/User.mjs';
import Event from '../models/Event.mjs';

export const createTask = async (req,res) =>{
    try{
        const { user , title, tag, assignedTo, start, deadline, status , eventId } = req.body
     
            const newTask = new Task({
                eventId:eventId,
                user : user,
                title: title,
                tag: tag,
                assignedTo: assignedTo,
                start: start,
                deadline: deadline,
                status: status
            });
            const assignedUser = await User.findById(assignedTo);

        if (!assignedUser) {
            throw new Error('Assigned user does not exist');
        }
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        await newTask.save();
        event.tasks.push(newTask._id);
        await event.save()
        res.json({ success: true, message: 'Task created successfully', task: newTask })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create task', error: error.message })
    };

};


export const getTasksByEventId = async (req, res) => {
    try {
      const eventId = req.params.eventId;
  
      const tasks = await Task.find({ eventId: eventId });
  
      if (!tasks || tasks.length === 0) {
        return res.status(404).json({ message: 'No tasks found for the specified event' });
      }
  
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error while fetching tasks', error: error.message });
    }
  };

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        if (!tasks) {
            throw new Error('No tasks found');
        }
        res.json( { success: true, tasks: tasks });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch tasks', error: error.message });
    }
}


export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const task = await Task.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });
        if (!task) {
            throw new Error('Task does not exist');
        }
        res.json ({ success: true, message: 'Task updated successfully', task: task });
    } catch (error) {
        res.json( { success: false, message: 'Failed to update task', error: error.message });
    }
}

export const getTaskbyID = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new Error('Missing required parameters');
        }

        const task = await Task.findById(id);
        if (!task) {
            throw new Error('Task does not exist');
        }

        res.json( { success: true, task: task });
    } catch (error) {
        res.json( { success: false, message: 'Failed to fetch task', error: error.message });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new Error('Missing task ID');
        }

        const task = await Task.findById(id);
        if (!task) {
            throw new Error('Task not found');
        }

        await Task.deleteOne({ _id: id }); 
        res.json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Failed to delete task', error: error.message });
    }
};



const calculateRemainingTasks = async (eventId) => {
    const totalTasks = await Task.countDocuments({ event: eventId });
    const completedTasks = await Task.countDocuments({ event: eventId, status: 'completed' });
    return totalTasks - completedTasks;
}


export const overallTaskAccomplishment = async (req, res) => {
    try {
        const totalEvents = await Event.find();
        let totalTasks = 0;
        let completedTasks = 0;

        for (const event of totalEvents) {
            totalTasks += event.totalTasks;
            completedTasks += event.completedTasks;
        }

        const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
        res.json({ success: true, message: 'Overall task accomplishment percentage', percentage });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to calculate overall task accomplishment percentage', error: error.message });
    }
}
