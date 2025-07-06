const mongoose = require("mongoose");

const homeContentSchema = new mongoose.Schema({
  line1: String,
  line2: String,
  line3: String,
});

module.exports = mongoose.model("HomeContent", homeContentSchema);
