const express = require("express");
const router = express.Router();
const {
  getHomeContent,
  updateHomeContent,
} = require("../controllers/homeContentController");

router.get("/", getHomeContent);
router.put("/", updateHomeContent);

module.exports = router;
