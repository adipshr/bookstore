import { useState } from "react";
import "../index.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("handleLogin called");

    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Login successfull!");
      navigate("/");
      console.log("User logged in:", response.data);
    } catch (err) {
      console.error(
        "Login error:",
        err.response ? err.response.data : err.message
      );
      toast.error(
        "Failed to log in. Please check your credentials and try again."
      );
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <h1 className="auth-text">Login</h1>
      <div className="auth">
        <form onSubmit={handleLogin} className="form">
          <div className="formGroup">
            <label className="label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="formGroup">
            <label className="label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>
          <button type="submit" className="button">
            Login
          </button>
        </form>
      </div>
      <div className="btn-alt-div">
        <button type="submit" className="btn-alt" onClick={handleRegister}>
          Not an user? Register Now
        </button>
      </div>
    </>
  );
};

export default LoginPage;
