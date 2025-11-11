const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  breed: { type: String },
  age: { type: Number },
  location: { type: String },
  adopted: { type: Boolean, default: false },
  dateAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Pet", petSchema);