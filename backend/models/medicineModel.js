const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User collection
    required: true,
  },
  medicines: [
    {
      name: {
        type: String,
        required: true,
      },
      dosage: {
        type: String,
        required: true, // Example: "1 tablet" or "5 ml"
      },
      time: {
        type: String,
        required: true, // Example: "08:00 AM"
      },
      days: [
        {
          type: String,
          enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          required: true,
        },
      ],
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: false, // Optional, if the medicine is for a limited duration
      },
    },
  ],
});

module.exports = mongoose.model('Medicine', medicineSchema);
