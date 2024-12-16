"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LanguageSelector() {
  const router = useRouter();
  
  const [lang, setLang] = useState<string>("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang) {
      setLang(storedLang);
    }
  }, []);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
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
      className="px-4 py-2 border rounded-md border-blue-500 bg-transparent text-black
       dark:text-white  
      focus:outline-none focus:ring-2 focus:ring-blue-500 "
    >
      <option value="ge" className=" bg-slate-200 dark:bg-gray-800">GE</option>
      <option value="en" className=" bg-slate-200 dark:bg-gray-800">EN</option>
    </select>
  );
}
