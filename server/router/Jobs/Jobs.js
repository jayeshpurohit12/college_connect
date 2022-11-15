const router = require("express").Router();
const Job_Detail = require("../../model/jobSchema");

router.post("/Jobs", async (req, res) => {
  const { name,date, batch, positionLink, image } = req.body;

  const job = new Job_Detail({
    image,
    name,
    batch,
    date,
    positionLink,
  });
  const result = await job.save();
  res.send(result);
});

router.get("/Jobs", async (req, res) => {
  const result = await Job_Detail.find();
  res.send(result);
});

module.exports = router;
