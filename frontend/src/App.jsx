import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddBookPage from "./pages/AddBookPage";
import ViewBooksPage from "./pages/ViewBooksPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import EditBookPage from "./pages/EditBookPage";

import "./index.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/addBook" element={<AddBookPage />} />
        <Route path="/viewBooks" element={<ViewBooksPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/editBook/:id" element={<EditBookPage />} />
      </Routes>
    </Router>
  );
};

export default App;
