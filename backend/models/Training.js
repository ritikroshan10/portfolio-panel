const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  duration: String
}, { timestamps: true });;

module.exports = mongoose.model("Training", trainingSchema);
