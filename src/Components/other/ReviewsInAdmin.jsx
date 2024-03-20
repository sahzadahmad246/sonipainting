import React, { useState, useEffect } from "react";
import { FaRegUserCircle, FaStar } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner"; // Import ThreeDots loader
import "../../CSS/home/ReviewsInAdmin.css";

const ReviewsInAdmin = ({ onReply }) => {
  const [reviews, setReviews] = useState([]);
  const [replyTexts, setReplyTexts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "https://sonipainting-backend.onrender.com/reviews"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const reviewsData = await response.json();
        const initialReplyTexts = {};
        reviewsData.reviews.forEach((review) => {
          initialReplyTexts[review._id] = ""; // Initialize reply texts for each review
        });
        setReviews(reviewsData.reviews);
        setReplyTexts(initialReplyTexts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleReplyChange = (event, reviewId) => {
    const updatedReplyTexts = { ...replyTexts, [reviewId]: event.target.value };
    setReplyTexts(updatedReplyTexts);
  };

  const handleReplySubmit = async (reviewId) => {
    try {
      const response = await fetch(
        `https://sonipainting-backend.onrender.com/add-reply/${reviewId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: replyTexts[reviewId] }), // Use the corresponding reply text for the reviewId
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add reply to review");
      }

      // Clear the reply text input after successful submission
      const updatedReplyTexts = { ...replyTexts, [reviewId]: "" };
      setReplyTexts(updatedReplyTexts);

      // Refresh reviews after replying
      const refreshedReviewsResponse = await fetch(
        "https://sonipainting-backend.onrender.com/reviews"
      );
      if (!refreshedReviewsResponse.ok) {
        throw new Error("Failed to fetch reviews after replying");
      }
      const refreshedReviewsData = await refreshedReviewsResponse.json();
      setReviews(refreshedReviewsData.reviews);

      console.log("Reply added successfully");
    } catch (error) {
      console.error("Error adding reply to review:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <ThreeDots
          color="red"
          height={100}
          width={100}
          visible={true}
          className="loader"
        />
      </div>
    );
  }

  return (
    <div className="reply-to-review-main">
      {reviews.map((review) => (
        <div key={review._id} className="reply-to-review">
          <div className="name-icon d-flex justify-content-between">
            <div className="d-flex">
              <FaRegUserCircle size={25} />{" "}
              <p className="ps-2">{review.name}</p>
            </div>
            <p>{review.phone}</p>
          </div>
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
          <div className="reply-input">
            <input
              type="text"
              placeholder="Reply to this review"
              value={replyTexts[review._id]}
              onChange={(event) => handleReplyChange(event, review._id)}
            />
            <button
              className="bg-danger"
              onClick={() => handleReplySubmit(review._id)}
            >
              Reply
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsInAdmin;
