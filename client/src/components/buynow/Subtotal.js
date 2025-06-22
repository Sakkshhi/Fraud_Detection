import React from "react";
import { useCart } from '../../CartContext';

const Subtotal = () => {
    const { getTotalPrice, getTotalItems } = useCart();
    
    return (
        <div className="sub_item">
            <h3>Subtotal ({getTotalItems()} items) : <strong style={{fontWeight:700,color:"#111"}}>₹{getTotalPrice().toFixed(2)}</strong></h3>
        </div>
    )
};

export default Subtotal;