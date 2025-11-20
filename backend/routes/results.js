const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");
const adminController = require("../controllers/adminController");

// GET /api/results/  → returns election results
router.get("/", auth, adminController.getResults);

module.exports = router;
