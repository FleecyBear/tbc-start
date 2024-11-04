"use client";
import "./Header.css";
import CustomButton from "../button/button.js";
import Link from "next/link";
import { signOut } from "../../utils/actions.js";
export default function Header({ }) {
  return (
    <header className='Header'>
      <div className="Header_Left">
        <Link href="/" passHref>
      <CustomButton buttonText="Home" />
        </Link>
        <Link href="/productsPage" passHref>
        <CustomButton buttonText="Products" />
        </Link>
      </div>

      <div className="Header_Right">
        <Link href="/BlogsPage" passHref>
        <CustomButton buttonText="Blogs" />
        </Link>
        <Link href="/profile" passHref>
        <CustomButton buttonText="Profile" />
        </Link>
        <button onClick={signOut} className="btn-custom">Sign Out</button>
      </div>
    </header>
  );
}
