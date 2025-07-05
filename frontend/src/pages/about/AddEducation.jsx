import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

// Importing icons from react-icons
import {
  FaUniversity,
  FaGraduationCap,
  FaSchool,
  FaBook,
} from 'react-icons/fa';

// Defining icon options for the select dropdown
const iconOptions = [
  { name: 'FaUniversity', label: 'University', icon: <FaUniversity /> },
  { name: 'FaGraduationCap', label: 'Graduation Cap', icon: <FaGraduationCap /> },
  { name: 'FaSchool', label: 'School', icon: <FaSchool /> },
  { name: 'FaBook', label: 'Book', icon: <FaBook /> },
];

// AddEducation component for adding education details
const AddEducation = () => {

  const navigate = useNavigate();
  // State to manage mobile menu visibility and form data
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Form state to hold education details
  const [form, setForm] = useState({
    degree: '',
    institute: '',
    duration: '',
    marks: '',
    location: '',
    board: '',
    icon: '',
  });

  // Handler for form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/education", form);
      navigate('/about');
    } catch (err) {
      console.error('Error adding education', err);
    }
  };

  // Render the component
  return (
    <div className="flex min-h-screen bg-indigo-50">
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      <div className="flex flex-col flex-1 md:ml-64">
        <Navbar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

        <main className="flex-1 p-6 bg-gradient-to-b from-indigo-100 via-blue-50 to-indigo-100">

          <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-indigo-800">Add Education</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                name="degree"
                value={form.degree}
                onChange={handleChange}
                placeholder="Degree"
                className="w-full p-3 border border-gray-300 rounded"
                required
              />

              <input
                name="institute"
                value={form.institute}
                onChange={handleChange}
                placeholder="Institute"
                className="w-full p-3 border border-gray-300 rounded"
                required
              />

              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="Duration"
                className="w-full p-3 border border-gray-300 rounded"
                required
              />

              <input
                name="marks"
                value={form.marks}
                onChange={handleChange}
                placeholder="Marks or CGPA"
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
                name="board"
                value={form.board}
                onChange={handleChange}
                placeholder="Board (optional)"
                className="w-full p-3 border border-gray-300 rounded"
              />

              <div>
                <label className="block mb-1 font-medium text-gray-700">Select Icon</label>
                <select
                  name="icon"
                  value={form.icon}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded mb-2"
                  required
                >
                  <option value="">Choose an icon</option>
                  {iconOptions.map((opt) => (
                    <option key={opt.name} value={opt.name}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                {form.icon && (
                  <div className="flex items-center gap-2 mt-2 text-xl text-indigo-600">
                    Selected Icon:
                    {iconOptions.find((i) => i.name === form.icon)?.icon}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              >
                Submit
              </button>

            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddEducation;
