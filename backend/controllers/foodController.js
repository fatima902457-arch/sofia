const Food = require('../models/Food');
const Category = require('../models/Category');

const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find().populate('category');
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate('category');
    if (!food) {
      return res.status(404).json({ error: 'Food not found' });
    }
    res.json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createFood = async (req, res) => {
  try {
    const { name, description, price, category, image, rating, isVegetarian } = req.body;

    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const food = new Food({
      name,
      description,
      price,
      category,
      image,
      rating: rating || 4.5,
      isVegetarian: isVegetarian || false
    });

    await food.save();
    await food.populate('category');

    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFood = async (req, res) => {
  try {
    const { name, description, price, category, image, rating, isVegetarian, isAvailable } = req.body;

    let food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ error: 'Food not found' });
    }

    if (name) food.name = name;
    if (description) food.description = description;
    if (price) food.price = price;
    if (category) food.category = category;
    if (image) food.image = image;
    if (rating) food.rating = rating;
    if (isVegetarian !== undefined) food.isVegetarian = isVegetarian;
    if (isAvailable !== undefined) food.isAvailable = isAvailable;

    await food.save();
    await food.populate('category');

    res.json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).json({ error: 'Food not found' });
    }
    res.json({ message: 'Food deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllFoods, getFoodById, createFood, updateFood, deleteFood };
