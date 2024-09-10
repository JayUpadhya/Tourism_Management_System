const express = require("express");
const app = express();
const cors = require("cors");
const controller = require("./controller/Destination Manager/controller");

app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/destination", (req, res) => {
  controller.getDestination(req, res, (next) => {
    res.send();
  });
});

app.post("/createdestination", (req, res) => {
  controller.addDestination(req.body, (callack) => {
    res.send();
  });
});

app.post("/updatedestination", (req, res) => {
  controller.updateDestination(req.body, (callack) => {
    res.send(callack);
  });
});

app.post("/deletedestination", (req, res) => {
  controller.deleteDestination(req.body, (callack) => {
    res.send(callack);
  });
});

module.exports = app;
