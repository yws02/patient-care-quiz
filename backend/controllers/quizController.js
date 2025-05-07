const express = require('express');
const openaiService = require('../services/openaiService');

const router = express.Router();

class QuizController {
    static async generateQuiz(req, res) {
        const { medicalHistory, currentConditions } = req.body;

        if (!medicalHistory || !currentConditions) {
            return res.status(400).json({ error: 'Medical history and current conditions are required.' });
        }

        try {
            const questions = await openaiService.generateQuestions(medicalHistory, currentConditions);
            res.status(200).json({ questions });
        } catch (error) {
            console.error('Error generating quiz:', error);
            res.status(500).json({ error: 'An error occurred while generating the quiz.' });
        }
    }

    static async getQuizQuestions(req, res) {
        // Placeholder for retrieving previously generated quiz questions
        // In a real app, you might store these in a database
        res.status(501).json({ message: 'Not implemented yet' });
    }
}

module.exports = QuizController;