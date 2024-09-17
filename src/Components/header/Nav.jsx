import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import "../../CSS/header/Nav.css";
import "../../CSS/home/Admin.css";
import { MdLogout } from "react-icons/md";
import { getUser, logout } from "../../actions/userAction";
import logo from "../../images/logo.png";
import {
  Button,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutDialogOpen = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutDialogClose = () => {
    setLogoutDialogOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    handleLogoutDialogClose();
    dispatch(getUser());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand font-weight-bold logo" to="/">
          <img src={logo} alt="logo"/> Soni Painting
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
              {/* {user && user.isAdmin === true ? ( */}
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>
              {/* ) : null} */}

              {user ? (
                <li className="nav-item">
                  <Button onClick={handleAvatarClick}>
                    {loading ? (
                      <CircularProgress size={24} />
                    ) : (
                      <Avatar src={user.avatar?.url} alt={user.name} />
                    )}
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <MenuItem disabled>
                      <Typography variant="body1" style={{ color: "black" }}>
                        {user.name}
                      </Typography>
                    </MenuItem>
                    <MenuItem disabled>
                      <Typography variant="body2" style={{ color: "black" }}>
                        {user.email}
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogoutDialogOpen}>
                      <MdLogout style={{ marginRight: 8 }} />
                      Logout
                    </MenuItem>
                  </Menu>
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
