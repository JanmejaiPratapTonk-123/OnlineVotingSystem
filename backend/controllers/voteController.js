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

exports.getVoteStatus = async (req, res) => {
  try {
    const userId = req.user.id; // coming from auth middleware
    const vote = await Vote.findOne({ voter: userId });

    if (vote) {
      return res.json({ hasVoted: true, candidateId: vote.candidate });
    } else {
      return res.json({ hasVoted: false });
    }
  } catch (err) {
    res.status(500).json({ msg: 'Error checking vote status' });
  }
};
