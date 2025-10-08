const Candidate = require('../models/Candidate');
const Vote = require('../models/vote');
const { decrypt } = require('../utils/encryption');
exports.addCandidate = async (req, res) => {
try {
    const candidate = new Candidate(req.body);
    await candidate.save();
    res.json(candidate);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
// Similar for update/delete (CRUD)...
exports.getResults = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    const votes = await Vote.find();
    // Decrypt votes (admin only)
    const voteCounts = {};
    votes.forEach(vote => {
      const candidateId = decrypt(vote.encryptedCandidateId);
      voteCounts[candidateId] = (voteCounts[candidateId] || 0) + 1;
    });
    const results = candidates.map(c => ({
      ...c.toObject(),
      votes: voteCounts[c._id] || 0
    }));
    res.json(results);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};