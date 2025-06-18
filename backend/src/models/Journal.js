const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  sentimentScore: {
    type: Number,
    required: true,
    min: -1,
    max: 1
  },
  emotionTags: [{
    type: String,
    trim: true
  }],
  date: {
    type: Date,
    default: Date.now
  },
  isVoiceEntry: {
    type: Boolean,
    default: false
  },
  transcript: {
    type: String
  }
}, {
  timestamps: true
});

// Index for efficient querying
journalSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('Journal', journalSchema); 