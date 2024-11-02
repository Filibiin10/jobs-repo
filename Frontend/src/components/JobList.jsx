import React, { useEffect } from 'react';
import SingleJob from './SingleJob';
import Category from './Category';
import useJob from '../JopContext';
import axios from "axios"

const JobList = () => {
  const { jobs, setJobs, selectedCategories } = useJob(); // Updated to use selectedCategories

axios.defaults.withCredentials = true;

useEffect(() => {
  const fetchJobs = async () => {
    try {
      const response = await axios.get('https://jobs-repo.vercel.app/api/jobs');
      const data = response.data;
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  fetchJobs();
}, []);


  // Filter jobs based on selected categories
  const filteredJobs = selectedCategories.length === 0 
    ? jobs 
    : jobs.filter(job => selectedCategories.includes(job.category)); // Check if job's category is in selected categories

  return (
    <div>
      <div className='mt-6'>
        <Category />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10 pt-5'>
        {jobs.map(job => ( // Use filteredJobs instead of jobs
          <SingleJob key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
