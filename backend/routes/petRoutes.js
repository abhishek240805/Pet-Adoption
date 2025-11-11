// backend/routes/petRoutes.js
const express = require("express");
const router = express.Router();
const Pet = require("../models/Pet");

// ➕ Add new pet
router.post("/", async (req, res) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();
    res.status(201).json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📋 Get all pets
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🐾 Adopt a pet
router.patch("/:id/adopt", async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      { adopted: true },
      { new: true }
    );
    res.json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;