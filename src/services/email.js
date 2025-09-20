import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_ADMIN_USERNAME,
    pass: process.env.GMAIL_ADMIN_PASS,
  },
});

export async function sendAdminOtpEmail(to, otp, expiryMinutes = 1) {
  if (!to || !otp) {
    throw new Error("Email and OTP are required");
  }

  const emailOptions = {
    from: `Admin OTP Verification <${process.env.GMAIL_ADMIN}>`,
    to,
    subject: "Your OTP Verification Code",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #4CAF50;">ChatApp Verification</h2>
        <p>Your OTP code is:</p>
        <h1 style="background: #f4f4f4; padding: 10px; border-radius: 5px; display: inline-block;">
          ${otp}
        </h1>
        <p>This code is valid for <b>${expiryMinutes} minute</b>. Do not share it with anyone.</p>
        <hr>
        <small>If you didn’t request this, you can ignore this email.</small>
      </div>
    `,
  };

  const info = await transporter.sendMail(emailOptions);
  console.log(`OTP email sent to ${to}:`, info.messageId);
  return {
    message: "Email sent successfully",
    success: true,
  };
}
