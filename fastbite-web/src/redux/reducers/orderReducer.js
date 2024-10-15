import { ADD_TO_ORDER, REMOVE_FROM_ORDER, CLEAR_ORDER } from "../actions.js";

const initialState = {
  order: [],
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_ORDER:
      return {
        ...state,
        order: [...state.order, action.payload],
      };
    case REMOVE_FROM_ORDER:
      return {
        ...state,
        order: state.order.filter((dish) => dish.uniqueID !== action.payload),
      };
      case CLEAR_ORDER:
        return {
          ...state,
          order: [],
        }
    default:
      return state;
  }
};

export default orderReducer;
