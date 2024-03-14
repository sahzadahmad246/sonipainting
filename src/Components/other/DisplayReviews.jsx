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
      fetch("http://localhost:5000/reviews"),
      fetch("http://localhost:5000/average-rating"),
      fetch("http://localhost:5000/ratings-count"),
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
                <div className="rating-bar">
                  <div
                    className="rating-bar-fill"
                    style={{
                      width: `${
                        ((ratingsCount[rating] || 0) / numberOfReviews) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="all-reviews">
        {reviews.map((review, index) => (
          <li key={index}>
            <div className="name-icon">
              <FaRegUserCircle size={25} /> <p className="ps-2">{review.name}</p>
            </div>
            {/* <p>Rating: {review.rating}</p> */}
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
            <p className="fs-6 text-secondary">{review.review}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayReviews;
