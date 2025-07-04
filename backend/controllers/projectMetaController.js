const ProjectMeta = require("../models/projectMetaModel");

// Controller to fetch the existing project meta (heading + paragraph)
exports.getProjectMeta = async (req, res) => {
  try {
    // Find one document from the ProjectMeta collection (expecting only one)
    const meta = await ProjectMeta.findOne();
    res.json(meta);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch project meta" });
  }
};

// // Controller to create a new project meta (only if it doesn't already exist)
exports.createProjectMeta = async (req, res) => {
  try {
    // Destructure heading and paragraph from the request body
    const { heading, paragraph } = req.body;

    // // Check if a meta record already exists (only one allowed)
    const existing = await ProjectMeta.findOne();
    if (existing) return res.status(400).json({ error: "Meta already exists" });

    // Create a new ProjectMeta instance and save it
    const newMeta = new ProjectMeta({ heading, paragraph });
    await newMeta.save();
    res.status(201).json(newMeta);
  } catch (err) {
    res.status(500).json({ error: "Failed to create project meta" });
  }
};

// Controller to update the existing project meta (heading + paragraph)
exports.updateProjectMeta = async (req, res) => {
  try {
    // Destructure heading and paragraph from the request body
    const { heading, paragraph } = req.body;
    // Find the existing meta record (expecting only one)
    const meta = await ProjectMeta.findOne();
    if (!meta) return res.status(404).json({ error: "Meta not found" });

    // Update the meta record with new heading and paragraph
    meta.heading = heading;
    meta.paragraph = paragraph;

    await meta.save();
    res.json(meta);
  } catch (err) {
    res.status(500).json({ error: "Failed to update project meta" });
  }
};
