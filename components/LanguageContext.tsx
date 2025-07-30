import React, { createContext, useContext, useState, ReactNode } from 'react';
import { en, TranslationKeys } from '@/assets/languages/en';
import { es } from '@/assets/languages/es';
import { fr } from '@/assets/languages/fr';

type Language = 'en' | 'es' | 'fr';

const languages: Record<Language, TranslationKeys> = {
  en,
  es,
  fr,
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
  availableLanguages: Array<{ code: Language; name: string; displayKey: keyof TranslationKeys }>;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type LanguageProviderProps = {
  children: ReactNode;
  initialLanguage?: Language;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ 
  children, 
  initialLanguage = 'en' 
}) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  
  const availableLanguages = [
    { code: 'en' as Language, name: 'English', displayKey: 'english' as keyof TranslationKeys },
    { code: 'es' as Language, name: 'Español', displayKey: 'spanish' as keyof TranslationKeys },
    { code: 'fr' as Language, name: 'Français', displayKey: 'french' as keyof TranslationKeys },
  ];

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: languages[language],
    availableLanguages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};