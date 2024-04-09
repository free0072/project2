const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();


const {
  createFood,
  getAllFoods,
  getFoodById,
  updateFood,
  deleteFood,
  getBreakfastFoods,
  getLunchFoods,
} = require('../controller/food-controller');

router.post('/create', upload.single('image'), createFood);
router.get('/all', getAllFoods);
router.get('/breakfast', getBreakfastFoods)
router.get('/lunch', getLunchFoods)
router.get('/:id', getFoodById);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);

module.exports = router;
