const mongoose = require("mongoose");

var date = new Date();

const Internship_Details = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  posted_Date: {
    type: String,
    required: true,
    default: date.toLocaleDateString(),
  },
  positionLink: {
    type: String,
    required: true,
  },
});

const Internship_Detail = mongoose.model(
  "Internship_Details",
  Internship_Details
);

module.exports = Internship_Detail;
