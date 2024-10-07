// import Image from 'next/image';
'use client'
import "./Products.css";
import CustomButton from "../button/button.js";
import { useRouter } from "next/navigation";

export default function Products(props) {

  const router = useRouter();
  function changePage(){
    router.push(`/productsPage/${props.id}`)
  }
  return (
      <div key={props.id} onClick={changePage} className="Main_Grid">
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
