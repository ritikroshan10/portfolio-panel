const express = require('express');
const router = express.Router();
const {
  createSkill,
  getSkills,
  deleteSkill,
} = require('../controllers/skillController');

router.post('/', createSkill);
router.get('/', getSkills);
router.delete('/:id', deleteSkill);

module.exports = router;
