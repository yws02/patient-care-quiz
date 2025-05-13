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
    Based on the following patient's medical history and current conditions, create a multi-level quiz (3 levels with 5 questions each) to test caregivers and patients about proper care.
    
    Medical History: ${medicalHistory}
    Current Conditions: ${currentConditions}
    
    Format your response as a valid JSON array of quiz levels with the EXACT structure shown below:
    [
      {
        "id": "condition-basics",
        "title": "Understanding Your Condition",
        "description": "Learn the basics about your medical conditions and their effects.",
        "unlockRequirement": null,
        "questions": [
          {
            "type": "mcq",
            "question": "Example question 1?",
            "options": ["Option A", "Option B", "Option C"],
            "correctAnswer": 1,
            "explanation": "Explanation for correct answer"
          },
          {
            "type": "mcq",
            "question": "Example question 2?",
            "options": ["Option A", "Option B", "Option C"],
            "correctAnswer": 0,
            "explanation": "Explanation for correct answer"
          },
          {
            "type": "mcq",
            "question": "Example question 3?",
            "options": ["Option A", "Option B", "Option C"],
            "correctAnswer": 2,
            "explanation": "Explanation for correct answer"
          },
          {
            "type": "mcq",
            "question": "Example question 4?",
            "options": ["Option A", "Option B", "Option C"],
            "correctAnswer": 1,
            "explanation": "Explanation for correct answer"
          },
          {
            "type": "mcq",
            "question": "Example question 5?",
            "options": ["Option A", "Option B", "Option C"],
            "correctAnswer": 0,
            "explanation": "Explanation for correct answer"
          }
        ]
      },
      {
        "id": "condition-care",
        "title": "Medication and Monitoring",
        "description": "Learn about medications, monitoring methods, and immediate care procedures.",
        "unlockRequirement": "condition-basics",
        "questions": [
          {
            "type": "mcq",
            "question": "Example question 1?",
            "options": ["Option A", "Option B", "Option C"],
            "correctAnswer": 0,
            "explanation": "Explanation for correct answer"
          },
          {
            "type": "mcq",
            "question": "Example question 2?",
            "options": ["Option A", "Option B", "Option C"],
            "correctAnswer": 1,
            "explanation": "Explanation for correct answer"
          },
          {
            "type": "mcq",
            "question": "Example question 3?",
            "options": ["Option A", "Option B", "Option C"],
            "correctAnswer": 2,
            "explanation": "Explanation for correct answer"
          },
          {
            "type": "mcq",
            "question": "Example question 4?",
            "options": ["Option A", "Option B", "Option C"],
            "correctAnswer": 1,
            "explanation": "Explanation for correct answer"
          },
          {
            "type": "mcq",
            "question": "Example question 5?",
            "options": ["Option A", "Option B", "Option C"],
            "correctAnswer": 0,
            "explanation": "Explanation for correct answer"
          }
        ]
      }
    ]
    
    Guidelines:
    1. First level should cover basic knowledge of the conditions
    2. Second level should focus on medication, monitoring, and immediate care
    3. Third level should focus on diet, exercise, lifestyle, and long-term management
    4. Each level should have exactly 5 questions
    5. Each question should have 3 options (not 4)
    6. The correctAnswer is an integer representing the index (0-based) of the correct option
    7. Include a brief explanation for each correct answer
    8. Create meaningful level IDs that include the condition name, like "diabetes-basics" or "hypertension-care"
    9. First level unlockRequirement should be null, others should point to previous level ID
    10. ONLY return the JSON array, don't include any other text in your response
    11. Make sure the output is valid JSON that can be parsed with JSON.parse()
    12. Do not use generic level IDs like "level1", "level2" - instead use descriptive IDs that include the condition name`;

    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 4000,
            temperature: 0.7
        });
        
        const content = response.data.choices[0].message.content;
        
        try {
            // Clean the content to ensure it's valid JSON
            const cleanedContent = content.trim()
                .replace(/^```json/g, '')  // Remove potential markdown code block start
                .replace(/```$/g, '')      // Remove potential markdown code block end
                .trim();
            
            const jsonData = JSON.parse(cleanedContent);
            
            // Format check - make sure all required properties are present
            if (!Array.isArray(jsonData)) {
                throw new Error("API response is not in the expected array format");
            }
            
            // Verify the structure matches what's expected
            jsonData.forEach((level, idx) => {
                if (!level.id || !level.title || !level.description || !Array.isArray(level.questions) || level.questions.length !== 5) {
                    throw new Error(`Level ${idx} does not match the expected format`);
                }
                
                // Fix the unlock requirement if needed
                if (idx === 0 && level.unlockRequirement !== null) {
                    level.unlockRequirement = null;
                } else if (idx > 0 && (!level.unlockRequirement || typeof level.unlockRequirement !== 'string')) {
                    level.unlockRequirement = jsonData[idx - 1].id;
                }
                
                // Check questions format
                level.questions.forEach((q, qIdx) => {
                    if (!q.type || !q.question || !Array.isArray(q.options) || q.options.length !== 3) {
                        throw new Error(`Question format is incorrect`);
                    }
                });
            });
            
            return jsonData;
        } catch (parseError) {
            // Try to extract JSON if OpenAI returned text with additional content
            const jsonMatch = content.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                try {
                    const extractedJson = JSON.parse(jsonMatch[0]);
                    return extractedJson;
                } catch (err) {
                    throw new Error('Failed to parse extracted JSON');
                }
            } else {
                throw new Error('Could not parse quiz questions from API response');
            }
        }
    } catch (error) {
        console.error('Error generating quiz questions:', error.message);
        
        if (error.response) {
            console.error(`OpenAI API error status: ${error.response.status}`);
        }
        
        // Return sample quiz data as fallback
        return None;
    }
}


module.exports = {
    generateQuestions
};