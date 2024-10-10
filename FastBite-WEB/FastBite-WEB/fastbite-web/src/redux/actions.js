import { v4 as uuidv4 } from 'uuid';

export const ADD_TO_ORDER = "ADD_TO_ORDER";
export const REMOVE_FROM_ORDER = "REMOVE_FROM_ORDER";



export const login = (userData) => ({
  type: 'LOGIN',
  payload: userData,
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const register = (userData) => ({
  type: 'REGISTER',
  payload: userData,
});



export const addToOrder = (dish) => ({
  type: ADD_TO_ORDER,
  payload: { ...dish, uniqueID: uuidv4() },
});


export const updateProfile = (userData) => ({
  type: 'UPDATE_PROFILE',
  payload: userData,
});


export const removeFromOrder = (uniqueID) => ({
  type: REMOVE_FROM_ORDER,
  payload: uniqueID,
});
