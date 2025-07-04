const express = require("express");
const router = express.Router();

const {
  getProjectMeta,
  createProjectMeta,
  updateProjectMeta,
} = require("../controllers/projectMetaController");

// Routes
router.get("/", getProjectMeta);
router.post("/", createProjectMeta);
router.put("/", updateProjectMeta);

module.exports = router;
