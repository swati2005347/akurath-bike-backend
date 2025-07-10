const express = require("express");
const router = express.Router();
const Bike = require("../models/Bike");

// @route   GET /api/bikes
// @desc    Get all bikes
router.get("/", async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.json(bikes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/bikes
// @desc    Add a new bike
router.post("/", async (req, res) => {
  const { name, price, description, image } = req.body;

  const bike = new Bike({
    name,
    price,
    description,
    image,
  });

  try {
    const newBike = await bike.save();
    res.status(201).json(newBike);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
