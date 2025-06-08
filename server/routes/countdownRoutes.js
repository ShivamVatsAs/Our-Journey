const express = require('express');
const router = express.Router();
const { getCountdownDate, setCountdownDate } = require('../controllers/countdownController');

// This defines two routes on the same path ('/api/countdown'):
// A GET request will be handled by getCountdownDate.
// A POST request will be handled by setCountdownDate.
router.route('/').get(getCountdownDate).post(setCountdownDate);

module.exports = router;
