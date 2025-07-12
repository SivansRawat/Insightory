// backend/src/routes/auth.ts
import express from 'express';
import { sendOtp, verifyOtp, resendOtp } from '../controllers/authController'; // Path relative to routes folder

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp);

export default router;