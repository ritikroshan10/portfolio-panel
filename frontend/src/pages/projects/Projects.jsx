import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import * as FaIcons from "react-icons/fa";
import { toast } from "react-toastify";

const Projects = () => {
  // State variables
  const [projects, setProjects] = useState([]);
  // Meta data for the header
  const [meta, setMeta] = useState(null);
  // State to manage mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Navigation hook
  const navigate = useNavigate();

  // Fetch projects and meta data on component mount
  useEffect(() => {
    axios.get("http://localhost:5000/api/projects")
      .then((res) => setProjects(res.data))
      .catch(() => toast.error("Failed to fetch projects"));

    axios.get("http://localhost:5000/api/project-meta")
      .then((res) => setMeta(res.data))
      .catch(() => toast.error("Failed to fetch project header content"));
  }, []);


  return (
    <div className="flex min-h-screen">

      <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      <div className="flex flex-col flex-1 md:ml-64">

        <Navbar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

        <main className="flex-1 p-6 bg-gradient-to-b from-blue-50 to-indigo-100">

          {/* Header Control */}
          <div className="flex justify-between items-center mb-6">

            <h2 className="text-3xl font-bold text-blue-900">Projects</h2>

            <div className="space-x-2">

              {meta ? (
                <button
                  onClick={() => navigate("/edit-project-meta")}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Update Header
                </button>
              ) : (
                <button
                  onClick={() => navigate("/add-project-meta")}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add Header
                </button>
              )}

              <button
                onClick={() => navigate("/add-project")}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Add Project
              </button>

            </div>
          </div>

          {/* Header Display */}

          {meta && (
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-gray-800">
                {meta.heading}
              </h1>
              <p className="text-gray-600 mt-2 text-base max-w-2xl mx-auto">
                {meta.paragraph}
              </p>
            </div>
          )}

          {/* Projects List */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {projects.length === 0 ? (
              <p className="text-center text-gray-600">No projects found.</p>
            ) : (
              projects.map(({ _id, title, description, image, github, live, githubIcon, liveIcon }) => {
                // Default icons if not provided
                const GitHubIcon = FaIcons[githubIcon] || FaIcons.FaGithub;
                const LiveIcon = FaIcons[liveIcon] || FaIcons.FaExternalLinkAlt;

                return (
                  <div
                    key={_id}
                    className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border"
                  >

                    {/* Image */}
                    <div className="w-full h-52 bg-gray-100 flex items-center justify-center">
                      <img
                        src={`http://localhost:5000/uploads/${image}`}
                        alt={title}
                        className="h-full object-contain p-2"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                      <p className="text-gray-600 text-sm">{description}</p>

                      <div className="flex justify-between text-[#1ED1BF] text-sm">
                        <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                          <GitHubIcon /> Code
                        </a>
                        <a href={live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                          <LiveIcon /> Live
                        </a>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-between pt-3">
                        <button
                          onClick={() => navigate(`/edit-project/${_id}`)}
                          className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={async () => {
                            try {
                              await axios.delete(`http://localhost:5000/api/projects/${_id}`);
                              toast.success("Project deleted");
                              setProjects(projects.filter(p => p._id !== _id));
                            } catch (err) {
                              toast.error("Failed to delete");
                            }
                          }}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                        >
                          Delete
                        </button>
                        
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
