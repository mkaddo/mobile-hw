const express = require('express');
const router = express.Router();
const driverController = require('../Controllers/driverController');
const is_admin= require('../Middleware/is_admin')


// Create a new driver
router.post('/drivers',driverController.createDriver);

// Get all drivers
router.get('/drivers', driverController.getAllDrivers);

// Get a specific driver by ID
router.get('/drivers/:id', driverController.getDriverById);

// Update a driver by ID
router.put('/drivers/:id', driverController.updateDriver);

// Delete a driver by ID
router.delete('/drivers/:id', driverController.deleteDriver);







const guideController = require('../Controller/guideController');

// Create a new guide
router.post('/guides',  guideController.createGuide);

// Get all guides
router.get('/guides',  guideController.getAllGuides);

// Get a specific guide by ID
router.get('/guides/:id',  guideController.getGuideById);

// Update a guide by ID
router.put('/guides/:id',  guideController.updateGuide);

// Delete a guide by ID
router.delete('/guides/:id',  guideController.deleteGuide);






const programmeController = require('../Controllers/programmeController');

// Create a new programme
router.post('/programmes',  programmeController.createProgramme);

// Get all programmes
router.get('/programmes',  programmeController.getAllProgrammes);

// Get a specific programme by ID
router.get('/programmes/:id',  programmeController.getProgrammeById);

// Update a programme by ID
router.put('/programmes/:id',  programmeController.updateProgramme);

// Delete a programme by ID
router.delete('/programmes/:id',  programmeController.deleteProgramme);






const tourController = require('../Controllers/tourController');

// Create a new tour
router.post('/tours', tourController.createTour);

// Get all tours
router.get('/tours', tourController.getAllTours);

// Get a specific tour by ID
router.get('/tours/:id', tourController.getTourById);

// Update a tour by ID
router.put('/tours/:id', tourController.updateTour);

// Delete a tour by ID
router.delete('/tours/:id', tourController.deleteTour);



// Report: Get tour count by driver between two dates
router.get('/tours/report/drivers', tourController.getTourCountByDriver);




module.exports = router;
