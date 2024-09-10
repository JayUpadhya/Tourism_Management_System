const express = require('express');
const router = express.Router(); 
const eventController = require('../../controller/Event/eventController.js')

router.post("/createevent", eventController.create);
router.get("/getallevents", eventController.getAll);
router.get("/getoneevent/:id", eventController.getOne);
router.put("/updateevent/:id", eventController.updateEvent);
router.delete("/deleteevent/:id", eventController.deleteEvent);

module.exports = router;