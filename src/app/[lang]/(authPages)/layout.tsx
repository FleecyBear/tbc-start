'use client';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Image from 'next/image';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {

  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="absolute inset-0 z-[-1]">
        <Image
          src="/images/bck.png"
          alt="Background Image"
          layout="fill" 
          objectFit="cover" 
        />
      </div>
      <div className="absolute inset-0 bg-violet-400 dark:bg-violet-950 opacity-80 dark:opacity-90 z-[-1]" /> 
      <Header />
      <main className="flex-grow p-4 mt-16 lg:p-12 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
