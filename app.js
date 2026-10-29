// This is the main file for the backend

// import functionalities
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

// allow using a .env file
require('dotenv').config();

// creates a new instance of express application
const app = express();

// ------------------------------------------------------
// CORS configuration
// Only allow requests from the configured frontend origin
// ------------------------------------------------------

app.use(
  cors({
    origin: process.env.CORS_ORIGIN
  })
);

// suppress mongoose warning to prepare for new version
mongoose.set('strictQuery', false);

// ------------------------------------------------------
// MongoDB connection
// ------------------------------------------------------

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Database connection Success!');
  })
  .catch((err) => {
    console.error('Mongo Connection Error', err);
  });

// declare port number for the API
const PORT = process.env.PORT || 3000;

// setup and access request body
app.use(express.json());
app.use(morgan('dev'));

// ------------------------------------------------------
// Health endpoint
// ------------------------------------------------------

app.get('/health', (req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;

  res.status(200).json({
    status: 'ok',
    db: dbConnected ? 'connected' : 'disconnected'
  });
});

// ------------------------------------------------------
// Routes
// ------------------------------------------------------

app.use('/clients', require('./routes/clients'));
app.use('/events', require('./routes/events'));
app.use('/org', require('./routes/org'));
app.use('/services', require('./routes/services'));
app.use('/users', require('./routes/users'));

// ------------------------------------------------------
// 404 handler
// ------------------------------------------------------

app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

// ------------------------------------------------------
// Global error handler
// ------------------------------------------------------

app.use((err, req, res, next) => {
  console.error(err)

  let statusCode = err.statusCode || err.status || 500
  let message = err.message || 'Request failed'

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    statusCode = 400
    message = 'Validation failed'
  }

  if (statusCode === 500) {
    message = 'Internal server error'
  }

  res.status(statusCode).json({ error: message })
})

// ------------------------------------------------------
// Start server
// ------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});