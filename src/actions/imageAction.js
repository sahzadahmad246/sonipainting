import axios from "axios";
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

// Upload Images
export const uploadImages = (formData) => async (dispatch) => {
  try {
    dispatch({ type: IMAGE_UPLOAD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true, // For handling cross-origin cookies
    };

    const { data } = await axios.post("http://localhost:5000/api/v1/upload", formData, config);

    dispatch({ type: IMAGE_UPLOAD_SUCCESS, payload: data.newImageEntry });
  } catch (error) {
    dispatch({
      type: IMAGE_UPLOAD_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Update Image
export const updateImage = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: IMAGE_UPDATE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(`http://localhost:5000/api/v1/image/${id}`, formData, config);

    dispatch({ type: IMAGE_UPDATE_SUCCESS, payload: data.imageEntry });
  } catch (error) {
    dispatch({
      type: IMAGE_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Get All Images
export const getAllImages = () => async (dispatch) => {
  try {
    dispatch({ type: IMAGE_GET_ALL_REQUEST });

    const { data } = await axios.get("http://localhost:5000/api/v1/images", { withCredentials: true });

    dispatch({ type: IMAGE_GET_ALL_SUCCESS, payload: data.images });
  } catch (error) {
    dispatch({
      type: IMAGE_GET_ALL_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Get Image by ID
export const getImageById = (id) => async (dispatch) => {
  try {
    dispatch({ type: IMAGE_GET_BY_ID_REQUEST });

    const { data } = await axios.get(`http://localhost:5000/api/v1/image/${id}`, { withCredentials: true });

    dispatch({ type: IMAGE_GET_BY_ID_SUCCESS, payload: data.image });
  } catch (error) {
    dispatch({
      type: IMAGE_GET_BY_ID_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Delete Image
export const deleteImage = (id) => async (dispatch) => {
  try {
    dispatch({ type: IMAGE_DELETE_REQUEST });

    await axios.delete(`http://localhost:5000/api/v1/image/${id}`, { withCredentials: true });

    dispatch({ type: IMAGE_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: IMAGE_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
