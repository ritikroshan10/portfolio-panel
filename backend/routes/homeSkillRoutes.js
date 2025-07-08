const express = require("express");
const router = express.Router();
const {
  getHomeSkills,
  addHomeSkill,
  deleteHomeSkill,
} = require("../controllers/homeSkillController");

router.get("/", getHomeSkills);
router.post("/", addHomeSkill);
router.delete("/:id", deleteHomeSkill);

module.exports = router;
