const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");
const adminController = require("../controllers/adminController");
const Candidate = require("../models/Candidate");

// 📊 Dashboard stats
router.get("/stats", auth, adminController.getStats);

// 👥 Voters list
router.get("/voters", auth, adminController.getVoters);

// 🧑‍💼 Candidate CRUD
router.post("/candidates", auth, adminController.addCandidate);
router.put("/candidates/:id", auth, adminController.updateCandidate);
router.delete("/candidates/:id", auth, adminController.deleteCandidate);

// List all candidates (for ManageCandidates & Voting)
router.get("/candidates", auth, async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// 🧾 Election results
router.get("/results", auth, adminController.getResults);

module.exports = router;
