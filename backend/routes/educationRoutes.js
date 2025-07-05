const express = require('express');
const router = express.Router();
const {
  createEducation,
  getEducations,
  getEducationById,
  updateEducation,
  deleteEducation,
} = require('../controllers/educationController');

router.post('/', createEducation);
router.get('/', getEducations);
router.get('/:id', getEducationById);
router.put('/:id', updateEducation);
router.delete('/:id', deleteEducation);

module.exports = router;