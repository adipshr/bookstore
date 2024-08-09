const express = require("express");
const authenticateToken = require("../middleware/auth");
const {
  addBook,
  editBook,
  deleteBook,
  getBooksByUser,
  getBookById,
} = require("../controllers/book");
const router = express.Router();

// all routes realted to books

router.post("/add", authenticateToken, addBook);
router.put("/edit/:id", editBook);
router.delete("/delete/:id", authenticateToken, deleteBook);
router.get("/", authenticateToken, getBooksByUser);
router.get("/:id", authenticateToken, getBookById);

module.exports = router;
