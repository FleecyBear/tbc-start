import React from "react";
import "./Products.css";
import CustomButton from '../../../components/button/button';
import Link from "next/link"; 

export default function Products({ id, title, image, brand, price }) { 
  return (
    <div className="product-card">
      <div className="Title-Image">
        <Link href={`/productsPage/${id}`}> 
          <img
            src={image?.[0] || "/default-image.jpg"} 
            alt={title} 
          />
          <p className="product-title">{title}</p>
        </Link>
        <div className="product-info">
          <p className="product-brand">{brand}</p>
          <p>${price}</p>
        </div>
      </div>
      <CustomButton buttonText="Add To Cart" />
    </div>
  );
}
