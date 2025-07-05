import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";


const Contact = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State to hold contact data
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();

  // Fetch contact data from the backend when component mounts
  useEffect(() => {
    axios.get("http://localhost:5000/api/contact")
      .then((res) => setContact(res.data))
      .catch(() => setContact(null));
  }, []);

  return (
    <div className="flex min-h-screen bg-indigo-50">
      
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className="flex flex-col flex-1 md:ml-64">
        <Navbar
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        <main className="flex-1 p-4 md:p-6 bg-gradient-to-b from-indigo-100 via-blue-50 to-indigo-100">
          {/* ===== Page Heading + Action Button ===== */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-blue-900">Contact Info</h2>

            {contact ? (
              <button
                onClick={() => navigate("/edit-contact")}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Update Contact
              </button>
            ) : (
              <button
                onClick={() => navigate("/add-contact")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Contact
              </button>
            )}
          </div>

          {/* ===== Contact Data Box ===== */}
          <div className="bg-white p-6 rounded-xl shadow max-w-xl">
            {contact ? (
              <div className="space-y-2 text-gray-700">
                <p><strong>Intro:</strong> {contact.introText}</p>
                <p><strong>Phone:</strong> {contact.phone}</p>
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>LinkedIn:</strong> {contact.linkedin}</p>
                <p><strong>Location:</strong> {contact.location}</p>
              </div>
            ) : (
              <p className="text-gray-500">No contact details found.</p>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default Contact;
