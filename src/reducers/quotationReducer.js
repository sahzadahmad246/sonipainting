import {

  SEND_QUOTATION_REQUEST,
  SEND_QUOTATION_SUCCESS,
  SEND_QUOTATION_FAIL,
  SEND_QUOTATION_RESET,
  UPDATE_SIGNATURE_REQUEST,
  UPDATE_SIGNATURE_SUCCESS,
  UPDATE_SIGNATURE_FAIL,
  UPDATE_SIGNATURE_RESET,
  UPDATE_QUOTATION_REQUEST,
  UPDATE_QUOTATION_SUCCESS,
  UPDATE_QUOTATION_FAIL,
  UPDATE_QUOTATION_RESET,
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

const initialState = {
  data: JSON.parse(sessionStorage.getItem("quotationData")) || {},
};



const initialQuotationState = {
  loading: false,
  quotation: null,
  error: null,
  success: false,
};

// Update Quotation Reducer
export const updateQuotationReducer = (
  state = initialQuotationState,
  action
) => {
  switch (action.type) {
    case UPDATE_QUOTATION_REQUEST:
      return { ...state, loading: true, success: false };
    case UPDATE_QUOTATION_SUCCESS:
      return {
        ...state,
        loading: false,
        quotation: action.payload,
        success: true,
      };
    case UPDATE_QUOTATION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case UPDATE_QUOTATION_RESET:
      return {
        ...initialQuotationState, // Reset the state back to initial values
      };
    default:
      return state;
  }
};

// Send Quotation Reducer
export const sendQuotationReducer = (state = initialQuotationState, action) => {
  switch (action.type) {
    case SEND_QUOTATION_REQUEST:
      return { ...state, loading: true, success: false };
    case SEND_QUOTATION_SUCCESS:
      return {
        ...state,
        loading: false,
        quotation: action.payload,
        success: true,
      };
    case SEND_QUOTATION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case SEND_QUOTATION_RESET:
      return {
        ...initialQuotationState, // Reset the state back to initial values
      };
    default:
      return state;
  }
};

// Update Signature Reducer
export const updateSignatureReducer = (
  state = initialQuotationState,
  action
) => {
  switch (action.type) {
    case UPDATE_SIGNATURE_REQUEST:
      return { ...state, loading: true, success: false };
    case UPDATE_SIGNATURE_SUCCESS:
      return {
        ...state,
        loading: false,
        quotation: action.payload,
        success: true,
      };
    case UPDATE_SIGNATURE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case UPDATE_SIGNATURE_RESET:
      return {
        ...initialQuotationState, // Reset the state back to initial values
      };
    default:
      return state;
  }
};

// Delete Quotation Reducer
export const deleteQuotationReducer = (
  state = initialQuotationState,
  action
) => {
  switch (action.type) {
    case DELETE_QUOTATION_REQUEST:
      return { ...state, loading: true, success: false };
    case DELETE_QUOTATION_SUCCESS:
      return { ...state, loading: false, success: true };
    case DELETE_QUOTATION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

// Get Quotation by ID Reducer
export const getQuotationByIdReducer = (
  state = initialQuotationState,
  action
) => {
  switch (action.type) {
    case GET_QUOTATION_BY_ID_REQUEST:
      return { ...state, loading: true, quotation: null };
    case GET_QUOTATION_BY_ID_SUCCESS:
      return { ...state, loading: false, quotation: action.payload };
    case GET_QUOTATION_BY_ID_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get All Quotations Reducer
export const getAllQuotationsReducer = (
  state = { quotations: [], loading: false, error: null },
  action
) => {
  switch (action.type) {
    case GET_ALL_QUOTATIONS_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_QUOTATIONS_SUCCESS:
      return { ...state, loading: false, quotations: action.payload };
    case GET_ALL_QUOTATIONS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
