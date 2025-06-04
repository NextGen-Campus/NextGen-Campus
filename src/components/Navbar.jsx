import React from "react";
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  // Simulated user state (replace with actual auth context or Redux state)
  const [user, setUser] = useState(null); // or mock user: { name: 'John', avatar: 'url-to-image' }

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <img src="https://raw.githubusercontent.com/NextGen-Campus/NextGen-Campus/refs/heads/main/src/assets/NEXTGENCAMPUS_LOGO.jpeg" alt="App Logo" className="h-10 mr-2" />
        {/* <span className="text-xl font-bold text-gray-800">NextGen Campus</span> */}
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-6 text-gray-700">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/about" className="hover:text-blue-600">About</Link>
        <Link to="/events" className="hover:text-blue-600">Events</Link>
      </div>

      {/* User Profile or Login */}
      <div>
        {user ? (
          <Link to="/profile">
            <img
              src={user.avatar || '/default-avatar.png'}
              alt="User"
              className="h-10 w-10 rounded-full object-cover"
            />
          </Link>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
