import React, { useState, useEffect } from "react";
import { GrGallery } from "react-icons/gr";
import "../../CSS/home/AddPhotos.css";
import { toast } from "react-toastify";
import { CircularProgress, TextField, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { uploadImages } from "../../actions/imageAction";
import UploadedPhotos from "./UploadedPhotos";

const AddPhotos = () => {
  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [descriptions, setDescriptions] = useState([]); // Descriptions for images
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState([]); // Error state for description validation

  const {
    loading: imageLoading,
    success,
    error,
  } = useSelector((state) => state.imageUpload);

  // Reset form after successful upload
  useEffect(() => {
    if (success) {
      toast.success("Photos uploaded successfully");
      setSelectedFiles([]);
      setDescriptions([]);
      setErrors([]); // Clear error state
    }
  }, [success]);

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    setDescriptions(Array(files.length).fill(""));
    setErrors(Array(files.length).fill(false)); // Reset error state for descriptions
  };

  // Handle description input change
  const handleDescriptionChange = (index, e) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = e.target.value;
    setDescriptions(newDescriptions);

    const newErrors = [...errors];
    newErrors[index] = e.target.value.trim() === ""; // Set error if description is empty
    setErrors(newErrors);
  };

  // Open file input dialog
  const handleGalleryIconClick = () => {
    const fileInput = document.getElementById("file-input");
    fileInput.click();
  };

  // Upload images along with descriptions
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select images to upload");
      return;
    }

    // Validate descriptions
    const newErrors = descriptions?.map((desc) => desc.trim() === "");
    setErrors(newErrors);

    if (newErrors.includes(true)) {
      toast.error("All images must have a description.");
      return;
    }

    const formData = new FormData();

    // Add each image file to FormData
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    // Add descriptions to FormData
    descriptions.forEach((desc) => {
      formData.append("descriptions[]", desc);
    });

    try {
      setUploading(true);

      // Dispatch the uploadImages action
      dispatch(uploadImages(formData));
    } catch (error) {
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

          <div className="preview-container">
            {selectedFiles?.map((file, index) => (
              <div key={index} className="preview">
                <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} />
                <TextField
                  label={"description"}
                  variant="outlined"
                  fullWidth
                  value={descriptions[index]}
                  onChange={(e) => handleDescriptionChange(index, e)}
                  error={errors[index]}
                  helperText={errors[index] ? "Description is required" : ""}
                  sx={{ marginTop: 2 }}
                />
                {error && (
                  <Typography color="error" variant="body2">
                    {error}
                  </Typography>
                )}
              </div>
            ))}
          </div>

          <button onClick={handleUpload} className="upload-btn bg-danger">
            {uploading || imageLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Upload Files"
            )}
          </button>
        </div>
      </div>

      <UploadedPhotos />
    </>
  );
};

export default AddPhotos;
