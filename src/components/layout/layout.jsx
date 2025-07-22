import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 transition-all duration-300 ease-in-out">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "w-64" : "w-0"
          }`}
        >
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 transition-all duration-300 ease-in-out">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
