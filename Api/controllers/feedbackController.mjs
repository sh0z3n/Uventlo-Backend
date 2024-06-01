
import express from 'express';


export const createFeedback = asyncHandler(async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const feedback = new Feedback.create({
            name,
            email,
            message,
        });
        res.status(201).json(feedback);
    } catch (error) {
        res.status(500).json({ message: 'Error while creating feedback', error: error.message });
    }
});


export const getAllFeedbacks = asyncHandler(async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        if (!feedbacks) {
            return res.status(404).json({ message: 'No feedbacks found' });
        }
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching feedbacks', error: error.message });
    }
});



export const getFeedbackById = asyncHandler(async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching feedback', error: error.message });
    }
});



export const updateFeedback = asyncHandler(async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        const { name, email, message } = req.body;
        feedback.name = name;
        feedback.email = email;
        feedback.message = message;
        await feedback.save();
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ message: 'Error while updating feedback', error: error.message });
    }
});



//############################################################################################################

// export const getEventFeedback = asyncHandler(async (req, res) => { 
//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//       res.status(404);
//       throw new Error('Invalid event ID');
//     }
  
//     const feedback = await Feedback.find({ eventId: req.params.id }).populate('user', 'name email');
  
//     if (!feedback) {
//       res.status(404);
//       throw new Error('No feedback found for this event');
//     }
  
//     res.status(200).json(feedback);
//   });
  
//   // @desc Rate an event
//   // @route POST /api/v1/events/:id/rate
//   // @access Private (Authenticated User)
//   export const rateEvent = asyncHandler(async (req, res) => {
//     const { rating } = req.body;
  
//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//       res.status(404);
//       throw new Error('Invalid event ID');
//     }
  
//     const eventRating = await Rating.create({
//       eventId: req.params.id,
//       user: req.user._id,
//       rating,
//     });
  
//     res.status(201).json(eventRating);
//   });
  
//   // @desc Get ratings for an event
//   // @route GET /api/v1/events/:id/ratings
//   // @access Public
//   export const getEventRatings = asyncHandler(async (req, res) => {
//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//       res.status(404);
//       throw new Error('Invalid event ID');
//     }
  
//     const ratings = await Rating.find({ eventId: req.params.id }).populate('user', 'name email');
  
//     if (!ratings) {
//       res.status(404);
//       throw new Error('No ratings found for this event');
//     }
  
//     res.status(200).json(ratings);
//   });
//############################################################################################################
