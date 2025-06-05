import React from 'react';
import { useLanguage } from './LanguageContext';

const LanguageSwitcher = () => {
  const { language, toggleLanguage, languages } = useLanguage();
  
  const currentLanguage = languages[language];
  const nextLanguage = languages[language === 'en' ? 'ar' : 'en'];
  
  return (
    <button 
      onClick={toggleLanguage}
      className="language-switcher"
      aria-label={`Switch to ${nextLanguage.name}`}
      title={`Switch to ${nextLanguage.name}`}
    >
      <span className="language-switcher-icon">{currentLanguage.flag}</span>
      <span>{currentLanguage.name}</span>
    </button>
  );
};

export default LanguageSwitcher;
