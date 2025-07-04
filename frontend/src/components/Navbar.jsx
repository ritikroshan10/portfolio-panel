import { FaBars, FaSignOutAlt, FaTimes} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isMobileMenuOpen,setIsMobileMenuOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-gradient-to-r from-blue-200 to-indigo-200 text-gray-900 px-4 py-3 shadow-md">
     
      {/* Hamburger for mobile */}
      {isMobileMenuOpen ? (
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FaTimes />
        </button>
      ) : (
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <FaBars />
        </button>
      )}

      <h1 className="text-lg font-semibold">Admin Dashboard</h1>

      <div className="flex items-center gap-3">
        <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
         R
        </div>

        <button
          className="flex items-center text-sm gap-1 hover:underline"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-base" /> Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;