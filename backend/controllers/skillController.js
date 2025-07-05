const Skill = require('../models/Skill');

exports.createSkill = async (req, res) => {
  try {
    const newSkill = new Skill(req.body);
    const saved = await newSkill.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create skill' });
  }
};

exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Skill deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete skill' });
  }
};
