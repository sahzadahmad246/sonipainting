import { SAVE_QUOTATION_DATA } from "../constants/quotationConstants";

const initialState = {
  data: JSON.parse(sessionStorage.getItem("quotationData")) || {},
};

const quotationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_QUOTATION_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default quotationReducer;
