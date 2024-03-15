import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../CSS/home/Login.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://sonipainting-backend.onrender.com/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 400) {
        const loginErrorData = await res.json();
        toast.error(loginErrorData.mess || loginErrorData.message);
      } else if (res.ok) {
        const resData = await res.json();
        toast.success(resData.message);
        navigate("/admin/login");
      } else if (res.status === 500) {
        toast.error("Registration failed");
      } else {
        toast.error("Unexpected error occurred");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Error during registration");
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="login-main">
      <div className="login-box">
        <div className="login-top">
          <h4 className="fs-4">Register as admin</h4>
          <i onClick={handleClose} className="fa-solid fa-x"></i>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="tel"
            placeholder="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button className="bg-danger" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
