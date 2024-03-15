import React, { useState } from "react";
import { GrGallery } from "react-icons/gr";
import "../../CSS/home/AddPhotos.css";
import axios from "axios";
import UploadedPhotos from "./UploadedPhotos";

const AddPhotos = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleGalleryIconClick = () => {
    const fileInput = document.getElementById("file-input");
    fileInput.click();
  };

  // Function to truncate file name
  const truncateFileName = (name, maxLength) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + "...";
    }
    return name;
  };

  const handleUpload = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data.message); // Log success message
      // Clear selected files after successful upload
      setSelectedFiles([]);
    } catch (error) {
      console.error("Error uploading images:", error);
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
          <button onClick={handleUpload} className="upload-btn bg-danger">Upload Files</button>
          <div className="preview-container">
            {selectedFiles.map((file, index) => (
              <div key={index} className="preview">
                <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} />
                {/* <span>{truncateFileName(file.name, 10)}</span> */}
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
