import axios from "axios";

import {
  SEND_QUOTATION_REQUEST,
  SEND_QUOTATION_SUCCESS,
  SEND_QUOTATION_FAIL,
  UPDATE_SIGNATURE_REQUEST,
  UPDATE_SIGNATURE_SUCCESS,
  UPDATE_SIGNATURE_FAIL,
  UPDATE_QUOTATION_REQUEST,
  UPDATE_QUOTATION_SUCCESS,
  UPDATE_QUOTATION_FAIL,
  DELETE_QUOTATION_REQUEST,
  DELETE_QUOTATION_SUCCESS,
  DELETE_QUOTATION_FAIL,
  GET_QUOTATION_BY_ID_REQUEST,
  GET_QUOTATION_BY_ID_SUCCESS,
  GET_QUOTATION_BY_ID_FAIL,
  GET_ALL_QUOTATIONS_REQUEST,
  GET_ALL_QUOTATIONS_SUCCESS,
  GET_ALL_QUOTATIONS_FAIL,
} from "../constants/quotationConstants";

// sendQuotationData action
export const sendQuotationData = (quotationDetails) => async (dispatch) => {
  try {
    dispatch({ type: SEND_QUOTATION_REQUEST });
    const { data } = await axios.post(
      "https://sonipainting-backend.onrender.com/quotations",
      quotationDetails,
      {
        withCredentials: true,
      }
    );
    console.log("Success:", data); // Add this log
    dispatch({ type: SEND_QUOTATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SEND_QUOTATION_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Update Quotation Action
export const updateQuotation = (id, updatedData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_QUOTATION_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    // Send updated quotation data to the backend
    const { data } = await axios.put(
      `https://sonipainting-backend.onrender.com/update/quotation/${id}`,
      updatedData,
      config
    );

    dispatch({ type: UPDATE_QUOTATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_QUOTATION_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Update Signature Action
export const updateSignature = (id, updatedData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SIGNATURE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json", // Set the header to JSON
      },
      withCredentials: true,
    };

    // Send the signature and other data as JSON
    const { data } = await axios.put(
      `http://localhost:5000/update/sign/${id}`,
      updatedData,
      config
    );

    dispatch({ type: UPDATE_SIGNATURE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_SIGNATURE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Delete Quotation Action
export const deleteQuotation = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_QUOTATION_REQUEST });
    const { data } = await axios.delete(
      `https://sonipainting-backend.onrender.com/quotations/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: DELETE_QUOTATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_QUOTATION_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Get Quotation by ID Action
export const getQuotationById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_QUOTATION_BY_ID_REQUEST });
    const { data } = await axios.get(
      `https://sonipainting-backend.onrender.com/quotations/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: GET_QUOTATION_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_QUOTATION_BY_ID_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Get All Quotations Action
export const getAllQuotations = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_QUOTATIONS_REQUEST });
    const { data } = await axios.get(
      "https://sonipainting-backend.onrender.com/quotations",
      {
        withCredentials: true,
      }
    );
    dispatch({ type: GET_ALL_QUOTATIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_QUOTATIONS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
