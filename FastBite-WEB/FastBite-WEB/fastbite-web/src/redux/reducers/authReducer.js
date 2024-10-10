const initialState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      return initialState;
    case "REGISTER":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
      case 'UPDATE_PROFILE':
        return {
          ...state,
          user: {
            ...state.user,
            ...action.payload,
          },
        };
    default:
      return state;
  }
};

export default authReducer;
