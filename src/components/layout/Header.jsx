import { useAuth } from "../../context/AuthContext";
import HamburgerMenu from "../ui/HamburgerMenu";
import { FiHome } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-indigo-600 text-white shadow-md sticky top-0 z-50">
      <div className="px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {user?.roleId === 1001 && <HamburgerMenu onClick={toggleSidebar} />}
          <h1 className="text-xl font-bold">Transport Management</h1>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <NavLink to="/admin/dashboard" className="hover:text-gray-300">
              <FiHome size={20} />
            </NavLink>
            <span className="text-sm">Welcome, {user.name}</span>
            <button
              onClick={logout}
              className="bg-white text-indigo-600 px-3 py-1 rounded text-sm hover:bg-indigo-100 transition"
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
