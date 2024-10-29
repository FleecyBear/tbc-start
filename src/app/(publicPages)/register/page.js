import Link from 'next/link';
import './Register.css';

export default function Register() {
  return (
    <div className="register-container">
      <h5 className="register-title">Register</h5>
      <form className="register-form">
        <input
          type="text"
          placeholder="Username"
          required
          name="username"
          className="register-input"
        />
        <input
          type="text"
          placeholder="Email"
          required
          name="email"
          className="register-input"
        />
        <input
          type="password"
          placeholder="Password"
          required
          name="password"
          className="register-input"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          required
          name="confirmPassword"
          className="register-input"
        />
        <button type="submit" className="register-submit-button">
          Register
        </button>
        <p className="register-signin-prompt">
          Already have an account? <Link href="/login" className="register-signin-link">Log In</Link>
        </p>
      </form>
    </div>
  );
}
