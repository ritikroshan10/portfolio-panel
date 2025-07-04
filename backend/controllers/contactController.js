const Contact = require("../models/contactModel");

// GET contact data
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contact info" });
  }
};

// CREATE contact data
exports.createContact = async (req, res) => {
  try {
    const existing = await Contact.findOne();
    if (existing) return res.status(400).json({ error: "Contact info already exists" });

    const { phone, email, linkedin, location } = req.body;
    const newContact = new Contact({ phone, email, linkedin, location });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ error: "Failed to create contact info" });
  }
};

// UPDATE contact data
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    if (!contact) return res.status(404).json({ error: "Contact info not found" });

    const { phone, email, linkedin, location } = req.body;
    contact.phone = phone;
    contact.email = email;
    contact.linkedin = linkedin;
    contact.location = location;
    await contact.save();

    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: "Failed to update contact info" });
  }
};
