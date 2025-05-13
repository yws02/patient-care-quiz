import axios from 'axios';

// const API_URL = 'http://localhost:8888/api/quiz' ;

const API_URL = process.env.REACT_APP_API_URL || 'https://patient-care-quiz-backend.onrender.com/api/quiz';

export const submitPatientData = async (patientData) => {
    try {
        const response = await axios.post(`${API_URL}/generate-quiz`, patientData);
        return response.data;
    } catch (error) {
        console.error('Error submitting patient data:', error);
        throw error;
    }
};

// Add this missing function that Home.js is trying to import
export const generateQuiz = async (patientData) => {
    try {
        const response = await axios.post(`${API_URL}/generate-quiz`, patientData);
        return response.data;
    } catch (error) {
        console.error('Error generating quiz:', error);
        throw error;
    }
};

export const fetchQuizQuestions = async (patientData) => {
    try {
        const response = await axios.post(`${API_URL}/generate-quiz`, patientData);
        return response.data.questions;
    } catch (error) {
        console.error('Error fetching quiz questions:', error);
        throw error;
    }
};