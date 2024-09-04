import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
  } from "../constants/userConstant";
  
  const initialUserState = {
    loading: false,
    user: null,
    error: null,
    isAuthenticated: false,
  };
  
  // User Reducer Function
  export const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
      case GET_USER_REQUEST:
        return {
          ...state,
          loading: true,
          isAuthenticated: false,
        };
      case GET_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload,
        };
      case GET_USER_FAIL:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };
      case LOGOUT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case LOGOUT_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          user: null, 
        };
      case LOGOUT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  