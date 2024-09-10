const express = require('express');
const router = express.Router();
const bookingController = require('../../controller/Booking/bookingController.js');

router.post("/create", bookingController.create);
router.get("/getall", bookingController.getAll);
router.get("/getone/:id", bookingController.getOne);
router.put("/update/:id", bookingController.updateBooking);
router.delete("/delete/:id", bookingController.deleteBooking);

module.exports = router;