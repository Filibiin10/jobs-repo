// // server.js
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import taskRoutes from './route/taskRoutes.js';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// // Define Routes (example)
// // app.use((req, res, next) => {
// //   console.log(`Request: ${req.method} ${req.url}`);
// //   next();
// // });

// app.use('/api/tasks' , taskRoutes);

// app.get('/get',  (req, res) => {
//   res.send('Hello from the server!');
// })


// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
