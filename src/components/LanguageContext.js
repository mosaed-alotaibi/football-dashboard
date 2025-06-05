import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for language
const LanguageContext = createContext();

// Available languages
export const languages = {
  en: {
    code: 'en',
    name: 'English',
    dir: 'ltr',
    flag: '🇬🇧'
  },
  ar: {
    code: 'ar',
    name: 'العربية',
    dir: 'rtl',
    flag: '🇸🇦'
  }
};

// Translations
export const translations = {
  en: {
    // Header
    appName: 'SCAI League',
    appTagline: 'Tactical Analysis AI Assistant',
    footballAnalysisPlatform: 'Football Analysis Platform',
    aiPoweredInsights: 'AI-Powered Insights',
    
    // Home page
    createNewMatchAnalysis: 'Create New Match Analysis',
    homeTeam: 'Home Team',
    awayTeam: 'Away Team',
    selectHomeTeam: 'Select Home Team',
    selectAwayTeam: 'Select Away Team',
    uploadMatchDataFiles: 'Upload Match Data Files',
    teamStatisticsFile: 'Team Statistics File',
    matchAnalysisFile: 'Match Analysis File',
    downloadSampleFile: 'Download Sample File',
    clickToUpload: 'Click to upload',
    accepts: 'Accepts',
    fileFormatInfo: 'File Format Information',
    theAnalysisRequires: 'The analysis requires two JSON files:',
    teamStatisticsContains: 'Team Statistics: Contains player and team performance data',
    matchAnalysisContains: 'Match Analysis: Contains tactical and strategic information',
    useTheDownloadButton: 'Use the "Download Sample File" button above to get a template of the expected format.',
    generateMatchAnalysis: 'Generate Match Analysis',
    processingFiles: 'Processing Files...',
    recentMatches: 'Recent Matches',
    noRecentMatches: 'No recent matches available',
    viewAnalysis: 'View Analysis',
    
    // Dashboard
    backToHome: 'Back to Home',
    aiMatchPrediction: 'AI Match Prediction',
    winProbability: 'Win Probability for',
    matchOutcome: 'Match Outcome',
    predictedFormation: 'Predicted Formation',
    keyTacticalInsights: 'Key Tactical Insights',
    peakPressure: 'Peak pressure',
    intensityDuring: 'intensity during minutes',
    
    // Common
    win: 'Win',
    draw: 'Draw',
    loss: 'Loss',
    vs: 'vs',
    loading: 'Loading SCAI League data...',
    generatingAnalysis: 'Generating match analysis...',
    error: 'Error',
    returnToHome: 'Return to Home'
  },
  ar: {
    // Header
    appName: 'دوري SCAI',
    appTagline: 'مساعد تحليل تكتيكي بالذكاء الاصطناعي',
    footballAnalysisPlatform: 'منصة تحليل كرة القدم',
    aiPoweredInsights: 'رؤى مدعومة بالذكاء الاصطناعي',
    
    // Home page
    createNewMatchAnalysis: 'إنشاء تحليل مباراة جديد',
    homeTeam: 'الفريق المضيف',
    awayTeam: 'الفريق الزائر',
    selectHomeTeam: 'اختر الفريق المضيف',
    selectAwayTeam: 'اختر الفريق الزائر',
    uploadMatchDataFiles: 'تحميل ملفات بيانات المباراة',
    teamStatisticsFile: 'ملف إحصائيات الفريق',
    matchAnalysisFile: 'ملف تحليل المباراة',
    downloadSampleFile: 'تنزيل ملف نموذجي',
    clickToUpload: 'انقر للتحميل',
    accepts: 'يقبل',
    fileFormatInfo: 'معلومات تنسيق الملف',
    theAnalysisRequires: 'يتطلب التحليل ملفين JSON:',
    teamStatisticsContains: 'إحصائيات الفريق: تحتوي على بيانات أداء اللاعب والفريق',
    matchAnalysisContains: 'تحليل المباراة: يحتوي على معلومات تكتيكية واستراتيجية',
    useTheDownloadButton: 'استخدم زر "تنزيل ملف نموذجي" أعلاه للحصول على قالب للتنسيق المتوقع.',
    generateMatchAnalysis: 'إنشاء تحليل المباراة',
    processingFiles: 'جاري معالجة الملفات...',
    recentMatches: 'المباريات الأخيرة',
    noRecentMatches: 'لا توجد مباريات حديثة متاحة',
    viewAnalysis: 'عرض التحليل',
    
    // Dashboard
    backToHome: 'العودة إلى الصفحة الرئيسية',
    aiMatchPrediction: 'توقع المباراة بالذكاء الاصطناعي',
    winProbability: 'احتمالية الفوز لـ',
    matchOutcome: 'نتيجة المباراة',
    predictedFormation: 'التشكيل المتوقع',
    keyTacticalInsights: 'الرؤى التكتيكية الرئيسية',
    peakPressure: 'ذروة الضغط',
    intensityDuring: 'كثافة خلال الدقائق',
    
    // Common
    win: 'فوز',
    draw: 'تعادل',
    loss: 'خسارة',
    vs: 'ضد',
    loading: 'جاري تحميل بيانات دوري SCAI...',
    generatingAnalysis: 'جاري إنشاء تحليل المباراة...',
    error: 'خطأ',
    returnToHome: 'العودة إلى الصفحة الرئيسية'
  }
};

export const LanguageProvider = ({ children }) => {
  // Get initial language from localStorage or default to English
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage && languages[savedLanguage] ? savedLanguage : 'en';
  });

  // Update document direction and lang attribute when language changes
  useEffect(() => {
    const dir = languages[language].dir;
    const html = document.documentElement;
    
    html.setAttribute('dir', dir);
    html.setAttribute('lang', language);
    
    localStorage.setItem('language', language);
  }, [language]);

  // Function to toggle between languages
  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'ar' : 'en');
  };

  // Get translation for a key
  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
