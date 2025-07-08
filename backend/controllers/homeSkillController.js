// controllers/homeSkillController.js
const HomeSkill = require("../models/HomeSkill");

exports.getHomeSkills = async (req, res) => {
  try {
    const skills = await HomeSkill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch home skills" });
  }
};

exports.addHomeSkill = async (req, res) => {
  try {
    const skill = new HomeSkill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (err) {
    res.status(500).json({ error: "Failed to add home skill" });
  }
};

exports.deleteHomeSkill = async (req, res) => {
  try {
    await HomeSkill.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Skill deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete skill" });
  }
};
