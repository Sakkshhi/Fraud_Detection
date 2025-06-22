import React, { useState, useEffect } from "react";
import './cart.css'
import { Divider, Button, Chip } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { products } from './mocks.js'
import { productReviews } from './reviews.js'
import { realProductReviews } from './realReviews.js';
import { productSellers } from './sellers.js'
import { useCart } from '../../CartContext';
import ReviewsSection from './ReviewsSection';
import SellerDetails from './SellerDetails';

const Cart = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const product = products.find((item) => item.id===id);
    
    const [reviews, setReviews] = useState([]);
    const [realReviews, setRealReviews] = useState([]);
    const [seller, setSeller] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [revealedScores, setRevealedScores] = useState({
        trustScore: false,
        returnFraud: false,
        counterfeitRisk: false,
    });

    useEffect(() => {
        if (id) {
            setReviews(productReviews[id] || []);
            setRealReviews(realProductReviews[id] || []);
            setSeller(productSellers[id] || null);
        }
    }, [id]);

    const handleRevealScore = (score) => {
        setRevealedScores(prev => ({ ...prev, [score]: !prev[score] }));
    };

    const handleAddReview = (newReview, isReal) => {
        if (isReal) {
            setRealReviews(prev => [newReview, ...prev]);
        } else {
            setReviews(prev => [newReview, ...prev]);
        }
        alert('Review submitted successfully!');
    };
    
    // Functions for modal, now controlled by this page
    const handleOpenAuthModal = () => setModalOpen(true);
    const handleCloseAuthModal = () => setModalOpen(false);

    if (!product) return <h2 style={{ padding: "20px" }}>Product not found.</h2>;

    const { name, title, description, image, mrp, dealPrice, deliveryDate, fastestDelivery } = product;
    const savings = mrp - dealPrice;
    const discountPercent = Math.round((savings / mrp) * 100);

    return (
        <div className="cart_section">
            <div className="cart_container">
                <div className="left_cart">
                    <img src={image} alt={title} />
                    <div className="seller_info_left">
                        <SellerDetails seller={seller} product={product} compact={true} showAuthButton={false} showTrustScore={false} />
                    </div>
                    <div className="left_cart_actions">
                         <div className="cart_btn">
                             <button className="cart_btn1" onClick={() => addToCart(product)}>Add to Cart</button>
                             <button className="cart_btn2" onClick={() => { addToCart(product); navigate('/buynow'); }}>Buy Now</button>
                         </div>
                    </div>
                </div>

                <div className="right_cart">
                    <div>
                        <h3>{name}</h3>
                        <h4>{title}</h4>
                        <Divider />
                        <p className="mrp">M.R.P. : ₹{mrp}</p>
                        <p>Deal of the Day : <span style={{ color: "#B12704" }}>₹{dealPrice}.00</span></p>
                        <p>You save : <span style={{ color: "#B12704" }}> ₹{savings} (-{discountPercent}%) </span></p>

                        <div className="discount_box">
                            <h5>Discount : <span style={{color:"#111"}}>Extra 10% off</span> </h5>
                            <h4>Free Delivery : <span style={{color:"#111"}}>{deliveryDate}</span> Details </h4>
                            <p style={{ color: "#111" }}>Fastest delivery :{" "} <span style={{ color: "#111", fontWeight: "600" }}> {fastestDelivery} </span></p>
                        </div>
                        <p className="description">About the Item : {" "}<span style={{ color: "#565959", fontSize: "14px", fontWeight: "500", letterSpacing: "0.4px" }}> {description} </span></p>
                        
                        {seller && (
                            <div className="seller_risk_info">
                                <Divider sx={{ my: 2 }} />
                                <div className="seller_scores_inline">
                                    <span><strong>Trust Score:</strong>
                                        <Chip
                                            label={revealedScores.trustScore ? `${seller.trustScore}%` : 'Reveal'}
                                            onClick={() => handleRevealScore('trustScore')}
                                            size="small"
                                            color={revealedScores.trustScore ? (seller.trustScore >= 75 ? 'success' : 'error') : 'default'}
                                            sx={{
                                                ml: 1,
                                                cursor: 'pointer',
                                                color: revealedScores.trustScore ? 'white' : 'inherit',
                                                '& .MuiChip-label': {
                                                    color: revealedScores.trustScore ? 'white' : 'inherit',
                                                }
                                            }}
                                        />
                                    </span>
                                    <span><strong>Return Fraud Rate:</strong>
                                         <Chip
                                            label={revealedScores.returnFraud ? `${seller.returnFraudPercent}%` : 'Reveal'}
                                            onClick={() => handleRevealScore('returnFraud')}
                                            size="small"
                                            color={revealedScores.returnFraud ? (seller.returnFraudPercent <= 4 ? 'success' : 'error') : 'default'}
                                            sx={{
                                                ml: 1,
                                                cursor: 'pointer',
                                                color: revealedScores.returnFraud ? 'white' : 'inherit',
                                                '& .MuiChip-label': {
                                                    color: revealedScores.returnFraud ? 'white' : 'inherit',
                                                }
                                            }}
                                        />
                                    </span>
                                    <span><strong>Counterfeit Risk:</strong>
                                         <Chip
                                            label={revealedScores.counterfeitRisk ? seller.counterfeitRiskLevel : 'Reveal'}
                                            onClick={() => handleRevealScore('counterfeitRisk')}
                                            size="small"
                                            color={revealedScores.counterfeitRisk ? (seller.counterfeitRiskLevel === 'Low' ? 'success' : 'error') : 'default'}
                                            sx={{
                                                ml: 1,
                                                cursor: 'pointer',
                                                color: revealedScores.counterfeitRisk ? 'white' : 'inherit',
                                                '& .MuiChip-label': {
                                                    color: revealedScores.counterfeitRisk ? 'white' : 'inherit',
                                                }
                                            }}
                                        />
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                     <div className="auth_button_container_right">
                         <Button variant="outlined" fullWidth onClick={handleOpenAuthModal}>
                             Check Authenticity
                         </Button>
                     </div>
                </div>
            </div>

            <div className="reviews_container">
                <ReviewsSection 
                    reviews={reviews}
                    realReviews={realReviews} 
                    onAddReview={handleAddReview} 
                />
            </div>
            {/* Render modal, now controlled from this component */}
            {seller && <SellerDetails seller={seller} product={product} modalOnly={true} modalOpen={modalOpen} handleCloseModal={handleCloseAuthModal} />}
        </div>
    )
}

export default Cart;