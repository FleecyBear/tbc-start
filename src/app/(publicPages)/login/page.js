import Link from 'next/link';
import { authenticate } from '../../utils/actions';
import './Login.css';

export default function SignIn() {
  return (
    <div className="login-container">
      <h5 className="login-title">Log In</h5>
      <form action={authenticate} className="login-form">
        <input
          type="text"
          placeholder="Email"
          required
          name="email"
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          required
          name="password"
          className="login-input"
        />
        <div className="login-options">
          <label className="login-remember">
            <input type="checkbox" /> Remember me
          </label>
        </div>
        <button type="submit" className="login-submit-button">
          Sign In
        </button>
        <p className="login-signup-prompt">
          Don’t have an account? <Link href="/register" className="login-signup-link">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
