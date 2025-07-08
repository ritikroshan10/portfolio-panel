import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { getDynamicIcon } from "../../utils/dynamicIcon";

const Home = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [content, setContent] = useState({ line1: "", line2: "", line3: "" });
  const [newContent, setNewContent] = useState({ line1: "", line2: "", line3: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [homeSkills, setHomeSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imageRes = await axios.get("http://localhost:5000/api/profileimg");
        setProfileImage(imageRes.data?.profileImage || "");

        const contentRes = await axios.get("http://localhost:5000/api/homecontent");
        if (contentRes.data) setContent(contentRes.data);

        const skillRes = await axios.get("http://localhost:5000/api/homeskills");
        setHomeSkills(skillRes.data);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("profileImage", selectedFile);

    try {
      const res = await axios.put("http://localhost:5000/api/profileimg/upload", formData);
      setProfileImage(res.data.profileImage);
      setSelectedFile(null);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed");
    }
  };

  const handleInputChange = (e) => {
    setNewContent({ ...newContent, [e.target.name]: e.target.value });
  };

  const handleContentSubmit = async () => {
    try {
      const res = await axios.put("http://localhost:5000/api/homecontent", newContent);
      setContent(res.data);
      setIsEditing(false);
      alert("Content saved successfully!");
    } catch (err) {
      console.error("Failed to save content", err);
      alert("Failed to save content");
    }
  };

  const handleDeleteSkill = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this skill?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/homeskills/${id}`);
      // Update state after deletion
      setHomeSkills((prevSkills) => prevSkills.filter((skill) => skill._id !== id));
      alert("Skill deleted successfully!");
    } catch (error) {
      console.error("Failed to delete skill:", error);
      alert("Failed to delete skill");
    }
  };

  return (
    <div className="flex min-h-screen bg-indigo-50">
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      <div className="flex flex-col flex-1 md:ml-64">
        <Navbar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

        <main className="flex-1 p-4 md:p-6 bg-gradient-to-b from-indigo-100 via-blue-50 to-indigo-100">

          {/* Header & Upload */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-indigo-900">Home</h2>

            <div className="flex items-center space-x-4">
              <input type="file" accept="image/*" id="fileInput" className="hidden" onChange={handleFileChange} />
              <label htmlFor="fileInput" className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700">
                {profileImage ? "Update Image" : "Upload Image"}
              </label>
              {selectedFile && (
                <button
                  onClick={handleUpload}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Save
                </button>
              )}
            </div>
          </div>

          {/* Uploaded Image */}
          {profileImage && (
            <img
              src={`http://localhost:5000/uploads/${profileImage}`}
              alt="Profile"
              className="w-48 h-48 object-cover rounded-full border-4 border-indigo-500 shadow-md"
            />
          )}

          {/* ========== Home Content Section ========== */}
          <div className="mt-10 bg-white rounded shadow p-6 max-w-3xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-indigo-800">Home Content</h3>
              <button
                onClick={() => {
                  setIsEditing(!isEditing);
                  setNewContent(content || { line1: "", line2: "", line3: "" });
                }}
                className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
              >
                {content?.line1 ? (isEditing ? "Cancel" : "Edit Content") : "Add Content"}
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <input name="line1" value={newContent.line1} onChange={handleInputChange} placeholder="Line 1" className="w-full p-2 border rounded" />
                <input name="line2" value={newContent.line2} onChange={handleInputChange} placeholder="Line 2" className="w-full p-2 border rounded" />
                <textarea name="line3" value={newContent.line3} onChange={handleInputChange} placeholder="Line 3" className="w-full p-2 border rounded" />
                <button
                  onClick={handleContentSubmit}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save Content
                </button>
              </div>
            ) : (
              <>
                {content?.line1 ? (
                  <div className="space-y-4">
                    <p className="text-gray-700 text-lg">{content.line1}</p>
                    <p className="text-gray-700 text-base">{content.line2}</p>
                    <p className="text-gray-700 text-base leading-relaxed">{content.line3}</p>
                  </div>
                ) : (
                  <p className="text-gray-500">No content available. Please click "Add Content" to add.</p>
                )}
              </>
            )}
          </div>

          {/* ========== Home Skills Section ========== */}
          <div className="mt-10 bg-white rounded shadow p-6 max-w-3xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-indigo-800">Home Skills</h3>
              <Link
                to="/add-home-skill"
                className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
              >
                + Add Skill
              </Link>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 text-3xl text-center">
              {homeSkills.length === 0 && (
                <p className="text-gray-500 col-span-full">No skills yet.</p>
              )}
              {homeSkills.map((skill) => {
                const Icon = getDynamicIcon(skill.icon);
                return (
                  <div key={skill._id} className="flex flex-col items-center group relative">
                    <div title={skill.name}>
                      {Icon ? (
                        <Icon className="mx-auto" style={{ color: skill.color || '#1ED1BF' }} />
                      ) : (
                        <span className="text-red-400 text-xl">❓</span>
                      )}
                    </div>

                    <p className="text-sm text-gray-700 mt-1">{skill.name}</p>

                    <button
                      onClick={() => handleDeleteSkill(skill._id)}
                      className="mt-2 px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Home;
