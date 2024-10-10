import "./RegisterForm.css";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions";
import { useState } from "react";
import successIcon from "../../assets/icons/confetti.apng";

export const RegisterForm = ({ onLoginClick, closeModal }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { username, email, password };

    dispatch(register(userData));
    console.log(userData);

    setSuccessMessage("Registration successful!");
  };

  return (
    <div className="wrapper">
      {successMessage ? (
        <div className="success-message">
          <h1>{successMessage}</h1>
          <img src={successIcon} alt="Succes" />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="icon" />
          </div>
          <button type="submit">Register</button>
          <div className="login-link">
            <p>
              Already have an account?{" "}
              <a href="#" onClick={onLoginClick}>
                Login
              </a>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};
