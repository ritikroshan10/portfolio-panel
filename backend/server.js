const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const projectRoutes = require("./routes/projectRoutes");
const projectMetaRoutes = require("./routes/projectMetaRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const educationRoutes = require('./routes/educationRoutes');
const skillRoutes = require('./routes/skillRoutes');
const trainingRoutes = require('./routes/trainingRoutes');
const profileImgRoutes = require('./routes/profileImgRoutes');
const homeContentRoutes = require("./routes/homeContentRoutes");


const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // For image access

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/project-meta", projectMetaRoutes);
app.use("/api", authRoutes);
app.use("/api/contact", contactRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/profileimg', profileImgRoutes);
app.use("/api/homecontent", homeContentRoutes);



// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
