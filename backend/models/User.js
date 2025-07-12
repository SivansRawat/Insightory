const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For hashing if you decide to store actual passwords (not strictly required for OTP-only, but good practice)

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
    select: false, // Don't return OTP by default when querying user
  },
  otpExpires: {
    type: Date,
    select: false,
  },
  // You might add a password field if you decide to extend to password-based login later
  // password: {
  //   type: String,
  //   minlength: 6,
  //   select: false,
  // },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Example of pre-save hook for password hashing (if you add a password field)
// UserSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

module.exports = mongoose.model('User', UserSchema);