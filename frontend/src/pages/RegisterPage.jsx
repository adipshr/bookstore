import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../index.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("handleRegister called");

    try {
      const response = await axios.post("http://localhost:3000/user/register", {
        name,
        email,
        password,
      });
      console.log("Response:", response);

      toast.success("User registered successfully!");
      console.log("User registered:", response.data);
    } catch (err) {
      console.error("Registration error:", err);

      toast.error("Failed to register user. Please try again.");
    }
  };

  const handleLogin = () => {
    console.log("called click");
    navigate("/login");
  };

  return (
    <>
      <h1 className="auth-text">Register</h1>
      <div className="auth">
        <form onSubmit={handleRegister} className="form">
          <div className="formGroup">
            <label className="label">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              required
            />
          </div>
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
            Register
          </button>
        </form>
      </div>
      <div className="btn-alt-div">
        <button type="submit" className="btn-alt" onClick={handleLogin}>
          Already an user? Login Now
        </button>
      </div>
    </>
  );
};

export default RegisterPage;
