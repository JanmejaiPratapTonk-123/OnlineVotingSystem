const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { generateOTP } = require('../utils/otpGenerator');
const nodemailer = require('nodemailer');  // Optional email
// Nodemailer transporter (optional)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.NODEMAILER_EMAIL, pass: process.env.NODEMAILER_PASS }
});
// Register
exports.register = async (req, res) => {
  try {
    const { voterId, email, password, name, role = 'voter' } = req.body;
    let user = await User.findOne({ $or: [{ voterId }, { email }] });
    if (user) return res.status(400).json({ msg: 'User exists' });
    const otp = generateOTP();
    user = new User({ voterId, email, password, name, role, otp });
    await user.save();
    // Optional: Send email
    transporter.sendMail({
      to: email,
      subject: 'Verify OTP',
      text: `Your OTP is ${otp}`
        });
    // Mock: Return OTP in response for demo
    res.json({ msg: 'User registered. OTP sent.', otp });  // In prod, send via SMS/email only
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
// Login (generate OTP)
exports.login = async (req, res) => {
  try {
    // ✅ Defensive check so it never crashes again
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ msg: "Please verify your account first." });
    }

    const otp = generateOTP();
    user.otp = otp;
    await user.save();

    // ✅ Optional email send
    if (process.env.NODEMAILER_EMAIL && process.env.NODEMAILER_PASS) {
      transporter.sendMail({
        to: email,
        subject: "Your Login OTP",
        text: `Your OTP is ${otp}`,
      });
    }

    // ✅ Success response
    res.json({ msg: "OTP sent successfully.", otp });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
// Verify OTP & Issue JWT
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email, otp });
  if (!user || !require('../utils/otpGenerator').validateOTP(otp, user.otp)) {
    return res.status(400).json({ msg: 'Invalid OTP' });
  }
  user.isVerified = true;
  user.otp = undefined;
  await user.save();
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user: { id: user._id, role: user.role } });
};