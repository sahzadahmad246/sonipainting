import {
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAIL,
  IMAGE_UPDATE_REQUEST,
  IMAGE_UPDATE_SUCCESS,
  IMAGE_UPDATE_FAIL,
  IMAGE_DELETE_REQUEST,
  IMAGE_DELETE_SUCCESS,
  IMAGE_DELETE_FAIL,
  IMAGE_GET_ALL_REQUEST,
  IMAGE_GET_ALL_SUCCESS,
  IMAGE_GET_ALL_FAIL,
  IMAGE_GET_BY_ID_REQUEST,
  IMAGE_GET_BY_ID_SUCCESS,
  IMAGE_GET_BY_ID_FAIL,
} from "../constants/imageConstant";

// Image Upload Reducer
export const imageUploadReducer = (state = { images: [] }, action) => {
  switch (action.type) {
    case IMAGE_UPLOAD_REQUEST:
      return { loading: true };
    case IMAGE_UPLOAD_SUCCESS:
      return { loading: false, success: true, images: action.payload };
    case IMAGE_UPLOAD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Image Update Reducer
export const imageUpdateReducer = (state = { image: {} }, action) => {
  switch (action.type) {
    case IMAGE_UPDATE_REQUEST:
      return { loading: true };
    case IMAGE_UPDATE_SUCCESS:
      return { loading: false, success: true, image: action.payload };
    case IMAGE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get All Images Reducer
export const getAllImagesReducer = (state = { images: [] }, action) => {
  switch (action.type) {
    case IMAGE_GET_ALL_REQUEST:
      return { loading: true, images: [] };
    case IMAGE_GET_ALL_SUCCESS:
      return { loading: false, images: action.payload };
    case IMAGE_GET_ALL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get Image by ID Reducer
export const getImageByIdReducer = (state = { image: {} }, action) => {
  switch (action.type) {
    case IMAGE_GET_BY_ID_REQUEST:
      return { loading: true, ...state };
    case IMAGE_GET_BY_ID_SUCCESS:
      return { loading: false, image: action.payload };
    case IMAGE_GET_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Delete Image Reducer
export const deleteImageReducer = (state = {}, action) => {
  switch (action.type) {
    case IMAGE_DELETE_REQUEST:
      return { loading: true };
    case IMAGE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case IMAGE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
