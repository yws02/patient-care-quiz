# Patient Care Quiz Frontend

This project is a web application designed to assist caregivers and patients in understanding how to manage medical conditions through a quiz format. The application takes in a patient's medical history and current conditions, generates multiple-choice questions (MCQs), and provides answers to help guide care.

## Features

- Input form for patient medical history and current conditions.
- Generation of MCQ questions based on the provided data.
- Display of questions and answers for caregivers and patients.
- User-friendly interface for easy navigation.

## Project Structure

- **public/**: Contains static files such as `index.html` and `favicon.ico`.
- **src/**: Contains the main application code.
  - **components/**: Reusable components like `Header`, `PatientForm`, and `QuizDisplay`.
  - **pages/**: Main pages of the application, including `Home` and `Quiz`.
  - **services/**: API service for handling requests to the backend.
  - `App.js`: Main application component.
  - `index.js`: Entry point for the React application.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the frontend directory:
   ```
   cd patient-care-quiz/frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage

To start the development server, run:
```
npm start
```
This will launch the application in your default web browser.

## API Integration

The frontend communicates with the backend to send patient data and retrieve generated quiz questions. Ensure that the backend server is running to test the full functionality of the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.