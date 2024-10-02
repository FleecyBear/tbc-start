import React from "react";
import './ImageButton.css';

const ImageButton = ({ imageUrl, className }) => {
  return (
    <button 
      className={`ImageButton ${className}`} 
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
    </button>
  );
};

export default ImageButton;
