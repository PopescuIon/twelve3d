import React, { createContext, useContext, useState } from 'react';

type Language = 'ro' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ro: {
    // Navigation
    home: 'Acasă',
    models: 'Modele',
    about: 'Despre noi',
    companies: 'Companii',
    contact: 'Contact',
    
    // Hero
    heroTitle: 'Fiecare minut contează',
    heroSubtitle: 'alături de cei dragi',
    heroDescription: 'Ceasuri 3D handmade pentru cei care prețuiesc timpul și designul excepțional',
    viewModels: 'Vezi modelele',
    
    // About section
    aboutBrandTitle: 'Pasiune pentru detalii',
    aboutBrandText: 'Fiecare ceas Twelve este creat cu atenție la detalii, combinând artizanatul local cu design-ul modern. Produsele noastre transformă timpul într-un decor unic pentru casa ta.',
    
    // Popular models
    popularModelsTitle: 'Modele populare',
    viewAllModels: 'Vezi toate modelele',
    
    // Contact CTA
    contactCtaTitle: 'Hai să creăm ceva special împreună',
    contactCtaButton: 'Contactează-ne',
    
    // Footer
    footerTagline: 'pentru momente care contează',
    followUs: 'Urmărește-ne',
    
    // Models page
    modelsPageTitle: 'Colecția noastră',
    modelsPageSubtitle: 'Descoperă ceasurile 3D care transformă orice spațiu',
    classic: 'Clasice',
    modern: 'Moderne',
    custom: 'Personalizate',
    
    // About page
    aboutPageTitle: 'Despre Twelve',
    aboutPageSubtitle: 'Pasiunea noastră pentru design și timp',
    ourStory: 'Povestea noastră',
    ourStoryText: 'Twelve a început din dorința de a crea ceva special - ceasuri care nu doar măsoară timpul, ci îl celebrează. Fiecare piesă este realizată manual în atelierul nostru din Moldova, cu atenție la fiecare detaliu.',
    howWeCreate: 'Cum creăm ceasurile',
    step1Title: 'Design',
    step1Text: 'Fiecare model este conceput cu grijă, combinând estetica modernă cu funcționalitatea',
    step2Title: 'Producție',
    step2Text: 'Folosim materiale de calitate superioară și tehnici artizanale',
    step3Title: 'Finisare',
    step3Text: 'Fiecare ceas este verificat și finalizat manual pentru a asigura calitatea',
    
    // Companies page
    companiesPageTitle: 'Ceasuri personalizate pentru companii',
    companiesPageSubtitle: 'Îți putem crea un ceas 3D cu logo-ul brandului tău',
    companiesBenefitsTitle: 'De ce să alegi Twelve pentru compania ta',
    benefit1Title: 'Design exclusiv',
    benefit1Text: 'Ceas personalizat cu logo-ul companiei tale',
    benefit2Title: 'Dimensiuni personalizabile',
    benefit2Text: 'Adaptăm dimensiunile pentru orice spațiu',
    benefit3Title: 'Cadou corporate ideal',
    benefit3Text: 'Perfect pentru birouri, recepții sau cadouri pentru clienți',
    requestQuote: 'Solicită o ofertă',
    
    // Contact page
    contactPageTitle: 'Contactează-ne',
    contactPageSubtitle: 'Hai să transformăm timpul într-un decor unic pentru casa ta',
    name: 'Nume',
    email: 'Email',
    phone: 'Telefon',
    message: 'Mesaj',
    send: 'Trimite',
    getInTouch: 'Informații de contact',
    address: 'Adresă',
    addressText: 'Chișinău, Moldova',
  },
  ru: {
    // Navigation
    home: 'Главная',
    models: 'Модели',
    about: 'О нас',
    companies: 'Компании',
    contact: 'Контакты',
    
    // Hero
    heroTitle: 'Каждая минута имеет значение',
    heroSubtitle: 'рядом с близкими',
    heroDescription: 'Handmade 3D-часы для тех, кто ценит время и исключительный дизайн',
    viewModels: 'Смотреть модели',
    
    // About section
    aboutBrandTitle: 'Страсть к деталям',
    aboutBrandText: 'Каждые часы Twelve создаются с вниманием к деталям, сочетая местное ремесло с современным дизайном. Наши изделия превращают время в уникальный декор для вашего дома.',
    
    // Popular models
    popularModelsTitle: 'Популярные модели',
    viewAllModels: 'Смотреть все модели',
    
    // Contact CTA
    contactCtaTitle: 'Давайте создадим что-то особенное вместе',
    contactCtaButton: 'Связаться с нами',
    
    // Footer
    footerTagline: 'для моментов, которые имеют значение',
    followUs: 'Следите за нами',
    
    // Models page
    modelsPageTitle: 'Наша коллекция',
    modelsPageSubtitle: 'Откройте для себя 3D-часы, которые преображают любое пространство',
    classic: 'Классика',
    modern: 'Современные',
    custom: 'Персонализированные',
    
    // About page
    aboutPageTitle: 'О Twelve',
    aboutPageSubtitle: 'Наша страсть к дизайну и времени',
    ourStory: 'Наша история',
    ourStoryText: 'Twelve началась с желания создать что-то особенное - часы, которые не просто измеряют время, но и празднуют его. Каждая деталь изготавливается вручную в нашей мастерской в Молдове, с вниманием к каждой детали.',
    howWeCreate: 'Как мы создаем часы',
    step1Title: 'Дизайн',
    step1Text: 'Каждая модель разрабатывается с заботой, сочетая современную эстетику с функциональностью',
    step2Title: 'Производство',
    step2Text: 'Мы используем материалы высшего качества и ремесленные техники',
    step3Title: 'Отделка',
    step3Text: 'Каждые часы проверяются и завершаются вручную для обеспечения качества',
    
    // Companies page
    companiesPageTitle: 'Персонализированные часы для компаний',
    companiesPageSubtitle: 'Мы можем создать 3D-часы с логотипом вашего бренда',
    companiesBenefitsTitle: 'Почему стоит выбрать Twelve для вашей компании',
    benefit1Title: 'Эксклюзивный дизайн',
    benefit1Text: 'Персонализированные часы с логотипом вашей компании',
    benefit2Title: 'Настраиваемые размеры',
    benefit2Text: 'Адаптируем размеры под любое пространство',
    benefit3Title: 'Идеальный корпоративный подарок',
    benefit3Text: 'Отлично подходит для офисов, стойки регистрации или подарков для клиентов',
    requestQuote: 'Запросить предложение',
    
    // Contact page
    contactPageTitle: 'Свяжитесь с нами',
    contactPageSubtitle: 'Давайте превратим время в уникальный декор для вашего дома',
    name: 'Имя',
    email: 'Электронная почта',
    phone: 'Телефон',
    message: 'Сообщение',
    send: 'Отправить',
    getInTouch: 'Контактная информация',
    address: 'Адрес',
    addressText: 'Кишинев, Молдова',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ro');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.ro] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
