const Vote = require('../models/vote');
const User = require('../models/user');
const crypto = require('crypto');
const { encrypt } = require('../utils/encryption');
exports.castVote = async (req, res) => {
  try {
    const { candidateId } = req.body;
    const user = req.user;
    if (user.hasVoted) return res.status(400).json({ msg: 'Already voted' });
    // Check if vote exists (unique hashed voterId)
    const hashedVoterId = crypto.createHash('sha256').update(user.voterId).digest('hex');
    let vote = await Vote.findOne({ hashedVoterId });
    if (vote) return res.status(400).json({ msg: 'Already voted' });
    const encryptedCandidateId = encrypt(candidateId);
    vote = new Vote({ hashedVoterId, encryptedCandidateId });
    await vote.save();
    user.hasVoted = true;
    await user.save();
    // Emit real-time update via Socket.IO (see server.js)
    req.io.emit('voteUpdate', { candidateId });
    res.json({ msg: 'Vote cast successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};