import express from 'express';
import morgan from 'morgan';

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