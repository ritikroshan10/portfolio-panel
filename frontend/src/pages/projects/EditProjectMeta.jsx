import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";


const EditProjectMeta = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State variables for form inputs
  const [heading, setHeading] = useState("");
  const [paragraph, setParagraph] = useState("");
  // Navigation hook to redirect after submission
  const navigate = useNavigate();

  // Fetch existing header content when the component mounts
  useEffect(() => {
    axios.get("http://localhost:5000/api/project-meta")
      .then(res => {
        setHeading(res.data.heading || "");
        setParagraph(res.data.paragraph || "");
      })
      .catch(() => toast.error("Failed to load header content"));
  }, []);

// Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put("http://localhost:5000/api/project-meta", {
        heading,
        paragraph,
      });
      toast.success("Header updated");
      navigate("/projects");
    } catch (err) {
      toast.error("Failed to update header");
    }
  };

  return (
    <div className="flex min-h-screen">

      <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      <div className="flex flex-col flex-1 md:ml-64">

        <Navbar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

        <main className="flex-1 p-6 bg-gradient-to-b from-blue-50 to-indigo-100">

          <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
            <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Edit Header Content</h2>
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
                className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
              >
                Update Header
              </button>
              
            </form>
          </div>

        </main>
      </div>
    </div>
  );
};

export default EditProjectMeta;
