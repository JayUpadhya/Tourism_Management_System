const express = require("express");
const router = express.Router();
const feedback = require("../../controller/FeedBack/feedback");
const ServiceFeedback = require("../../controller/FeedBack/ServiceFeedback");

router.get("/feedbacks", feedback.getFeedbacks);
router.post("/createfeedback", feedback.addFeedback);
router.post("/updatefeedback", feedback.updateFeedback);
router.post("/deletefeedback", feedback.deleteFeedback);

router.get("/servicefeedbacks", ServiceFeedback.getServiceFeedbacks);
router.post("/createservicefeedback", ServiceFeedback.addServiceFeedback);
router.post("/updateservicefeedback", ServiceFeedback.updateServiceFeedback);
router.post("/deleteservicefeedback", ServiceFeedback.deleteServiceFeedback);

module.exports = router;
