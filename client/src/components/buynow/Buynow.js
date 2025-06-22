import React, { useState } from "react";
import './buynow.css';
import { Divider, Button } from "@mui/material";
import Subtotal from "./Subtotal";
import Right from "./Right";
import { useCart } from '../../CartContext';
import { productSellers } from '../cart/sellers.js';
import SellerDetails from '../cart/SellerDetails';

const Buynow = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = (item) => {
      setSelectedProduct(item);
      setModalOpen(true);
    };

    const handleCloseModal = () => {
      setModalOpen(false);
      setSelectedProduct(null);
    };

    if (cartItems.length === 0) {
        return (
            <div className="buynow_section">
                <div className="buynow_container empty_cart_message">
                    <h1>Shopping Cart</h1>
                    <p>Your Amazon Cart is empty.</p>
                </div>
            </div>
        );
    }

    const renderModal = () => {
      if (!selectedProduct) return null;
      const seller = productSellers[selectedProduct.id];
      return <SellerDetails product={selectedProduct} seller={seller} modalOnly={true} modalOpen={modalOpen} handleCloseModal={handleCloseModal} />;
    }

    return (
        <div className="buynow_section">
            <div className="buynow_container">
                <div className="left_buy">
                    <h1>Shopping Cart</h1>
                    <p>Select all items</p>
                    <span className="leftbuyprice">Price</span>
                    <Divider />

                    {cartItems.map((item) => (
                        <div key={item.id}>
                            <div className="item_containert">
                                <img src={item.image} alt={item.name} />
                                <div className="item_details">
                                    <h3>{item.name}</h3>
                                    <h4>{item.title}</h4>
                                    <h3 className="diffrentprice">₹{item.dealPrice}.00</h3>
                                    <p className="unusuall">Usually dispatched in 3 days</p>
                                    <p>Eligible for FREE Shipping</p>
                                    <div className="item_actions">
                                        <div className="quantity_controls">
                                            <label>Qty:</label>
                                            <select 
                                                value={item.quantity} 
                                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                                            >
                                                {[...Array(10).keys()].map(x => <option key={x + 1} value={x + 1}>{x + 1}</option>)}
                                            </select>
                                        </div>
                                        <Divider orientation="vertical" flexItem />
                                        <Button size="small" onClick={() => removeFromCart(item.id)}>Remove</Button>
                                        <Divider orientation="vertical" flexItem />
                                        <Button size="small" onClick={() => handleOpenModal(item)}>Check Authenticity</Button>
                                    </div>
                                </div>
                                <h3 className="item_price">₹{(item.dealPrice * item.quantity).toFixed(2)}</h3>
                            </div>
                            <Divider />
                        </div>
                    ))}
                    
                    <Subtotal />
                </div>
                <Right />
            </div>
            {renderModal()} 
        </div>
    )
}

export default Buynow;