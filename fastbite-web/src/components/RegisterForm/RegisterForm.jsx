import "./RegisterForm.css";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions";
import { useState } from "react";
import successIcon from "../../assets/icons/confetti.apng";
import { useEffect } from "react";

export const RegisterForm = ({ onLoginClick, closeModal }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
 
  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { name, surname, email, password };
    dispatch(register(userData));

    setSuccessMessage("Registration successful!");
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
    <div className={`register-container ${successMessage ? "success" : ""}`}>
      <div className="register-left">
        {successMessage ? (
          <div className="success-message">
            <h1>{successMessage}</h1>
            <img src={successIcon} alt="Success" />
          </div>
        ) : (
          <form className="register-form-container" onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <div className="register-input-box">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <FaUser className="register-icon" />
            </div>
            <div className="register-input-box">
              <input
                type="text"
                name="surname"
                placeholder="Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
              <FaUser className="register-icon" />
            </div>
            <div className="register-input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FaEnvelope className="register-icon" />
            </div>
            <div className="register-input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FaLock className="register-icon" />
            </div>
            
            <button type="submit">Sign Up</button>
            
          </form>
        )}
      </div>
      <div className="register-right">
        <h2>Hello, Friend! </h2>
        <p>Enter your personal details and start your journey with us</p>
        <button onClick={onLoginClick}>Sign In</button>
      </div>
    </div>
  );
};
