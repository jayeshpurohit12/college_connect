const router = require("express").Router();
const Internship_Detail = require("../../model/internshipSchema");

router.post("/internships", async (req, res) => {
  const { name, date,batch, positionLink, image } = req.body;

  const internship = new Internship_Detail({
    image,
    name,
    batch,
    date,
    positionLink,
  });
  const result = await internship.save();
  res.send(result);
  console.log(result);
});

router.get("/internships", async (req, res) => {
  const search = req.query.search
    ? {
        name: {
          $regex: req.query.search,
          $options: "i",
        },
      }
    : {};
  const result = await Internship_Detail.find({...search});
  res.send(result);
});

module.exports = router;
