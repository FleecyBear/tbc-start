// import Image from 'next/image';
import "./Products.css";
import CustomButton from "../button/button.js";
export default function Products({ image, description, title, price,buttonText }) {
  return (

    <div className="product-card">
      <img className="product__img" src={image} alt="Product"/>
      <h2 className="product__title">{title}</h2>
      <div className="product__desc">
        <p className="product__price">{price} ₾</p>
      </div>
      <button class="btn">ADD TO CART</button>
    </div>
    // <div className="Main_Grid">
    //   <div className="Title-Image">
    //     <img src={image} alt="Product" />
    //     <p>{title}</p>
    //   </div>
    //   <p className="description">{description}</p>
    //   <CustomButton buttonText="Add To Cart" />
    // </div>
  );
}
