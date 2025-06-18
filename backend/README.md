# MoodMate Backend

A Node.js/Express backend for an emotion-aware journaling application.

## Features

- User authentication with JWT
- Journal entry management
- Sentiment and emotion analysis using OpenAI
- Voice recording support
- Mood tracking and analytics
- Secure API endpoints

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- OpenAI API key

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd moodmate-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/moodmate
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_refresh_token_secret_here
OPENAI_API_KEY=your_openai_api_key_here
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- POST `/api/auth/refresh-token` - Refresh access token

### Journal
- POST `/api/journal` - Create a new journal entry
- GET `/api/journal/:id` - Get a specific journal entry
- DELETE `/api/journal/:id` - Delete a journal entry
- GET `/api/journal/mood-summary` - Get weekly mood summary
- POST `/api/journal/voice-upload` - Upload voice recording

### Analysis
- POST `/api/analyze/text` - Analyze text sentiment and emotions
- POST `/api/analyze/prompt` - Generate writing prompt based on mood

## Testing

Run the test suite:
```bash
npm test
```

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- Input validation
- Secure headers with Helmet
- CORS protection

## Error Handling

The API uses a centralized error handling system that returns appropriate HTTP status codes and error messages.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 