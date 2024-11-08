"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LanguageSelector() {
  const router = useRouter();
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang) {
      setLang(storedLang);
    }
  }, []);

  const handleLanguageChange = (event) => {
    const selectedLang = event.target.value;
    const pathWithoutLang = window.location.pathname.replace(/^\/(en|ge)/, "");
    router.push(`/${selectedLang}${pathWithoutLang}`);
    setLang(selectedLang);
    localStorage.setItem("lang", selectedLang); 
  };

  return (
    <select
      value={lang}
      onChange={handleLanguageChange}
      className="px-4 py-2 border rounded-md bg-white text-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="ge">GE</option>
      <option value="en">EN</option>
    </select>
  );
}
