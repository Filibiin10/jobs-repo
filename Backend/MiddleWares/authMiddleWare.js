import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asynchandler from './asyncHandler.js';

// check if the user is authenticated
const authenticated = asynchandler(async (req, res, next) => {
    const token = req.cookies.token; // Fetch token from cookies
    
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied.' });
    }
    
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Fetch user by decoded ID and omit password field
        req.user = await User.findById(decoded.id).select('-password');
        
        // Proceed to next middleware if the token is valid
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Token is not valid, authorization denied.' });
    }
});

// Middleware for admin authorization
const authenticatedAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();  // Continue if user is an admin
    } else {
      return res.status(403).json({ message: 'Not authorized as an admin' });
    }
  };
export default authenticated;


