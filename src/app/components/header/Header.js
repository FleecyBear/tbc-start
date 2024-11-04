"use client";
import CustomButton from "../button/button.js";
import Link from "next/link";
import { signOut } from "../../utils/actions.js";
import ThemeToggle from "../../utils/themeToggle.js";

export default function Header() {
  return (
    <header className="bg-slate-100 w-full flex justify-between 
    items-center p-4 px-24 border-4 border-ridge
     border-blue-500 shadow-md dark:bg-gray-900">
      <div className="Header_Left flex gap-12">
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

      <div className="Header_Right flex gap-12">
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
