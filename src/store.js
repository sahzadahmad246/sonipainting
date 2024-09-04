import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import quotationReducer from "./reducers/quotationReducer";
const initialState = {};

const store = configureStore({
  reducer: {
    user: userReducer,
    quotationData: quotationReducer,
  },
  preloadedState: initialState,
});

export default store;
