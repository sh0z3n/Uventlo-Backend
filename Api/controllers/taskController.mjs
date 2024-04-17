import morgan from 'morgan';
import Task from '../models/Task.mjs';
import User from '../models/User.mjs';

export const createTask = async (req,res) =>{
    try{
        const { user , title, tag, assignedTo, start, deadline, status } = req.body
     
            const newTask = new Task({
                user : user,
                title: title,
                tag: tag,
                assignedTo: assignedTo,
                start: start,
                deadline: deadline,
                status: status
            });

            console.log("wiwjwoijw")
            const assignedUser = await User.findById(assignedTo);
            console.log("wiwjwoijw")
        if (!assignedUser) {
            throw new Error('Assigned user does not exist');
        }

            await newTask.save();
           res.json({ success: true, message: 'Task created successfully', task: newTask })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create task', error: error.message })
    };

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
        const { id, title, tag, assignedTo, start, deadline, status } = req.body;
        if (!id || !title || !tag || !assignedTo || !start || !deadline || !status) {
            throw new Error('Missing required parameters');
        }

        const task = await Task.findById(id);
        if (!task) {
            throw new Error('Task does not exist');
        }

        task.title = title;
        task.tag = tag;
        task.assignedTo = assignedTo;
        task.start = start;
        task.deadline = deadline;
        task.status = status;

        await task.save();
        res.json ({ success: true, message: 'Task updated successfully', task: task });
    } catch (error) {
        res.json( { success: false, message: 'Failed to update task', error: error.message });
    }
}

export const getTask = async (req, res) => {
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

        await Task.deleteOne({ _id: id }); // Use deleteOne method to delete the task
        res.json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Failed to delete task', error: error.message });
    }
};



