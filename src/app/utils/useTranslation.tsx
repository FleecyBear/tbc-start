'use client';
import { useState, useEffect } from "react";

interface Translations {
  [key: string]: string;
}

export default function useTranslation(lang: string): Translations {
  const [translations, setTranslations] = useState<Translations>({});

  useEffect(() => {
    const loadTranslations = async () => {
      const response = await fetch(`/locales/${lang}.json`);
      const data: Translations = await response.json();
      setTranslations(data);
    };
    loadTranslations();
  }, [lang]);

  return translations;
}
