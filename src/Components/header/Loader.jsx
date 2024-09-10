import React from "react";
import "../header/Loader.css";
import { CircularProgress } from "@mui/material";
const Loader = () => {
  return (
    <div className="loader-main">
      <CircularProgress />
    </div>
  );
};

export default Loader;
