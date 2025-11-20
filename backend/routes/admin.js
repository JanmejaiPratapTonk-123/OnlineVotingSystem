const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");

const Candidate = require("../models/Candidate");
const User = require("../models/user");
const Vote = require("../models/vote");

// ====================== 📊 DASHBOARD STATS ======================
router.get("/stats", auth, async (req, res) => {
  try {
    const voters = await User.countDocuments({ role: "voter" });
    const candidates = await Candidate.countDocuments();
    const votes = await Vote.countDocuments();

    res.json({ voters, candidates, votes });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching stats", err });
  }
});

// ====================== 👥 VIEW VOTERS ======================
router.get("/voters", auth, async (req, res) => {
  try {
    const voters = await User.find({ role: "voter" }).select("-password");
    res.json(voters);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ====================== 🧑‍💼 CANDIDATE CRUD ======================
router.post("/candidates", auth, async (req, res) => {
  try {
    const newCandidate = new Candidate(req.body);
    await newCandidate.save();
    res.status(201).json(newCandidate);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/candidates", auth, async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.put("/candidates/:id", auth, async (req, res) => {
  try {
    const updated = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.delete("/candidates/:id", auth, async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    res.json({ msg: "Candidate deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ====================== 📥 RESULTS ======================
router.get("/results", auth, async (req, res) => {
  try {
    const results = await Vote.aggregate([
      { $group: { _id: "$candidateId", votes: { $sum: 1 } } },
      {
        $lookup: {
          from: "candidates",
          localField: "_id",
          foreignField: "_id",
          as: "candidate",
        },
      },
    ]);

    res.json(results);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching results", err });
  }
});

module.exports = router;
