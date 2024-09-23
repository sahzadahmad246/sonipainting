import { configureStore } from "@reduxjs/toolkit";
import { userReducer, authReducer } from "./reducers/userReducer";
import {
  imageUploadReducer,
  imageUpdateReducer,
  getAllImagesReducer,
  getImageByIdReducer,
  deleteImageReducer,
} from "./reducers/imageReducer";
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
    auth: authReducer,
    imageUpload: imageUploadReducer,
    imageUpdate: imageUpdateReducer,
    getAllImages: getAllImagesReducer,
    getImageById: getImageByIdReducer,
    deleteImage: deleteImageReducer,
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
