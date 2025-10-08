const express = require('express');
const { auth, adminAuth } = require('../Middleware/auth');
const { getResults } = require('../controllers/adminController');
const router = express.Router();

router.use(auth, adminAuth);
router.get('/', getResults);

module.exports = router;
