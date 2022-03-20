const mongoose = require("mongoose");

const database = process.env.DATABASE;

mongoose.connect(database, () => {
  console.log("connection successfull");
});
