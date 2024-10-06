// import Image from 'next/image';
import "./Products.css";
import CustomButton from "../button/button.js";
export default function Products(props) {
  return (
    <div className="Main_Grid">
      <div className="Title-Image">
        <img src={props.image} alt="Product" />
        <p>{props.title}</p>
        <p>{props.brand}</p>
      </div>
      <p className="description">{props.description}</p>
      <p>{props.price}</p>
      <CustomButton buttonText="Add To Cart" />
    </div>
  );
}
