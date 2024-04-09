const mongoose = require("mongoose");
const Booking = require("../model/Booking"); // Import the Booking model
const Food = require("../model/Food"); // Import the Food model
const User = require("../model/User"); // Import the User model
const asyncHandler = require("express-async-handler");

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
exports.createBooking = asyncHandler(async (req, res) => {
  const { food, quantity, time } = req.body;

  const by = req.user._id;

  const newBooking = new Booking({
    by,
    quantity,
    food,
    time,
  });

  const createdBooking = await newBooking.save();

  res.status(201).json(createdBooking);
});



exports.getUserBookings = asyncHandler(async (req, res) => {
  // Get the current date in ISO string format (e.g., "2023-08-23T00:00:00.000Z").
  const todayDate = new Date().toISOString().split("T")[0];
  const userId = req.user._id; // Assuming 'req.user._id' holds the user's ID.
  const role = req.params.role;

  try {
    // Use the aggregate pipeline to match bookings with today's date and the user's ID.
    const userBookings = await Booking.aggregate([
      {
        $match: {
          // Match bookings where the 'createdAt' date is today or later.
          createdAt: {
            $gte: new Date(todayDate),
          },
          by: userId, // Convert the user's ID to ObjectId.
        },
      },
      {
        $lookup: {
          from: "foods", // Replace 'foods' with the actual name of your Food collection
          localField: "food", // Field in the Booking collection
          foreignField: "_id", // Field in the Food collection
          as: "food", // Alias for the populated food field
        },
      },
      {
        $unwind: "$food", // Convert the 'food' array into an object
      },
      {
        $lookup: {
          from: "users", // Replace 'users' with the actual name of your User collection
          localField: "by", // Field in the Booking collection
          foreignField: "_id", // Field in the User collection
          as: "user", // Alias for the populated user field
        },
      },
      {
        $unwind: "$user", // Convert the 'user' array into an object
      },
      {
        $match: {
          "user.role": role, // Filter by the user's role
        },
      },
    ]);

    res.status(200).json(userBookings);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

exports.getPastUserBookings = asyncHandler(async (req, res) => {
  // Get the current date in ISO string format (e.g., "2023-08-23T00:00:00.000Z").
  const todayDate = new Date().toISOString().split("T")[0];
  const userId = req.user._id; // Assuming 'req.user._id' holds the user's ID.
  const role = req.params.role;

  try {
    // Use the aggregate pipeline to match bookings created before today's date and the user's ID.
    const userPastBookings = await Booking.aggregate([
      {
        $match: {
          // Match bookings where the 'createdAt' date is before today.
          createdAt: {
            $lt: new Date(todayDate),
          },
          by: userId, // Convert the user's ID to ObjectId if needed.
        },
      },
      {
        $lookup: {
          from: "foods", // Replace 'foods' with the actual name of your Food collection
          localField: "food", // Field in the Booking collection
          foreignField: "_id", // Field in the Food collection
          as: "food", // Alias for the populated food field
        },
      },
      {
        $unwind: "$food", // Convert the 'food' array into an object
      },
      {
        $lookup: {
          from: "users", // Replace 'users' with the actual name of your User collection
          localField: "by", // Field in the Booking collection
          foreignField: "_id", // Field in the User collection
          as: "user", // Alias for the populated user field
        },
      },
      {
        $unwind: "$user", // Convert the 'user' array into an object
      },
      {
        $match: {
          "user.role": role, // Filter by the user's role
        },
      },
    ]);

    res.status(200).json(userPastBookings);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//
//
//FOR ADMIN ONLY
//
//

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Public
exports.getAllBookings = asyncHandler(async (req, res) => {
  const todayDate = new Date().toISOString().split("T")[0];
  const role = req.params.role;
  console.log(role);
  try {
    // Use the aggregate pipeline to match bookings with today's date and the user's ID.
    const userBookings = await Booking.aggregate([
      {
        $match: {
          // Match bookings where the 'createdAt' date is today or later.
          createdAt: {
            $gte: new Date(todayDate),
          },
        },
      },
      {
        $lookup: {
          from: "foods", // Replace 'foods' with the actual name of your Food collection
          localField: "food", // Field in the Booking collection
          foreignField: "_id", // Field in the Food collection
          as: "food", // Alias for the populated food field
        },
      },
      {
        $unwind: "$food", // Convert the 'food' array into an object
      },
      {
        $lookup: {
          from: "users", // Replace 'users' with the actual name of your User collection
          localField: "by", // Field in the Booking collection
          foreignField: "_id", // Field in the User collection
          as: "user", // Alias for the populated user field
        },
      },
      {
        $unwind: "$user", // Convert the 'user' array into an object
      },
      {
        $match: {
          "user.role": role, // Filter by the user's role
        },
      },
    ]);

    res.status(200).json(userBookings);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


exports.getAllPastBookings = asyncHandler(async (req, res) => {
  const todayDate = new Date().toISOString().split("T")[0];
  const role = req.params.role;

  try {
    // Use the aggregate pipeline to match bookings created before today's date and the user's ID.
    const userPastBookings = await Booking.aggregate([
      {
        $match: {
          // Match bookings where the 'createdAt' date is before today.
          createdAt: {
            $lt: new Date(todayDate),
          },
        },
      },
      {
        $lookup: {
          from: "foods", // Replace 'foods' with the actual name of your Food collection
          localField: "food", // Field in the Booking collection
          foreignField: "_id", // Field in the Food collection
          as: "food", // Alias for the populated food field
        },
      },
      {
        $unwind: "$food", // Convert the 'food' array into an object
      },
      {
        $lookup: {
          from: "users", // Replace 'users' with the actual name of your User collection
          localField: "by", // Field in the Booking collection
          foreignField: "_id", // Field in the User collection
          as: "user", // Alias for the populated user field
        },
      },
      {
        $unwind: "$user", // Convert the 'user' array into an object
      },
      {
        $match: {
          "user.role": role, // Filter by the user's role
        },
      },
    ]);

    res.status(200).json(userPastBookings);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//
//
//FOR ADMIN ONLY
//
//

// @desc    Get a single booking by ID
// @route   GET /api/bookings/:id
// @access  Public
exports.getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate("by", "name email")
    .populate("food.food", "title price");

  if (booking) {
    res.json(booking);
  } else {
    res.status(404).json({ message: "Booking not found" });
  }
});

// @desc    Update a booking
// @route   PUT /api/bookings/:id
// @access  Public
exports.updateBooking = asyncHandler(async (req, res) => {
  const { quantity } = req.body;

  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }
  if (booking.by.toString() === req.user._id.toString()) {
    await Booking.findOneAndUpdate(
      { _id: req.params.id },
      { quantity: quantity }
    );
  } else {
    return res.status(501).json({ message: "Not auth" });
  }

  res.status(200).json({ message: "Booking updated" });
});

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
// @access  Public
exports.deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }
  if (booking.by.toString() === req.user._id.toString()) {
    await Booking.findByIdAndRemove(req.params.id);
  } else {
    return res.status(501).json({ message: "Not auth" });
  }

  res.status(200).json({ message: "Booking removed" });
});

// @desc    Get bookings for a particular date and categorize by time zone
// @route   GET /api/bookings/date/:date
// @access  Public
exports.getBookingsByDate = asyncHandler(async (req, res) => {
  const requestedDate = new Date(req.params.date);
  const nextDay = new Date(requestedDate);
  nextDay.setDate(nextDay.getDate() + 1);

  const bookings = await Booking.find({
    createdAt: {
      $gte: requestedDate,
      $lt: nextDay,
    },
  })
    .populate("by", "name email")
    .populate("food.food", "title price");

  const breakfastBookings = [];
  const lunchBookings = [];

  bookings.forEach((booking) => {
    if (booking.time === "Breakfast") {
      breakfastBookings.push(booking);
    } else if (booking.time === "Lunch") {
      lunchBookings.push(booking);
    }
  });

  res.json({
    breakfastBookings,
    lunchBookings,
  });
});

exports.getRecentBookings = asyncHandler(async (req, res) => {
  const getAllBookings = await Booking.find()
    .sort({ createdAt: -1 })
    .populate("by")
    .populate("food");

  res.status(200).json(getAllBookings);
});

exports.getRecentNgoBookings = asyncHandler(async (req, res) => {
  const getAllBookings = await Booking.find({ "by.role": "Ngo" })
    .sort({ createdAt: -1 })
    .populate({
      path: "by",
      populate: { path: "food" },
    });

  res.status(200).json(getAllBookings);
});
