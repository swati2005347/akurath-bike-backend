const express = require("express");
const router = express.Router();
const Bike = require("../models/Bike");

// ✅ GET all bikes
router.get("/", async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.json(bikes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST a new bike
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

// ✅ POST multiple bikes (bulk insert)
router.post("/bulk", async (req, res) => {
  try {
    const bikes = await Bike.insertMany(req.body);
    res.status(201).json(bikes);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ DELETE all bikes
router.delete("/", async (req, res) => {
  try {
    await Bike.deleteMany({});
    res.json({ message: "All bikes deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
