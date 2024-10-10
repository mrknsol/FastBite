import { Navbar } from "../../components/Navbar/Navbar";
import "./ReservePage.css";
import planImg from "../../assets/elseImages/plan.png";

export const ReservePage = () => {
  return (
    <div className="ReservePage">
      <div className="ReservePage__left-side">
        <div className="ReservePage__background" />
        <span className="ReservePage__left-top">Book a table</span>
        <span className="ReservePage__left-bot">Reservation</span>
        <Navbar />
      </div>
      <div className="ReservePage__right-side">
        <div className="ReservePage__right-head">

        </div>

        <div className="ReservePage__right-form">
          <div className="ReservePage__input-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
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
              />
            </div>
            <div className="ReservePage__input-group">
              <label htmlFor="table">Select Table</label>
              <select id="table" name="table">
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
                <input type="date" id="date" name="date" />
              </div>
              <div className="ReservePage__time-group">
                <label htmlFor="time">Time</label>
                <input type="time" id="time" name="time" />
              </div>
            </div>
          </div>
        </div>

        <button className="ReservePage__submit-button">
          Confirm Reservation
        </button>
      </div>
    </div>
  );
};
