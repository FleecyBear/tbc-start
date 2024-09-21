import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <header className="Header">
      <div className="Header_Left">
        <button className="Logo_Button"></button>
        <button className="Search_Button"></button>
      </div>
      
      <div className="Header_Right">
        <button className="Favorites_Button"></button>
        <button className="Cart_Button"></button>
        <button className="Login_Button"></button>
      </div>
    </header>
  );
}
