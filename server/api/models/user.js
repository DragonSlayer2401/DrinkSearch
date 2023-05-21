const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },

  favorites: [
    { type: mongoose.Schema.Types.ObjectId, ref: "favorite", required: false },
  ],
});

module.exports = mongoose.model("user", userSchema);
