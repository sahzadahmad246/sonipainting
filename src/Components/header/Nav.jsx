import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { loadUser, logoutUser } from "../../actions/userAction";
import "../../CSS/header/Nav.css";
import "../../CSS/home/Admin.css";
import { MdLogout } from "react-icons/md";
import logo from "../../images/logo.png";
import {
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Avatar,
} from "@mui/material";

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  // Load user data
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  // Open menu when avatar or user name is clicked
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the dropdown menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Open the logout confirmation dialog
  const handleLogoutDialogOpen = () => {
    setLogoutDialogOpen(true);
    handleMenuClose();
  };

  // Close the logout confirmation dialog
  const handleLogoutDialogClose = () => {
    setLogoutDialogOpen(false);
  };

  // Handle logout and navigate to login page
  const handleLogout = () => {
    dispatch(logoutUser());
    handleLogoutDialogClose();
    navigate("/login");
    dispatch(loadUser());
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand font-weight-bold logo" to="/">
          <img src={logo} alt="logo" /> Soni Painting
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <form className="d-flex" role="search">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/services">
                  Services
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/gallery">
                  Gallery
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
              {user?.user?.isAdmin === true ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>
              ) : null}

              {isAuthenticated ? (
                <li className="nav-item">
                  <IconButton onClick={handleAvatarClick}>
                    <Avatar alt={user?.user?.name} />
                  </IconButton>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </form>
          <div>
            <NavLink to="/call-back" className="get-quote-btn">
              Get a callback
            </NavLink>
          </div>
        </div>
      </div>

      {/* MUI Menu for user details and logout */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {/* Show user phone number */}

        <MenuItem onClick={handleMenuClose}>
          {user?.user?.name ? (
            <span>{user.user.name}</span>
          ) : (
            <span>No Phone Number</span>
          )}
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          {user?.user?.phoneNumber ? (
            <span>{user.user.phoneNumber}</span>
          ) : (
            <span>No Phone Number</span>
          )}
        </MenuItem>
        {/* Logout option */}
        <MenuItem onClick={handleLogoutDialogOpen}>
          <MdLogout /> Logout
        </MenuItem>
      </Menu>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutDialogClose}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </nav>
  );
}

export default Nav;
