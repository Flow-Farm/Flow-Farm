const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.MONGODB_URI;

// This route provides the data Blessed's PerformanceChart.jsx is looking for
app.get('/api/sensors', (req, res) => {
  res.json({
    labels: ["9am", "10am", "11am", "12pm", "1pm"],
    tempData: [28, 29, 30, 31, 32],
    waterData: [22, 40, 55, 61, 32],
    phData: [6, 7, 7.5, 8, 8.1]
  });
});

// Attempt to connect to the database first
mongoose.connect(DB_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas');
    // Only start the server if the database connection works
    app.listen(PORT, () => {
      console.log(`Server is active on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
    process.exit(1); // Stop the app if it can't reach the database
  });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Internal Server Error' });
});
