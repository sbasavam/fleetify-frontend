import { useAuth } from "../../context/AuthContext";
import HamburgerMenu from "../ui/HamburgerMenu";
import { FiHome } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gradient-to-br from-blue-200 via-pink-100 to-white text-gray-800 shadow-md sticky top-0 my-1 mx-6 rounded-lg z-10 border-b border-gray-200">
      <div className="px-6 py-3 flex justify-between items-center max-w-full">
        <div className="flex items-center gap-4 ">
          {user?.role_id === 1001 && (
            <HamburgerMenu onClick={toggleSidebar} />
          )}
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <NavLink to="/admin/dashboard" className="hover:text-blue-600">
              <FiHome size={20} />
            </NavLink>
            <span className="text-sm font-bold">
              Hello, {user.name || "User"} 👋
            </span>
            <button
              onClick={logout}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
