import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, NavLink } from "react-router-dom"; // If you're using React Router for navigation
import "../../CSS/header/Nav.css";
import "../../CSS/home/Admin.css";
import { MdLogout } from "react-icons/md";
import { clearToken } from "../../store/authSlice";
function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedin(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      dispatch(clearToken());
      navigate("/");
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
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand font-weight-bold" to="#">
          Soni Painting
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <form class="d-flex" role="search">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <NavLink class="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink class="nav-link" to="/services">
                  Services
                </NavLink>
              </li>

              <li class="nav-item">
                <NavLink class="nav-link" to="/gallery">
                  Gallery
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink class="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                {isLoggedin ? (
                  <NavLink className="nav-item" to="/admin" onClick={confirmLogout}>
                  Admin dashboard 
                  </NavLink>
                ) : (
                  <NavLink className="nav-item" to="/admin/login">
                    Login as admin
                  </NavLink>
                )}
              </li>
            </ul>
          </form>
          <div>
            <NavLink to="/call-back" className="get-quote-btn">
              Get a callback
            </NavLink>
          </div>
        </div>
        {showLogoutConfirmation && (
          <div className="confirmation-popup">
            <MdLogout size={30} className="ps-1 my-2  border-circle" />

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
      </div>
    </nav>
  );
}

export default Nav;
