const User = require('../models/User');
const nodemailer = require('nodemailer');
const { render } = require('@react-email/render'); // For react-email templates
// const jwt = require('jsonwebtoken'); // You'll need this for JWTs
// const bcrypt = require('bcryptjs'); // Needed if you hash OTPs or passwords

// Import your email templates (you'll create these in frontend/emails)
// For now, we'll use a placeholder, but you'll render react-email components here.
const OtpEmail = require('../../frontend/emails/OtpEmail').default; // Adjust path as needed
const WelcomeEmail = require('../../frontend/emails/WelcomeEmail').default; // Adjust path as needed

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Example for Gmail, replace with your SMTP host
  port: 587,
  secure: false, // Use 'true' if port is 465 and secure is SSL/TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Helper to generate a 6-digit OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.sendOtp = async (req, res) => {
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

    // Render the React Email component to HTML
    const emailHtml = render(OtpEmail({ userEmail: email, otpCode: otp }));

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
    res.status(500).json({ message: 'Error sending OTP.', error: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  try {
    const user = await User.findOne({ email }).select('+otp +otpExpires'); // Select hidden fields
    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }

    user.isVerified = true;
    user.otp = undefined; // Clear OTP after successful verification
    user.otpExpires = undefined;
    await user.save();

    // Generate JWT token (install jsonwebtoken if you haven't)
    // const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send welcome/confirmation email
    const welcomeEmailHtml = render(WelcomeEmail({ userEmail: email }));
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Inventory Insights!',
      html: welcomeEmailHtml,
    });

    res.status(200).json({
        message: 'Email verified successfully!',
        // token: token, // Send token to frontend
        user: { id: user._id, email: user.email, isVerified: user.isVerified }
    });

  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Error verifying OTP.', error: error.message });
  }
};

exports.resendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Basic rate limiting: prevent resend if last OTP was sent less than 1 minute ago
    if (user.otpExpires && (user.otpExpires.getTime() - (10 * 60 * 1000) + (1 * 60 * 1000)) > Date.now()) {
        return res.status(429).json({ message: 'Please wait before resending OTP.' });
    }

    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // New OTP valid for 10 minutes

    user.otp = otp;
    user.otpExpires = otpExpires;
    user.isVerified = false; // Reset verification status if re-sending OTP

    await user.save();

    const emailHtml = render(OtpEmail({ userEmail: email, otpCode: otp }));
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
    res.status(500).json({ message: 'Error resending OTP.', error: error.message });
  }
};