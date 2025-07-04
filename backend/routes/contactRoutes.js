const express = require("express");
const router = express.Router();
const {
  getContact,
  createContact,
  updateContact,
} = require("../controllers/contactController");

router.get("/", getContact);
router.post("/", createContact);
router.put("/", updateContact);

module.exports = router;
