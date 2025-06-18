const express = require('express');
const router = express.Router();
const { createEntry, getEntry, getMoodSummary, deleteEntry } = require('../controllers/journalController');
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Protected routes
router.use(auth);

// Journal entry routes
router.post('/', createEntry);
router.get('/:id', getEntry);
router.delete('/:id', deleteEntry);

// Mood summary route
router.get('/mood-summary', getMoodSummary);

// Voice upload route
router.post('/voice-upload', upload.single('audio'), async (req, res) => {
  try {
    // Here you would implement the voice transcription logic
    // For now, we'll just return a mock response
    res.json({
      transcript: "This is a mock transcript of the voice recording.",
      isVoiceEntry: true
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router; 