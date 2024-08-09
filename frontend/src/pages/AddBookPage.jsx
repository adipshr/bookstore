import { useState, useEffect } from "react";
import BookForm from "../components/BookForm";
import "../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBookPage = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/me", {
          withCredentials: true,
        });
        console.log("User data:", response.data);

        if (response.status === 401) {
          console.log("User not found");
          navigate("/login");
        }
      } catch (error) {
        console.log("Error while fetching current user!", error);
        navigate("/login");
      }
    };

    getCurrentUser();
  }, []);

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  return (
    <div className="add-book-div">
      <h1>Add a New Book</h1>
      <BookForm onAddBook={handleAddBook} />
    </div>
  );
};

export default AddBookPage;
