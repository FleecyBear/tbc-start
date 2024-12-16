'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from '../../utils/themeToggle.js';
import LanguageSelector from '../../utils/languageSelector';
import useTranslation from '../../utils/useTranslation';

interface Translations {
  home: string;
  products: string;
  blogs: string;
  profile: string;
  logout: string;
}

export default function Header() {
  const currentLang: string = typeof window !== 'undefined' ? localStorage.getItem('lang') || 'en' : 'en';
  const translations = useTranslation(currentLang);

  const isLoading = Object.values(translations).some((value) => !value);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-white flex justify-between items-center z-50 shadow-md dark:bg-gray-900 border-b-4 border-blue-500 px-32">
      <div className="flex gap-12 items-center">
        <Link href={`/${currentLang}/home`} passHref>
          <button className="btn-custom">{translations.home}</button>
        </Link>
        <Link href={`/${currentLang}/productsPage`} passHref>
          <button className="btn-custom">{translations.products}</button>
        </Link>
        <Link href={`/${currentLang}/BlogsPage`} passHref>
          <button className="btn-custom">{translations.blogs}</button>
        </Link>
      </div>
      <div className="flex gap-12 items-center pl-12">
        <Link href={`/${currentLang}/profile`} passHref>
          <button className="btn-custom">{translations.profile}</button>
        </Link>
        <button
          className="btn-custom"
          onClick={() => {
            window.location.href = '/api/auth/logout';
          }}
        >
          {translations.logout}
        </button>
        <LanguageSelector />
        <ThemeToggle />
      </div>
    </header>
  );
}
