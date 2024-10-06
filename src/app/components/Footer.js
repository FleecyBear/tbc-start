import './Footer.css';
import Link from 'next/link'; 

export default function Footer() {
    return (
        <footer className="Footer">
            <div className="Footer_Top">
                <Link href="/contact" passHref>
                    <button>Contact</button>
                </Link>
                <Link href="/assignment-3" passHref>
                    <button>Assignment 3</button>
                </Link>
                <Link href="/blog" passHref>
                    <button>Blog</button>
                </Link>
                <Link href="/about" passHref>
                    <button>About</button>
                </Link>
            </div>

            <div className="Footer_Bottom">
                <button>Privacy Policy</button>
                <button>Terms of Service</button>
                <button>FAQ</button>
            </div>
        </footer>
    );
}
