import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/projects/Projects";
import AddProject from "./pages/projects/AddProject";
import EditProject from "./pages/projects/EditProject";
import AddProjectMeta from "./pages/projects/AddProjectMeta";
import EditProjectMeta from "./pages/projects/EditProjectMeta";
import Contact from "./pages/contact/Contact";
import AddContact from "./pages/contact/AddContact";
import EditContact from "./pages/contact/EditContact";
import About from "./pages/about/About";
import AddEducation from "./pages/about/AddEducation";
import EditEducation from "./pages/about/EditEducation";
import AddSkill from "./pages/about/AddSkill";
import AddTraining from "./pages/about/AddTraining";
import EditTraining from "./pages/about/EditTraining";
import Home from "./pages/home/Home";
import AddHomeSkill from "./pages/home/AddHomeSkill";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route: redirect / to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Login is public */}
        <Route path="/login" element={<Login />} />
        {/* ✅ Protected routes start here */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/edit-project/:id" element={<EditProject />} />
        <Route path="/add-project-meta" element={<AddProjectMeta />} />
        <Route path="/edit-project-meta" element={<EditProjectMeta />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path="/add-contact" element={<AddContact />} />
        <Route path="/edit-contact" element={<EditContact />} />
        <Route path="/about" element={<About />} />
        <Route path="/add-education" element={<AddEducation />} />
        <Route path="/edit-education/:id" element={<EditEducation />} />
        <Route path="/add-skill" element={<AddSkill />} />
        <Route path="/edit-training/:id" element={<EditTraining />} />
        <Route path="/add-training" element={<AddTraining />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-home-skill" element={<AddHomeSkill />} />
      </Routes>
    </Router>
  );
}

export default App;