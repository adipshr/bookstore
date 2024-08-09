const express = require("express");
const {
  handleUserSignup,
  handleUserLogin,
  getCurrentUser,
  handleUserLogout,
} = require("../controllers/users");
const authenticateToken = require("../middleware/auth");
const router = express.Router();

// all routes related to users

router.post("/register", handleUserSignup);
router.post("/login", handleUserLogin);
router.get("/me", authenticateToken, getCurrentUser);
router.get("/logout", authenticateToken, handleUserLogout);

module.exports = router;
