'use client';
import { useState, useEffect } from "react";

interface Translations {
  [key: string]: string;
}

export default function useTranslation(lang: string): Translations {
  const [translations, setTranslations] = useState<Translations>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${lang}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load translations for language: ${lang}`);
        }
        const data: Translations = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error("Error loading translations:", error);
        setTranslations({}); 
      } finally {
        setLoading(false);
      }
    };

    loadTranslations();
  }, [lang]);

  if (loading) {
    return {}; 
  }

  return translations;
}
