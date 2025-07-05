import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import {
  FaUniversity,
  FaGraduationCap,
  FaSchool,
  FaBook,
} from 'react-icons/fa';

const iconOptions = [
  { name: 'FaUniversity', label: 'University', icon: <FaUniversity /> },
  { name: 'FaGraduationCap', label: 'Graduation Cap', icon: <FaGraduationCap /> },
  { name: 'FaSchool', label: 'School', icon: <FaSchool /> },
  { name: 'FaBook', label: 'Book', icon: <FaBook /> },
];

const EditEducation = () => {
  // Extracting the ID from the URL parameters
  const { id } = useParams();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State to hold the form data for editing education
  const [form, setForm] = useState({
    degree: '',
    institute: '',
    duration: '',
    marks: '',
    location: '',
    board: '',
    icon: '',
  });

  // Fetching the existing education data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/education/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error('Failed to load education', err);
      }
    };
    fetchData();
  }, [id]);

// Handler for form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handler for form submission to update education
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/education/${id}`, form);
      navigate('/about');
    } catch (err) {
      console.error('Update error', err);
    }
  };


  return (
    <div className="flex min-h-screen bg-indigo-50">

      <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      <div className="flex flex-col flex-1 md:ml-64">

        <Navbar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

        <main className="flex-1 p-6 bg-gradient-to-b from-indigo-100 via-blue-50 to-indigo-100">
          
          <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-indigo-800">Edit Education</h2>

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
                placeholder="Marks"
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
                placeholder="Board"
                className="w-full p-3 border border-gray-300 rounded"
              />

              <div>
                <label className="block mb-1 font-medium text-gray-700">Select Icon</label>
                <select
                  name="icon"
                  value={form.icon}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded mb-2"
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
                    Selected Icon: {iconOptions.find(i => i.name === form.icon)?.icon}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              >
                Update
              </button>

            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditEducation;
