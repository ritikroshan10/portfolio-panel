import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import axios from "axios";


const Home = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // tores the filename of the current profile image from the backend.
  const [profileImage, setProfileImage] = useState("");
  // Stores the file selected by the user for upload (before sending to backend).
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch existing profile image from backend
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profileimg");
        // Sets the profileImage state if image exists
        setProfileImage(res.data?.profileImage || "");
      } catch (err) {
        console.error("Error fetching image:", err);
      }
    };

    fetchImage();
  }, []);


  // Handle image file selection  --->Updates selectedFile with the image selected by the user.
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle image upload/update
  const handleUpload = async () => {

    if (!selectedFile) return;

    // Create FormData to send the file to the backend
    const formData = new FormData();
    formData.append("profileImage", selectedFile); // ✅ key must match Multer

    try {
      const res = await axios.put("http://localhost:5000/api/profileimg/upload", formData);
      setProfileImage(res.data.profileImage);
      setSelectedFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed");
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

        </main>
      </div>
    </div>
  );
};

export default Home;


// note-------------------------

//  <input type="file" />
// Purpose: Lets user choose a file (in this case, an image).

// accept="image/*": Restricts file types to only images.

// className="hidden": Hides the input so it's not visible.

// id="fileInput": Gives it a unique ID so it can be targeted.

// onChange={handleFileChange}: Triggered when a user selects a file.

// ⚠️ Since the input is hidden, it won’t be clicked directly.

// ✅ <label htmlFor="fileInput">
// Purpose: Acts as a visible button users can click.

// htmlFor="fileInput": Binds this label to the hidden input via the ID.

// So, when this label is clicked, it triggers the file input.

// className="...": Tailwind classes for styling the label like a button.

// {profileImage ? "Update Image" : "Upload Image"}:

// Dynamically changes the text depending on whether a profile image already exists.





