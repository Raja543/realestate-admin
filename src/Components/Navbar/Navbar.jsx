import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { auth } from "../../firebase";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      logout();
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <header className="bg-[#FFFAE9] w-full">
      <nav className="flex justify-between items-center mx-auto px-6 py-4 md:px-6">
        <div className="flex items-center">
          <NavLink to="/">
            <img
              className="w-40 cursor-pointer"
              src="/images/Logo.svg"
              alt="Logo"
            />
          </NavLink>
        </div>
        <ul
          className={`md:flex md:items-center hidden space-x-3 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <NavLink to="/">
            <li className="text-gray-800 text-xl hover:text-gray-500 pr-4">
              Home
            </li>
          </NavLink>
          <NavLink to="/findproperty">
            <li className="text-gray-800 text-xl hover:text-gray-500 pr-4">
              Find Property
            </li>
          </NavLink>
          <NavLink to="/listproperty">
            <li className="text-gray-800 text-xl hover:text-gray-500 pr-2">
              List Property
            </li>
          </NavLink>
          <NavLink to="/agents">
            <li className="text-gray-800 text-xl hover:text-gray-500 pr-2">
              Agents
            </li>
          </NavLink>
          <NavLink to="/contacts">
            <li className="text-gray-800 text-xl hover:text-gray-500 pr-2">
              Contact Us
            </li>
          </NavLink>
        </ul>
        <div className="md:flex md:items-center hidden space-x-4">
          <NavLink to="/login">
            <button
              className="bg-orange max-w-fit text-textwhite font-[Albert-sans] py-2 px-6 rounded-md duration-500"
              onClick={handleLogout}
            >
              Logout
            </button>
          </NavLink>
        </div>
        {/* Sidebar Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
          >
            {menuOpen ? (
              <i className="fas fa-times hidden" />
            ) : (
              <i className="fas fa-bars text-xl" />
            )}
          </button>
        </div>
        {/* Sidebar Menu */}
        <div
          className={`fixed md:hidden top-0 right-0 h-full w-56 bg-[#FFFAE9] bg-opacity-70 shadow-lg z-20 transform ease-in-out duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } md:translate-x-0`}
        >
          <div className="p-4 flex items-center justify-center">
            <ul className="space-y-4 mt-12">
              <NavLink to="/">
                <li className="text-gray-800 text-xl hover:text-gray-500 p-2">
                  Home
                </li>
              </NavLink>
              <NavLink to="/agents">
                <li className="text-gray-800 text-xl hover:text-gray-500 p-2">
                  Agents
                </li>
              </NavLink>
              <NavLink to="/contact">
                <li className="p-2 text-xl">Contact Us</li>
              </NavLink>
              <NavLink to="/property-search">
                <li className="text-gray-800 text-xl hover:text-gray-500 p-2">
                  Find Property
                </li>
              </NavLink>
              <NavLink to="/Property-list">
                <li className="text-gray-800 text-xl hover:text-gray-500 p-2">
                  List Property
                </li>
              </NavLink>

              <NavLink to="/login">
                <li>
                  <button
                    className="bg-orange max-w-fit text-textwhite font-[Albert-sans] py-2 px-6 rounded-md duration-500 my-2 mx-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </NavLink>
            </ul>
            {/* Close (X) icon inside the Sidebar Menu */}
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
            >
              <i className="fas fa-times text-2xl" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
