import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Files  
import ConnectDB from './config/db.js';
import userRoutes from './route/userRoutes.js'
import jobRoutes from './route/jobRoutes.js'

dotenv.config();

// Initialize Express app

const app = express();

const port = process.env.PORT || 3000;


// Connect to MongoDB

ConnectDB();

// Middleware

app.use(cors({
    origin: ["https://jobs-repo-frontend.vercel.app/"], 
    methods: [
      'GET',
      'POST',
      'PUT',
      'DELETE'
    ],
    credentials: true
  }));
app.use(express.json({ extended: true }));
app.use(cookieParser());


// Routes


app.use('/api/users', userRoutes);
app.use('/api', jobRoutes);

app.get('/',(req,res)=> {
  res.json('API is running...');  // API is running...
})

// Start the server

app.listen(port, () => console.log(`Server running on port ${port}`));
