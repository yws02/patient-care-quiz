import React, { useState } from 'react';
import PatientForm from '../components/PatientForm';
import QuizDisplay from '../components/QuizDisplay';
import { generateQuiz } from '../services/api';

const Home = () => {
    const [quizData, setQuizData] = useState(null);

    const handleFormSubmit = async (patientData) => {
        const quiz = await generateQuiz(patientData);
        setQuizData(quiz);
    };

    return (
        <div>
            <h1>Patient Care Quiz</h1>
            <PatientForm onSubmit={handleFormSubmit} />
            {quizData && <QuizDisplay quizData={quizData} />}
        </div>
    );
};

export default Home;