const express = require('express');
const router = express.Router();
const programmeController = require('../Controllers/programmeController');
const tourController = require('../Controllers/tourController');
// Get all programmes within a specific date range

router.get('/programmes/date-range', programmeController.getProgrammesByDateRange);
router.post('tour/reserve',tourController.registeringOnTour)
module.exports = router;