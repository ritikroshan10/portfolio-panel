const { Project } = require("../models/Project");
const fs = require("fs");
const path = require("path");

// Controller to fetch all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

// Controller to fetch a single project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch project" });
  }
};

// CREATE a new project
exports.createProject = async (req, res) => {
  try {
    // Check if file is uploaded
    const { title, description, github, live, githubIcon, liveIcon } = req.body;
    const image = req.file?.filename || "";

    // Validate required fields
    const project = new Project({
      title,
      description,
      github,
      live,
      githubIcon,
      liveIcon,
      image,
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: "Failed to create project" });
  }
};

// UPDATE an existing project
exports.updateProject = async (req, res) => {
  try {
    // Check if file is uploaded
    const { title, description, github, live, githubIcon, liveIcon } = req.body;
    // Validate required fields
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    // Delete old image if new uploaded
    if (req.file && project.image) {
      const oldPath = path.join(__dirname, "..", "uploads", project.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    // Update project fields
    project.title = title;
    project.description = description;
    project.github = github;
    project.live = live;
    project.githubIcon = githubIcon;
    project.liveIcon = liveIcon;
    // If a new image file is uploaded, update the image field with new filename
    if (req.file) project.image = req.file.filename;

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: "Failed to update project" });
  }
};

// DELETE a project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    // Delete image
    if (project.image) {
      const imagePath = path.join(__dirname, "..", "uploads", project.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await project.deleteOne();
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete project" });
  }
};
