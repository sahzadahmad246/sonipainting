import React, { useState, useEffect } from "react";
import { FaRegUserCircle, FaStar } from "react-icons/fa";

const ReviewsInAdmin = ({ onReply }) => {
  const [reviews, setReviews] = useState([]);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://sonipainting-backend.onrender.com/reviews");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const reviewsData = await response.json();
        setReviews(reviewsData.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleReplySubmit = async (reviewId) => {
    console.log("hello")
  };
  

  return (
    <div>
      {reviews.map((review) => (
        <div key={review._id} className="reply-to-review">
          <div className="name-icon">
            <FaRegUserCircle size={25} /> <p className="ps-2">{review.name}</p>
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
          <input
            type="text"
            placeholder="Reply to this review"
            value={replyText}
            onChange={handleReplyChange}
          />
          <button onClick={() => handleReplySubmit(review._id)}>Reply</button>
        </div>
      ))}
    </div>
  );
};

export default ReviewsInAdmin;
