const User = require("../models/user");
const Candidate = require("../models/Candidate");
const Vote = require("../models/vote");
const { decrypt } = require("../utils/encryption");

// ➕ Add candidate
exports.addCandidate = async (req, res) => {
  try {
    const { name, party } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Candidate name is required" });
    }

    const candidate = new Candidate({
      name,
      party: party || "Independent", // optional
      votes: 0,
    });

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

// Get Voters
exports.getVoters = async (req, res) => {
  try {
    const voters = await User.find({ role: "voter" }).select("name email voterId hasVoted");
    res.json(voters);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 📈 Get stats
exports.getStats = async (req, res) => {
  try {
    const voters = await User.countDocuments({ role: "voter" }); // only count voters
    const candidates = await Candidate.countDocuments();
    const votes = await Vote.countDocuments();

    res.json({ voters, candidates, votes });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching stats" });
  }
};