import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaTools,
  FaFolderOpen,
  FaGlobe,
  FaUser,
  FaHome
} from "react-icons/fa";

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-100 to-indigo-200 text-gray-900 z-50 transition-transform duration-300 md:translate-x-0 ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <h2 className="text-xl font-bold text-center py-2 border-b flex items-center justify-center gap-2 mt-16 md:mt-3">
        <FaTools className="text-blue-800" /> Admin Panel
      </h2>

      <nav className="flex flex-col gap-4 px-6 pt-6 text-md font-semibold">

        <NavLink
          to="/dashboard"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-3 hover:text-blue-700"
        >
          <FaTachometerAlt /> Dashboard
        </NavLink>

        <NavLink
          to="/home"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-3 hover:text-blue-700"
        >
          <FaHome /> Home
        </NavLink>

        <NavLink
          to="/projects"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-3 hover:text-blue-700"
        >
          <FaFolderOpen /> Projects
        </NavLink>

        <NavLink
          to="/contacts"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-3 hover:text-blue-700"
        >
          <FaGlobe /> Contacts
        </NavLink>

        <NavLink
          to="/about"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-3 hover:text-blue-700"
        >
          <FaUser /> About Us
        </NavLink>

      </nav>
    </aside>
  );
};

export default Sidebar;