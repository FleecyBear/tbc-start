import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full h-20 bg-white
      flex justify-between items-center mt-auto z-50 shadow-md 
      dark:bg-gray-900 border-t-4 border-blue-500 px-32 text-sm">
      <div className="flex gap-12 items-center">
        <Link href="/contact" passHref>
          <button className="btn-custom">Contact</button>
        </Link>
        <Link href="/about" passHref>
          <button className="btn-custom">About</button>
        </Link>
      </div>

      <div className="flex gap-12 items-center">
        <button className="btn-custom">Privacy Policy</button>
        <button className="btn-custom">Terms of Service</button>
        <button className="btn-custom">FAQ</button>
      </div>
    </footer>
  );
}
