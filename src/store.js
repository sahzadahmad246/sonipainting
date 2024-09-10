import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import {
  
  sendQuotationReducer,
  updateQuotationReducer,
  deleteQuotationReducer,
  getQuotationByIdReducer,
  getAllQuotationsReducer,
} from "./reducers/quotationReducer";

const initialState = {};

const store = configureStore({
  reducer: {
    user: userReducer,
    sendQuotationData: sendQuotationReducer,
    updateQuotationData: updateQuotationReducer,
    deleteQuotationData: deleteQuotationReducer,
    getQuotationById: getQuotationByIdReducer,
    allQuotations: getAllQuotationsReducer,
  },
  preloadedState: initialState,
});

export default store;
