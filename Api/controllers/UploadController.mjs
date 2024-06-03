// imageController.js
import asyncHandler from 'express-async-handler';
import upload from './multer.js';

export const uploadImage = asyncHandler(async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = `http://uventlo.icu/uploads/${req.file.filename}`; 
    res.status(200).json({ message: 'Image uploaded successfully', imageUrl });
  });
});