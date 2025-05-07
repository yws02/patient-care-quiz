const express = require('express');
const router = express.Router();
const QuizController = require('../controllers/quizController');

// Route to submit patient data and generate quiz questions
router.post('/generate-quiz', QuizController.generateQuiz);

// Route to retrieve quiz questions
router.get('/quiz-questions', QuizController.getQuizQuestions);

module.exports = router;