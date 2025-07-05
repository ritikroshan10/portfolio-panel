// routes/profileImgRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

const {
  getProfileImage,
  updateProfileImage,
} = require("../controllers/profileImgControllers");

// GET: return current profile image
router.get("/", getProfileImage);

// PUT: update/upload profile image
router.put("/upload", upload.single("profileImage"), updateProfileImage);

module.exports = router;
