import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import "../../CSS/home/AddPhotos.css";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { getAllImages, deleteImage } from "../../actions/imageAction";

const UploadedPhotos = () => {
  const dispatch = useDispatch();
  const { loading, images, error } = useSelector((state) => state.getAllImages);

  useEffect(() => {
    dispatch(getAllImages());
  }, [dispatch]);

  const handleDelete = (imageId) => {
    // Dispatch delete action with the specific imageId
    dispatch(deleteImage(imageId));
  };

  return (
    <div className="image-container">
      {loading ? (
        <div className="loader">
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
        images.map((imageEntry) => (
          <div key={imageEntry._id} className="image-box">
            {imageEntry.images.map((image, index) => (
              <div key={index} className="indivisual-image">
                <img
                  src={image.url} 
                  className=""
                  alt={`Image ${index}`}
                />
                <button
                  className="bg-danger"
                  onClick={() => handleDelete(image.public_id)} // Use public_id for deletion
                >
                  Delete
                  <i className="ps-2 fa-solid fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
        ))
      )}
      {/* Uncomment for delete confirmation popup if needed
      {showDeleteConfirmation && (
        <div className="confirmation-popup">
          <AiOutlineDelete size={35} className="ps-1 my-2 border-circle" />
          <p>Are you sure you want to delete this image?</p>
          <div className="confirmation-popup-button">
            <button
              onClick={cancelDelete}
              className="me-4 border border-danger text-danger"
            >
              No
            </button>
            <button onClick={confirmDelete} className="bg-danger text-white">
              Yes
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default UploadedPhotos;
