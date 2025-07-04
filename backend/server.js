const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const projectRoutes = require("./routes/projectRoutes");
const projectMetaRoutes = require("./routes/projectMetaRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");


const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // For image access

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/project-meta", projectMetaRoutes);
app.use("/api", authRoutes);
app.use("/api/contact", contactRoutes);



// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
