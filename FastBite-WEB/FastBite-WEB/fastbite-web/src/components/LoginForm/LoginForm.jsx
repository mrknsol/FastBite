import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions";
import { useState } from "react";
import successIcon from '../../assets/icons/confetti.apng'

export const LoginForm = ({ onRegisterClick, closeModal }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { username, password };

    dispatch(login(userData));
    console.log(userData);

    setSuccessMessage(`Welcome back ${username}!`);
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
          <h1>Login</h1>
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
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="icon" />
          </div>
          <button type="submit">Login</button>
          <div className="register-link">
            <p>
              {"Don't have an account?"}{" "}
              <a href="#" onClick={onRegisterClick}>
                Register
              </a>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};
