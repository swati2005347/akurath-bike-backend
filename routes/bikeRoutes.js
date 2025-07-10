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
  // POST multiple bikes (bulk insert)
router.post("/bulk", async (req, res) => {
  try {
    const bikes = await Bike.insertMany(req.body);
    res.status(201).json(bikes);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// DELETE a bike by ID
router.delete("/:id", async (req, res) => {
  try {
    const bike = await Bike.findByIdAndDelete(req.params.id);
    if (!bike) return res.status(404).json({ message: "Bike not found" });
    res.json({ message: "Bike deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



  try {
    const newBike = await bike.save();
    res.status(201).json(newBike);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
