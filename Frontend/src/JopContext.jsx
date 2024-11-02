// JobContext.js

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { jobReducer, initialState } from "./JobReducer";

export const jobContext = createContext();

export const JobProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobReducer, initialState);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Set user state
  const setUser = (user) => {
    dispatch({
      type: "SET_USER",
      payload: { user },
    });
  };

  // Set job state
  const setJobs = (jobs) => {
    dispatch({
      type: "SET_JOBS",
      payload: { jobs },
    });
    // Set categories after jobs are fetched
    const uniqueCategories = [...new Set(jobs.map(job => job.category))];
    setCategories(uniqueCategories); // Make sure to call setCategories
  };

  const setCategories = (categories) => {
    dispatch({
      type: "SET_CATEGORIES",
      payload: { categories },
    });
  };

  // const setSelectedCategory = (category) => {
  //   dispatch({
  //     type: "SET_SELECTED_CATEGORY",
  //     payload: { category },
  //   });
  // };

  const applyFilters = () => {
    const allJobs = state.jobs;
    let filteredProducts;

    // Check if selectedCategories is empty
    // if (selectedCategories=== 'All') {
    //   console.log(allJobs)
    //   filteredProducts = allJobs;
    // } else {
    //   filteredProducts = allJobs.filter(job => 
    //     selectedCategories.includes(job.category)
    //   );
    // }

    console.log("yes")

    // Dispatch the filtered products
    dispatch({
      type: "SET_JOBS",
      payload: { jobs: filteredProducts },
    });
  };

  const toggleCategory = (category) => {
    // console.log(category)
    // applyFilters();
  };

  

  const value = {
    state,
    dispatch,
    jobs: state.jobs,
    user: state.user,
    setUser,
    categories: state.categories,
    setJobs,
    error,
    setCategories, 
     selectedCategories,
    toggleCategory
  };

  return <jobContext.Provider value={value}>{children}</jobContext.Provider>;
};

const useJob = () => {
  const context = useContext(jobContext);
  if (!context) {
    throw new Error("useJob must be used within a JobProvider");
  }
  return context;
};

export default useJob;
