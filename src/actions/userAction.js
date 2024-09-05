// src/actions/userAction.js
import axios from "axios";
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../constants/userConstant";

//  getUser action
export const getUser = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });
    const { data } = await axios.get("https://sonipainting-backend.onrender.com/login/success", {
      withCredentials: true,
    });
    dispatch({ type: GET_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// logout action
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });
    await axios.get("https://sonipainting-backend.onrender.com/logout", {
      withCredentials: true,
    });
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};
