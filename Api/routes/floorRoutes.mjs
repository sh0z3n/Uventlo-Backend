import express from 'express';
import morgan from 'morgan';
import Floor from '../models/Floor.mjs';
import { createFloor, getFloors, getFloorById, updateFloor } from '../controllers/floorController.mjs';


const router = express.Router();

router.route('/').post(createFloor).get(getFloors);

router.route('/:id').get(getFloorById).put(updateFloor);

export default router;