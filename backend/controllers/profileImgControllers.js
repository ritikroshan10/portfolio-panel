// controllers/profileImgControllers.js
const fs = require("fs");
const path = require("path");
const ProfileImg = require("../models/ProfileImg");

exports.getProfileImage = async (req, res) => {
  try {
    const data = await ProfileImg.findOne();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile image" });
  }
};

// =============================
exports.updateProfileImage = async (req, res) => {
  try {
    const image = req.file?.filename;
    if (!image) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    let data = await ProfileImg.findOne();

    if (!data) {
      // No previous image, so create new
      data = new ProfileImg({ profileImage: image });
    } else {
      // If old image exists, delete from /uploads
      if (data.profileImage) {
        const oldImagePath = path.join(__dirname, "../uploads", data.profileImage);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Failed to delete old image:", err);
          else console.log("Old image deleted:", data.profileImage);
        });
      }
      // Update with new image filename
      data.profileImage = image;
    }

    await data.save();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error updating profile image:", error);
    res.status(500).json({ error: "Failed to update profile image" });
  }
};
