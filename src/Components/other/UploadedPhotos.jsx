import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import "../../CSS/home/AddPhotos.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllImages, deleteImage } from "../../actions/imageAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";

const UploadedPhotos = () => {
  const dispatch = useDispatch();
  const { loading, images, error } = useSelector((state) => state.getAllImages);
  const { success, error: deleteError } = useSelector(
    (state) => state.deleteImage
  );
  const [open, setOpen] = useState(false);
  const [currentImageId, setCurrentImageId] = useState(null);
  console.log(success);
  useEffect(() => {
    dispatch(getAllImages());
    if (success) {
      toast.success("Image deleted successfully");
    }
    if (deleteError) {
      toast.error("failed to delete image");
    }
  }, [dispatch]);

  // Use _id for deletion
  const handleDeleteClick = (imageId) => {
    setCurrentImageId(imageId);
    setOpen(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteImage(currentImageId)); // Use _id for deletion
    console.log(currentImageId);
    setOpen(false);
    setCurrentImageId(null);
    dispatch(getAllImages());
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentImageId(null);
  };

  return (
    <div className="image-container">
      {loading ? (
        <div className="loader-container">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#FF0000"
            radius="9"
            ariaLabel="three-dots-loading"
          />
        </div>
      ) : (
        images?.map((imageEntry) => (
          <div key={imageEntry._id} className="image-box">
            {imageEntry.images.map((image, index) => (
              <div key={index} className="individual-image">
                <img src={image.url} className="" alt={`Image ${index}`} />
                <button
                  className="delete-image-button"
                  onClick={() => handleDeleteClick(imageEntry._id)} // Pass _id instead of public_id
                >
                  Delete
                  <i className="ps-2 fa-solid fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
        ))
      )}
      {/* Confirmation dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this image?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UploadedPhotos;
