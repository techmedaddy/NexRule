// Load environment variables
require('dotenv').config(); // Ensure this line is added at the top

const express = require('express');
const connectDB = require('./config/db');
const ruleRoutes = require('./routes/ruleRoutes');

const app = express();

// Middleware
app.use(express.json()); // For parsing application/json

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', ruleRoutes);

// Set the port from the environment variable or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
