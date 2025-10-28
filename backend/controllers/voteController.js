const Vote = require('../models/vote');

exports.castVote = async (req, res) => {
  try {
    const { candidateId } = req.body;
    const existingVote = await Vote.findOne({ voterId: req.user.id });
    if (existingVote) {
      return res.status(400).json({ msg: 'You have already voted' });
    }

    const newVote = new Vote({
      voterId: req.user.id,
      candidateId,
    });

    await newVote.save();
    res.status(201).json({ msg: 'Vote cast successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};

// ✅ New function
exports.getVoteStatus = async (req, res) => {
  try {
    const vote = await Vote.findOne({ voterId: req.user.id });
    if (vote) {
      res.json({ hasVoted: true, candidateId: vote.candidateId });
    } else {
      res.json({ hasVoted: false });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};
