const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

// Verify required environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
  console.error("❌ Missing email configuration in environment variables");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify transporter configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error("❌ Email transporter verification failed:", error);
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});

const sendEmail = async (to, subject, text) => {
  // Input validation
  if (!to || !subject || !text) {
    throw new Error("Missing required email parameters");
  }

  const mailOptions = {
    from: `Medicine Reminder <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    // You can add HTML version as well
    html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #2c3e50;">Medicine Reminder</h2>
            <p style="color: #34495e;">${text}</p>
            <p style="color: #7f8c8d; font-size: 12px;">
              This is an automated reminder. Please do not reply to this email.
            </p>
          </div>`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent successfully to ${to}`);
    console.log("Message ID:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`❌ Error sending email to ${to}:`, error.message);
    // Log detailed error for debugging
    if (error.response) {
      console.error("SMTP Response:", error.response);
    }
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = sendEmail;
