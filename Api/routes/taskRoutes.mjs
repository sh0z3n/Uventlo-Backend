import express from 'express';
import morgan from 'morgan';

import { createTask , getTask , getTasks , deleteTask , updateTask} from '../controllers/taskController.mjs'


const router = express.Router();

// @desc Get all tasks
// @route GET /api/v1/tasks
// access Admin

router.get('/list',getTasks);


// @desc Get a specific task
// @route GET /api/v1/tasks/:id
// access admin 

router.get('/:id',getTask);

// @desc Update a task
// @route /api/v1/tasks/update
// @accesss admin or user idc 


router.put('/:id',updateTask);

// @desc Create a task
// @route /api/v1/tasks/create
// @access undefinde till now 

router.post('/create' , createTask);

// @desc Create a task
// @route /api/v1/tasks/create
// @access undefinde till now 

router.delete('/:id',deleteTask);






export default router;