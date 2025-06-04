import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const user = firebase.user; // Replace with real auth state
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown toggle

  const handleLogout = async () => {
    // Implement logout functionality here
    await firebase.logOutUser();
    console.log("Logging out");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://raw.githubusercontent.com/NextGen-Campus/NextGen-Campus/refs/heads/main/src/assets/NEXTGENCAMPUS_LOGO.jpeg"
              alt="App Logo"
              className="h-10 mr-2"
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 text-gray-700">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link to="/about" className="hover:text-blue-600">
              About
            </Link>
            <Link to="/events" className="hover:text-blue-600">
              Events
            </Link>
          </div>

          {/* Profile / Login */}
          <div className="hidden md:flex relative">
            {user ? (
              <div>
                <img
                  src={
                    `${user?.reloadUserInfo?.photoUrl}`||
                    "https://png.pngtree.com/png-vector/20220628/ourmid/pngtree-user-profile-avatar-vector-admin-png-image_5289693.png"
                  }
                  alt="User"
                  className="h-10 w-10 rounded-full object-cover cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                    <button
                      onClick={(e) => navigate('/profile')}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => handleLogout()}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-500 hover:text-white"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Links */}
      {isOpen && (
        <div className="flex flex-col items-center md:hidden px-4 pb-4 space-y-2 text-gray-700">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block hover:text-blue-600"
          >
            About
          </Link>
          <Link
            to="/events"
            onClick={() => setIsOpen(false)}
            className="block hover:text-blue-600"
          >
            Events
          </Link>
          {user ? (
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2 mt-2"
            >
              <img
                src={user.avatar || "/default-avatar.png"}
                alt="User"
                className="h-8 w-8 rounded-full object-cover"
              />
              <span>{user.name || "Profile"}</span>
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block text-center px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 mt-2"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
