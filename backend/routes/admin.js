const express = require("express");
const { auth, adminAuth } = require('../Middleware/auth');
const { addCandidate, getResults } = require('../controllers/adminController');
const adminController = require("../controllers/adminController");
const router = express.Router();

router.use(auth);
router.post('/candidates', adminAuth, addCandidate);
const { deleteCandidate } = require('../controllers/adminController');  // Add controller

router.post("/addCandidate", adminController.addCandidate);
router.put("/updateCandidate/:id", adminController.updateCandidate);
router.delete("/deleteCandidate/:id", adminController.deleteCandidate);
router.get("/results", adminController.getResults);

// In backend/controllers/adminController.js, add:
exports.deleteCandidate = async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Candidate deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
module.exports = router;