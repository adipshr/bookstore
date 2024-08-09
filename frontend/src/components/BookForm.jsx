import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../index.css";
import { useNavigate } from "react-router-dom";

const BookForm = ({ onAddBook, bookToEdit }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
      setNote(bookToEdit.note);
    } else {
      setTitle("");
      setAuthor("");
      setNote("");
    }
  }, [bookToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (bookToEdit) {
      try {
        const response = await axios.put(
          `http://localhost:3000/book/edit/${bookToEdit.id}`,
          {
            title,
            author,
            note,
          },
          { withCredentials: true }
        );

        toast.success("Book updated successfully!");
        navigate("/viewBooks");
      } catch (error) {
        console.error("Error updating the book:", error);

        toast.error("Failed to update the book. Please try again.");
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/book/add",
          {
            title,
            author,
            note,
          },
          { withCredentials: true }
        );

        console.log("Book added successfully:", response.data);

        toast.success("Book added successfully!");
        navigate("/viewBooks");

        return response.data;
      } catch (error) {
        console.error("Error adding the book:", error);

        toast.error("Failed to add the book. Please try again.");
      }
    }

    setTitle("");
    setAuthor("");
    setNote("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="formGroup">
        <label className="label">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
          required
        />
      </div>
      <div className="formGroup">
        <label className="label">Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="input"
          required
        />
      </div>
      <div className="formGroup">
        <label className="label">Note</label>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="input"
          required
        />
      </div>
      <button type="submit" className="button">
        {bookToEdit ? "Update Book" : "Add Book"}
      </button>
    </form>
  );
};

export default BookForm;
