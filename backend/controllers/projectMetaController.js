const ProjectMeta = require("../models/projectMetaModel");

// GET meta
exports.getProjectMeta = async (req, res) => {
  try {
    const meta = await ProjectMeta.findOne();
    res.json(meta);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch project meta" });
  }
};

// CREATE meta
exports.createProjectMeta = async (req, res) => {
  try {
    const { heading, paragraph } = req.body;

    // Only allow one meta record
    const existing = await ProjectMeta.findOne();
    if (existing) return res.status(400).json({ error: "Meta already exists" });

    const newMeta = new ProjectMeta({ heading, paragraph });
    await newMeta.save();
    res.status(201).json(newMeta);
  } catch (err) {
    res.status(500).json({ error: "Failed to create project meta" });
  }
};

// UPDATE meta
exports.updateProjectMeta = async (req, res) => {
  try {
    const { heading, paragraph } = req.body;
    const meta = await ProjectMeta.findOne();
    if (!meta) return res.status(404).json({ error: "Meta not found" });

    meta.heading = heading;
    meta.paragraph = paragraph;

    await meta.save();
    res.json(meta);
  } catch (err) {
    res.status(500).json({ error: "Failed to update project meta" });
  }
};
