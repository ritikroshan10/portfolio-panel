const Contact = require("../models/contactModel");

// GET contact (frontend)
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contact info" });
  }
};

// CREATE contact (admin)
exports.createContact = async (req, res) => {
  try {
    const { phone, email, linkedin, location, introText } = req.body;

    // Only one contact record allowed
    const existing = await Contact.findOne();
    if (existing) return res.status(400).json({ error: "Contact already exists" });

    const newContact = new Contact({ phone, email, linkedin, location, introText });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ error: "Failed to create contact" });
  }
};

// UPDATE contact (admin)
exports.updateContact = async (req, res) => {
  try {
    const { phone, email, linkedin, location, introText } = req.body;
    const contact = await Contact.findOne();
    if (!contact) return res.status(404).json({ error: "Contact not found" });

    contact.phone = phone;
    contact.email = email;
    contact.linkedin = linkedin;
    contact.location = location;
    contact.introText = introText;

    await contact.save();
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: "Failed to update contact" });
  }
};
