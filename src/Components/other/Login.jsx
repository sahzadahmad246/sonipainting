import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../CSS/home/Login.css";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/authSlice";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to manage loading

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when login process starts

    try {
      const response = await fetch("https://sonipainting-backend.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        console.log(data.message);
        console.log(token);
        dispatch(setToken(token));
        toast.success(data.message);
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Set loading to false when login process finishes
    }
  };

  const hanldeClose = () => {
    navigate("/");
  };

  return (
    <div className="login-main">
      <div className="login-box">
        <div className="login-top">
          <h4 className="fs-4">Login as admin</h4>
          <i onClick={hanldeClose} className="fa-solid fa-x"></i>
        </div>
        <form>
          <input
            type="tel"
            placeholder="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Conditional rendering of react-loader-spinner */}
          <button
            className="bg-danger position-relative"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading && (
              <div className="login-loader">
                <ThreeDots
                  visible={true}
                  height="25"
                  width="25"
                  color="#fff"
                  radius="50"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            )}
            {!isLoading && "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
