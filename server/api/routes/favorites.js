const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Favorite = require("../models/favorite");

//Retrieves all of the user's favorite drinks and responds with an array of the drinks Object IDs
router.get("/:username", (req, res, next) => {
  const username = req.params.username.toLowerCase();
  //Finds the user
  Favorite.find({ user: username })
    .exec()
    .then((result) => {
      //Checks if a user was found
      if (result.length === 0) {
        return res.status(404).json({
          message: "user not found!",
        });
      }

      const idArray = [];
      //Adds each id to the idArray
      result.forEach((e) => idArray.push(e._id));

      //Responds with the idArray
      return res.status(200).json({
        ids: idArray,
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
    }).catch((err) => {
      res.status(500).json({
        error: {
          message: err.message,
          metadata: {
            method: req.method,
          },
        },
      });
})});

//Adds a favorite drink for a specified user in the database
router.post("/add", (req, res, next) => {
  const username = req.body.user.toLowerCase();
  //Creates the new favorite drink
  const newFavorite = new Favorite({
    _id: new mongoose.Types.ObjectId(),
    user: username,
    drinkData: {
      name: req.body.drinkData.name,
      image: req.body.drinkData.image,
      ingredients: req.body.drinkData.ingredients,
      instructions: req.body.drinkData.instructions,
    },
  });

  //Adds the new favorite drink into the database
  newFavorite
    .save()
    .then((result) => {
      res.status(200).json({
        message: "success",
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

//Removes a favorite drink for a specified user
router.delete("/delete/:id", (req, res, next) => {
  const id = req.params.id;
  //Finds a favorited drink by id
  Favorite.findOne({_id: id})
    .exec()
    .then((favoriteDrink) => {
      //Checks if a drink was found
      if (favoriteDrink === null) {
        return res.status(404).json({
          message: "Drink not Found!",
        });
      }

      //Removes the drink from the database
      Favorite.deleteOne(favoriteDrink)
        .exec()
        .then((result) => {
          res.status(200).json({
            message: "Deleted drink successfully",
            metadata: result,
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
    }).catch((err) => {
      res.status(500).json({
        error: {
          message: err.message,
          metadata: {
            method: req.method,
          },
        },
      });;
})});

module.exports = router;
