import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";

const AddHomeSkill = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        icon: "",
        color: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.icon) {
            alert("Name and icon are required");
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/homeskills", formData);
            alert("Skill added successfully!");
            navigate("/home");
        } catch (err) {
            console.error("Failed to add skill", err);
            alert("Failed to add skill");
        }
    };

    return (
        <div className="flex min-h-screen bg-indigo-50">
            <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            <div className="flex flex-col flex-1 md:ml-64">
                <Navbar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

                <main className="flex-1 p-6 bg-gradient-to-b from-indigo-100 via-blue-50 to-indigo-100">
                    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
                        <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Add Home Skill</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Skill Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border rounded p-2"
                                    placeholder="e.g. React"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Icon Name</label>
                                <input
                                    type="text"
                                    name="icon"
                                    value={formData.icon}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border rounded p-2"
                                    placeholder="e.g. FaReact"
                                />
                                <p className="text-xs text-gray-500 mt-1">Use icon names from react-icons (e.g., FaReact, SiMongodb, FaJsSquare)</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Color (optional)</label>
                                <input
                                    type="text"
                                    name="color"
                                    value={formData.color}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border rounded p-2"
                                    placeholder="e.g. #61DAFB"
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                                >
                                    Add Skill
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AddHomeSkill;
