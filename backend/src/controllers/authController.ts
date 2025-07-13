import User from '../models/User'; // Correct path relative to src/controllers
import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import { Request, Response } from 'express';

// IMPORTANT: Directly import the React Email components from your frontend emails folder
// This path is relative to the backend root (Insightory/) as configured in tsconfig.json paths
const path = require('path');
// const OtpEmail = require(path.resolve(__dirname, '../../../frontend/emails/OtpEmail.js'));
// const WelcomeEmail = require(path.resolve(__dirname, '../../../frontend/emails/WelcomeEmail.js'));

import OtpEmail from '../../emails/OtpEmail';
import WelcomeEmail from '../../emails/WelcomeEmail';

console.log("EMAIL_USER:", process.env.EMAIL_USER ? "Loaded" : "Not Loaded");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Not Loaded");

const transporter = nodemailer.createTransport({
  // host: "smtp.gmail", // Replace with your SMTP host
  // port: 587, // Use 465 for secure: true, 587 for secure: false
  // secure: false, // Use true if port is 465
  // auth: {
  //   user: process.env.EMAIL_USER,
  //   pass: process.env.EMAIL_PASS,
    service: "gmail", // Nodemailer will auto-configure host/port/secure
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,

  },
});

const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email });
    }
    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
    user.otp = otp;
    user.otpExpires = otpExpires;
    user.isVerified = false; // Reset verification status if re-sending OTP
    await user.save();

    const emailHtml = await render(OtpEmail({ userEmail: email, otpCode: otp }));

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Inventory Insights OTP Code',
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent to your email.' });

  } catch (error) {
    console.error('Error sending OTP:', error);
    const errorMsg = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: 'Error sending OTP.', error: errorMsg });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }
  try {
    const user = await User.findOne({ email }).select('+otp +otpExpires');
    if (!user || user.otp !== otp || !user.otpExpires || user.otpExpires.getTime() < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }
    user.isVerified = true;
    user.otp = undefined; // Clear OTP after successful verification
    user.otpExpires = undefined;
    await user.save();

    const welcomeEmailHtml = await render(WelcomeEmail({ userEmail: email }));
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Inventory Insights!',
      html: welcomeEmailHtml,
    });

    res.status(200).json({
        message: 'Email verified successfully!',
        user: { id: user._id, email: user.email, isVerified: user.isVerified }
    });

  } catch (error) {
    console.error('Error verifying OTP:', error);
    const errorMsg = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: 'Error verifying OTP.', error: errorMsg });
  }
};

export const resendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    if (user.otpExpires && (user.otpExpires.getTime() - (10 * 60 * 1000) + (1 * 60 * 1000)) > Date.now()) {
        return res.status(429).json({ message: 'Please wait before resending OTP.' });
    }
    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // New OTP valid for 10 minutes
    user.otp = otp;
    user.otpExpires = otpExpires;
    user.isVerified = false; // Reset verification status if re-sending OTP
    await user.save();

    const emailHtml = await render(OtpEmail({ userEmail: email, otpCode: otp }));
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your New Inventory Insights OTP Code',
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'New OTP sent to your email.' });
  } catch (error) {
    console.error('Error resending OTP:', error);
    const errorMsg = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: 'Error resending OTP.', error: errorMsg });
  }
};