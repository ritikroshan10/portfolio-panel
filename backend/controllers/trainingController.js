const Training = require("../models/Training");

exports.createTraining = async (req, res) => {
  try {
    const training = await Training.create(req.body);
    res.status(201).json(training);
  } catch (err) {
    res.status(500).json({ error: "Failed to add training" });
  }
};

exports.getTrainings = async (req, res) => {
  try {
    const trainings = await Training.find().sort({ createdAt: -1 });
    res.json(trainings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch trainings" });
  }
};

exports.updateTraining = async (req, res) => {
  try {
    const training = await Training.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(training);
  } catch (err) {
    res.status(500).json({ error: "Failed to update training" });
  }
};

exports.deleteTraining = async (req, res) => {
  try {
    await Training.findByIdAndDelete(req.params.id);
    res.json({ message: "Training deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete training" });
  }
};
