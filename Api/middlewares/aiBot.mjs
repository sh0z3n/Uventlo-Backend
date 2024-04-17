import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import uventlo from '../tests/uventlo.mjs';

const router = express.Router();

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyAHFGQTyEmxbl24eNtfL6eTTQ4b8T8NQtc");

// @desc Generate short answer for a prompt
// @route POST /api/v1/ai/generate
// @access Public
router.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(" in just 4 lines : "+uventlo +"the most  important thing and you have to answer on : "+prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;