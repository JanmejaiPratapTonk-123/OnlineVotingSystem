const mongoose = require('mongoose');
const { encrypt } = require('../utils/encryption');  // Import helper
const voteSchema = new mongoose.Schema({
  hashedVoterId: { type: String, required: true, unique: true },  // SHA256 of voterId
  encryptedCandidateId: { type: String, required: true }  // AES encrypted candidate _id
}, { timestamps: true });
// Pre-save: Encrypt on creation (handled in controller)
module.exports = mongoose.model('Vote', voteSchema);
