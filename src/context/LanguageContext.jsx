import { createContext, useContext } from 'react';

const LanguageContext = createContext(null);

// সাইট সম্পূর্ণ বাংলায় — ভাষা পরিবর্তনের অপশন নেই
export function LanguageProvider({ children }) {
  const value = {
    lang: 'bn',
    setLang: () => {},
    toggle: () => {},
    isBn: true,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
