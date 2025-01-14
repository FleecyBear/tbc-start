'use client';

import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from '../../utils/themeToggle';
import LanguageSelector from '../../utils/languageSelector';
import useTranslation from '../../utils/useTranslation';
import Logout from '../../components/logout';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentLang: string = typeof window !== 'undefined' ? localStorage.getItem('lang') || 'en' : 'en';
  const translations = useTranslation(currentLang);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-white flex justify-between items-center z-50 shadow-md dark:bg-gray-900 border-b-4 border-blue-500 px-9 text-sm">
      <div className="flex gap-8 items-center">
        <Link href={`/${currentLang}/home`}>
          <button className="btn-custom">{translations.home}</button>
        </Link>
        <Link href={`/${currentLang}/productsPage`}>
          <button className="btn-custom">{translations.products}</button>
        </Link>
        <Link href={`/${currentLang}/BlogsPage`}>
          <button className="btn-custom">{translations.blogs}</button>
        </Link>
        <Link href={`/${currentLang}/arts`}>
          <button className="btn-custom">{translations.arts}</button>
        </Link>
      </div>

      <div className="relative">
        
      <div //hamburger menu
      className="group flex h-8 w-8 cursor-pointer items-center justify-center rounded-3xl bg-transparent p-2  " onClick={toggleMenu}>
      <div className="space-y-2">
          <span className="block h-1 w-10 origin-center rounded-full bg-blue-500 transition-transform ease-in-out group-hover:translate-y-1.5 group-hover:rotate-45 "></span>
          <span className="block h-1 w-8 origin-center rounded-full bg-purple-500 transition-transform ease-in-out group-hover:w-10 group-hover:-translate-y-1.5 group-hover:-rotate-45"></span>
      </div>
      </div>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col gap-3 z-10 select-none">
            <Link href={`/${currentLang}/CreateArt`}>
              <button className="btn-3">{translations.createart}</button>
            </Link>
            <Link href={`/${currentLang}/pricing`}>
              <button className="btn-3">{translations.pricing}</button>
            </Link>
            <Link href={`/${currentLang}/profile`}>
              <button className="btn-3">{translations.profile}</button>
            </Link>
            <Logout />
            <LanguageSelector />
            <ThemeToggle />
          </div>
        )}
      </div>
    </header>
  );
}
