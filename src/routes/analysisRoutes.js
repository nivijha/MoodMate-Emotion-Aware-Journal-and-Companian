const express = require('express');
const router = express.Router();
const { analyzeSentiment, generatePrompt } = require('../services/analysisService');
const auth = require('../middleware/auth');

// Protected routes
router.use(auth);

// Text analysis route
router.post('/text', async (req, res) => {
  try {
    const { text } = req.body;
    const analysis = await analyzeSentiment(text);
    res.json(analysis);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Prompt generation route
router.post('/prompt', async (req, res) => {
  try {
    const { mood } = req.body;
    const prompt = await generatePrompt(mood);
    res.json({ prompt });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router; 