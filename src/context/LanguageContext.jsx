import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('bn');

  const toggle = () => setLang((l) => (l === 'bn' ? 'en' : 'bn'));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, isBn: lang === 'bn' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
