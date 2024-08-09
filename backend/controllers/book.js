const db = require("../db");

// Function to add a new book
const addBook = async (req, res) => {
  const { title, author, note } = req.body;

  if (!title || !author) {
    return res.status(400).send("Missing required fields");
  }

  try {
    await db.query(
      "INSERT INTO books (title, author, note, user_id) VALUES ($1, $2, $3, $4)",
      [title, author, note, req.user.id]
    );
    res.status(201).send("Book added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Function to edit a book
const editBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, note } = req.body;

  if (!title || !author) {
    return res.status(400).send("Missing required fields");
  }

  try {
    const result = await db.query(
      "UPDATE books SET title = $1, author = $2, note = $3 WHERE id = $4",
      [title, author, note, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).send("Book not found");
    }

    res.send("Book updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Function to delete a book
const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query("DELETE FROM books WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).send("Book not found");
    }

    res.send("Book deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Function to get books for a particular user
const getBooksByUser = async (req, res) => {
  const user = req.user;
  console.log("Logs from get all books");
  console.log(user.id);
  try {
    const result = await db.query(
      "SELECT * FROM books WHERE user_id = $1 ORDER BY id",
      [user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("No books found for this user");
    }

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Function to get book by id
const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).send("No books found for this book id");
    }

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  addBook,
  editBook,
  deleteBook,
  getBooksByUser,
  getBookById,
};
