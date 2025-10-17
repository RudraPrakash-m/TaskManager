import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavPublic = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[60px] items-center">
          {/* Logo */}
          <Link to={"/"}>
            <h2 className="text-2xl font-bold text-blue-600">WorkEasy</h2>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 transition ${
                  isActive ? "font-semibold text-blue-600" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 transition ${
                  isActive ? "font-semibold text-blue-600" : ""
                }`
              }
            >
              About
            </NavLink>
          </ul>

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-3">
            <NavLink to="/login">
              <button className="px-4 py-1.5 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
                Login
              </button>
            </NavLink>
            <NavLink to="/register">
              <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Register
              </button>
            </NavLink>
          </div>

          {/* Mobile menu button */}
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
              to="/"
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
              to="/about"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 transition ${
                  isActive ? "font-semibold text-blue-600" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
            <NavLink to="/login" onClick={() => setIsOpen(false)}>
              <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
                Login
              </button>
            </NavLink>
            <NavLink to="/register" onClick={() => setIsOpen(false)}>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Register
              </button>
            </NavLink>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavPublic;
