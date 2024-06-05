import express from 'express';
import morgan from 'morgan';
import Floor from '../models/Floor.mjs';

export const createFloor = async (req, res) => {
    try {
        // const { name, spots, floormap, description, reservations } = req.body;
        // const newFloor = new Floor({
        //     name,
        //     spots,
        //     floormap,
        //     description, // this is the data you need to use 
        //     reservations
        // });
        // const savedFloor = await newFloor.save();
        const floorData = req.body;
        const newFloor = new Floor(floorData);
        const savedFloor = await newFloor.save();

        res.status(201).json(savedFloor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getFloors = async (req, res) => {
    try {
        const floors = await Floor.find();

        res.status(200).json(floors);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getFloorById = async (req, res) => {
    try {
        const { id } = req.params;

        const floor = await Floor.findById(id);

        if (!floor) {
            return res.status(404).json({ message: 'Floor not found' });
        }

        res.status(200).json(floor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateFloor = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const floor = await Floor.findByIdAndUpdate(id, updates , {
            new: true,
            runValidators: true,
          });

        res.status(200).json({message:"FLoor is updated",floor});
    }
    catch(error) 
    {
        res.status(500).json({messsage:"Internal server error"})
    }};


export const deleteFloor = async (req, res) => {
    try {
        const { id } = req.params;

        const floor = await Floor.findByIdAndDelete(id);

        if (!floor) {
            return res.status(404).json({ message: 'Floor not found' });
        }

        res.status(200).json({ message: 'Floor deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



