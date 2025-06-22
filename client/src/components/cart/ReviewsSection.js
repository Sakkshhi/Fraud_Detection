import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, Button, Divider, Chip } from '@mui/material';
import StarRating from './StarRating';
import ReviewForm from './ReviewForm';
import GppGoodIcon from '@mui/icons-material/GppGood';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';

const ReviewsSection = ({ reviews: initialReviews = [], realReviews = [], onAddReview }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isRealView, setIsRealView] = useState(false);
  const [displayedReviews, setDisplayedReviews] = useState(initialReviews);

  useEffect(() => {
    setDisplayedReviews(isRealView ? realReviews : initialReviews);
  }, [isRealView, initialReviews, realReviews]);

  const averageRating = displayedReviews.length > 0 
    ? displayedReviews.reduce((sum, review) => sum + review.rating, 0) / displayedReviews.length 
    : 0;

  const handleSubmitReview = (review) => {
    onAddReview(review, isRealView); // Pass view state to parent
    setShowReviewForm(false);
  };

  const toggleReviewView = () => {
    setIsRealView(!isRealView);
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Customer Reviews
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <StarRating rating={averageRating} readonly size="medium" />
            <Typography variant="body2" color="text.secondary">
              {averageRating.toFixed(1)} out of 5 ({displayedReviews.length} reviews)
            </Typography>
            {isRealView && (
              <Chip icon={<GppGoodIcon />} label="Authenticity Analysis Complete" color="success" size="small" />
            )}
          </Box>
        </Box>
        <Box sx={{display: 'flex', gap: 2}}>
          <Button 
            variant="contained" 
            onClick={toggleReviewView}
            startIcon={isRealView ? <GppMaybeIcon /> : <GppGoodIcon />}
            color={isRealView ? 'secondary' : 'primary'}
          >
            {isRealView ? 'Show All Reviews' : 'Detect Fake Reviews'}
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => setShowReviewForm(!showReviewForm)}
          >
            {showReviewForm ? 'Cancel' : 'Write a Review'}
          </Button>
        </Box>
      </Box>

      {showReviewForm && (
        <ReviewForm 
          onSubmit={handleSubmitReview}
          onCancel={() => setShowReviewForm(false)}
        />
      )}

      {displayedReviews.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
          No reviews available for this view.
        </Typography>
      ) : (
        <Box>
          {displayedReviews.map((review, index) => (
            <Box key={index}>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {review.user}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(review.date).toLocaleDateString()}
                  </Typography>
                </Box>
                <StarRating rating={review.rating} readonly size="small" />
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {review.comment}
                </Typography>
              </Box>
              {index < displayedReviews.length - 1 && <Divider sx={{ my: 2 }} />}
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default ReviewsSection; 