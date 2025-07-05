// models/ProfileImg.js
const mongoose = require("mongoose");

// Define schema with a single image field
const profileImgSchema = new mongoose.Schema({
  profileImage: {
    type: String,       // Only the image file name, e.g., "profile_12345.jpg"
    required: true,
  },
});

// Export model as 'ProfileImg'
module.exports = mongoose.model("ProfileImg", profileImgSchema);
