'use client';

import Link from 'next/link';
import ThemeToggle from '../../utils/themeToggle';
import LanguageSelector from '../../utils/languageSelector';
import useTranslation from '../../utils/useTranslation';
import Logout from '../../components/logout';
export default function Header() {
  const currentLang: string = typeof window !== 'undefined' ? localStorage.getItem('lang') || 'en' : 'en';
  const translations = useTranslation(currentLang);

  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-white flex justify-between items-center z-50 shadow-md dark:bg-gray-900 border-b-4 border-blue-500 px-32">
      <div className="flex gap-12 items-center">
        <Link href={`/${currentLang}/home`}>
          <button className="btn-custom">{translations.home}</button>
        </Link>
        <Link href={`/${currentLang}/productsPage`}>
          <button className="btn-custom">{translations.products}</button>
        </Link>
        <Link href={`/${currentLang}/BlogsPage`}>
          <button className="btn-custom">{translations.blogs}</button>
        </Link>
      </div>
      <div className="flex gap-12 items-center pl-12">
        <Link href={`/${currentLang}/pricing`}>
          <button className="btn-custom">{translations.pricing}</button>
        </Link>
        <Link href={`/${currentLang}/profile`}>
          <button className="btn-custom">{translations.profile}</button>
        </Link>
        <Logout />
        <LanguageSelector />
        <ThemeToggle />
      </div>
    </header>
  );
}
