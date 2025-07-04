const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  phone: String,
  email: String,
  linkedin: String,
  location: String,
});

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
