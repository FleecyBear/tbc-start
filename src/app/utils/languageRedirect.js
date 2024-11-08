"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LanguageRedirect() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const pathname = window.location.pathname;
    const hasLangPrefix = pathname.startsWith("/en") || pathname.startsWith("/ge");

    if (!hasLangPrefix) {
      setLoading(true);
      router.replace(`/ge${pathname}`);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Redirecting...</p>
      </div>
    );
  }

  return null; 
}
