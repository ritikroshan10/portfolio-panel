import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const AddProjectMeta = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State variables for form inputs
  const [heading, setHeading] = useState("");
  const [paragraph, setParagraph] = useState("");
  // Navigation hook to redirect after submission
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!heading || !paragraph) {
      toast.error("Both fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/project-meta", {
        heading,
        paragraph,
      });
      toast.success("Header content added");
      navigate("/projects");
    } catch (err) {
      toast.error("Failed to add header content");
    }
  };

  return (
    <div className="flex min-h-screen">

      <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      <div className="flex flex-col flex-1 md:ml-64">

        <Navbar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

        <main className="flex-1 p-6 bg-gradient-to-b from-blue-50 to-indigo-100">

          <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">

            <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Add Header Content</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                placeholder="Heading"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
              <textarea
                value={paragraph}
                onChange={(e) => setParagraph(e.target.value)}
                placeholder="Paragraph"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Add Header
              </button>
            </form>

          </div>

        </main>
      </div>
    </div>
  );
};

export default AddProjectMeta;
