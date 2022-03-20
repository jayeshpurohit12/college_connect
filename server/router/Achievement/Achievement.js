const router = require("express").Router();
const Achievements_Deatils_Model = require("../../model/achievementSchema");

router.post("/achievement", (req, res) => {
  const { image, name, award, expertise } = req.body;
  const newAchievement = new Achievements_Deatils_Model({
    image,
    name,
    award,
    expertise,
  });
  newAchievement
    .save()
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

exports = module.exports = router;
