import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import uventlo from '../tests/uventlo.mjs';
import { createClient } from 'redis';

const client = createClient({
  password: 'q6l77zBA0ClgLUGy3EwmL8ikv7N5YMUc',
  socket: {
    host: 'redis-11151.c278.us-east-1-4.ec2.redns.redis-cloud.com',
    port: 11151
  }
});

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

async function storePromptAndValue(prompt, value) {
  try {
    const index = await client.incr('counter');
    
    await client.set(`prompt${index}`, prompt);
    await client.set(`prompt${index}_value`, value);
  } catch (error) {
    console.error('Error storing prompt and value:', error);
  }
}

async function getPromptAndValue(prompt) {
  try {
    const value = await client.get(`prompt:${prompt}`);
    return value;
  } catch (error) {
    console.error('Error retrieving prompt and value:', error);
    return null;
  }
}

async function getAllPromptAndValues() {
  try {
    const keys = await client.keys('prompt*');
    const values = await Promise.all(keys.map(key => client.get(key)));
    const promptsAndValues = values.reduce((acc, value, index) => {
      if (index % 2 === 0) {
        acc.push({ prompt: values[index + 1] ,value: value});
      }
      return acc;
    }, []);
    return promptsAndValues;
  } catch (error) {
    console.error('Error retrieving prompts and values:', error);
    return [];
  }
}


const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// @desc Generate short answer for a prompt
// @route POST /api/v1/ai/generate
// @access Public
router.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(" in just 4 lines : " + uventlo + " the most important thing and you have to answer on : " + prompt);
    const response = await result.response;
    const text = response.text();

    const promptsAndValues = await getAllPromptAndValues();
    await storePromptAndValue(prompt, text);

    res.json({ text ,promptsAndValues });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Uventlo AI Bot is not responding ' });
  }
});

export default router;
