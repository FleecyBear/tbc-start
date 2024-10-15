import React from "react"; 
import "./Products.css";
import CustomButton from "../../button/button.js";
import { useRouter } from "next/navigation";

export default function Products({ id, title, image, brand, price }) { 
  const router = useRouter();

  const handleClick = () => {
    router.push(`/productsPage/${id}`);
  };

  return (
    <div className="product-card">
      <div className="Title-Image">

        <img
          onClick={handleClick}
          src={image?.[0] || "/default-image.jpg"} 
          alt={title} 
        />
        <p onClick={handleClick} className="product-title">{title}</p>
        <div className="product-info">
          <p className="product-brand">{brand}</p>
          <p>${price}</p>
        </div>
      </div>
      <CustomButton buttonText="Add To Cart" />
    </div>
  );
}

