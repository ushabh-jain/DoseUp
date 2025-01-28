const express = require('express');
const mongoose = require('mongoose');
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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

