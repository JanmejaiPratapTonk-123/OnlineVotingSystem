const express = require('express');
const { auth } = require('../Middleware/auth');
const { castVote, getVoteStatus } = require('../controllers/voteController');
const router = express.Router();

router.post('/', auth, castVote);
router.get('/status', auth, getVoteStatus);

module.exports = router;
