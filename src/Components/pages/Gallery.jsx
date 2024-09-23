import React, { useEffect, useState } from "react";
import ImagePreview from "../other/ImagePreview";
import "../../CSS/home/Gallery.css";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { getAllImages } from "../../actions/imageAction";

const Gallery = ({ displayCount }) => {
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(null);

  const { loading, images, error } = useSelector((state) => state.getAllImages);

  useEffect(() => {
    dispatch(getAllImages());
  }, [dispatch]);

  console.log(images); // Check the structure of images

  // Handle image click to preview
  const handleImageClick = (image) => {
    console.log("Clicked Image Object:", image); // Log the entire image object
    setPreviewImage(image); // Store the entire image object
  };

  const handleClosePreview = () => {
    setPreviewImage(null);
  };

  return (
    <div className="gallery-div">
      <div className="gallery-title">
        <h1>
          Discover Our Painting <span>Portfolio</span>
        </h1>
      </div>
      <div className="gallery-main">
        {loading ? (
          <div className="loader">
            <ThreeDots
              color="red"
              height={100}
              width={100}
              visible={true}
              className="loader"
            />
          </div>
        ) : (
          images.map((imageEntry) =>
            imageEntry.images.slice(0, displayCount).map((image, index) => (
              <div className="gallery-image" key={index}>
                <img
                  src={image.url}
                  alt={`Image ${index}`}
                  onClick={() => handleImageClick(image)} // Pass the entire image object
                />
                {/* Render the description below the image */}
                {image.description && <p>{image.description}</p>}
              </div>
            ))
          )
        )}
      </div>

      {/* Image preview component */}
      {previewImage && (
        <ImagePreview
          image={previewImage} // Access url from the image object
          // description={previewImage.description || "No description available"} // Access description from the image object
          onClose={handleClosePreview}
        />
      )}
    </div>
  );
};

export default Gallery;
