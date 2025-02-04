const moment = require("moment-timezone");
const Medicine = require("../models/medicineModel");
const User = require("../models/userModel");
const sendEmail = require("../services/emailService");

const sendReminders = async () => {
  try {
    const now = moment();
    const dayName = now.format("dddd");
    const currentTime = now.format("HH:mm");

    const medicines = await Medicine.find().populate("userId");
    console.log(`📅 Checking reminders for ${dayName} at ${currentTime}`);
    for (const medicine of medicines) {
      const { userId, medicines: meds } = medicine;
      console.log(`👩‍⚕️ Checking reminders for ${userId.name}...`, meds);

      for (const med of meds) {
        // Check if reminder can be sent
        if (!medicine.canSendReminder(med._id, currentTime)) {
          console.log(`Reminder already sent for ${med.name} at ${currentTime}`);
          continue;
        }

        const medStartDate = moment(med.startDate);
        const medEndDate = med.endDate ? moment(med.endDate) : null;
        const medTime = moment(med.time, ["h:mm A"]).format("HH:mm");

        const isDayMatch = med.days.includes(dayName);
        const isAfterStart = now.isSameOrAfter(medStartDate, 'day');
        const isBeforeEnd = !medEndDate || now.isSameOrBefore(medEndDate, 'day');
        const isTimeMatch = medTime === currentTime;

        if (isDayMatch && isAfterStart && isBeforeEnd && isTimeMatch) {
          if (userId && userId.email) {
            try {
              const emailText = `Reminder: Take ${med.name} (${med.dosage}) at ${med.time}`;
              await sendEmail(userId.email, "Medicine Reminder", emailText);
              
              // Update last sent time
              await medicine.updateLastSent(med._id, currentTime);
              
              console.log(`📩 Email sent to ${userId.email} for ${med.name} at ${med.time}`);
            } catch (error) {
              console.error(`Failed to send email: ${error.message}`);
            }
          }
        }
      }
    }
    console.log("✅ Email reminders check completed!");
  } catch (error) {
    console.error(`❌ Error sending reminders: ${error.message}`);
  }
};

module.exports = { sendReminders }
