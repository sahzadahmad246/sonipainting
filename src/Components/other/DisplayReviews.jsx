import React, { useEffect, useState } from "react";
import "../../CSS/home/DisplayReviews.css";
import { FaRegUserCircle, FaStar } from "react-icons/fa";
import { CircularProgress } from "@mui/material";

const DisplayReviews = ({ limit }) => {
  const [averageRating, setAverageRating] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [numberOfReviews, setNumberOfReviews] = useState(0);
  const [ratingsCount, setRatingsCount] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("https://sonipainting-backend.onrender.com/reviews"),
      fetch("https://sonipainting-backend.onrender.com/average-rating"),
      fetch("https://sonipainting-backend.onrender.com/ratings-count"),
    ])
      .then(([reviewsResponse, averageRatingResponse, ratingsCountResponse]) =>
        Promise.all([
          reviewsResponse.json(),
          averageRatingResponse.json(),
          ratingsCountResponse.json(),
        ])
      )
      .then(([reviewsData, averageRatingData, ratingsCountData]) => {
        setReviews(reviewsData.reviews);
        setNumberOfReviews(reviewsData.numberOfReviews);
        setAverageRating(averageRatingData.averageRating);
        setRatingsCount(ratingsCountData.ratingsMap);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  // Limit reviews based on the limit prop
  const displayedReviews = limit ? reviews.slice(0, limit) : reviews;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="display-reviews-main">
      <div className="average-rating">
        <div className="average-rating-left average-rating-box">
          <div className="d-flex m-0 align-items-center">
            <h3 className="p-0 m-0">{averageRating}</h3>
            <FaStar className="fa-solid fa-star ps-1" size={25} />
          </div>
          <p className="fs-5 text-secondary">{numberOfReviews} ratings</p>
        </div>
        <div className="average-rating-right average-rating-box">
          <ul>
            {[5, 4, 3, 2, 1].map((rating, index) => (
              <li key={index} className="rating-list">
                <div className="rating-stars">
                  <span>{rating}</span>
                </div>
                <div className="rating-bar">
                  <div
                    className="rating-bar-fill"
                    style={{
                      width: `${((ratingsCount[rating] || 0) / numberOfReviews) * 100}%`,
                    }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="all-reviews">
        {displayedReviews.map((review, index) => (
          <li key={index}>
            <div className="name-icon">
              <FaRegUserCircle size={25} />{" "}
              <p className="ps-2">{review.name}</p>
            </div>
            <div className="d-flex position-relative">
              {review.replies && review.replies.length > 0 && (
                <div
                  className="replies-line bg-secondary"
                  style={{ height: `${review.rating * 20}%` }}
                ></div>
              )}
              <div className="rating-review">
                <div className="star-rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="star"
                      size={15}
                      color={i < review.rating ? "#fdc107" : "#e4e5e9"}
                    />
                  ))}
                </div>

                <p className="fs-6 text-secondary ">{review.review}</p>
              </div>
            </div>

            <div className="replies mt-2">
              {review.replies && review.replies.length > 0 && (
                <div className="name-icon ">
                  <FaRegUserCircle size={25} />{" "}
                  <p className="ps-2">Soni Painting</p>
                </div>
              )}

              {review.replies &&
                review.replies.map((reply, replyIndex) => (
                  <div key={replyIndex} className="reply">
                    <p className="text-secondary">{reply.text}</p>
                    <p className="text-secondary fs-6">{formatDate(reply.date)}</p>
                  </div>
                ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayReviews;
