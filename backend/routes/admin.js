const express = require('express');
const { auth, adminAuth } = require('../Middleware/auth');
const { addCandidate, getResults } = require('../controllers/adminController');  // Add others for CRUD
const router = express.Router();

router.use(auth);
router.post('/candidates', adminAuth, addCandidate);
// GET/PUT/DELETE /candidates...
// In backend/routes/admin.js
const { deleteCandidate } = require('../controllers/adminController');  // Add controller

router.delete('/candidates/:id', adminAuth, deleteCandidate);

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