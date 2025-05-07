import React, { useState } from 'react';
import { submitPatientData } from '../services/api';
import QuizDisplay from './QuizDisplay';

const PatientForm = ({ onSubmit }) => {
    const [medicalHistory, setMedicalHistory] = useState('');
    const [currentConditions, setCurrentConditions] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [quiz, setQuiz] = useState(null);
    const [error, setError] = useState('');

    // Example data for quick testing
    const exampleMedicalHistory = 
        "Type 2 Diabetes (diagnosed 2010)\n\n" +
        "Hypertension (diagnosed 2015)\n\n" +
        "Hyperlipidemia\n\n" +
        "Former smoker (quit in 2018)\n\n" +
        "Coronary artery disease with stent placement (2019)";
    
    const exampleCurrentConditions = 
        "Poorly controlled blood glucose (recent HbA1c: 8.9%)\n\n" +
        "Mild shortness of breath with exertion\n\n" +
        "Elevated blood pressure despite medication\n\n" +
        "Reports fatigue and occasional dizziness\n\n" +
        "Peripheral neuropathy in feet";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        try {
            const response = await submitPatientData({ medicalHistory, currentConditions });
            const quizData = response.questions || [];
            setQuiz(quizData);
            
            if (onSubmit) {
                onSubmit({ quizData, medicalHistory, currentConditions });
            }
        } catch (err) {
            setError('Error generating quiz. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const fillExampleData = (e) => {
        e.preventDefault();
        setMedicalHistory(exampleMedicalHistory);
        setCurrentConditions(exampleCurrentConditions);
    };

    return (
        <div className="patient-form-container">
            <h2>Generate Patient Care Quiz</h2>
            <div className="autofill-container">
                <button 
                    onClick={fillExampleData}
                    className="autofill-button"
                >
                    Fill with Example Data
                </button>
            </div>
            <form onSubmit={handleSubmit} className="patient-data-form">
                <div className="form-group">
                    <label htmlFor="medical-history">Medical History:</label>
                    <textarea 
                        id="medical-history"
                        value={medicalHistory} 
                        onChange={(e) => setMedicalHistory(e.target.value)} 
                        placeholder="Enter patient's medical history (e.g., diabetes for 10 years, heart surgery in 2018, etc.)"
                        required 
                        rows={5}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="current-conditions">Current Conditions:</label>
                    <textarea 
                        id="current-conditions"
                        value={currentConditions} 
                        onChange={(e) => setCurrentConditions(e.target.value)} 
                        placeholder="Enter current conditions (e.g., hypertension, recovering from hip replacement, etc.)"
                        required 
                        rows={5}
                    />
                </div>
                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={isLoading}
                >
                    {isLoading ? 'Generating...' : 'Generate Quiz'}
                </button>
            </form>
            
            {error && <div className="error-message">{error}</div>}
            
            {quiz && quiz.length > 0 && (
                <div className="quiz-section">
                    <QuizDisplay questions={quiz} />
                </div>
            )}
        </div>
    );
};

export default PatientForm;