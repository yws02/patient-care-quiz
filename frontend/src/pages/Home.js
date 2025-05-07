import React, { useState } from 'react';
import PatientForm from '../components/PatientForm';
import QuizDisplay from '../components/QuizDisplay';
import { generateQuiz } from '../services/api';

const Home = () => {
    const [quizData, setQuizData] = useState(null);

    const handleFormSubmit = async (patientData) => {
        try {
            const quiz = await generateQuiz(patientData);
            setQuizData(quiz);
        } catch (error) {
            console.error('Error generating quiz:', error);
        }
    };

    return (
        <div className="container">
            <h1>Patient Care Quiz</h1>
            <PatientForm onSubmit={handleFormSubmit} />
            {quizData && quizData.questions && <QuizDisplay questions={quizData.questions} />}
        </div>
    );
};

export default Home;