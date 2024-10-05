import "./Header.css";
// import { Link } from 'react-router-dom';
import ImageButton from '../imagebutton/imagebutton.js';
// import rlogo from "../../images/rlogo.png";
import favorites from "../images/favorites.png";
import cart from "../images/cart.png";
// import blog from "../../images/blog.png";
// import profileImage from "../../images/nicolascage.jpg";
import Navigation from "./Navigation.js";

export default function Header() {

  return (
    <header className="Header">
      <div className="Header_Left">
        <Navigation />
        {/* <Link to="/">
          <ImageButton imageUrl={rlogo} className="Home_Button" />
        </Link> */}
        <input type="text" className="Search_Button" placeholder="Search" />
      </div>

      <div className="Header_Right">
        <ImageButton imageUrl={favorites} className="Favorites_Button" />
        <ImageButton imageUrl={cart} className="Cart_Button" />
        {/* <Link to="/blog">
          <ImageButton imageUrl={blog} className="Blog_Button" />
        </Link> */}
        {/* <Link to="/profile">
            <ImageButton imageUrl={profileImage} className="Profile_Button" />
          </Link>
         */}
      </div>
    </header>
  );
}
