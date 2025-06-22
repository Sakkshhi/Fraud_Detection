import React, { useState } from 'react';
import { Paper, Typography, Box, Chip, Button, Modal, Divider, IconButton, Popover } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GppBadIcon from '@mui/icons-material/GppBad';
import StarRating from './StarRating';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// Modal styles - included here due to file creation issues
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 500,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 3,
};

const SellerDetails = ({ seller, product, compact = false, modalOnly = false, modalOpen, handleCloseModal, showAuthButton = true, showTrustScore = true }) => {
  const [internalModalOpen, setInternalModalOpen] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState(null);

  if (!seller) return null;

  const handlePopoverOpen = (event) => setPopoverAnchor(event.currentTarget);
  const handlePopoverClose = () => setPopoverAnchor(null);
  const isPopoverOpen = Boolean(popoverAnchor);

  const isModalOpen = modalOnly ? modalOpen : internalModalOpen;
  const closeModal = modalOnly ? handleCloseModal : () => setInternalModalOpen(false);
  const openModal = () => setInternalModalOpen(true);

  const verificationDate = new Date().toLocaleString();

  const renderModal = () => (
    <Modal open={isModalOpen} onClose={closeModal}>
      <Box sx={modalStyle}>
        <IconButton onClick={closeModal} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" component="h2">Authenticity Check</Typography>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <img src={product.image} alt={product.name} style={{ width: 80, height: 80, objectFit: 'contain', borderRadius: '8px' }} />
          <Box>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="body2" color="text.secondary">Sold by: {seller.name}</Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
          {seller.authentic ? <VerifiedUserIcon sx={{ fontSize: 60, color: 'success.main' }} /> : <GppBadIcon sx={{ fontSize: 60, color: 'error.main' }} />}
          <Typography variant="h4" component="p" sx={{ fontWeight: 'bold', color: seller.authentic ? 'success.main' : 'error.main' }}>
            {seller.authentic ? 'Authentic' : 'Not Authentic'}
          </Typography>
        </Box>
        <Box sx={{ bgcolor: '#f8f9fa', p: 2, borderRadius: '8px', border: '1px solid #e9ecef' }}>
          <Typography><strong>Verified by:</strong> Amazon</Typography>
          <Typography><strong>Date / Time:</strong> {verificationDate}</Typography>
          <Typography><strong>Serial / Barcode:</strong> *********{product.id}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button variant="outlined">View Full Report</Button>
          <Button variant="outlined" onClick={closeModal}>Back</Button>
        </Box>
      </Box>
    </Modal>
  );

  const renderReportCard = () => (
    <Popover
      open={isPopoverOpen}
      anchorEl={popoverAnchor}
      onClose={handlePopoverClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      PaperProps={{ sx: { p: 2, mt: 1, boxShadow: 3, borderRadius: '8px', border: '1px solid #ddd' } }}
      disableRestoreFocus
    >
        <Typography variant="h6" sx={{mb: 1.5, fontWeight: 600}}>Seller Report Card</Typography>
        <Typography><strong>Trust Score:</strong> {seller.trustScore}%</Typography>
        <Typography><strong>Return Fraud %:</strong> {seller.returnFraudPercent}%</Typography>
        <Typography sx={{display: 'flex', alignItems: 'center'}}>
            <strong>Negative Review Trend:</strong> {seller.negativeReviewTrend}% 
            {seller.negativeReviewTrend > 10 ? <TrendingUpIcon color="error" sx={{ml: 0.5}}/> : <TrendingDownIcon color="success" sx={{ml: 0.5}} />}
        </Typography>
        <Typography><strong>Counterfeit Risk Level:</strong> {seller.counterfeitRiskLevel}</Typography>
    </Popover>
  );

  if (modalOnly) {
    return renderModal();
  }

  if (compact) {
    return (
      <>
        <Box sx={{ p: '10px', height: '100%' }}>
          <Typography variant="h6" gutterBottom sx={{ fontSize: '16px', fontWeight: 600, mb: 1 }}>
            Seller Information
          </Typography>
          
          <Box 
            onMouseEnter={handlePopoverOpen} 
            onMouseLeave={handlePopoverClose}
            sx={{ display: 'flex', alignItems: 'center', mb: 1, cursor: 'pointer' }}
          >
            <Typography variant="h6" sx={{ mr: 1, fontSize: '15px', fontWeight: 500 }}>
              {seller.name}
            </Typography>
            {seller.certified && (
              <Chip icon={<VerifiedIcon sx={{ fontSize: 14 }} />} label="Certified" color="success" size="small" sx={{ fontSize: '11px', height: '20px', fontWeight: 500 }} />
            )}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <StarRating rating={seller.rating} readonly size="small" />
            <Typography variant="body2" sx={{ ml: 1, fontSize: '13px', fontWeight: 500, color: '#495057' }}>
              {seller.rating} ({seller.totalReviews.toLocaleString()} ratings)
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <LocationOnIcon sx={{ mr: 1, color: 'text.secondary', fontSize: '16px' }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px' }}>
              {seller.location}
            </Typography>
          </Box>

          {showTrustScore && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
               <Typography variant="body2" sx={{ fontSize: '13px', fontWeight: 500, color: '#495057' }}>
                   Trust Score:
                 </Typography>
                <Chip label={`${seller.trustScore}%`} color={seller.trustScore > 80 ? 'success' : seller.trustScore > 70 ? 'warning' : 'error'} size="small" sx={{ ml: 1, fontWeight: 'bold', fontSize: '12px' }} />
            </Box>
          )}
          
          {showAuthButton && (
            <Box sx={{ marginTop: 'auto', pt: 0.5 }}>
              <Button variant="contained" fullWidth onClick={openModal}>
                Check Authenticity
              </Button>
            </Box>
          )}
          {renderReportCard()}
        </Box>
        {renderModal()}
      </>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Seller Information
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ mr: 1 }}>
          {seller.name}
        </Typography>
        {seller.certified && (
          <Chip
            icon={<VerifiedIcon />}
            label="Certified Seller"
            color="success"
            size="small"
          />
        )}
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <StarRating rating={seller.rating} readonly size="small" />
        <Typography variant="body2" sx={{ ml: 1 }}>
          {seller.rating} ({seller.totalReviews.toLocaleString()} reviews)
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
        <Typography variant="body2" color="text.secondary">
          {seller.location}
        </Typography>
      </Box>
    </Paper>
  );
};

export default SellerDetails; 