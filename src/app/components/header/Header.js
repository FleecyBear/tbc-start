"use client";
import Link from "next/link";
import ThemeToggle from "../../utils/themeToggle.js";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-slate-200
    flex justify-between items-center  z-50 shadow-md
     dark:bg-gray-900 border-b-4 border-blue-500 px-32">
      <div className="flex gap-12 items-center  ">
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
      <div className="flex gap-12 items-center pl-12">
        <Link href="/profile" passHref>
          <button className="btn-custom">Profile</button>
        </Link>
        <button
          className="btn-custom"
          onClick={() => {
            window.location.href = '/api/auth/logout';
          }}
        >
          Logout
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}
