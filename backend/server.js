const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line
const quizRoutes = require('./routes/quizRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Add your Netlify domain to the allowed origins
app.use(cors({
  origin: [
    'https://voluble-blini-740345.netlify.app', 
    'https://main--voluble-blini-740345.netlify.app',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/quiz', quizRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});