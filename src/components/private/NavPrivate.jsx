import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavPrivate = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[60px] items-center">
          {/* Logo */}
          <h2
            className="text-2xl font-bold text-blue-600 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            WorkEasy
          </h2>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 transition ${
                  isActive ? "font-semibold text-blue-600" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard/about"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 transition ${
                  isActive ? "font-semibold text-blue-600" : ""
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/dashboard/tasks"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 transition ${
                  isActive ? "font-semibold text-blue-600" : ""
                }`
              }
            >
              Tasks
            </NavLink>
            <NavLink
              to="/dashboard/completed"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 transition ${
                  isActive ? "font-semibold text-blue-600" : ""
                }`
              }
            >
              Completed Tasks
            </NavLink>
          </ul>

          {/* Desktop Logout */}
          <div className="hidden md:flex">
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col gap-4 px-4 py-4">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 transition ${
                  isActive ? "font-semibold text-blue-600" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard/about"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 transition ${
                  isActive ? "font-semibold text-blue-600" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/dashboard/tasks"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 transition ${
                  isActive ? "font-semibold text-blue-600" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Tasks
            </NavLink>
            <NavLink
              to="/dashboard/completed"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 transition ${
                  isActive ? "font-semibold text-blue-600" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Completed Tasks
            </NavLink>
            <NavLink
              to="/dashboard/deleted"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 transition ${
                  isActive ? "font-semibold text-blue-600" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Deleted Tasks
            </NavLink>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Logout
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavPrivate;
