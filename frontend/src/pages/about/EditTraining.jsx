import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";

const EditTraining = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State to hold the form data
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    duration: "",
  });

  // Fetch the training data when the component mounts
  useEffect(() => {
    fetchTraining();
  }, []);

  // Function to fetch training data by ID
  const fetchTraining = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/training`);
      const training = res.data.find((item) => item._id === id);
      if (training) setForm(training);
    } catch (err) {
      console.error("Failed to fetch training", err);
    }
  };

  // Handler for form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/training/${id}`, form);
      navigate("/about");
    } catch (err) {
      console.error("Error updating training", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-indigo-50">

      <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      <div className="flex flex-col flex-1 md:ml-64">

        <Navbar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

        <main className="flex-1 p-6">

          <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">

            <h2 className="text-2xl font-bold mb-6 text-indigo-800">Edit Training</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Training Title"
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company Name"
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="Duration (e.g., Jan–June 2025)"
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Update Training
              </button>

            </form>

          </div>
        </main>
      </div>
    </div>
  );
};

export default EditTraining;
