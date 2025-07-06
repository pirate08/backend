const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDb();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', require('./routes/taskroutes'));

// Optional: Health check route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
