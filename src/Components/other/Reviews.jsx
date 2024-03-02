import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "../../CSS/home/Reviews.css";
const Reviews = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState();

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  return (
    <div className="review-main">
      <div className="review-box review-left">
        <h3>Your opinion matter to us!</h3>
        <div className="star-box">
          <p> How was the quality of our work?</p>
          <div className="stars">
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;
              return (
                <label>
                  <input
                    type="radio"
                    name="rating"
                    className="rating"
                    value={currentRating}
                    onClick={() => setRating(currentRating)}
                  />
                  <FaStar
                    className="star"
                    size={30}
                    color={
                      currentRating <= (hover || rating) ? "#fdc107" : "#e4e5e9"
                    }
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
          </div>
        </div>
        <div className="review-input-box">
          <textarea
            placeholder="Write your review here..."
            value={review}
            onChange={handleReviewChange}
          ></textarea>
          <p> {review}</p>
        </div>
        <button className="submit-review bg-danger">Submit</button>
      </div>
      <div className="review-box review-right"></div>
    </div>
  );
};

export default Reviews;
