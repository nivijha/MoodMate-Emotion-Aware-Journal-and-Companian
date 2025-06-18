const Journal = require('../models/Journal');
const { analyzeSentiment } = require('../services/analysisService');

exports.createEntry = async (req, res) => {
  try {
    const { content, isVoiceEntry, transcript } = req.body;
    const userId = req.user._id;

    // Analyze sentiment and emotions
    const { sentimentScore, emotionTags } = await analyzeSentiment(content);

    const journal = new Journal({
      userId,
      content,
      sentimentScore,
      emotionTags,
      isVoiceEntry,
      transcript
    });

    await journal.save();
    res.status(201).json(journal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getEntry = async (req, res) => {
  try {
    const journal = await Journal.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!journal) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }

    res.json(journal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMoodSummary = async (req, res) => {
  try {
    const userId = req.user._id;
    const { startDate, endDate } = req.query;

    const query = { userId };
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const entries = await Journal.find(query)
      .select('sentimentScore emotionTags date')
      .sort({ date: 1 });

    // Calculate weekly averages
    const weeklySummary = entries.reduce((acc, entry) => {
      const weekStart = new Date(entry.date);
      weekStart.setHours(0, 0, 0, 0);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());

      const weekKey = weekStart.toISOString();
      if (!acc[weekKey]) {
        acc[weekKey] = {
          avgSentiment: 0,
          emotionCounts: {},
          entryCount: 0
        };
      }

      acc[weekKey].avgSentiment += entry.sentimentScore;
      acc[weekKey].entryCount++;

      entry.emotionTags.forEach(emotion => {
        acc[weekKey].emotionCounts[emotion] = (acc[weekKey].emotionCounts[emotion] || 0) + 1;
      });

      return acc;
    }, {});

    // Calculate final averages
    Object.keys(weeklySummary).forEach(week => {
      weeklySummary[week].avgSentiment /= weeklySummary[week].entryCount;
    });

    res.json(weeklySummary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const journal = await Journal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!journal) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }

    res.json({ message: 'Journal entry deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; 