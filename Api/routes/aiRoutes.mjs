import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import uventlo from '../tests/uventlo.mjs';

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// @desc Generate short answer for a prompt
// @route POST /api/v1/ai/generate
// @access Public
router.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(" in just 4 lines : "+uventlo +" the most  important thing and you have to answer on : "+prompt);
    const response = await result.response;
    const text = response.text();
   
        res.json({ text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Uventlo AI Bot is not responding ' });
  }
});

export default router;
