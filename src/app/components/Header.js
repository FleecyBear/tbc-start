import "./Header.css";
// import Image from 'next/image';
import ImageButton from "../imagebutton/imagebutton.js";
// import Navigation from "./Navigation.js";
import Link from "next/link";

export default function Header() {
  return (
    <header className="Header">
      <div className="Header_Left">
        <Link href="/" passHref>
          <ImageButton imageUrl="/images/rlogo.png" />
        </Link>
        <input type="text" className="Search_Button" placeholder="Search" />
      </div>

      <div className="Header_Right">
        <ImageButton imageUrl="/images/favorites.png" />

        <ImageButton imageUrl="/images/cart.png" />

        <Link href="/blog" passHref>
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
