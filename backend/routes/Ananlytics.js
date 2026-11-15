const express = require('express');

const router = express.Router();

const { getAnalytics } = require('../controllers/analyticsController');

const { protect } = require('../middlewares/authmiddleware');

const { admin } = require('../middlewares/admin');

router.get('/analytics', protect, admin, getAnalytics);

module.exports = router;