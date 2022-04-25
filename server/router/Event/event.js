const router = require("express").Router();
const Event = require("../../model/eventSchema");

router.post("/event", (req, res) => {
  const { name, description, date, startTime, endTime, image, category } =
    req.body;
  const newEvent = new Event({
    name,
    description,
    date,
    startTime,
    endTime,
    image,
    category,
  });
  newEvent
    .save()
    .then((event) => {
      res.json(event);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/event", (req, res) => {
  Event.find()
    .then((event) => {
      res.json(event);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
