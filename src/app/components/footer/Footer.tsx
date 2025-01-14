'use client'
import Link from "next/link";
import useTranslation from "../../utils/useTranslation";
export default function Footer()
 {
  const currentLang: string = typeof window !== 'undefined' ? localStorage.getItem('lang') || 'en' : 'en';
  const translations = useTranslation(currentLang);
  return (
    <footer className="fixed bottom-0 w-full h-20 bg-white
      flex justify-between items-center mt-auto z-50 shadow-md 
      dark:bg-gray-900 border-t-4 border-blue-500 px-32 text-sm">
      <div className="flex gap-12 items-center">
        <Link href="/contact" passHref>
          <button className="btn-custom">{translations.contact}</button>
        </Link>
        <Link href="/about" passHref>
          <button className="btn-custom">{translations.about}</button>
        </Link>
      </div>

      <div className="flex gap-12 items-center">
        <button className="btn-custom">{translations.privacypolicy}</button>
        <button className="btn-custom">{translations.termsofservice}</button>
        <button className="btn-custom">{translations.faq}</button>
      </div>
    </footer>
  );
}
