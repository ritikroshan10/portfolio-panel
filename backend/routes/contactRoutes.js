const express = require("express");
const router = express.Router();
const {
  getContact,
  createContact,
  updateContact,
} = require("../controllers/contactController");

// GET for frontend
router.get("/", getContact);

// POST and PUT for admin panel
router.post("/", createContact);
router.put("/", updateContact);

module.exports = router;
