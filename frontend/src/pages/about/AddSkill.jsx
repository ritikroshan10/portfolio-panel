import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

import axios from 'axios';

import { getDynamicIcon } from '../../utils/dynamicIcon';

// AddSkill component for adding a new skill
const AddSkill = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // State to hold the form data for the new skill
  const [form, setForm] = useState({
    name: '',
    icon: '',
    color: ''
  });

  // Handler for form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/skills', form);
      navigate('/about');
    } catch (err) {
      console.error('Error adding skill', err);
    }
  };

  // Dynamically get the icon component based on the form data
  const IconPreview = getDynamicIcon(form.icon);

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

        <main className="flex-1 p-6">

          <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-indigo-800">Add Skill</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Skill Name */}
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Skill Name (e.g., React.js)"
                className="w-full p-3 border border-gray-300 rounded"
                required
              />

              {/* Icon Name */}
              <input
                name="icon"
                value={form.icon}
                onChange={handleChange}
                placeholder="Icon Name (e.g., FaReact, SiTailwindcss)"
                className="w-full p-3 border border-gray-300 rounded"
                required
              />

              {/* Color */}
              <input
                name="color"
                value={form.color}
                onChange={handleChange}
                placeholder="Icon Color (e.g., #61DAFB)"
                className="w-full p-3 border border-gray-300 rounded"
                required
              />

              {/* Preview */}
              {IconPreview && (
                <div className="mt-2 flex items-center gap-3 text-lg">
                  <span className="text-gray-700">Preview:</span>
                  <IconPreview className="text-3xl" style={{ color: form.color || '#000' }} />
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
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

export default AddSkill;
