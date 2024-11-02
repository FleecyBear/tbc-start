import Link from 'next/link';
import { authenticate } from '../../utils/actions';
import './Login.css';

export default function SignIn() {
  return (
    <div className="login-container">
      <h5 className="login-title">Log In</h5>
      <form action={authenticate} className="login-form" >
        <div className="input-box"> 
          <label htmlFor='email'></label>
          <input
            type='text'
            className="login-input"
            placeholder='Email'
            required
            name='email'
            id='email'
          />
        </div>
        <div className="input-box"> 
          <label htmlFor='pass'></label>
          <input
            type='password'
            className="login-input"
            placeholder='Password'
            required
            id='pass'
            name='password'
          />
        </div>
        <div className="login-options">
          <section>
            <input type='checkbox' id='remember' />
            <label htmlFor='remember'>Remember me</label>
          </section>
          <section>
            <Link href='/forgot-password'>Forgot password</Link>
          </section>
        </div>
        <button type="submit" className="login-submit-button">
          Sign In
        </button>
        <p className="login-signup-prompt">
          Don't have an account? <Link href="/register" className="login-signup-link">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
