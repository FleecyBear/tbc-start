"use client";
// import Image from 'next/image';
import "./Products.css";
import CustomButton from "../button/button.js";
import { useRouter } from "next/navigation";

export default function Products(props) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/productsPage/${props.id}`);
  };

  return (
    <div key={props.id} onClick={handleClick} className="product-card">
      <div className="Title-Image">
        <img src={props.image[0]} alt="Product" />
        <p className="product-title">{props.title}</p>
        <div className="product-info">
          <p className="product-brand">{props.brand}</p>
          <p>{props.price}</p>
        </div>
      </div>
      <CustomButton buttonText="Add To Cart" />
    </div>
  );
}
