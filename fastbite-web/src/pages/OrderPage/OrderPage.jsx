import "./OrderPage.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { clearOrder, removeFromOrder } from "../../redux/actions";
import { useState } from "react";
import { PaymentForm } from "../../components/PaymentForm/PaymentForm";

export const OrderPage = () => {
  const order = useSelector((state) => state.order.order);
  const dispatch = useDispatch();
  const [isPaymentFormVisible, setPaymentFormVisible] = useState(false);
  const [isOrderConfirmed, setOrderConfirmed] = useState(false);

  const totalPrice = order.reduce((total, dish) => total + dish.dishPrice, 0);

  const handleClearOrder = () => {
    dispatch(clearOrder());
    setOrderConfirmed(false);
  };

  const handleConfirmOrder = () => {
    if (order.length > 0) {
      setPaymentFormVisible(true);
    }
  };

  const handlePaymentSuccess = () => {
    setPaymentFormVisible(false);
    setOrderConfirmed(true); 
  };

  const handleCancelPayment = () => {
    setPaymentFormVisible(false);
  };

  return (
    <div className="OrderPage">
      <div className="OrderPage__left-side">
        <div className="OrderPage__background" />
        <span className="OrderPage__left-top">What in</span>
        <span className="OrderPage__left-bot">Your Order</span>
        <Navbar />
      </div>
      <div className="OrderPage__right-side">
        {!isPaymentFormVisible && !isOrderConfirmed ? (
          <>
            <div className="OrderPage__order-list">
              {order.length > 0 ? (
                order.map((dish) => (
                  <div key={dish.dishID} className="OrderPage__order-item">
                    <div className="OrderPage__order-item-details">
                      <h3 className="OrderPage__order-item-name">{dish.dishName}</h3>
                    </div>
                    <div className="OrderPage__order-item-price">
                      ${dish.dishPrice.toFixed(2)}
                      <button
                        className="OrderPage__remove-button"
                        onClick={() => dispatch(removeFromOrder(dish.uniqueID))}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="OrderPage__empty-order">Your order is empty</p>
              )}
            </div>
            <div className="OrderPage__total">
              <h2>Total: ${totalPrice.toFixed(2)}</h2>
            </div>
            <div className="OrderPage__buttons">
              <button className="OrderPage__confirm-button" onClick={handleConfirmOrder}>
                Confirm Order
              </button>
              <button className="OrderPage__clear-button" onClick={handleClearOrder}>
                Clear Order
              </button>
            </div>
          </>
        ) : isOrderConfirmed ? (
          <div className="OrderPage__receipt">
          <h1 className="OrderPage__receipt-title">Ваш чек</h1>
          <div className="OrderPage__receipt-list">
            {order.map((dish) => (
              <div key={dish.dishID} className="OrderPage__receipt-item">
                <span className="OrderPage__item-name">{dish.dishName}</span>
                <span className="OrderPage__item-price">${dish.dishPrice.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="OrderPage__receipt-total">
            <h2>Итого: ${totalPrice.toFixed(2)}</h2>
          </div>
          <div className="OrderPage__receipt-status">
            <h3>Состояние заказа: В процессе приготовления</h3>
          </div>
        </div>
        ) : (
          <PaymentForm onSuccess={handlePaymentSuccess} onCancel={handleCancelPayment} />
        )}
      </div>
    </div>
  );
};
