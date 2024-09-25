import React from 'react';
import './Footer.css';
export default function Footer() {
  return (
    <footer className="Footer">
        <div className="Footer_Top">
            <button>Contact</button>
            <button>Social Media</button>
            <button>About</button>
        </div>

        <div className="Footer_Bottom">
            <button>Privacy Policy</button>
            <button>Terms of Service</button>
            <button>FAQ</button>
        </div>

    </footer>
  )
}
