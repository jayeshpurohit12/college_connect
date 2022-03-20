const router = require("express").Router();
const Internship_Detail = require("../../model/internshipSchema");

router.post("/internships", async (req, res) => {
  const { name, batch, positionLink, image } = req.body;

  const internship = new Internship_Detail({
    image,
    name,
    batch,
    positionLink,
    
  });
  const result = await internship.save();
  res.send(result);
  console.log(result);
});

router.get("/internships", async (req, res) => {
  const result = await Internship_Detail.find();
  res.send(result);

});

module.exports = router;
