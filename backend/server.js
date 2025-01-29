const express = require('express');
const mongoose = require('mongoose');
const cron = require("node-cron");
const { sendReminders } = require("./controllers/reminderController");
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const medicineRoutes = require('./routes/medicineRoutes'); // Import medicine routes

dotenv.config();

const app = express();
app.use(express.json());

// User Routes
app.use('/api/users', userRoutes);

// Medicine Routes
app.use('/api/medicines', medicineRoutes); // Add medicine routes

// MongoDB Connection

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => console.log(`Error: ${error.message}`));

// Schedule reminder emails every day at 8:00 AM
cron.schedule("0 8 * * *", () => {
  console.log("⏳ Running scheduled reminder job...");
  sendReminders();
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

