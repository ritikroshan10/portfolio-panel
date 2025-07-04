const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.loginUser = async (req, res) => {
   // Extracting email and password from the request body sent by the client
  const { email, password } = req.body;
 try {
    // Find user by email only
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    // Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    // If match successful
    res.status(200).json({ msg: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

