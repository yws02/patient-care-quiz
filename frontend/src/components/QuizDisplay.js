import React, { useState } from 'react';

const QuizDisplay = ({ questions }) => {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const handleAnswerSelect = (questionIndex, answerIndex) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: answerIndex
        });

        // Check if answer is correct using the correctIndex property
        const correctIndex = questions[questionIndex].correctIndex || 0;
        const isCorrect = answerIndex === correctIndex;
        
        setFeedback({
            ...feedback,
            [questionIndex]: {
                isCorrect,
                message: isCorrect ? 
                    "Correct! Well done." : 
                    `Incorrect. The correct answer is: ${questions[questionIndex].answers[correctIndex]}`
            }
        });
    };

    return (
        <div className="quiz-display">
            <h2>Patient Care Quiz</h2>
            {questions && questions.length > 0 ? (
                <div>
                    {questions.map((question, qIndex) => (
                        <div key={qIndex} className="question-container">
                            <h3>{question.question}</h3>
                            <ul className="answer-list">
                                {question.answers.map((answer, aIndex) => (
                                    <li key={aIndex}>
                                        <label className="answer-option">
                                            <input
                                                type="radio"
                                                name={`question-${qIndex}`}
                                                checked={selectedAnswers[qIndex] === aIndex}
                                                onChange={() => handleAnswerSelect(qIndex, aIndex)}
                                            />
                                            {answer}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            {feedback[qIndex] && (
                                <div className={`feedback ${feedback[qIndex].isCorrect ? 'correct' : 'incorrect'}`}>
                                    {feedback[qIndex].message}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No questions available. Please submit patient data to generate questions.</p>
            )}
        </div>
    );
};

export default QuizDisplay;