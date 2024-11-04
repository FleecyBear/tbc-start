"use client";
import "./Header.css";
import CustomButton from "../button/button.js";
import Link from "next/link";
import { signOut } from "../../utils/actions.js";
import ThemeToggle from "../../utils/themeToggle.js";

export default function Header() {
  return (
    <header className="Header flex  dark:bg-gray-900">
      <div className="Header_Left">
        <Link href="/" passHref>
          <CustomButton buttonText="Home" />
        </Link>
        <Link href="/productsPage" passHref>
          <CustomButton buttonText="Products" />
        </Link>
        <Link href="/BlogsPage" passHref>
          <CustomButton buttonText="Blogs" />
        </Link>
      </div>

      <div className="Header_Right">
        <Link href="/profile" passHref>
          <CustomButton buttonText="Profile" />
        </Link>
        <button onClick={signOut} className="btn-custom">
          Sign Out
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}
