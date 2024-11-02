import express from "express";
import {
    createJobs,
    getJobs,
    getJobById,
    updateJobs,
    deleteJobs,
} from "../controllers/Controller.js"; // Adjust the import path to your controller
import { getCategories,getCategory } from "../controllers/UserController.js";

const router = express.Router();

// Route to create a new job
router.post("/jobs", createJobs);

// Route to get all jobs
router.get("/jobs", getJobs);

// Route to get a specific job by ID
router.get("/jobs/:id", getJobById);

// category
router.get('/categories', getCategories)
router.get('/category', getCategory)

// Route to update a job by ID
router.put("/jobs/:id", updateJobs);

// Route to delete a job by ID
router.delete("/jobs/:id", deleteJobs);

export default router;
