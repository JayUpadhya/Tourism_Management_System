const express = require('express');
const router = express.Router();
const destinationController = require('../../controller/Destination Manager/controller');

// Destination routes
router.get('/destination', destinationController.getDestination);
router.post('/createdestination', destinationController.addDestination);
router.post('/updatedestination', destinationController.updateDestination);
router.post('/deleteDestination', destinationController.deleteDestination);
router.get('/destination/:id', destinationController.getDestinationById); // New route for fetching destination by id

module.exports = router;