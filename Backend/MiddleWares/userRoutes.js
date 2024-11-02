import express from "express";
import {
  createUser,
  getAllUsers,
  loginUser,
  logoutCurrentUser,
  getCurrentUserProfile,
  updateUserProfile,
} from "../controllers/UserController.js";
import {
  authenticated,
  authenticatedAdmin,
} from "../MiddleWares/authMiddleWare.js";

const router = express.Router();

// Route to create a new user (no authentication needed for user registration)
router
  .route("/create-user")
  .post(createUser)
  .get(authenticated, authenticatedAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);
router.get("/profile", authenticated, getCurrentUserProfile)
router.put('/update',authenticated, updateUserProfile);

// router.get('/getAllusers',getAllUsers)

// General test route
// router.get('/', (req, res) => {
//   res.send('Hello from Task Manager API');
// });

export default router;
