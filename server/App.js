const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

//to secure connection we are using dotenv

dotenv.config({ path: "./config.env" });

//PORT running

const PORT = process.env.PORT;

//databse

require("./database/connection");

//converting into json

app.use(express.json());

//linking pages with the help of router to make it eassy

app.use(require("./router/Internship/Internship"));

app.use(require("./router/Jobs/Jobs"));

app.use(require("./router/Achievement/Achievement"));

var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("this is home");
});

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
