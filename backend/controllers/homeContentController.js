const HomeContent = require("../models/homeContent");

// GET content
exports.getHomeContent = async (req, res) => {
  try {
    const content = await HomeContent.findOne();
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch home content" });
  }
};

// UPDATE content
exports.updateHomeContent = async (req, res) => {
  const { line1, line2, line3 } = req.body;

  try {
    let content = await HomeContent.findOne();

    if (!content) {
      content = new HomeContent({ line1, line2, line3 });
    } else {
      content.line1 = line1;
      content.line2 = line2;
      content.line3 = line3;
    }

    await content.save();
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: "Failed to update home content" });
  }
};
