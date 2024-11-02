import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddJob = ({ isOpen, onClose }) => {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    category: '',
    experienceLevel: '',
    location: '',
    company: '',
    salary: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { title, description, category, experienceLevel, location, company } = jobData;

    if (!title || !description || !category || !experienceLevel || !location || !company) {
      toast.error('Please fill in all required fields!');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Validate the form before submitting

    try {
      const response = await axios.post('http://localhost:8000/api/jobs', jobData);
      console.log(response.status)

      if (response.status === 200) {
        toast.success('Job added successfully!');
        onClose(); // Close the form after submission
        setJobData({
          title: '',
          description: '',
          category: '',
          experienceLevel: '',
          location: '',
          company: '',
          salary: '',
        });
      } else {
        toast.error('Failed to add job: ' + response.statusText);
      }
    } catch (error) {
      toast.error('Error: ' + error.message);
    }
  };

  if (!isOpen) return null; // Return null if the modal is not open

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-lg z-10 max-w-md w-full">
        <h2 className="text-xl mb-4">Add New Job</h2>
        
        <div className="mb-3">
          <label className="block mb-1 text-sm">Title:</label>
          <input
            type="text"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            className="w-full p-1 border border-gray-300 rounded text-sm"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1 text-sm">Description:</label>
          <textarea
            name="description"
            value={jobData.description}
            onChange={handleChange}
            className="w-full p-1 border border-gray-300 rounded text-sm"
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="block mb-1 text-sm">Category:</label>
          <input
            type="text"
            name="category"
            value={jobData.category}
            onChange={handleChange}
            className="w-full p-1 border border-gray-300 rounded text-sm"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1 text-sm">Experience Level:</label>
          <input
            type="text"
            name="experienceLevel"
            value={jobData.experienceLevel}
            onChange={handleChange}
            className="w-full p-1 border border-gray-300 rounded text-sm"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1 text-sm">Location:</label>
          <input
            type="text"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            className="w-full p-1 border border-gray-300 rounded text-sm"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1 text-sm">Company:</label>
          <input
            type="text"
            name="company"
            value={jobData.company}
            onChange={handleChange}
            className="w-full p-1 border border-gray-300 rounded text-sm"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1 text-sm">Salary (optional):</label>
          <input
            type="number"
            name="salary"
            value={jobData.salary}
            onChange={handleChange}
            className="w-full p-1 border border-gray-300 rounded text-sm"
          />
        </div>
        
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded-md transition duration-300 hover:bg-blue-700 text-sm"
        >
          Add Job
        </button>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 bg-red-600 text-white px-3 py-1 rounded-md transition duration-300 hover:bg-red-700 text-sm"
        >
          Cancel
        </button>

        <ToastContainer /> {/* Toast container for displaying notifications */}
      </form>
    </div>
  );
};

export default AddJob;
