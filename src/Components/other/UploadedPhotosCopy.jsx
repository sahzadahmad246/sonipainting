import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import "../../CSS/home/AddPhotos.css";
import profile from "../../images/office.png";
import { AiOutlineDelete } from "react-icons/ai";
import image1 from "../../images/image1.jpg"
import image2 from "../../images/image2.jpg"
import image3 from "../../images/image3.jpg"
import image4 from "../../images/image4.jpg"
import image5 from "../../images/image5.jpg"
import image6 from "../../images/image6.jpg"

const UploadedPhotos = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [imageNameToDelete, setImageNameToDelete] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://sonipainting-backend.onrender.com/get-images",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setImages(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleDelete = (imageName) => {
    setImageNameToDelete(imageName);
    setShowDeleteConfirmation(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setImageNameToDelete("");
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://sonipainting-backend.onrender.com/${imageNameToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setImages(images.filter((img) => img !== imageNameToDelete));
      setShowDeleteConfirmation(false);
      setImageNameToDelete("");
    } catch (error) {
      console.error("Error deleting image:", error);
    }
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
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        images.map((imageName, index) => (
          <div className="image-box" key={index}>
            <img
              src={`https://sonipainting-backend.onrender.com/images/${imageName}`}
              alt={`Image ${index}`}
            />
            <button
              className="bg-danger"
              onClick={() => handleDelete(imageName)}
            >
              delete
              <i className="ps-2 fa-solid fa-trash"></i>
            </button>
          </div>
        ))
      )}
      {showDeleteConfirmation && (
        <div className="confirmation-popup">
          <AiOutlineDelete size={35} className="ps-1 my-2  border-circle" />
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
      )}
    </div>
  );
};

export default UploadedPhotos;
