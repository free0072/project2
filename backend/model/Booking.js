const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    food: {
      type: Schema.Types.ObjectId,
      ref: "Food",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },

    time: {
      type: String,
      enum: ["Breakfast", "Lunch"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
