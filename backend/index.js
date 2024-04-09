require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Import your controllers and other necessary modules

const userRoutes = require("./routes/user-routes");
const foodRoutes = require("./routes/food-routes");
const bookingRoutes = require("./routes/booking-routes");

mongoose
  .connect(`${process.env.mongoDbURI}`)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

// Other app configurations

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/booking", bookingRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`${PORT}`));
