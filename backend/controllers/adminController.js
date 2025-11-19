const Candidate = require("../models/Candidate");
const Vote = require("../models/vote");
const { decrypt } = require("../utils/encryption");

// ➕ Add candidate
exports.addCandidate = async (req, res) => {
  try {
    const candidate = new Candidate(req.body);
    await candidate.save();
    res.json(candidate);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✏️ Update candidate
exports.updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(candidate);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ❌ Delete candidate
exports.deleteCandidate = async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    res.json({ msg: "Candidate deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 📊 Get results
exports.getResults = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    const votes = await Vote.find();

    const voteCounts = {};

    votes.forEach((vote) => {
      const candidateId = decrypt(vote.encryptedCandidateId);
      voteCounts[candidateId] = (voteCounts[candidateId] || 0) + 1;
    });

    const results = candidates.map((c) => ({
      ...c.toObject(),
      votes: voteCounts[c._id] || 0,
    }));

    res.json(results);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
