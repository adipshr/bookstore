import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  function handleAddBook() {
    navigate("/addBook");
  }

  function handleViewBook() {
    navigate("/viewBooks");
  }

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
        } else {
          setUser(response.data[0]);
        }
      } catch (error) {
        console.log("Error while fetching current user!", error);
        navigate("/login");
      }
    };

    getCurrentUser();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-wrapper">
        <h2>Hello, {user?.name.split(" ")[0]}!</h2>
        <button onClick={handleAddBook}>Add Book</button>
        <button onClick={handleViewBook}>View Books</button>
      </div>
    </div>
  );
};

export default DashboardPage;
