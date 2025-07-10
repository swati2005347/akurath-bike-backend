const express = require('express');
const router = express.Router();
const Bike = require('../models/Bike');

// GET all bikes
router.get('/', async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.json(bikes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST single or multiple bikes
router.post('/', async (req, res) => {
  const data = Array.isArray(req.body) ? req.body : [req.body];
  try {
    const savedBikes = await Bike.insertMany(data);
    res.status(201).json(savedBikes);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE all bikes (temporary admin route)
router.delete('/delete-all', async (req, res) => {
  try {
    await Bike.deleteMany({});
    res.status(200).json({ message: 'All bikes deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
