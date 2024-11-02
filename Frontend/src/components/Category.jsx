import React from "react";
import useJob from "../JopContext";

const Category = () => {
  const { categories, toggleCategory, selectedCategories } = useJob();

  return (
    <div className="flex gap-2 text-lg overflow-hidden"> {/* Adjusted gap and text size */}
      <button 
        className=" px-2 py-1 rounded-md transition duration-300 hover:bg-blue-700" // Smaller padding
        onClick={() => toggleCategory("All")} // Option to show all jobs
      >
        All
      </button>
      {categories.map((category) => (
        <button 
          key={category} 
          className={`bg-blue-600 text-white px-2 py-1 rounded-md transition duration-300 hover:bg-blue-700 ${
            selectedCategories.includes(category) ? "bg-blue-700" : "" // Highlight selected category
          }`} // Highlight selected category
          onClick={() => toggleCategory(category)} 
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Category;
