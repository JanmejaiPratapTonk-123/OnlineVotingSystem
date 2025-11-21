const Vote = require("../models/vote");

// POST /api/vote
exports.castVote = async (req, res) => {
  try {
    const { candidateId } = req.body;

    if (!candidateId) {
      return res.status(400).json({ msg: "Candidate ID is required" });
    }

    const userId = req.user?.id || req.user?._id || req.user?.userId;
    if (!userId) {
      return res.status(401).json({ msg: "Unauthorized: user not found in token" });
    }

    // Check if the user has already voted
    const existingVote = await Vote.findOne({ voterId: userId });
    if (existingVote) {
      return res.status(400).json({ msg: "You have already voted" });
    }

    const newVote = new Vote({
      voterId: userId,
      candidateId,
    });

    await newVote.save();
    res.status(201).json({ msg: "Vote cast successfully" });
  } catch (error) {
    console.error("Error while casting vote:", error);
    res.status(500).json({ msg: error.message || "Server error" });
  }
};

// GET /api/vote/status
exports.getVoteStatus = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id || req.user?.userId;
    if (!userId) {
      return res.status(401).json({ hasVoted: false, msg: "Unauthorized" });
    }

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
