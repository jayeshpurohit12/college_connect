const mongoose = require("mongoose");

const Achievements_Deatils = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  award: {
    type: String,
    required: true,
  },
  expertise: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Achievements_Deatils_Model = mongoose.model(
  "Achievements_Deatils",
  Achievements_Deatils
);

module.exports = Achievements_Deatils_Model;
