import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios'; 
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation checks
    if (!username || !email || !password) {
      toast.error('All fields are required');
      return;
    }

    // Basic email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Password strength check (example: at least 6 characters)
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    
    try {
      // Check if the username or email is already taken
      const checkUserResponse = await axios.post('https://jobs-repo.vercel.app/api/users/check', {
        username,
        email,
      });

      if (checkUserResponse.data.exists) {
        toast.error('Username or email is already taken. Please choose another.');
        return;
      }

      // Proceed with signup
      const response = await axios.post('http://localhost:8000/api/users/create', {
        username,
        email,
        password,
      });

      console.log('Response:', response.data);
      toast.success('Sign up successful!');
      navigate('/login');

      // Clear input fields
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Signup error:', error.response ? error.response.data : error.message);
      toast.error('Signup failed, please try again.');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-purple-600'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
        <h1 className='text-2xl font-bold text-center mb-6 text-purple-600'>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='border border-gray-300 p-3 mb-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-400'
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border border-gray-300 p-3 mb-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-400'
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border border-gray-300 p-3 mb-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-400'
            required
          />
          <button
            type="submit"
            className='bg-purple-600 text-white p-3 rounded w-full hover:bg-purple-700 transition duration-200'
          >
            Sign Up
          </button>
        </form>
        <p className='text-center mt-4'>
          Already have an account? <Link to='/login' className='text-purple-600 hover:underline'>Login</Link>
        </p>
      </div>
      {/* ToastContainer for notifications */}
      <ToastContainer />
    </div>
  );
}

export default Signup;
