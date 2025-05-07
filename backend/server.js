const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line
const quizRoutes = require('./routes/quizRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allow requests from GitHub Pages and localhost
app.use(cors({
  origin: ['https://yws02.github.io', 'http://localhost:3000']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/quiz', quizRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});