import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FiTruck, FiUsers } from "react-icons/fi";
import clsx from "clsx";

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
        "h-[calc(100vh-4rem)] mt-2 ml-2 bg-white shadow-md rounded-xl overflow-y-auto transition-all duration-300",
        {
          "opacity-100 w-64 px-4 py-6": isSidebarOpen,
          "opacity-0 w-0 p-0 overflow-hidden": !isSidebarOpen,
        }
      )}
    >
      <nav>
        <ul className="space-y-3">
          {/* Companies */}
          <li>
            <button
              onClick={() => toggleSubmenu("companies")}
              className="w-full flex items-center justify-between p-2 rounded-md hover:bg-gray-100 text-left text-gray-700 font-medium"
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
              <ul className="ml-6 mt-1 space-y-1 text-sm">
                <li>
                  <NavLink
                    to="/admin/companies/add"
                    className={({ isActive }) =>
                      clsx(
                        "block p-2 rounded-md",
                        isActive
                          ? "bg-indigo-100 text-indigo-700"
                          : "hover:bg-gray-100"
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
                          ? "bg-indigo-100 text-indigo-700"
                          : "hover:bg-gray-100"
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
              className="w-full flex items-center justify-between p-2 rounded-md hover:bg-gray-100 text-left text-gray-700 font-medium"
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
              <ul className="ml-6 mt-1 space-y-1 text-sm">
                <li>
                  <NavLink
                    to="/admin/drivers/add"
                    className={({ isActive }) =>
                      clsx(
                        "block p-2 rounded-md",
                        isActive
                          ? "bg-indigo-100 text-indigo-700"
                          : "hover:bg-gray-100"
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
                          ? "bg-indigo-100 text-indigo-700"
                          : "hover:bg-gray-100"
                      )
                    }
                  >
                    View Drivers
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
