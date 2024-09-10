const ServiceFeedback = require("../../model/FeedBack/ServiceFeedback");
const { v4: uuidv4 } = require("uuid");

//get all service feedbacks

const getServiceFeedbacks = (req, res, next) => {
  ServiceFeedback.find() //promis
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

//add service feedback
const addServiceFeedback = (req, res, next) => {
  const servicefeedback = new ServiceFeedback({
    id: uuidv4(),
    name: req.body.name,
    email: req.body.email,
    rating: req.body.rating,
    feedback: req.body.feedback,
  });
  servicefeedback
    .save()
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

//edit service feedback
const updateServiceFeedback = (req, res, next) => {
  const { id, name, email, rating, feedback } = req.body;
  ServiceFeedback.updateOne(
    { id: id },
    {
      $set: {
        name: name,
        email: email,
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

//delete service feedback
const deleteServiceFeedback = (req, res, next) => {
  const id = req.body.id;
  ServiceFeedback.deleteOne({ id: id })
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

exports.getServiceFeedbacks = getServiceFeedbacks;
exports.addServiceFeedback = addServiceFeedback;
exports.updateServiceFeedback = updateServiceFeedback;
exports.deleteServiceFeedback = deleteServiceFeedback;
