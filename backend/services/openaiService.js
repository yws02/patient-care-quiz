const { Configuration, OpenAIApi } = require('openai');
const axios = require('axios');
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; 
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateQuestions(medicalHistory, currentConditions) {
    const prompt = `
    Based on the following patient's medical history and current conditions, create a multiple-choice quiz (10 questions) to test caregivers and patients about proper care. 
    
    For each question:
    - Place the correct answer in a RANDOM position among the options
    - Include 3-4 possible answers per question
    - Cover topics like medication management, diet restrictions, warning signs, daily care routines, and when to seek medical help
    
    Medical History: ${medicalHistory}
    Current Conditions: ${currentConditions}
    
    Format your response as a valid JSON array of objects like this:
    [
      {
        "question": "Question text here?",
        "answers": ["Option A", "Option B", "Option C", "Option D"],
        "correctIndex": 2
      }
    ]
    
    The correctIndex indicates the index (0-based) of the correct answer in the answers array.`;

    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 1500,
        });

        const content = response.data.choices[0].message.content;
        
        try {
            // Attempt to parse the response as JSON
            const jsonData = JSON.parse(content);
            return jsonData;
        } catch (parseError) {
            console.error('Error parsing OpenAI response as JSON:', parseError);
            
            // Try to extract JSON if OpenAI returned text with additional content
            const jsonMatch = content.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            } else {
                throw new Error('Could not parse quiz questions from API response');
            }
        }
    } catch (error) {
        console.error('Error generating quiz questions:', error);
        throw new Error('Failed to generate quiz questions');
    }
}

module.exports = {
    generateQuestions
};