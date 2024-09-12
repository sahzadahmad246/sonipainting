import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import {
  sendQuotationReducer,
  updateSignatureReducer,
  deleteQuotationReducer,
  getQuotationByIdReducer,
  getAllQuotationsReducer,
  updateQuotationReducer,
} from "./reducers/quotationReducer";

const initialState = {};

const store = configureStore({
  reducer: {
    user: userReducer,
    sendQuotationData: sendQuotationReducer,
    updatedSignatureData: updateSignatureReducer,
    updatedQuotationData: updateQuotationReducer,
    deleteQuotationData: deleteQuotationReducer,
    getQuotationById: getQuotationByIdReducer,
    allQuotations: getAllQuotationsReducer,
  },
  preloadedState: initialState,
});

export default store;
