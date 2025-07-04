const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  github: String,
  live: String,
  image: String,
  githubIcon: String, 
  liveIcon: String,
});

const Project = mongoose.model("Project", projectSchema);

module.exports = { Project};
