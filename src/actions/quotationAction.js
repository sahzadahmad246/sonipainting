import { SAVE_QUOTATION_DATA } from "../constants/quotationConstants";

// Action creator to save quotation data
export const saveQuotationData = (data) => {
  return (dispatch) => {
    // Save data to session storage
    sessionStorage.setItem("quotationData", JSON.stringify(data));

    // Dispatch the action
    dispatch({
      type: SAVE_QUOTATION_DATA,
      payload: data,
    });
  };
};
