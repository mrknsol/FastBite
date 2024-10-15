import { Link } from 'react-router-dom';
import './LogoutModal.css';
import { useEffect, useState } from 'react';

export const LogoutModal = ({ closeModal, handleLogout }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('LogoutModal')) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeModal();
    }, 300);
  };

  return (
    <div className={`LogoutModal ${isClosing ? 'closing' : ''}`}>
      <div className='LogoutModal__content'>
        <h3>Are you sure you want to exit?</h3>
        <div className='LogoutModal__buttons'>
          <Link to={'/'}>
            <button
              className='LogoutModal__yes-no'
              onClick={() => {
                handleLogout();
                handleClose();
              }}
            >
              Yes
            </button>
          </Link>
          <button className='LogoutModal__yes-no' onClick={handleClose}>No</button>
        </div>
      </div>
    </div>
  );
};
