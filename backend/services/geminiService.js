// Gemini AI Service
// Handles AI recommendations using Google Gemini API

const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate show recommendations based on user's watch history
 * @param {Array} watchHistory - User's watch history with ratings
 * @param {Array} topGenres - User's favorite genres
 * @returns {Promise<Array>} - List of 5 recommended shows
 */
async function generateRecommendations(watchHistory, topGenres) {
    try {
        // Get the Gemini model
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

        // Prepare user preferences data
        const topRatedShows = watchHistory
            .filter(item => item.rating >= 4)
            .slice(0, 5)
            .map(item => `"${item.title}" (${item.genre_name}) - Rating: ${item.rating}/5`)
            .join(', ');

        const genreList = topGenres.map(g => g.genre_name).join(', ');

        // Create prompt for Gemini
        const prompt = `
You are a movie and anime recommendation expert. Based on the user's watch history, suggest 5 new movies or anime they would enjoy.

User's Favorite Genres: ${genreList || 'Various'}
User's Top Rated Shows: ${topRatedShows || 'No highly rated shows yet'}

Please respond ONLY with a JSON array of 5 recommendations in this exact format:
[
  {
    "title": "Show Name",
    "genre": "Genre",
    "reason": "Brief reason why user would like it (max 20 words)"
  }
]

Important:
- Suggest shows NOT in the user's watch history
- Mix movies and anime if user watches both
- Keep reasons concise and specific to user's preferences
- Return ONLY the JSON array, no additional text
`;

        // Generate content
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse the JSON response
        // Remove markdown code blocks if present
        const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const recommendations = JSON.parse(cleanText);

        return recommendations;
    } catch (error) {
        console.error('Gemini API error:', error);
        throw new Error('Failed to generate recommendations');
    }
}

module.exports = { generateRecommendations };
