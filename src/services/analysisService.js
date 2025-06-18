const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.analyzeSentiment = async (text) => {
  try {
    const prompt = `Analyze the following text and provide:
    1. A sentiment score between -1 (very negative) and 1 (very positive)
    2. A list of emotions present in the text (e.g., happy, sad, angry, anxious, etc.)
    
    Text: "${text}"
    
    Respond in JSON format:
    {
      "sentimentScore": number,
      "emotionTags": string[]
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a sentiment and emotion analysis expert. Provide accurate analysis in JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 150
    });

    const analysis = JSON.parse(response.choices[0].message.content);
    return {
      sentimentScore: analysis.sentimentScore,
      emotionTags: analysis.emotionTags
    };
  } catch (error) {
    console.error('Error in sentiment analysis:', error);
    // Fallback to basic sentiment analysis if OpenAI fails
    return {
      sentimentScore: 0,
      emotionTags: ['neutral']
    };
  }
};

exports.generatePrompt = async (mood) => {
  try {
    const prompt = `Generate a creative writing prompt that would be suitable for someone feeling ${mood}. 
    The prompt should be encouraging and help them explore their emotions.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a creative writing coach who specializes in emotional expression."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 100
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating prompt:', error);
    return "Write about your current feelings and what led you to feel this way.";
  }
}; 