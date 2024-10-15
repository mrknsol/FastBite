import React, { useState } from "react";
import "./PaymentForm.css";

export const PaymentForm = ({ onSuccess, onCancel }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleCardNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    if (formattedValue.length <= 19) {
      setCardNumber(formattedValue);
    }
  };

  const handleExpiryDateChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{2})(?=\d)/g, "$1/");
    if (formattedValue.length <= 5) {
      setExpiryDate(formattedValue);
    }
  };

  const handleCvvChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const handlePayment = (event) => {
    event.preventDefault();
    // Логика для обработки платежа
    // Если платеж успешен, вызываем onSuccess
    onSuccess();
  };

  return (
    <div className="PaymentForm">
      <h2 className="PaymentForm__title">Payment Details</h2>
      <form className="PaymentForm__form" onSubmit={handlePayment}>
        <label className="PaymentForm__label">Cardholder Name</label>
        <input type="text" className="PaymentForm__input" placeholder="John Doe" required />

        <label className="PaymentForm__label">Card Number</label>
        <input
          type="text"
          className="PaymentForm__input"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChange={handleCardNumberChange}
          required
        />

        <div className="PaymentForm__row">
          <div className="PaymentForm__column">
            <label className="PaymentForm__label">Expiry Date</label>
            <input
              type="text"
              className="PaymentForm__input"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              required
            />
          </div>
          <div className="PaymentForm__column">
            <label className="PaymentForm__label">CVV</label>
            <input
              type="text"
              className="PaymentForm__input"
              placeholder="123"
              value={cvv}
              onChange={handleCvvChange}
              required
            />
          </div>
        </div>

        <div className="PaymentForm__buttons">
          <button type="submit" className="PaymentForm__submit-button">Pay</button>
          <button type="button" className="PaymentForm__cancel-button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};
