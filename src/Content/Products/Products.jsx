import React from 'react';
import './Products.css';

export default function Products({ image, description }) {
  return (
    <div className="Main_Grid"> 
      <img src={image} alt="Product" />
      <div className="description">{description}</div>
      <button>Add To Cart</button>
    </div>
  );
}
