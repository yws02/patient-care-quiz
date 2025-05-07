import React, { useState } from 'react';
import PatientForm from '../components/PatientForm';
import QuizDisplay from '../components/QuizDisplay';
import { fetchQuizQuestions } from '../services/api';

const Quiz = () => {
    const [patientData, setPatientData] = useState(null);
    const [quizQuestions, setQuizQuestions] = useState([]);

    const handlePatientDataSubmit = async (data) => {
        setPatientData(data);
        const questions = await fetchQuizQuestions(data);
        setQuizQuestions(questions);
    };

    return (
        <div>
            <h1>Patient Care Quiz</h1>
            <PatientForm onSubmit={handlePatientDataSubmit} />
            {quizQuestions.length > 0 && <QuizDisplay questions={quizQuestions} />}
        </div>
    );
};

export default Quiz;