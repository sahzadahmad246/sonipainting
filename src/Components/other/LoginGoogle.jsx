import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { FaGoogle } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { IoMdArrowBack } from "react-icons/io";
import "./LoginGoogle.css";

const LoginGoogle = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle the back button click
  const handleBackClick = () => {
    navigate(-1); // Takes one step back in the browser history
  };

  // Function to handle Google login
  const handleGoogleLogin = () => {
   
    window.location.href = "http://localhost:5000/auth/google"; 
  };

  return (
    <div className="login-google-main">
      <div className="login-google">
        <div className="login-back">
          <span onClick={handleBackClick} style={{ cursor: "pointer" }}>
            <IoMdArrowBack />
          </span>

          <span>Login</span>
          <span></span>
        </div>

        <button onClick={handleGoogleLogin} style={{ cursor: "pointer" }}>
          <FaGoogle size={25} />
          <span className="px-4">Continue with Google</span>
        </button>

        <div className="login-info">
          <CiCircleInfo />
          <span className="px-1">
            For security purposes, we're offering only Google login
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginGoogle;
