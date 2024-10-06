import "./Contact.css";
import Button from "../button/button.js";

export default function Contact({ buttonText }) {
  return (
    <>
      <h1 className="main-title">Contact Us</h1>

      <div className="contact-info">
        <h2 className="second-title">Contact Information</h2>
        <p className="contact-email">Email: info@ExampleProject.com</p>
        <p className="contact-phone">Phone: 555 555 555</p>
        <p className="contact-address">
          Address: 1 Example Street, Example Region, Example City
        </p>
      </div>

      <div className="subscribe-form-wrapper">
        <h2 className="second-title">Subscribe to Us</h2>
        <form className="subscribe-form">
          <label htmlFor="name" className="subscribe-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            className="subscribe-input"
          />

          <label htmlFor="phone" className="subscribe-label">
            Phone:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            className="subscribe-input"
          />

          <label htmlFor="email" className="subscribe-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="subscribe-input"
          />

          <Button buttonText="Subscribe" />
        </form>
      </div>
    </>
  );
}
