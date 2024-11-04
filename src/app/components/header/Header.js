"use client";
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
        <button className="btn-custom">Home</button>
        </Link>
        <Link href="/productsPage" passHref>
        <button className="btn-custom">Products</button>
        </Link>
        <Link href="/BlogsPage" passHref>
        <button className="btn-custom">Blogs</button>
        </Link>
      </div>

      <div className="Header_Right flex gap-12">
        <Link href="/profile" passHref>
          <button className="btn-custom">Profile</button>
        </Link>
        <button onClick={signOut} className="btn-custom">
          Sign Out
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}
