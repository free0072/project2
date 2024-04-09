const axios = require('axios');
const mongoose = require('mongoose');
const Food = require('../model/Food');


async function connectDB() {
    const mongoURI = 'mongodb+srv://ramkr0072:immindit123@cluster0.de2g1mm.mongodb.net';
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  }


const generateRandomPrice = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(2);
};

function getRandomType() {
    const types = ['Lunch', 'Breakfast'];
    return types[Math.floor(Math.random() * types.length)];
  }

const fetchAndSaveFoodData = async () => {
    const options = {
        method: 'GET',
        url: 'https://the-mexican-food-db.p.rapidapi.com/',
        headers: {
          'X-RapidAPI-Key': '5ddca5e983msh9cd5fa10fe64654p106f81jsn644b82607479',
          'X-RapidAPI-Host': 'the-mexican-food-db.p.rapidapi.com'
        }
    };

  try {
    await connectDB();
    const response = await axios.request(options);
    const foods = response.data;
    
    foods.forEach(async (item) => {
      const newFood = new Food({
        title: item.title,
        type: getRandomType(),
        price: generateRandomPrice(5, 20), 
        img: item.image,
      });

      await newFood.save();
    });

    console.log('Food data has been saved to the database.');
  } catch (error) {
    console.error('Error fetching or saving food data:', error);
  }
};

fetchAndSaveFoodData();
