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

      </Routes>
    </Router>
  );
}

export default App;