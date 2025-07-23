import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FiTruck, FiUsers, FiUserPlus } from "react-icons/fi"; // Added icon
import clsx from "clsx";
import Logo from "./Logo";

const Sidebar = ({ isSidebarOpen }) => {
  const [openSubmenu, setOpenSubmenu] = useState({
    companies: false,
    drivers: false,
  });

  const toggleSubmenu = (menu) => {
    setOpenSubmenu((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <aside
      className={clsx(
        "h-screen text-gray-800 shadow-md overflow-y-auto transition-all duration-300 rounded-lg border-r border-gray-200 bg-gradient-to-br from-blue-200 via-pink-100 to-white",
        {
          "w-64 px-4": isSidebarOpen,
          "w-0 p-0 overflow-hidden": !isSidebarOpen,
        }
      )}
    >
      <div className="w-full flex justify-center mb-8 py-2 border-b border-gray-200">
        <Logo className="w-40 h-auto" />
      </div>

      <nav>
        <ul className="space-y-3">
          {/* Companies */}
          <li>
            <button
              onClick={() => toggleSubmenu("companies")}
              className="w-full flex items-center justify-between p-2 rounded-md hover:bg-blue-100 text-left text-gray-700 font-medium"
            >
              <span className="flex items-center gap-2">
                <FiUsers />
                Companies
              </span>
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  openSubmenu.companies ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {openSubmenu.companies && (
              <ul className="ml-6 mt-1 space-y-1 text-sm text-gray-700">
                <li>
                  <NavLink
                    to="/admin/companies/add"
                    className={({ isActive }) =>
                      clsx(
                        "block p-2 rounded-md",
                        isActive
                          ? "bg-blue-500 text-white"
                          : "hover:bg-blue-100"
                      )
                    }
                  >
                    Add Company
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/companies/view"
                    className={({ isActive }) =>
                      clsx(
                        "block p-2 rounded-md",
                        isActive
                          ? "bg-blue-500 text-white"
                          : "hover:bg-blue-100"
                      )
                    }
                  >
                    View Companies
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Drivers */}
          <li>
            <button
              onClick={() => toggleSubmenu("drivers")}
              className="w-full flex items-center justify-between p-2 rounded-md hover:bg-blue-100 text-left text-gray-700 font-medium"
            >
              <span className="flex items-center gap-2">
                <FiTruck />
                Drivers
              </span>
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  openSubmenu.drivers ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {openSubmenu.drivers && (
              <ul className="ml-6 mt-1 space-y-1 text-sm text-gray-700">
                <li>
                  <NavLink
                    to="/admin/drivers/add"
                    className={({ isActive }) =>
                      clsx(
                        "block p-2 rounded-md",
                        isActive
                          ? "bg-blue-500 text-white"
                          : "hover:bg-blue-100"
                      )
                    }
                  >
                    Add Driver
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/drivers/view"
                    className={({ isActive }) =>
                      clsx(
                        "block p-2 rounded-md",
                        isActive
                          ? "bg-blue-500 text-white"
                          : "hover:bg-blue-100"
                      )
                    }
                  >
                    View Drivers
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Create User */}
          <li>
            <NavLink
              to="/admin/users/create"
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-2 p-2 rounded-md text-gray-700 hover:bg-blue-100",
                  isActive ? "bg-blue-500 text-white" : ""
                )
              }
            >
              <FiUserPlus />
              Create User
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
