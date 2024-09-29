import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom'; 
export default function Footer() {
  return (
    <footer className="Footer">
        <div className="Footer_Top">
            <Link to="/contact"> 
                <button>Contact</button>
            </Link>
            <Link to="/assignment-3"> 
            <button>Assignment 3</button>
            </Link>
            <Link to="/about">
                <button>About</button>
            </Link>
        </div>

        <div className="Footer_Bottom">
            <button>Privacy Policy</button>
            <button>Terms of Service</button>
            <button>FAQ</button>
        </div>

    </footer>
  )
}
