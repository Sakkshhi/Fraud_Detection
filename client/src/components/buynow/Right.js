import React from "react";
import { useCart } from '../../CartContext';

const Right = () => {
    const { getTotalPrice, getTotalItems } = useCart();
    
    return (
        <div className="right_buy">
            <image src=""></image>
            <div className="cost_right">
                <p>Your order is eligible for FREE Delivery.</p><br />
                <span style={{color:"#565959"}}>Select this option at checkout. Details</span>
            
            <h3>Subtotal ({getTotalItems()} items) : <span style={{fontWeight:700}}>₹{getTotalPrice().toFixed(2)}</span></h3>
            <button className="rightbuy_btn">Proceed to Buy</button>
            <div className="emi">
                Emi available
            </div>
            </div>
        </div>
    )
}

export default Right;