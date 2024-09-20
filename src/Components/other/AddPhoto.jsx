import React, { useEffect, useState } from "react";
import { GrGallery } from "react-icons/gr";
import "../../CSS/home/AddPhotos.css";
import axios from "axios";
import UploadedPhotos from "./UploadedPhotos";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../../actions/userAction";
const AddPhotos = () => {
  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { user, loading } = useSelector((state) => state.user);
  console.log(user);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };
  console.log(user.name)
  // useEffect(() => {
  //   // dispatch(loadUser());
  // }, [dispatch]);
  const handleGalleryIconClick = () => {
    const fileInput = document.getElementById("file-input");
    fileInput.click();
  };

  const handleUpload = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    const token = localStorage.getItem("token");

    try {
      setUploading(true);
      const response = await axios.post(
        "https://sonipainting-backend.onrender.com/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data.message);
      toast.success("Photos uploaded successfully");

      setSelectedFiles([]);
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload photos");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="add-photo-main">
        <div className="add-photo">
          <div className="select-image">
            <input
              type="file"
              accept="image/*"
              multiple
              id="file-input"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label htmlFor="file-input" className="input-box">
              <GrGallery
                className="gallery-icon"
                onClick={handleGalleryIconClick}
              />
              <span>Select Photos</span>
            </label>
          </div>
          <button onClick={handleUpload} className="upload-btn bg-danger">
            {uploading ? (
              <div className="login-loader">
                <ThreeDots height={10} width={30} color="#fff" />{" "}
              </div>
            ) : (
              "Upload Files"
            )}
          </button>
          <div className="preview-container">
            {selectedFiles.map((file, index) => (
              <div key={index} className="preview">
                <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <UploadedPhotos />
    </>
  );
};

export default AddPhotos;
