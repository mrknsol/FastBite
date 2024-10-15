import "./LoginForm.css";
import {  FaLock, FaEnvelope } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions";
import { useState } from "react";
import successIcon from "../../assets/icons/confetti.apng";
import { useEffect } from "react";

export const LoginForm = ({ onRegisterClick, closeModal, onPasswordRecoveryClick}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  
  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { email, password };

    dispatch(login(userData));
    setSuccessMessage(`Welcome back !`);
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        closeModal();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, closeModal]);

  return (
    <div className={`login-container ${successMessage ? "success" : ""}`}>
      <div className="login-left">
        {successMessage ? (
          <div className="success-message">
            <h1>{successMessage}</h1>
            <img src={successIcon} alt="Success" />
          </div>
        ) : (
          <form className="login-form-container" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="login-input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FaEnvelope className="login-icon" />
            </div>
            <div className="login-input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FaLock className="login-icon" />
            </div>
            <button type="submit">Sign In</button>
            <div className="login-forgot-password">
              <button type="button" onClick={onPasswordRecoveryClick}>
                Forgot Password?
              </button>
            </div>
          </form>
        )}
      </div>
      {!successMessage && (
        <div className="login-right">
          <h2>Welcome Back!</h2>
          <p>To keep connected with us please login with your personal info</p>
          <button onClick={onRegisterClick}>Sign Up</button>
        </div>
      )}
    </div>
  );
};
