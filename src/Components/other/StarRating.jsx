const StarRating = ({ rating, onStarClick }) => {
  const stars = Array(5)
    .fill(0)
    .map((_, index) => {
      const isFilled = index < rating;
      return (
        <span key={index} onClick={() => onStarClick(index + 1)}>
          {isFilled ? "⭐" : ""}
        </span>
      );
    });

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
