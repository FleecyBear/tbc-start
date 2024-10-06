// import Image from 'next/image';
import "./Products.css";
import CustomButton from "../button/button.js";
import Link from "next/link";
export default function Products(props) {
  var data = JSON.stringify(props.datta);
  return (
    <Link href={`/ditealProductPage?data=${data}`}>
      <div key={props.id} className="Main_Grid">
          <div className="Title-Image">
            <img src={props.image} alt="Product" />
            <p>{props.title}</p>
            <p>{props.brand}</p>
          </div>
          <p className="description">{props.description}</p>
          <p>{props.price}</p>
          <CustomButton buttonText="Add To Cart" />
      </div>
    </Link>
  );
}
