const User = require("../models/User");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // plain email/password check
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    res.status(200).json({ msg: "Login successful"});
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
