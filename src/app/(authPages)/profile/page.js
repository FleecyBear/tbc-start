'use client';
import { useEffect, useState } from 'react';
import './Profile.css'; 
import Image from 'next/image';
import { signOut } from '../../utils/actions';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    const getAuthUser = async () => {
      if (!token) {
        setError('Please log in.');
        return;
      }

      try {
        const res = await fetch('https://dummyjson.com/users/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await res.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    getAuthUser();
  }, []);

  return (
    <main className="profile_container">
      {error && <p className="error_message">{error}</p>}
      {userData ? (
        <>
          <section className="description_content_wrapper">
            <div className="background_decoration">
              <div className="profile_image">
                <Image
                  className="prof_img"
                  src={
                    userData.image ||
                    'https://ssl.gstatic.com/onebox/media/sports/photos/ufc/3605_rZmNsA_96x96.png'
                  }
                  alt='profile image'
                  width={96}
                  height={96}
                />
              </div>
            </div>
            <div className="profile_description">
              <div>
                <h2 className="profile_name">
                  {`${userData.firstName} ${userData.lastName}`}
                </h2>
                <div>
                  <span className="profile_email">
                    Email: {userData.email}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="profile_settings">
            <nav>
              <ul>
                <li>Account settings</li>
                <li>Manage password</li>
                <li>Order history</li>
                <li>Address</li>
                <li>Notification</li>
                <li>
                  <button onClick={signOut}>Sign Out</button>
                </li>
              </ul>
            </nav>
          </section>

          <section className="account_settings">
            <form>
              <div className="label_wrapper">
                <label htmlFor='firstName'>First Name</label>
                <input type='text' id='firstName' value={userData.firstName} readOnly />
              </div>
              <div className="label_wrapper">
                <label htmlFor='lastName'>Last Name</label>
                <input type='text' id='lastName' value={userData.lastName} readOnly />
              </div>

              <div className="label_wrapper">
                <label htmlFor='email'>Email</label>
                <input type='text' id='email' value={userData.email} readOnly />
              </div>

              <div className="label_wrapper">
                <label htmlFor='phoneNumber'>Phone Number</label>
                <input
                  type='tel'
                  id='phoneNumber'
                  required
                  value={userData.phone || ''}
                />
              </div>
              <div className="buttons_wrapper">
                <button type='button'>Cancel</button>
                <button type='submit'>Update</button>
              </div>
            </form>
          </section>
        </>
      ) : (
        !error && <p>Loading user data...</p>
      )}
    </main>
  );
}
