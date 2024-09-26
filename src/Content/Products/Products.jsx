import React from 'react';
import './Products.css';
import AddToCartButton from '../Button/AddToCartButton';
export default function Products({ image, description, title }) {
  return (
    <div className="Main_Grid"> 
      <div className= "Title-Image">
        <img src={image} alt="Product" />
        <p>{title}</p>
      </div>
      <p className="description">{description}</p>
      <AddToCartButton/>
    </div>
  );
}
