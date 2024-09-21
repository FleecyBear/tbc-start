import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <header className="Header">
      <div className="Header_Left">
        <button className="Home_Button"></button>
        <input type="text" className="Search_Button" placeholder="Search" />
      </div>
      
      <div className="Header_Right">
        <button className="Favorites_Button"></button>
        <button className="Cart_Button"></button>
        <button className="Login_Button">Login</button>
      </div>
    </header>
  );
}
