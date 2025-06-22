import React from "react";
import './banner.css'

const Banner = () => {
    const image = "https://rukminim1.flixcart.com/flap/1680/280/image/1defb861e409319b.jpg?q=50";

    return (
        <div className="banner_container">
            <img src={image} alt="banner" className="banner_img" />
        </div>
    )
}

export default Banner