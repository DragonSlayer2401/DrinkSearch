const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    type: String,
    required: true,
  },

  drinkData: {
    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    ingredients: {
      type: Array,
      required: true,
    },

    instructions: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("favorite", favoriteSchema);
