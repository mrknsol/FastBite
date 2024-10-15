import { Navbar } from "../../components/Navbar/Navbar";
import "./ReservePage.css";
import planImg from "../../assets/elseImages/plan.png";
import { useSelector } from "react-redux";
import { useState } from "react";
 
export const ReservePage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const [name, setName] = useState("");
  const [people, setPeople] = useState("");
  const [table, setTable] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
 
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const handleSubmit = () => {
    if (!isAuthenticated) {
      setModalContent("Please log in to make a reservation.");
      setModalOpen(true);
      return;
    }

    if (!name || !people || !table || !date || !time) {
      setModalContent("To confrirm reservation please fill in all fields.");
      setModalOpen(true);
      return;
    }

    setModalContent("Reservation confirmed!");
    setModalOpen(true);
  };

  const closeModal = () => {
    const modal = document.querySelector('.modal-reserve');
    if (modal) {
      modal.classList.add('closing');
      setTimeout(() => {
        setModalOpen(false);
        modal.classList.remove('closing');
      }, 500);
    }
  };
  

  return (
    <div className="ReservePage">
      <div className="ReservePage__left-side">
        <div className="ReservePage__background" />
        <span className="ReservePage__left-top">Book a table</span>
        <span className="ReservePage__left-bot">Reservation</span>
        <Navbar />
      </div>
      <div className="ReservePage__right-side">
        <div className="ReservePage__right-head"></div>

        <div className="ReservePage__right-form">
          <div className="ReservePage__input-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="ReservePage__right-plan-container">
          <img
            src={planImg}
            alt="Plan Image"
            className="ReservePage__right-plan-img"
          />

          <div className="ReservePage__right-form-block ReservePage__right-inputs">
            <div className="ReservePage__input-group">
              <label htmlFor="people">Number of Guests</label>
              <input
                type="number"
                id="people"
                name="people"
                min="1"
                placeholder="Enter number of people"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
              />
            </div>
            <div className="ReservePage__input-group">
              <label htmlFor="table">Select Table</label>
              <select
                id="table"
                name="table"
                value={table}
                onChange={(e) => setTable(e.target.value)}
              >
                <option value="">Choose a table</option>
                <option value="1">#1</option>
                <option value="2">#2</option>
                <option value="3">#3</option>
                <option value="4">#4</option>
                <option value="4">#5</option>
                <option value="4">#6</option>
                <option value="4">#7</option>
              </select>
            </div>

            <div className="ReservePage__input-group ReservePage__date-time">
              <div className="ReservePage__date-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="ReservePage__time-group">
                <label htmlFor="time">Time</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <button className="ReservePage__submit-button" onClick={handleSubmit}>
          Confirm Reservation
        </button>
      </div>
      {isModalOpen && (
        <div className="modal-reserve">
          <div className="modal-reserve-content">
            <p>{modalContent}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
