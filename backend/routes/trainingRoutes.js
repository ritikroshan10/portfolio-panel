const express = require("express");
const router = express.Router();
const {
  createTraining,
  getTrainings,
  updateTraining,
  deleteTraining,
} = require("../controllers/trainingController");

router.post("/", createTraining);
router.get("/", getTrainings);
router.put("/:id", updateTraining);
router.delete("/:id", deleteTraining);

module.exports = router;
