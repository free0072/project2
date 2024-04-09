const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ["Lunch", "Breakfast"],
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
  },
});

module.exports = mongoose.model("Food", foodSchema);
