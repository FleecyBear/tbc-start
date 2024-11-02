"use client";
import "./Header.css";
import ImageButton from "../imagebutton/imagebutton.js";
import Link from "next/link";
import { signOut } from "../../utils/actions.js";
export default function Header({ }) {
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
          <ImageButton imageUrl="/images/cart.png" />
        <Link href="/BlogsPage" passHref>
          <ImageButton imageUrl="/images/blog.png" />
        </Link>
        <Link href="/profile" passHref>
          <ImageButton
            imageUrl="/images/nicolascage.jpg"
            className="Profile_Button"
          />
        </Link>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </header>
  );
}
