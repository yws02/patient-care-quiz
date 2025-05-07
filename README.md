# Patient Care Quiz

This project is designed to assist caregivers and patients in understanding how to manage a patient's care effectively. It generates multiple-choice questions (MCQs) based on the patient's medical history and current conditions, providing a valuable resource for both caregivers and patients.

## Project Structure

The project is divided into two main parts: the frontend and the backend.

### Frontend

The frontend is built using React and is responsible for the user interface. It allows users to input patient data and displays the generated quiz questions.

- **public/index.html**: Main HTML file for the frontend application.
- **public/favicon.ico**: Favicon for the website.
- **src/components/Header.js**: Renders the header section of the application.
- **src/components/PatientForm.js**: Contains a form for inputting the patient's medical history and current conditions.
- **src/components/QuizDisplay.js**: Displays the generated MCQ questions and answers.
- **src/pages/Home.js**: Serves as the landing page of the application.
- **src/pages/Quiz.js**: Handles the quiz display and interaction logic.
- **src/services/api.js**: Handles API calls to the backend.
- **src/App.js**: Main application component that sets up routing.
- **src/index.js**: Entry point for the React application.

### Backend

The backend is built using Node.js and Express. It handles the logic for generating quiz questions based on patient data and interacts with the OpenAI API.

- **controllers/quizController.js**: Handles the logic for generating quiz questions.
- **routes/quizRoutes.js**: Defines endpoints for submitting patient data and retrieving quiz questions.
- **services/openaiService.js**: Interacts with the OpenAI API to generate quiz questions.
- **server.js**: Sets up the Express server and middleware.
- **.env.example**: Provides an example of environment variables needed for the backend.
- **package.json**: Configuration file for the backend application.

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd patient-care-quiz
   ```

2. **Install dependencies**:
   - For the frontend:
     ```
     cd frontend
     npm install
     ```
   - For the backend:
     ```
     cd backend
     npm install
     ```

3. **Configure environment variables**:
   - Copy `.env.example` to `.env` in the backend directory and fill in the required values.

4. **Run the applications**:
   - Start the backend server:
     ```
     cd backend
     node server.js
     ```
   - Start the frontend application:
     ```
     cd frontend
     npm start
     ```

## Environment Setup

1. Copy `.env.example` to `.env` in the backend directory
2. Add your own OpenAI API key to the `.env` file
3. Never commit your actual API keys to GitHub.

## Usage

- Navigate to the frontend application in your browser.
- Input the patient's medical history and current conditions in the form.
- Submit the form to generate a list of MCQ questions and answers based on the provided data.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License.