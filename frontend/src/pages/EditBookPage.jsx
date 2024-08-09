import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BookForm from "../components/BookForm";

const EditBookPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(null);

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

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/book/${id}`, {
          withCredentials: true,
        });
        console.log(response.data);
        setBook(response.data[0]);
      } catch (error) {
        console.error("Error fetching book data:", error);
        navigate("/viewBooks");
      }
    };

    fetchBook();
  }, [id, navigate]);

  return (
    <div>
      <h1>Edit Book</h1>
      {book ? (
        <BookForm onAddBook={null} bookToEdit={book} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditBookPage;
