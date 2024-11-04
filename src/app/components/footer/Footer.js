import "./Footer.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="Footer">
      <div className="Footer_Top">
        <Link href="/contact" passHref>
          <button className="btn-custom">Contact</button>
        </Link>
        <Link href="/assignment-3" passHref>
          <button className="btn-custom">Assignment 3</button>
        </Link>
        <Link href="/BlogsPage" passHref>
          <button className="btn-custom">Blog</button>
        </Link>
        <Link href="/about" passHref>
          <button className="btn-custom">About</button>
        </Link>
      </div>

      <div className="Footer_Bottom">
        <button className="btn-custom">Privacy Policy</button>
        <button className="btn-custom">Terms of Service</button>
        <button className="btn-custom">FAQ</button>
      </div>
    </footer>
  );
}
