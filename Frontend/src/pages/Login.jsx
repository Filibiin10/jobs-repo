import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useJob from '../JopContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {state ,setUser} = useJob()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate the form inputs
      if (!email || !password) {
        toast.error('All fields are required'); // Show error toast
        return; // Prevent submission if fields are empty
      }

      const response = await axios.post('http://localhost:8000/api/users/login', {
        email,
        password,
      });
      
      if (response.status === 200) {
        // Set the token in local storage
        console.log(response.data)
        console.log(response.data.email)
        setUser(response.data); // Set user data
        // localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        toast.success('Login successful!'); // Show success toast
        navigate('/'); // Redirect to home
      } else {
        toast.error('Login failed, please try again.'); // Show error toast
      }

    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      toast.error('Login failed, please try again.'); // Show error toast
    } finally {
      // Reset fields after submission
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-purple-600'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
        <h1 className='text-2xl font-bold text-center mb-6 text-purple-600'>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border border-gray-300 p-3 mb-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-400'
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border border-gray-300 p-3 mb-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-400'
          />
          <button
            type="submit"
            className='bg-purple-600 text-white p-3 rounded w-full hover:bg-purple-700 transition duration-200'
          >
            Login
          </button>
        </form>
        <p className='text-center mt-4'>
          Don't have an account? <Link to='/signup' className='text-purple-600 hover:underline'>Sign Up</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
