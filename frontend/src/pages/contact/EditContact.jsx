import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";

const EditContact = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    linkedin: "",
    location: "",
    introText: "",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/contact")
      .then((res) => {
        if (res.data) setFormData(res.data);
      })
      .catch(() => toast.error("Failed to fetch contact details"));
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put("http://localhost:5000/api/contact", formData);
      toast.success("Contact details updated");
      navigate("/contacts");
    } catch (err) {
      toast.error("Failed to update contact");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      <div className="flex flex-col flex-1 md:ml-64">
        <Navbar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        <main className="flex-1 p-6 bg-gradient-to-b from-blue-50 to-indigo-100">
          <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
            <h2 className="text-2xl font-bold text-center mb-6 text-yellow-600">Edit Contact Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded" />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded" />
              <input type="text" name="linkedin" placeholder="LinkedIn URL" value={formData.linkedin} onChange={handleChange} className="w-full px-4 py-2 border rounded" />
              <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full px-4 py-2 border rounded" />
              <input type="text" name="introText" placeholder="Intro Text" value={formData.introText} onChange={handleChange} className="w-full px-4 py-2 border rounded" />
              <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">Update Contact</button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditContact;
