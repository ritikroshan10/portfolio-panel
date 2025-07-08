const mongoose = require("mongoose");

const homeSkillSchema = new mongoose.Schema({
  name: String,
  icon: String,
  color: String
});

module.exports = mongoose.model("HomeSkill", homeSkillSchema);
