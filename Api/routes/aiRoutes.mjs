import express from 'express';
import { aiBot } from '../middlewares/aiBot.mjs';

const router = express.Router();

// @desc Ask a question to the AI bot
// @route POST /api/v1/ai/ask
// @access Public
router.post('/ask', aiBot);

export default router;