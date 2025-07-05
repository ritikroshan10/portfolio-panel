const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institute: { type: String, required: true },
  duration: { type: String, required: true },
  marks: { type: String, required: true },
  location: { type: String, required: true },
  board: { type: String },
  icon: { type: String }, // icon name like 'FaGraduationCap'
}, { timestamps: true });

module.exports = mongoose.model('Education', educationSchema);
