import React from 'react';
import './Products.css';
import Button from '../Button/Button';
export default function Products({ image, description, title, buttonText }) {
  return (
    <div className="Main_Grid"> 
      <div className= "Title-Image">
        <img src={image} alt="Product" />
        <p>{title}</p>
      </div>
      <p className="description">{description}</p>
      <Button buttonText="Add To Cart" />
    </div>
  );
}
