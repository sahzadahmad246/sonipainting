import React from "react";

const SliderLoader = () => {
  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "450px",
    height: "450px",
    backgroundColor: "#f0f0f0",
    borderRadius: "10px",
  };

  const loaderImageStyle = {
    width: "100%",
    height: "100%",
    background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
    backgroundSize: "200% 100%",
    animation: "loading 5s infinite",
    borderRadius: "10px",
  };

  return (
    <div style={loaderStyle}>
      <div style={loaderImageStyle}></div>
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
        `}
      </style>
    </div>
  );
};

export default SliderLoader;
