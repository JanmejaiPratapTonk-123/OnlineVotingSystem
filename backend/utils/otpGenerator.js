// backend/utils/otpGenerator.js

// Simple random 6-digit OTP generator
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Optional: validate OTP (can be basic or use expiration logic)
function validateOTP(input, storedOTP) {
  return input === storedOTP;
}

// ✅ Correct export format:
module.exports = { generateOTP, validateOTP };
