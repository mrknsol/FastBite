import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import orderReducer from './reducers/orderReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
  
});

const store = createStore(rootReducer);

export default store;
