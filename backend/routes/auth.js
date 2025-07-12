const express = require('express');
const { sendOtp, verifyOtp, resendOtp } = require('../controllers/authController');

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp); // Optional bonus feature

module.exports = router;