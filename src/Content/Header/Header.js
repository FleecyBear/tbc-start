import React, { useState } from "react";
import "./Header.css";
import { Link } from 'react-router-dom';
import ImageButton from '../ImageButton/ImageButton';
import rlogo from "../../Images/rlogo.png";
import favorites from "../../Images/favorites.png"; 
import cart from "../../Images/cart.png"; 
import blog from "../../Images/blog.png"; 
import profileImage from "../../Images/nicolascage.jpg"; 

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const toggleLogin = () => {
    setIsLoggedIn(prev => !prev);
  };

  return (
    <header className="Header">
      <div className="Header_Left">
        <Link to="/">
          <ImageButton imageUrl={rlogo} className="Home_Button" />
        </Link>
        <input type="text" className="Search_Button" placeholder="Search" />
      </div>

      <div className="Header_Right">
        <ImageButton imageUrl={favorites} className="Favorites_Button" />
        <ImageButton imageUrl={cart} className="Cart_Button" />
        <Link to="/blog">
          <ImageButton imageUrl={blog} className="Blog_Button" />
        </Link>
        {isLoggedIn ? (
          <Link to="/profile">
            <ImageButton imageUrl={profileImage} className="Profile_Button"/>
          </Link>
        ) : (
          <button className="Login_Button" onClick={toggleLogin}>
            Login
          </button>
        )}
      </div>
    </header>
  );
}
