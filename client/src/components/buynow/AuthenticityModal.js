import React from 'react';
import { Modal, Box, Typography, Button, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GppBadIcon from '@mui/icons-material/GppBad';
import './AuthenticityModal.css';

const AuthenticityModal = ({ open, onClose, product, seller }) => {
  if (!product || !seller) {
    return null;
  }

  const { authentic } = seller;
  const verificationDate = new Date().toLocaleString();

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="authenticity-check-title">
      <Box className="authenticity-modal">
        <IconButton onClick={onClose} className="close-button">
          <CloseIcon />
        </IconButton>
        <Typography id="authenticity-check-title" variant="h5" component="h2">
          Authenticity Check
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box className="product-info">
          <img src={product.image} alt={product.name} className="product-image" />
          <Box>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="body2" color="text.secondary">Ships from: Amazon</Typography>
            <Typography variant="body2" color="text.secondary">Sold by: {seller.name}</Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box className="verification-status">
          {authentic ? (
            <VerifiedUserIcon sx={{ fontSize: 60, color: 'success.main' }} />
          ) : (
            <GppBadIcon sx={{ fontSize: 60, color: 'error.main' }} />
          )}
          <Typography variant="h4" component="p" sx={{ fontWeight: 'bold', color: authentic ? 'success.main' : 'error.main' }}>
            {authentic ? 'Authentic' : 'Not Authentic'}
          </Typography>
        </Box>
        <Box className="verification-details">
          <Typography><strong>Verified by:</strong> Amazon</Typography>
          <Typography><strong>Date / Time:</strong> {verificationDate}</Typography>
          <Typography><strong>Serial / Barcode:</strong> *********{product.id}</Typography>
        </Box>
        <Box className="modal-actions">
          <Button variant="outlined">View Full Report</Button>
          <Button variant="outlined" onClick={onClose}>Back to Cart</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthenticityModal; 