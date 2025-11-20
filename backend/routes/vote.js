const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");
const voteController = require("../controllers/voteController");

router.post("/", auth, voteController.castVote);
router.get("/status", auth, voteController.getVoteStatus);

module.exports = router;
