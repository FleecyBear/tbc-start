'use client';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faGear } from "@fortawesome/free-solid-svg-icons";

const ThemeToggle = () => {
  const [theme, setTheme] = useState('system'); 

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setTheme(mediaQuery.matches ? 'dark' : 'light');

      const handleChange = (e) => {
        setTheme(e.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', handleChange);

      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem("theme", "dark");
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem("theme", "light");
    } else {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      if (mediaQuery.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.removeItem("theme");
    }
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className="flex items-center space-x-2">
      <FontAwesomeIcon 
        icon={faMoon} 
        className={`cursor-pointer ${theme === 'dark' ? 'text-yellow-400' : 'text-gray-400'}`} 
        onClick={() => handleThemeChange('dark')}
      />
      <FontAwesomeIcon 
        icon={faSun} 
        className={`cursor-pointer ${theme === 'light' ? 'text-yellow-400' : 'text-gray-400'}`} 
        onClick={() => handleThemeChange('light')}
      />
      <FontAwesomeIcon 
        icon={faGear} 
        className={`cursor-pointer ${theme === 'system' ? 'text-yellow-400' : 'text-gray-400'}`} 
        onClick={() => handleThemeChange('system')}
      />
    </div>
  );
};

export default ThemeToggle;
