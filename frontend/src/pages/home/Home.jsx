import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";

const Home = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State for profile image
  const [profileImage, setProfileImage] = useState("");
  // State for selected file
  const [selectedFile, setSelectedFile] = useState(null);

  // State for content--> Holds the current content fetched from the backend.
  const [content, setContent] = useState({ line1: "", line2: "", line3: "" });
  // State for new content input --> Holds form input values when you're adding or editing the content
  const [newContent, setNewContent] = useState({ line1: "", line2: "", line3: "" });
  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Fetch profile image and content on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const imageRes = await axios.get("http://localhost:5000/api/profileimg");
        setProfileImage(imageRes.data?.profileImage || "");

        const contentRes = await axios.get("http://localhost:5000/api/homecontent");
        if (contentRes.data) setContent(contentRes.data);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    fetchData();
  }, []);


  // Handle image selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };


  // Upload image
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

  // Handle content input
  const handleInputChange = (e) => {
    setNewContent({ ...newContent, [e.target.name]: e.target.value });
  };

  // Save content to backend
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

  return (
    <div className="flex min-h-screen bg-indigo-50">
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      <div className="flex flex-col flex-1 md:ml-64">
        <Navbar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

        <main className="flex-1 p-4 md:p-6 bg-gradient-to-b from-indigo-100 via-blue-50 to-indigo-100">
          <div className="flex justify-between items-center mb-6">

            <h2 className="text-3xl font-semibold text-indigo-900">Home</h2>

            {/* Upload Button */}
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="fileInput"
                className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700"
              >
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

          {/* Show Uploaded Image */}
          {profileImage && (
            <img
              src={`http://localhost:5000/uploads/${profileImage}`}
              alt="Profile"
              className="w-48 h-48 object-cover rounded-full border-4 border-indigo-500 shadow-md"
            />
          )}

          {/* =========== Content Section ========== */}
          <div className="mt-10 bg-white rounded shadow p-6 max-w-3xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-indigo-800">Home Content</h3>

              <button
                onClick={() => {
                  setIsEditing(!isEditing);
                  setNewContent(content || { line1: "", line2: "", line3: "" }); // handle empty case
                }}
                className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
              >
                {content?.line1 ? (isEditing ? "Cancel" : "Edit Content") : "Add Content"}
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <input
                  name="line1"
                  value={newContent.line1}
                  onChange={handleInputChange}
                  placeholder="Line 1"
                  className="w-full p-2 border rounded"
                />
                <input
                  name="line2"
                  value={newContent.line2}
                  onChange={handleInputChange}
                  placeholder="Line 2"
                  className="w-full p-2 border rounded"
                />
                <textarea
                  name="line3"
                  value={newContent.line3}
                  onChange={handleInputChange}
                  placeholder="Line 3"
                  className="w-full p-2 border rounded"
                />
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

        </main>
      </div>
    </div>
  );
};

export default Home;
