const express = require('express');
const { auth } = require('../Middleware/auth');
const { castVote } = require('../controllers/voteController');
const router = express.Router();

router.post('/', auth, castVote);

module.exports = router;
