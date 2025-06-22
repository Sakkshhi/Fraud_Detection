import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Paper } from '@mui/material';
import StarRating from './StarRating';

const ReviewForm = ({ onSubmit, onCancel }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    if (!comment.trim()) {
      alert('Please write a review comment');
      return;
    }
    if (!userName.trim()) {
      alert('Please enter your name');
      return;
    }

    const review = {
      user: userName,
      rating: rating,
      comment: comment,
      date: new Date().toISOString().split('T')[0]
    };

    onSubmit(review);
    setRating(0);
    setComment('');
    setUserName('');
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Write a Review
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Your Rating:
          </Typography>
          <StarRating 
            rating={rating} 
            onRatingChange={setRating}
            size="large"
          />
        </Box>
        
        <TextField
          fullWidth
          label="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          margin="normal"
          required
        />
        
        <TextField
          fullWidth
          label="Your Review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          margin="normal"
          multiline
          rows={4}
          required
          placeholder="Share your experience with this product..."
        />
        
        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={rating === 0 || !comment.trim() || !userName.trim()}
          >
            Submit Review
          </Button>
          <Button 
            variant="outlined" 
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ReviewForm; 