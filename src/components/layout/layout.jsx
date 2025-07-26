import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAuth } from "../../context/AuthContext"; // adjust path if needed

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useAuth(); // assuming user has role_id property

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden rounded-lg">
      {/* Sidebar - Show only for Admin (role_id === 1001) */}
      {user?.role_id === 1001 && (
        <div
          className={`transition-all duration-300 ease-in-out bg-white shadow-lg ${
            isSidebarOpen ? "w-64" : "w-0"
          }`}
        >
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 overflow-auto  my-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
