import Job from "../models/Job.js"

// Create a new job
export const createJobs = async (req, res) => {
    const { title, description, category, experienceLevel, location, company, salary } = req.body; // Destructure required fields

    try {
        const newJob = new Job({
            title,
            description,
            category,
            experienceLevel,
            location,
            company,
            salary,
        });

        await newJob.save();
        res.status(200).json(newJob);
        console.log('wala xareeyay')
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
};

// Get all jobs
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific job by ID
export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a job by ID
export const updateJobs = async (req, res) => {
    const { title, description, category, experienceLevel, location, company, salary } = req.body; // Destructure fields

    try {
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                category,
                experienceLevel,
                location,
                company,
                salary,
            },
            { new: true } // Return the updated document
        );

        if (!updatedJob) return res.status(404).json({ message: "Job not found" });
        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a job by ID
export const deleteJobs = async (req, res) => {
    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id);
        if (!deletedJob) return res.status(404).json({ message: "Job not found" });
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
