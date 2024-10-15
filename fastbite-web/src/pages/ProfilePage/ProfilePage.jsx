import "./ProfilePage.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateProfile } from "../../redux/actions";
import { logout } from "../../redux/actions";
import { LogoutModal } from "../../components/LogoutModal/LogoutModal";

export const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    surname: user?.surname || "",
    username: user?.username || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
  });
   
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    dispatch(updateProfile(formData));
    setIsEditing(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };


  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="ProfilePage">
      <div className="ProfilePage__left-side">
        <div className="ProfilePage__background"></div>
        <span className="ProfilePage__left-top">Check your</span>
        <span className="ProfilePage__left-bot">Profile</span>
        <Navbar />
      </div>

      <div className="ProfilePage__right-side">
        <h2 className="ProfilePage__title">Your Profile</h2>
        <div className="ProfilePage__info">
          <div className="ProfilePage-item-group">
            <div className="ProfilePage-item">
              <span className="ProfilePage__item-title">First Name</span>
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  value={formData.name}
                  onChange={handleChange}
                  className="ProfilePage__input"
                />
              ) : (
                <span className="ProfilePage__item-info">
                  {user?.name}
                </span>
              )}
            </div>
            <div className="ProfilePage-item">
              <span className="ProfilePage__item-title">Last Name</span>
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  value={formData.surname}
                  onChange={handleChange}
                  className="ProfilePage__input"
                />
              ) : (
                <span className="ProfilePage__item-info">{user?.surname}</span>
              )}
            </div>
          </div>

          <div className="ProfilePage-item">
            <span className="ProfilePage__item-title">Email</span>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="ProfilePage__input"
              />
            ) : (
              <span className="ProfilePage__item-info">{user?.email}</span>
            )}
          </div>
          <div className="ProfilePage-item">
            <span className="ProfilePage__item-title">Phone Number</span>
            {isEditing ? (
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="ProfilePage__input"
              />
            ) : (
              <span className="ProfilePage__item-info">
                {user?.phoneNumber}
              </span>
            )}
          </div>
        </div>
 
        <div className="ProfilePage__buttons">
          {isEditing ? (
            <button className="ProfilePage__save-button" onClick={handleSave}>
              Save
            </button>
          ) : (
            <div className="ProfilePage__edit-exit">
              <button
                className="ProfilePage__edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
              <button
                className="ProfilePage__exit-button exit"
                onClick={openModal}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <>
        <LogoutModal closeModal={closeModal} handleLogout={handleLogout}/>
        </>

      )}
    </div>
  );
};
