import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';

const StarRating = ({ rating, onRatingChange, size = "medium", readonly = false }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  // Create full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <StarIcon
        key={`full-${i}`}
        sx={{ 
          color: '#FFD700', 
          fontSize: size === "small" ? 16 : size === "large" ? 24 : 20,
          cursor: readonly ? 'default' : 'pointer'
        }}
        onClick={() => !readonly && onRatingChange && onRatingChange(i + 1)}
      />
    );
  }

  // Add half star if needed
  if (hasHalfStar) {
    stars.push(
      <StarHalfIcon
        key="half"
        sx={{ 
          color: '#FFD700', 
          fontSize: size === "small" ? 16 : size === "large" ? 24 : 20,
          cursor: readonly ? 'default' : 'pointer'
        }}
        onClick={() => !readonly && onRatingChange && onRatingChange(fullStars + 0.5)}
      />
    );
  }

  // Add empty stars
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <StarBorderIcon
        key={`empty-${i}`}
        sx={{ 
          color: '#FFD700', 
          fontSize: size === "small" ? 16 : size === "large" ? 24 : 20,
          cursor: readonly ? 'default' : 'pointer'
        }}
        onClick={() => !readonly && onRatingChange && onRatingChange(fullStars + (hasHalfStar ? 1 : 0) + i + 1)}
      />
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {stars}
    </div>
  );
};

export default StarRating; 