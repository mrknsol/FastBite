import "./OrderPage.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { removeFromOrder } from "../../redux/actions";

export const OrderPage = () => {
  const order = useSelector((state) => state.order.order);
  const dispatch = useDispatch();
  // const orderCount = order.length;

  const totalPrice = order.reduce((total, dish) => total + dish.dishPrice, 0);
 
  return (
    <div className="OrderPage">
      <div className="OrderPage__left-side">
        <div className="OrderPage__background" />
        <span className="OrderPage__left-top">What in</span>
        <span className="OrderPage__left-bot">Your Order</span>
        <Navbar />
      </div>
      <div className="OrderPage__right-side">
        <div className="OrderPage__order-list">
          {order.length > 0 ? (
            order.map((dish) => (
              <div key={dish.dishID} className="OrderPage__order-item">
                <div className="OrderPage__order-item-details">
                  <h3>{dish.dishName}</h3>
                  <p>{dish.dishDescription}</p>
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
        <button className="OrderPage__confirm-button">Confirm Order</button>
      </div>
    </div>
  );
};
