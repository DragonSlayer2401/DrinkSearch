const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const userRouter = require("../api/routes/users");
const favoriteRouter = require("../api/routes/favorites");

const app = express();

app.use(morgan("dev"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(cors({origin: "http://localhost:3000"}));

app.get("/", (req, res, next) =>
  res.status(200).json({ message: "Service is running", method: req.method })
);

app.use("/users", userRouter);
app.use("/favorites", favoriteRouter);

app.use((req, res, next) => {
  const err = new Error("NOT FOUND!");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    status: err.status,
    method: req.method,
  });
});

mongoose.connect(process.env.mongoURL);

module.exports = app;
