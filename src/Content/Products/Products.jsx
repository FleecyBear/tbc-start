import React from 'react';
import './Products.css';
import AddToCartButton from '../Button/AddToCartButton';
export default function Products({ image, description }) {
  return (
    <div className="Main_Grid"> 
      <img src={image} alt="Product" />
      <div className="description">{description}</div>
      <AddToCartButton/>
    </div>
  );
}
