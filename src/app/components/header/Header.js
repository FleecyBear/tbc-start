"use client";
import Link from "next/link";
import ThemeToggle from "../../utils/themeToggle.js";
import LanguageSelector from "../../utils/languageSelector.js";

export default function Header() {
  const currentLang = typeof window !== "undefined" ? localStorage.getItem("lang") || "en" : "en";

  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-slate-200 flex justify-between items-center z-50 shadow-md dark:bg-gray-900 border-b-4 border-blue-500 px-32">
      <div className="flex gap-12 items-center">
        <Link href={`/${currentLang}/home`} passHref>
          <button className="btn-custom">Home</button>
        </Link>
        <Link href={`/${currentLang}/productsPage`} passHref>
          <button className="btn-custom">Products</button>
        </Link>
        <Link href={`/${currentLang}/BlogsPage`} passHref>
          <button className="btn-custom">Blogs</button>
        </Link>
      </div>
      <div className="flex gap-12 items-center pl-12">
        <Link href={`/${currentLang}/profile`} passHref>
          <button className="btn-custom">Profile</button>
        </Link>
        <button
          className="btn-custom"
          onClick={() => {
            window.location.href = `/${currentLang}/api/auth/logout`;
          }}
        >
          Logout
        </button>
        <LanguageSelector />
        <ThemeToggle />
      </div>
    </header>
  );
}
