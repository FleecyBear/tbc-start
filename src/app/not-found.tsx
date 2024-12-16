'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NotFoundPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const pathname = window.location.pathname;

    const hasLangPrefix = pathname.startsWith('/en') || pathname.startsWith('/ge');

    if (!hasLangPrefix) {
      setLoading(false);
      const storedLang = localStorage.getItem('lang') || 'ge'; 
      router.replace(`/${storedLang}${pathname}`);
      return;
    }

    const checkPageExistence = async () => {
      const res = await fetch(pathname);
      if (res.status === 404) {
        setLoading(false);
        setErrorMessage('Page not found! You will be redirected to the homepage.');

        const storedLang = localStorage.getItem('lang') || 'ge';

        setRedirecting(true);
        setTimeout(() => {
          router.replace(`/${storedLang}/home`); 
        }, 3000);
      }
    };

    setTimeout(() => {
      checkPageExistence();
    }, 100);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (redirecting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
        <p className="text-lg text-gray-600">{errorMessage}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => {
            const storedLang = localStorage.getItem('lang') || 'ge'; 
            router.replace(`/${storedLang}/home`);
          }}
        >
          Go to Home Now
        </button>
      </div>
    );
  }

  return null;
}
