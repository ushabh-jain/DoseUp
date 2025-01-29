const Medicine = require("../models/medicineModel");
const User = require("../models/userModel");
const sendEmail = require("../services/emailService");

const sendReminders = async () => {
  try {
    const today = new Date();
    const dayName = today.toLocaleString("en-US", { weekday: "long" });

    // Find medicines that should be taken today
    const medicines = await Medicine.find({ "medicines.days": dayName }).populate("userId");

    for (const medicine of medicines) {
      const { userId, medicines } = medicine;

      for (const med of medicines) {
        if (med.days.includes(dayName)) {
          const emailText = `Reminder: Take ${med.name} (${med.dosage}) at ${med.time}`;

          // Send email to user
          if (userId && userId.email) {
            await sendEmail(userId.email, "Medicine Reminder", emailText);
          }
        }
      }
    }

    console.log("✅ Email reminders sent successfully!");
  } catch (error) {
    console.error(`❌ Error sending reminders: ${error}`);
  }
};

module.exports = { sendReminders };
