import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../CSS/home/Admin.css";
import { FaRegUserCircle } from "react-icons/fa";
import AddPhotos from "./AddPhoto";
import { fetchUserData } from "../../store/authSlice";
import { ThreeDots } from "react-loader-spinner";
import MessagesComponent from "../pages/Messages";
import ReviewsInAdmin from "./ReviewsInAdmin";
import Quotation from "../../quotation/Quotation";

const Admin = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [showAddPhotos, setShowAddPhotos] = useState(true);
  const [showReviews, setShowReviews] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showQuotation, setShowQuotation] = useState(false);

  return (
    <>
      {loading ? (
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
      ) : (
        <div className="admin-main">
          <div className="admin-options">
            <button
              onClick={() => {
                setShowAddPhotos(false);
                setShowReviews(false);
                setShowMessages(false);
                setShowQuotation(true);
              }}
              className={showQuotation ? "active" : ""}
            >
              Quotation
            </button>
            <button
              onClick={() => {
                setShowAddPhotos(true);
                setShowReviews(false);
                setShowMessages(false);
                setShowQuotation(false);
              }}
              className={showAddPhotos ? "active" : ""}
            >
              Add Photos
            </button>
            <button
              onClick={() => {
                setShowAddPhotos(false);
                setShowReviews(false);
                setShowMessages(true);
                setShowQuotation(false);
              }}
              className={showMessages ? "active" : ""}
            >
              Messages
            </button>
            <button
              onClick={() => {
                setShowAddPhotos(false);
                setShowReviews(true);
                setShowMessages(false);
                setShowQuotation(false);
              }}
              className={showReviews ? "active" : ""}
            >
              Reviews
            </button>
          </div>
          {showAddPhotos ? (
            <AddPhotos />
          ) : showReviews ? (
            <ReviewsInAdmin />
          ) : showMessages ? (
            <MessagesComponent />
          ) : showQuotation ? (
            <Quotation />
          ) : null}
        </div>
      )}
    </>
  );
};

export default Admin;
