import "./Footer.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="Footer">
      <div className="Footer_Top">
        <Link href="/contact" passHref>
          <button className="footer-btn">Contact</button>
        </Link>
        <Link href="/assignment-3" passHref>
          <button className="footer-btn">Assignment 3</button>
        </Link>
        <Link href="/BlogsPage" passHref>
          <button className="footer-btn">Blog</button>
        </Link>
        <Link href="/about" passHref>
          <button className="footer-btn">About</button>
        </Link>
      </div>

      <div className="Footer_Bottom">
        <button className="footer-btn">Privacy Policy</button>
        <button className="footer-btn">Terms of Service</button>
        <button className="footer-btn">FAQ</button>
      </div>
    </footer>
  );
}
