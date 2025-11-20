const Vote = require('../models/vote');

// Cast a vote
exports.castVote = async (req, res) => {
  try {
    const { candidateId } = req.body;

    if (!candidateId) {
      return res.status(400).json({ msg: "Candidate ID is required" });
    }

    // Check if the user has already voted
    const existingVote = await Vote.findOne({ voterId: req.user.id });
    if (existingVote) {
      return res.status(400).json({ msg: "You have already voted" });
    }

    // Save new vote
    const newVote = new Vote({
      voterId: req.user.id,
      candidateId,
    });

    await newVote.save();
    res.status(201).json({ msg: "Vote cast successfully" });
  } catch (error) {
    console.error("Error while casting vote:", error);
    res.status(500).json({ msg: "Server error", error });
  }
};


// Get vote status for logged-in user
exports.getVoteStatus = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted by auth middleware

    // Find if the user has a vote record
    const vote = await Vote.findOne({ voterId: userId });

    if (!vote) {
      return res.json({ hasVoted: false });
    }

    res.json({
      hasVoted: true,
      candidateId: vote.candidateId,
    });
  } catch (err) {
    console.error("Error checking vote status:", err);
    res.status(500).json({ msg: "Error checking vote status" });
  }
};
