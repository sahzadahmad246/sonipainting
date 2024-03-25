import React, { useEffect, useState } from "react";
import "../../CSS/home/DisplayReviews.css";
import { FaRegUserCircle, FaStar } from "react-icons/fa";

const DisplayReviews = () => {
  const [averageRating, setAverageRating] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [numberOfReviews, setNumberOfReviews] = useState(0);
  const [ratingsCount, setRatingsCount] = useState({});
  const [error, setError] = useState(null);

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
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
      });
  }, []);

  const [hover, setHover] = useState(null);

  return (
    <div className="display-reviews-main">
      <div className="average-rating">
        <div className="average-rating-left average-rating-box">
          <div className="d-flex  m-0 align-items-center">
            <h3 className="p-0 m-0">{averageRating}</h3>
            <FaStar className="fa-solid fa-star ps-1" size={25} />
          </div>
          <p className="fs-5  text-secondary">{numberOfReviews} ratings</p>
        </div>
        <div className="average-rating-right average-rating-box">
          <ul>
            {[5, 4, 3, 2, 1].map((rating, index) => (
              <li key={index} className="rating-list">
                <div className="rating-stars">
                  <span>{rating}</span>
                </div>
                <div
                  className="rating-bar"
                  style={{
                    height: `${
                      ((ratingsCount[rating] || 0) / numberOfReviews) * 100
                    }%`,
                  }}
                ></div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="all-reviews">
        {reviews.map((review, index) => (
          <li key={index}>
            <div className="name-icon">
              <FaRegUserCircle size={25} />{" "}
              <p className="ps-2">{review.name}</p>
            </div>
            <div className=" d-flex position-relative">
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
                {/* Display review */}
                <p className="fs-6 text-secondary ">{review.review}</p>
              </div>
            </div>

            {/* Display replies */}
            <div className="replies mt-2">
              {review.replies && review.replies.length > 0 && (
                <div className="name-icon">
                  <FaRegUserCircle size={25} />{" "}
                  <p className="ps-2">Soni Painting</p>
                </div>
              )}

              {review.replies &&
                review.replies.map((reply, replyIndex) => (
                  <div key={replyIndex} className="reply">
                    <p className="text-secondary">{reply.text}</p>
                    <p className="text-secondary" >{reply.date}</p>
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
