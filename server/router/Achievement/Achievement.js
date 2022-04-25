const router = require("express").Router();
const Achievements_Deatils_Model = require("../../model/achievementSchema");

router.post("/achievements", (req, res) => {
  const { image, name, award, expertise, category } = req.body;
  const newAchievement = new Achievements_Deatils_Model({
    image,
    name,
    award,
    expertise,
    category,
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

router.get("/achievements", (req, res) => {
  Achievements_Deatils_Model.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

exports = module.exports = router;
