import React from "react";
import { Link, NavLink } from "react-router-dom"; // If you're using React Router for navigation
import "../../CSS/header/Nav.css";
function Nav() {
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
              
            </ul>
          </form>
          <div >
            <NavLink  to='/call-back' className="get-quote-btn">Get a callback</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
