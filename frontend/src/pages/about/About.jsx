import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { getDynamicIcon } from "../../utils/dynamicIcon";

const About = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [educations, setEducations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchEducation();
    fetchSkills();
    fetchTrainings();
  }, []);

  const fetchEducation = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/education");
      setEducations(res.data);
    } catch (err) {
      console.error("Failed to fetch education", err);
    }
  };

  const fetchSkills = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/skills");
      setSkills(res.data);
    } catch (err) {
      console.error("Failed to fetch skills", err);
    }
  };

  const fetchTrainings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/training");
      setTrainings(res.data);
    } catch (err) {
      console.error("Failed to fetch trainings", err);
    }
  };

  const handleDeleteEducation = async (id) => {
    if (window.confirm("Are you sure you want to delete this education entry?")) {
      await axios.delete(`http://localhost:5000/api/education/${id}`);
      fetchEducation();
    }
  };

  const handleDeleteSkill = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      await axios.delete(`http://localhost:5000/api/skills/${id}`);
      fetchSkills();
    }
  };

  const handleDeleteTraining = async (id) => {
    if (window.confirm("Are you sure you want to delete this training?")) {
      await axios.delete(`http://localhost:5000/api/training/${id}`);
      fetchTrainings();
    }
  };

  return (
    <div className="flex min-h-screen bg-indigo-50">
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      <div className="flex flex-col flex-1 md:ml-64">
        <Navbar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

        <main className="flex-1 p-4 md:p-6 bg-gradient-to-b from-indigo-100 via-blue-50 to-indigo-100">

          {/* ===================== Education ===================== */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-indigo-900">Education</h2>
            <Link to="/add-education" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              + Add Education
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {educations.map((edu) => (
              <div key={edu._id} className="bg-white p-5 rounded-xl border border-gray-300 shadow-md">
                <h3 className="text-lg font-semibold text-indigo-700 mb-1">{edu.degree}</h3>
                <p className="text-sm text-gray-700 mb-1">{edu.institute}</p>
                <p className="text-sm text-gray-600">📆 {edu.duration}</p>
                <p className="text-sm text-gray-600">📊 {edu.marks}</p>
                <p className="text-sm text-gray-600">📍 {edu.location}</p>
                {edu.board && <p className="text-sm text-gray-600">🏫 {edu.board}</p>}
                <div className="flex gap-3 mt-4">
                  <Link to={`/edit-education/${edu._id}`} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                    Edit
                  </Link>
                  <button onClick={() => handleDeleteEducation(edu._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ===================== Skills ===================== */}
          <div className="flex justify-between items-center mb-6 mt-10">
            <h2 className="text-3xl font-semibold text-indigo-900">Skills</h2>
            <Link to="/add-skill" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              + Add Skill
            </Link>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 text-4xl text-center">
            {skills.map((skill) => {
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

          {/* ===================== Training ===================== */}
          <div className="flex justify-between items-center mb-6 mt-12">
            <h2 className="text-3xl font-semibold text-indigo-900">Training / Experience</h2>
            <Link to="/add-training" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              + Add Experience
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {trainings.map((training) => (
              <div key={training._id} className="bg-white p-5 rounded-xl border border-gray-300 shadow-md">
                <h3 className="text-xl font-semibold text-[#1ED1BF] mb-1">{training.title}</h3>
                <p className="text-sm text-gray-700">{training.company}</p>
                <p className="text-sm text-gray-600">📍 {training.location}</p>
                <p className="text-sm text-gray-600">📆 {training.duration}</p>
                <div className="flex gap-3 mt-4">
                  <Link to={`/edit-training/${training._id}`} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                    Edit
                  </Link>
                  <button onClick={() => handleDeleteTraining(training._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default About;
