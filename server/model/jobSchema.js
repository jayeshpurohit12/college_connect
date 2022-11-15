const mongoose = require("mongoose");

var date = new Date();

const Job_Details = new mongoose.Schema({
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
  date: {
    type: Date,
    required: true,
  },
  positionLink: {
    type: String,
    required: true,
  },
});

const Job_Detail = mongoose.model("Job_Details", Job_Details);

module.exports = Job_Detail;
