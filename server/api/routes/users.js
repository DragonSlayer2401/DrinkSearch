const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/user");
const axios = require("axios");
const bcrypt = require("bcrypt");
const favorite = require("../models/favorite");

//Add a user when they signup
router.post("/add", (req, res, next) => {
  //Storing the provided username as lowercase to make it case insensitive
  const username = req.body.user.username.toLowerCase();
  //Hashes the password asynchronously with a cost factor of 10
  bcrypt.hash(req.body.user.password, 10, (err, hash) => {
    //Stores the hashed password
    const password = hash;

    //Displays any errors to the console
    if (err) {
      return console.error(err);
    }

    //Makes sure the provided username is not already taken
    User.find({ "user.username": username })
      .exec()
      .then((result) => {
        if (result.length === 1) {
          return res.status(200).json({
            message: "user already exists",
          });
        }

        //Creates the new user and sets their favorite drinks to null
        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          user: {
            username: username,
            password: password,
          },
          favorites: null,
        });

        //Adds the new user into the database
        newUser
          .save()
          .then((result) => {
            res.status(200).json({
              message: "success",
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Adding user ${username} failed`,
            });
          });
      });
  });
});

//Finds a user in the database to login
router.post("/find", (req, res, next) => {
  //Stores the username as lowercase since all usernames should be lowercase in the database
  const username = req.body.user.username.toLowerCase();
  //Searches for one user based on the inputted username
  User.findOne({ "user.username": username })
    .exec()
    .then((result) => {
      //Checks if no user was found in the database
      if (result === null) {
        return res.status(200).json({
          userFound: false,
        });
      }
      //Stores the hashed password found in the database
      const hashedPassword = result.user.password;
      //Compares the plain text password inputted by the user to the hashed password in the database
      bcrypt.compare(req.body.user.password, hashedPassword, (err, result) => {
        //Displays any errors in the console
        if (err) {
          return console.error(err);
        }
        //plain text password matches hashed password
        else if (result === true) {
          return res.status(200).json({
            userFound: true,
            result,
          });
        }
      });
    })
    .catch((err) =>
      res.status(500).json({
        error: {
          messsage: err.message,
          metadata: {
            method: req.method,
          },
        },
      })
    );
});

//Retrieves the user with an array of their favorite drinks
router.get("/:username", (req, res, next) => {
  const username = req.params.username.toLowerCase();
  //Searches for a user that matches the provided username
  User.findOne({ "user.username": username })
    .populate("favorites", "drinkData")
    .select("user favorites -_id")
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json({
        error: {
          message: err.message,
          metadata: {
            method: req.method,
          },
        },
      });
    });
});

//Update the user and add their favorite drinks
router.patch("/drinks", (req, res, next) => {
  const username = req.body.user.username.toLowerCase();
  const password = req.body.user.password;
  const ids = req.body.user.ids;
  //Searches for a user that matches the provided username
  User.findOne({ "user.username": username })
    .exec()
    .then((userFound) => {
      if (userFound === null) {
        return res.status(200).json({
          message: "user not found!",
        });
      }

      //Creates the updated user with their drinks added
      const updatedUser = {
        user: {
          username: username,
          password: password,
        },
        favorites: ids,
      };

      //Updates the user in the database
      User.updateOne(
        {
          _id: userFound._id,
        },
        {
          $set: updatedUser,
        }
      )
        .exec()
        .then((updateResult) => {
          res.status(200).json({
            updateResult,
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: {
              messsage: "user update unsuccessful",
              metadata: {
                method: req.method,
              },
            },
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          message: err.message,
          metadata: {
            method: req.method,
          },
        },
      });
    });
});

//Changes the user's password
router.patch("/password", (req, res, next) => {
  const username = req.body.user.username.toLowerCase();
  const favorites = req.body.favorites;
  User.findOne({ "user.username": username })
    .exec()
    .then((user) => {
      if (user === null) {
        return res.status(404).json({
          message: "user not found!",
        });
      }
      //Hashes the new password asynchronously with a cost factor of 10
      bcrypt.hash(req.body.user.password, 10, (err, hash) => {
        //Stores the hashed password
        const password = hash;

        //Displays any errors in the console
        if(err) {
          return console.error(err);
        }

        //Creates the new user info
        const updatedUser = {
          user: {
            username: username,
            password: password,
          },
          favorites: favorites,
        };

        //Updates the user info in the database
        User.updateOne(
          {
            _id: user._id,
          },
          {
            $set: updatedUser,
          }
        )
          .exec()
          .then((updateResult) => {
            res.status(200).json({
              updateResult,
            });
          })
          .catch((err) => {
            res.status(500).json({
              error: {
                messsage: err.message,
                metadata: {
                  method: req.method,
                },
              },
            });
          });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          message: err.message,
          metadata: {
            method: req.method,
          },
        },
      });
    });
});

module.exports = router;
