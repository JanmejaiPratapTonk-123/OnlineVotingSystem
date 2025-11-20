const User = require("../models/user");
const Candidate = require("../models/Candidate");
const Vote = require("../models/vote");
const { decrypt } = require("../utils/encryption");

// ➕ Add candidate
exports.addCandidate = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ msg: "Candidate name is required" });
    }

    const candidate = new Candidate({ name });
    await candidate.save();

    res.status(201).json(candidate);
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
    if (!candidate) {
      return res.status(404).json({ msg: "Candidate not found" });
    }
    res.json(candidate);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ❌ Delete candidate
exports.deleteCandidate = async (req, res) => {
  try {
    const deleted = await Candidate.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: "Candidate not found" });
    }
    res.json({ msg: "Candidate deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 📊 Get results (candidate + vote count)
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
    console.error("Error getting results:", err);
    res.status(500).json({ msg: err.message });
  }
};

// 👥 Get voters list
exports.getVoters = async (req, res) => {
  try {
    const voters = await User.find({ role: "voter" }).select(
      "name email voterId hasVoted"
    );
    res.json(voters);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 📈 Get stats for dashboard
exports.getStats = async (req, res) => {
  try {
    const voters = await User.countDocuments({ role: "voter" });
    const candidates = await Candidate.countDocuments();
    const votes = await Vote.countDocuments();

    res.json({ voters, candidates, votes });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ msg: "Error fetching stats" });
  }
};
