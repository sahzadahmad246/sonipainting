import React from "react";

const GalleryLoader = () => {
  const galleryLoaderStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    margin: "20px 35px",
  };

  const loaderImageStyle = {
    width: "250px",
    height: "250px",
    backgroundColor: "#f0f0f0",
    borderRadius: "10px",
    animation: "loading 1.5s infinite",
  };

  const loaderTextStyle = {
    width: "80%",
    height: "15px",
    marginTop: "10px",
    backgroundColor: "#e0e0e0",
    borderRadius: "5px",
    animation: "loading 1.5s infinite",
  };

  const mobileLoaderStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    margin: "0px",
    width: "100%",
    padding: "15px 0px",
  };

  return (
    <div>
      {/* Skeleton loader for desktop */}
      <div style={galleryLoaderStyle} className="gallery-loader-desktop">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="gallery-skeleton">
            <div style={loaderImageStyle}></div>
            <div style={loaderTextStyle}></div>
          </div>
        ))}
      </div>

      {/* Skeleton loader for mobile */}
      <div style={mobileLoaderStyle} className="gallery-loader-mobile">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="gallery-skeleton">
            <div
              style={{ ...loaderImageStyle, width: "175px", height: "175px" }}
            ></div>
            <div style={{ ...loaderTextStyle, width: "70%" }}></div>
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes loading {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }
          .gallery-skeleton {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          @media only screen and (max-width: 767px) {
            .gallery-loader-desktop {
              display: none;
            }
          }
          @media only screen and (min-width: 768px) {
            .gallery-loader-mobile {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
};

export default GalleryLoader;
