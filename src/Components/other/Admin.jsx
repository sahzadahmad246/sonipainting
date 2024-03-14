import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import "../../CSS/home/Admin.css";
import { FaRegUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import AddPhotos from "./AddPhoto";
import { fetchUserData } from "../../store/authSlice";
import { ThreeDots } from "react-loader-spinner";
import { clearToken } from "../../store/authSlice";

const Admin = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("token");
    setIsLoggedIn(isAuthenticated);
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(fetchUserData())
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    }
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      dispatch(clearToken());
      navigate("/admin/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const confirmLogout = () => {
    setShowLogoutConfirmation(true);
  };

  const cancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  const handleLogoutConfirmed = () => {
    setShowLogoutConfirmation(false);
    handleLogout();
  };

  return (
    <>
      {isLoading ? (
        <div className="admin-loader">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#FF0000"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : isLoggedIn ? (
        <div className="admin-main">
          <div className="admin-top">
            <div className="admin-top-left">
              <FaRegUserCircle size={50} />
              <div className="admin-name-email">
                <h5>{user.data.name}</h5>
                <p>{user.data.phone}</p>
              </div>
            </div>
            <button className="bg-danger" onClick={confirmLogout}>
              Logout <MdLogout size={25} className="ps-1" />
            </button>
          </div>
          <AddPhotos />
        </div>
      ) : (
        <NavLink to="/admin/login">Login</NavLink>
      )}


      {showLogoutConfirmation && (
        <div className="confirmation-popup">
          <MdLogout
            size={30}
            className="ps-1 my-2  border-circle"
          />

          <p>Are you sure you want to logout?</p>
          <div className="confirmation-popup-button ">
            <button
              onClick={cancelLogout}
              className="me-4 border border-danger text-danger"
            >
              No
            </button>
            <button
              onClick={handleLogoutConfirmed}
              className=" bg-danger text-white"
            >
              Yes
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
