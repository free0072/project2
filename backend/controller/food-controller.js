const Food = require("../model/Food"); // Import the Food model
const asyncHandler = require("express-async-handler");
const axios = require("axios");
require("dotenv").config()

// @desc    Create a new food item
// @route   POST /api/foods
// @access  Public
exports.createFood = asyncHandler(async (req, res) => {
  const { title, type, price } = req.body;
  const image = req.file;
  let imageUrl;

  if (image) {
    const body = {
      image: image.buffer.toString("base64"),
    };

    try {
      const driveResponse = await axios.post(`${process.env.IMAGE_UPLOAD_SERVICE_API}/drive/upload`, body);
      imageUrl = driveResponse.data.webViewLink;
    } catch (error) {
      console.error("Error uploading to Google Drive:", error);
      return res.status(501).json({ message: "File Upload Error" });
    }
  }

  const newFood = new Food({
    title,
    type,
    price,
    img: imageUrl,
  });

  const createdFood = await newFood.save();

  res.status(201).json(createdFood);
});

// @desc    Get all food items
// @route   GET /api/foods
// @access  Public
exports.getAllFoods = asyncHandler(async (req, res) => {
  const foods = await Food.find();
  res.json(foods);
});

exports.getBreakfastFoods = asyncHandler(async (req, res) => {

  const breakfastItems = await Food.find({ type: "Breakfast" });
  res.status(200).json(breakfastItems);
});

exports.getLunchFoods = asyncHandler(async (req, res) => {

  const lunchItems = await Food.find({ type: "Lunch" });
  res.status(200).json(lunchItems);
});

// @desc    Get a single food item by ID
// @route   GET /api/foods/:id
// @access  Public
exports.getFoodById = asyncHandler(async (req, res) => {
  const food = await Food.findById(req.params.id);

  if (food) {
    res.json(food);
  } else {
    res.status(404).json({ message: "Food not found" });
  }
});

// @desc    Update a food item
// @route   PUT /api/foods/:id
// @access  Public
exports.updateFood = asyncHandler(async (req, res) => {
  const { title, description, price } = req.body;

  const food = await Food.findById(req.params.id);

  if (food) {
    food.title = title || food.title;
    food.description = description || food.description;
    food.price = price || food.price;

    const updatedFood = await food.save();
    res.json(updatedFood);
  } else {
    res.status(404).json({ message: "Food not found" });
  }
});

// @desc    Delete a food item
// @route   DELETE /api/foods/:id
// @access  Public
exports.deleteFood = asyncHandler(async (req, res) => {
  const food = await Food.findById(req.params.id);

  if (food) {
    await food.remove();
    res.json({ message: "Food removed" });
  } else {
    res.status(404).json({ message: "Food not found" });
  }
});
