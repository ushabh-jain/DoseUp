const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
        required: true,
      },
      time: {
        type: String,
        required: true,
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
        required: false,
      },
      lastSent: {
        date: {
          type: Date,
          default: null
        },
        time: {
          type: String,
          default: null
        }
      }
    },
  ],
});

// Add method to check if reminder can be sent
medicineSchema.methods.canSendReminder = function(medicineId, currentTime) {
  const medicine = this.medicines.id(medicineId);
  if (!medicine) return true;

  const now = new Date();
  const lastSentDate = medicine.lastSent.date;
  const lastSentTime = medicine.lastSent.time;

  // If never sent before
  if (!lastSentDate || !lastSentTime) return true;

  // Check if it's a different day or different time slot
  return (
    lastSentDate.toDateString() !== now.toDateString() ||
    lastSentTime !== currentTime
  );
};

// Add method to update last sent time
medicineSchema.methods.updateLastSent = async function(medicineId, currentTime) {
  const medicine = this.medicines.id(medicineId);
  if (medicine) {
    medicine.lastSent = {
      date: new Date(),
      time: currentTime
    };
    await this.save();
  }
};

module.exports = mongoose.model('Medicine', medicineSchema);
