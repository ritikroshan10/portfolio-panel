const mongoose = require("mongoose");

const projectMetaSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  paragraph: {
    type: String,
    required: true,
  },
});

const ProjectMeta = mongoose.model("ProjectMeta", projectMetaSchema);

module.exports = ProjectMeta;
