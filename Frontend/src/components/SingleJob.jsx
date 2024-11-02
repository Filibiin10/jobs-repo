import React from 'react';
import { FaCalendarAlt, FaBriefcase, FaUserTie, FaGraduationCap } from "react-icons/fa";

const SingleJob = ({ job }) => {
  return (
    <div className='bg-gray-50 rounded-md shadow-lg'>
      {/* Job Header */}
      <div className='bg-gradient-to-r from-[#0052D4] to-[#9CECFB] p-4 rounded-t-md'>
        <div className='flex justify-between items-center'>
          <h3 className='text-white text-lg font-bold'>{job.category}</h3> {/* Job Category */}
          <FaBriefcase className='text-white text-2xl' />
        </div>
      </div>

      {/* Job Details */}
      <div className='p-4'>
        {/* Job Position */}
        <div className='flex justify-between items-center mb-4'>
          <div className='text-lg'>
            <h3 className='font-bold text-gray-800'>{job.title}</h3>
            <p className='text-sm text-gray-500'>{job.description}</p>
          </div>
          <FaUserTie className='text-blue-600 text-3xl' /> {/* Icon for Job Position */}
        </div>

        {/* Experience Section */}
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center'>
            <FaGraduationCap className='text-green-500 mr-2' />
            <h3 className='text-gray-800 font-semibold'>Experience:</h3>
          </div>
          <p className='text-sm text-gray-600'>{job.experienceLevel}</p>
        </div>

        {/* Additional Job Info */}
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center'>
            <FaCalendarAlt className='text-red-500 mr-2' />
            <h3 className='text-gray-800 font-semibold'>Posted:</h3>
          </div>
          <p className='text-sm text-gray-600'>{new Date(job.postedDate).toLocaleDateString()}</p>
        </div>

        {/* Job Description */}
        <div className='mb-4'>
          <p className='text-sm text-gray-700'>
            {job.description}
          </p>
        </div>

        {/* View More Link */}
        <p>
          <a href='#' className='text-purple-500 hover:text-purple-600 font-medium'>
            View More
          </a>
        </p>
      </div>
    </div>
  );
};

export default SingleJob;
