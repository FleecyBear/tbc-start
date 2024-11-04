'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-purple-600 rounded-lg shadow-lg mx-auto my-12 max-w-md text-white">
      <h1 className="text-4xl font-bold">Not Found – 404!</h1>
      <p className="text-lg my-5">Sorry, the page you are looking for does not exist.</p>
      <p className="text-base">You will be automatically redirected to the home page in 3 seconds.</p>
      <p className="text-base mt-2">
        If you don’t want to wait, click <Link href="/" className="text-blue-300 underline">here</Link>.
      </p>
    </div>
  );
}
