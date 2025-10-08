const otp = Math.floor(100000 + Math.random() * 900000).toString();
module.exports.generateOTP = () => otp;
module.exports.validateOTP = (inputOtp, storedOtp) => inputOtp === storedOtp;
