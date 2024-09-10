const Feedback = require("../../model/FeedBack/feedback");
const { v4: uuidv4 } = require("uuid");

//get all travelguides feedbacks

const getFeedbacks = (req, res, next) => {
  Feedback.find() //promis
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

//add travelguidefeedback
const addFeedback = (req, res, next) => {
  const feedback = new Feedback({
    id: uuidv4(),
    name: req.body.name,
    email: req.body.email,
    travelguide: req.body.travelguide,
    rating: req.body.rating,
    feedback: req.body.feedback,
  });
  feedback
    .save()
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

//edit travelguidefeedback
const updateFeedback = (req, res, next) => {
  const { id, name, email, travelguide, rating, feedback } = req.body;
  Feedback.updateOne(
    { id: id },
    {
      $set: {
        name: name,
        email: email,
        travelguide: travelguide,
        rating: rating,
        feedback: feedback,
      },
    }
  )
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

//delete travelguidefeedback
const deleteFeedback = (req, res, next) => {
  const id = req.body.id;
  Feedback.deleteOne({ id: id })
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

exports.getFeedbacks = getFeedbacks;
exports.addFeedback = addFeedback;
exports.updateFeedback = updateFeedback;
exports.deleteFeedback = deleteFeedback;
