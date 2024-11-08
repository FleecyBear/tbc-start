'use client'
import { useState, useEffect } from "react";

export default function useTranslation(lang) {
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const loadTranslations = async () => {
      const response = await fetch(`/locales/${lang}.json`);
      const data = await response.json();
      setTranslations(data);
    };
    loadTranslations();
  }, [lang]);

  return translations;
}
