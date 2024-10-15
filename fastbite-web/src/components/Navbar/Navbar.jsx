import "./Navbar.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { PasswordRecoveryForm } from "../PasswordRecoveryForm/PasswordRecoveryForm";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const order = useSelector((state) => state.order.order);
  const orderCount = order.length;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);

  const handleLoginClick = () => {
    setIsModalOpen(true);
    setIsRegister(false);
    setIsPasswordRecovery(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsRegister(false);
    setIsPasswordRecovery(false);
  };

  const handleBackToLogin = () => {
    setIsPasswordRecovery(false); 
    setIsRegister(false); 
  };

  return (
    <>
      <nav className="Navbar">
        <div className="Navbar__item">
          <Link to="/menu">
            <button className="Navbar__item-button">Menu</button>
          </Link>
        </div>
        <div className="Navbar__item">
          <Link to="/reserve">
            <button className="Navbar__item-button">Booking</button>
          </Link>
        </div>
        <div className="Navbar__item">
          <Link to="/order">
            <button className="Navbar__item-button">
              Order {orderCount > 0 && <span className="order-count">{orderCount}</span>}
            </button>
          </Link>
        </div>

        {!isAuthenticated && (
          <div className="Navbar__item">
            <button className="Navbar__item-button" onClick={handleLoginClick}>
              Log In
            </button>
          </div>
        )}

        {isAuthenticated && (
          <div className="Navbar__item">
            <Link to="/profile">
              <button className="Navbar__item-button">Profile</button>
            </Link>
          </div>
        )}
      </nav>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-button" onClick={closeModal}>
              Х
            </button>
            {isPasswordRecovery ? (
              <PasswordRecoveryForm 
                onClose={closeModal} 
                onBackToLogin={handleBackToLogin}
              />
            ) : !isRegister ? (
              <LoginForm 
                onRegisterClick={() => setIsRegister(true)} 
                onClose={closeModal} 
                onPasswordRecoveryClick={() => {
                  setIsPasswordRecovery(true); 
                  setIsRegister(false);
                }}
              />
            ) : (
              <RegisterForm 
                onLoginClick={() => {
                  setIsRegister(false);
                  setIsPasswordRecovery(false);
                }} 
                onClose={closeModal} 
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
