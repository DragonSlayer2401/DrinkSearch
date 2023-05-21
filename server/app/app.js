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

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//Doesn't work
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
//   }
//   next();
// });

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
