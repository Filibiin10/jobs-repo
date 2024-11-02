import mongoose from "mongoose";

// Define the schema for job postings
const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    experienceLevel: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    postedDate: {
      type: Date,
      default: Date.now, // Automatically set the posted date to the current date
    },
    company: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: false, // Optional field
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the model for the job schema
const Job = mongoose.model("Job", JobSchema);

export default Job;
