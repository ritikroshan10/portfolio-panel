const Education = require('../models/Education');

// This file handles CRUD operations for education records

// Create a new education record
exports.createEducation = async (req, res) => {
  try {
    const edu = new Education(req.body);
    await edu.save();
    res.status(201).json(edu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all education records
exports.getEducations = async (req, res) => {
  try {
    const all = await Education.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single education record by ID
exports.getEducationById = async (req, res) => {
  try {
    const edu = await Education.findById(req.params.id);
    res.json(edu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an education record by ID
exports.updateEducation = async (req, res) => {
  try {
    const updated = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an education record by ID
exports.deleteEducation = async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
