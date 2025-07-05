import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";

const AddTraining = () => {

  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Form state to hold training details
  const [form, setForm] = useState({ title: "", company: "", location: "", duration: "" });

  // Handler for form input changes
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/training", form);
      navigate("/about");
    } catch (err) {
      console.error("Error adding training", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-indigo-50">

      <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      <div className="flex flex-col flex-1 md:ml-64">

        <Navbar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

        <main className="flex-1 p-6">

          <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-indigo-800">Add Training</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="title" value={form.title} onChange={handleChange} placeholder="Training Title" className="w-full p-3 border border-gray-300 rounded" required />

              <input name="company" value={form.company} onChange={handleChange} placeholder="Company Name" className="w-full p-3 border border-gray-300 rounded" required />

              <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full p-3 border border-gray-300 rounded" required />

              <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration (e.g., Jan–June 2025)" className="w-full p-3 border border-gray-300 rounded" required />
              
              <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Submit</button>
            </form>

          </div>

        </main>

      </div>
    </div>
  );
};

export default AddTraining;
