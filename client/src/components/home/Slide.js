import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Divider} from "@mui/material";
import {products} from './productdata';
import { useNavigate } from "react-router-dom";
import "./slide.css";

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    }
  };

// Mapping between home page product IDs and cart product IDs
const productIdMapping = {
  'product1': '1', // Electric Kettle
  'product2': '2', // Sandwich Maker
  'product3': '3', // Resistance Tube
  'product4': '4', // Smart Watch
  'product5': '5', // Hair Dryer
};

const Slide = ({title}) => {
    const navigate = useNavigate();

    const handleProductClick = (productId) => {
        const cartProductId = productIdMapping[productId];
        if (cartProductId) {
            navigate(`/getproductsone/${cartProductId}`);
        }
    };

    return (
        <div className="products_section">
            <div className="products_deal">
                <h3>{title}</h3>
                <button className="view_btn">View All</button>
            </div>

            <Divider />

            <Carousel
                responsive={responsive}
                infinite={true}
                draggable={false}
                swipeable={true}
                centerMode={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                keyBoardControl={true}
                showDots={false}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                containerClass="carousel-container"
            >
                {
                    products.map((e) => {
                        return (
                            <div 
                                key={e.id}
                                className="products_items" 
                                onClick={() => handleProductClick(e.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="product_img">
                                    <img src={e.url} alt="productitem" />
                                </div>
                                <p className="products_name"><b>{e.title.shortTitle}</b></p>
                                <p className="products_offer">{e.discount}</p>
                                <p className="products_explore">{e.tagline}</p>
                            </div>
                        )
                    })
                }

            </Carousel>
        </div>
    )
}

export default Slide