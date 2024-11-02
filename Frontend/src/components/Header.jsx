import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; // Import js-cookie
import useJob from '../JopContext';

const Header = () => {
  const { state, setUser } = useJob();
  const { user } = state;
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear user state and cookies
    setUser(null);
    Cookies.remove('token'); // Remove token cookie
    localStorage.removeItem('user');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="bg-blue-500 flex justify-between items-center py-3 px-5">
      <div>
        <h1 className="text-white text-3xl font-bold">Job Brand</h1>
      </div>
      <div className="text-white text-xl">
        {user ? (
          <>
            <span>Welcome, {user.username}!</span>
            <button onClick={handleLogout} className="ml-4 px-4 py-2 rounded-md text-white text-xl">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="px-4 py-2 rounded-md text-white text-xl">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
