import { useState, useEffect } from "react";
import Book from "../components/Book";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../index.css";

const ViewBooksPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/book/", {
          withCredentials: true,
        });

        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
        navigate("/login");
      }
    };

    fetchBooks();
  }, []);

  const [books, setBooks] = useState([]);

  const handleEdit = (id) => {
    navigate(`/editBook/${id}`);
  };

  const handleDelete = async (index, id) => {
    const updatedBooks = books.filter((book, i) => i !== index);
    setBooks(updatedBooks);

    try {
      const response = await axios.delete(
        `http://localhost:3000/book/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="book-view-div">
      <h1>View Books</h1>
      <h3>Total Books :{books.length}</h3>
      {books.map((book, index) => (
        <Book
          key={index}
          title={book.title}
          author={book.author}
          note={book.note}
          onEdit={() => handleEdit(book.id)}
          onDelete={() => handleDelete(index, book.id)}
        />
      ))}
    </div>
  );
};

export default ViewBooksPage;
