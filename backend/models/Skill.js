const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, required: true } // store HEX or Tailwind class or color name
});

module.exports = mongoose.model('Skill', skillSchema);
