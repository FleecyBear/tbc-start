"use client"
import "./Header.css";
// import Image from 'next/image';
import ImageButton from "../imagebutton/imagebutton.js";
// import Navigation from "./Navigation.js";
import Link from "next/link";
import { useState } from "react";


export default function Header({cartCount} ) {
  return (
    <header className="Header">
      <div className="Header_Left">
        <Link href="/" passHref>
          <ImageButton imageUrl="/images/rlogo.png" />
        </Link>
        <Link href="/productsPage" passHref>
          <button className="products-btn">Products</button>
        </Link>
        <input type="text" className="Search_Button" placeholder="Search" />
      </div>

      <div className="Header_Right">
        <ImageButton imageUrl="/images/favorites.png" />

        <div className="cart-container">
          <ImageButton imageUrl="/images/cart.png" />
          <span className="cart-count">{cartCount}</span>
        </div>

        <Link href="/BlogsPage" passHref>
          <ImageButton imageUrl="/images/blog.png" />
        </Link>
        <Link href="/profile" passHref>
          <ImageButton
            imageUrl="/images/nicolascage.jpg"
            className="Profile_Button"
          />
        </Link>
      </div>
    </header>
  );
}
