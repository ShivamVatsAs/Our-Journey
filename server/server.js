const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Connect to the MongoDB database
connectDB();

// Initialize the Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Mount Routers
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/memories', require('./routes/memoryRoutes'));
app.use('/api/adventures', require('./routes/adventureRoutes'));
// Add this line to include the new countdown routes
app.use('/api/countdown', require('./routes/countdownRoutes'));

// --- Google Calendar API Route Placeholder ---
app.post('/api/calendar/create-event', (req, res) => {
    console.log('Received calendar event data:', req.body);
    res.status(201).json({ message: 'Event created successfully (placeholder)'});
});
// --- End Placeholder ---

if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.resolve(__dirname, '../client/dist');
  app.use(express.static(clientBuildPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));