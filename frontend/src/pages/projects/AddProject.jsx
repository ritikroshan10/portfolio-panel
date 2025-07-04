import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const AddProject = () => {
  // State to manage mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State to hold form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    github: "",
    live: "",
    githubIcon: "FaGithub",
    liveIcon: "FaExternalLinkAlt",
    image: null,
  });

  // Hook to programmatically navigate
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, github, live, githubIcon, liveIcon, image } = formData;

    if (!title || !description || !github || !live || !githubIcon || !liveIcon || !image) {
      toast.error("All fields are required");
      return;
    }

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("github", github);
    data.append("live", live);
    data.append("githubIcon", githubIcon);
    data.append("liveIcon", liveIcon);
    data.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/projects", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Project added successfully");
      navigate("/projects");
    } catch (error) {
      toast.error("Failed to add project");
    }
  };

  return (
    <div className="flex min-h-screen">

      <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      <div className="flex flex-col flex-1 md:ml-64">

        <Navbar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

        <main className="flex-1 bg-gradient-to-b from-blue-50 to-indigo-100 p-4 md:p-6">

          <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">

            <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Add New Project</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />

              <textarea
                name="description"
                placeholder="Project Description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />

              <input
                type="text"
                name="github"
                placeholder="GitHub Link"
                value={formData.github}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />

              <input
                type="text"
                name="live"
                placeholder="Live Site Link"
                value={formData.live}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />

              {/* GitHub Icon Dropdown */}
              <select
                name="githubIcon"
                value={formData.githubIcon}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              >
                <option value="FaGithub">GitHub</option>
                <option value="FaGitlab">GitLab</option>
                <option value="FaBitbucket">Bitbucket</option>
              </select>

              {/* Live Icon Dropdown */}
              <select
                name="liveIcon"
                value={formData.liveIcon}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              >
                <option value="FaExternalLinkAlt">External Link</option>
                <option value="FaGlobe">Website</option>
                <option value="FaYoutube">YouTube</option>
              </select>

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded bg-white"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Add Project
              </button>
              
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddProject;
