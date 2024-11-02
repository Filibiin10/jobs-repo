import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import JobList from './components/JobList';
import AddJob from './components/AddJob';

function App() {
  const [isAddJobOpen, toggleAddJobForm] = useState(false);

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gray-100">
        <Header />
        <button
          onClick={() => toggleAddJobForm(!isAddJobOpen)} // Toggle the form open/close
          className="bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-700 mb-4"
        >
          {isAddJobOpen ? 'Close Form' : 'Add Job'}
        </button>
        <AddJob isOpen={isAddJobOpen} onClose={() => toggleAddJobForm(false)} />
        <main className="container mx-auto p-4">
          <JobList />
        </main>
      </div>
    </>
  );
}

export default App;
