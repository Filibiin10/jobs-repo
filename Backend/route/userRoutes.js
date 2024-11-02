import express from "express";
import {
  createUser,
  checkUser,
  loginUser,
  logoutCurrentUser,
  getCurrentUserProfile,
  updateUserProfile,
  getAllUsers
} from "../controllers/UserController.js";
import authenticated from "../MiddleWares/authMiddleWare.js";

const router = express.Router();

// Route to create a new user (no authentication needed for user registration)
router.route("/create").post(createUser);
// Route to get all users

router.post("/login", loginUser);
router.post("/logout", logoutCurrentUser);
router.get("/profile", getCurrentUserProfile);
router.get("/get",authenticated, getAllUsers);
router.put("/update", authenticated, updateUserProfile);
router.post('/check',checkUser)

export default router;
