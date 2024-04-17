import express from 'express';
import morgan from 'morgan';
import Floor from '../models/Floor.mjs';


const router = express.Router();

export const createFloor = async (req, res) => {
    try {
        const { name, spots, floormap, description, reservations } = req.body;

        // Create a new floor object
        const newFloor = new Floor({
            name,
            spots,
            floormap,
            description,
            reservations
        });

        // Save the new floor to the database
        const savedFloor = await newFloor.save();

        // Send back the saved floor as a response
        res.status(201).json(savedFloor);
    } catch (error) {
        // If an error occurs, send an error response
        res.status(400).json({ message: error.message });
    }
};


export const getFloor = async (req, res) => {
    try {
        const floors = await Floor.find();
        res.status(200).json(floors);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const updateFloor = async (req, res) => {   
    try {
        const { id } = req.params;
        const { name, spots, floormap, description, reservations } = req.body;

        // Check if the floor exists
        const floor = await Floor.findById(id);

        // If the floor does not exist, send an error response
        if (!floor) {
            return res.status(404).json({ message: 'Floor not found' });
        }

        // Update the floor
        floor.name = name;
        floor.spots = spots;
        floor.floormap = floormap;
        floor.description = description;
        floor.reservations = reservations;

        // Save the updated floor
        const updatedFloor = await floor.save();

        // Send back the updated floor as a response
        res.status(200).json(updatedFloor);
    } catch (error) {
        // If an error occurs, send an error response
        res.status(400).json({ message: error.message });
    }
}


router.post('/', createFloor);
router.put('/:id',updateFloor);
router.get ('/', getFloor);


export default router;