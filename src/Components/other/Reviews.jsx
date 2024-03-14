import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "../../CSS/home/Reviews.css";
import DisplayReviews from "./DisplayReviews";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

const Reviews = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmitReview = async () => {
    try {
      setSubmitting(true);
      const response = await fetch("http://localhost:5000/save-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          rating,
          review,
        }),
      });
      const data = await response.json();
      setSubmitted(true);
      toast.success(data.message);
      setName(""); // Clearing the name input
      setRating(null);
      setReview("");
      setPhone("");
    } catch (error) {
      console.error("Error saving review:", error);
      // Optionally, handle errors or show an error message to the user
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="review-main">
      <div className="review-box review-left">
        <h3>Your opinion matters to us!</h3>
        <div className="star-box">
          <p> How was the quality of our work?</p>
          <div className="stars">
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;
              return (
                <label key={index}>
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
          <div className="review-name-phone">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={handleNameChange}
              required
            />
            <input
              type="tel"
              placeholder="Your Phone Number"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
          </div>

          <textarea
            placeholder="Write your review here..."
            value={review}
            onChange={handleReviewChange}
            required
          ></textarea>
        </div>
        <button
          className="submit-review bg-danger"
          onClick={handleSubmitReview}
          disabled={submitting}
        >
          {submitting ? (
            <ThreeDots
              visible={true}
              height="25"
              width="25"
              color="#fff"
              radius="50"
              ariaLabel="three-dots-loading"
             
            />
          ) : (
            "Submit"
          )}
        </button>

      </div>
      <div className="review-box review-right">
        <DisplayReviews />
      </div>
    </div>
  );
};

export default Reviews;
