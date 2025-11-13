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
    viewModels: 'Vezi modelele',
    
    // About section
    aboutBrandTitle: 'Suntem Twelve și dăm viață pereților tăi',
    aboutBrandText: 'prin ceasuri 3D realizate manual. Personalizăm fiecare model după dorințele tale — cu nume, mesaje, citate sau logoul afacerii tale.',
    aboutBrandText2: 'Design modern, detalii fine și o notă de emoție în fiecare minut.',
    
    // Popular models
    popularModelsTitle: 'Modele populare',
    viewAllModels: 'Vezi toate modelele',
    
    // Testimonials
    happyCustomers: 'Clienții noștri fericiți',
    testimonial1: 'Ceasul este superb, este în armonie perfectă cu interiorul! Dar... cel mai mult am rămas plăcut surprinsă de echipa Twelve Clocks! Receptivi, amabili și foarte plăcuți ca oameni! Vă mulțumesc frumos pentru serviciile acordate! Cu siguranță o să vă recomand ori de câte ori voi avea ocazia!',
    testimonial2: 'Recomand cu cea mai mare încredere — responsabili, punctuali și o atitudine foarte frumoasă față de clienți. Ca sfat: apelați cu instalarea la ei — un specialist se vede când pune mâna! Mulțumesc și vă doresc succese!',
    testimonial3: 'Foarte frumos ceasul. Băieții foarte receptivi în cazul în care ai nevoie de ajutor. Instrucțiunile clare, ceasul ușor de instalat și calitativ.',
    testimonial4: 'Ceasul este fenomenal, îmi place enorm! A schimbat complet interiorul odăii noastre. Livrare rapidă, echipă bine organizată. Mulțumim enorm! ❤️🌸👋👍',
    testimonial5: 'A ajuns ceasul! 😍 Sunt foarte încântată, mama căuta un astfel de model de 3 ani! Calitativ, preț accesibil, ambalat frumos și estetic. Mulțumesc mult!',
    
    // Contact CTA
    contactCtaTitle: 'Hai să creăm ceva special împreună',
    contactCtaButton: 'Contactează-ne',
    
    // Footer
    footerTagline: 'pentru momente care contează',
    followUs: 'Urmărește-ne',
    privacy: 'Politica de confidențialitate',
    
    // Models page
    modelsPageTitle: 'Colecția noastră',
    modelsPageSubtitle: 'Descoperă ceasurile 3D care transformă orice spațiu',
    modelsContactTitle: 'Lasă-ne un mesaj și comandă și tu un ceas',
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
    subject: 'Subiect (opțional)',
    message: 'Mesaj',
    send: 'Trimite',
    sending: 'Se trimite...',
    messageSent: 'Mulțumim pentru mesaj!',
    messageDescription: 'Echipa Twelve te va contacta în curând cu un răspuns.',
    error: 'Eroare',
    errorDescription: 'A apărut o eroare. Te rugăm să încerci din nou.',
    contactFormTitle: 'Hai să creăm ceva special împreună',
    getInTouch: 'Informații de contact',
    address: 'Adresă',
    addressText: 'Chișinău, Moldova',
    
    // Privacy Policy
    privacyTitle: 'Politica de confidențialitate',
    privacyIntro: 'Confidențialitatea ta este prioritatea noastră. Această politică de confidențialitate explică modul în care colectăm, utilizăm și protejăm informațiile tale personale.',
    privacySection1Title: '1. Informațiile pe care le colectăm',
    privacySection1Text: 'Colectăm informații pe care ni le furnizezi direct, precum numele, adresa de email, numărul de telefon și detaliile comenzii atunci când plasezi o comandă sau ne contactezi.',
    privacySection2Title: '2. Cum folosim informațiile tale',
    privacySection2Text: 'Utilizăm informațiile tale pentru a procesa comenzile, a îmbunătăți serviciile noastre, a comunica cu tine și a-ți oferi suport clienți.',
    privacySection3Title: '3. Partajarea informațiilor',
    privacySection3Text: 'Nu vindem, închiriem sau partajăm informațiile tale personale cu terți, cu excepția cazului în care este necesar pentru procesarea comenzilor tale sau conform legii.',
    privacySection4Title: '4. Securitatea datelor',
    privacySection4Text: 'Implementăm măsuri de securitate pentru a proteja informațiile tale împotriva accesului neautorizat, modificării sau divulgării.',
    privacySection5Title: '5. Cookie-uri',
    privacySection5Text: 'Site-ul nostru poate utiliza cookie-uri pentru a îmbunătăți experiența ta de navigare și a analiza traficul pe site.',
    privacySection6Title: '6. Drepturile tale',
    privacySection6Text: 'Ai dreptul de a accesa, corecta sau șterge informațiile tale personale. Pentru orice solicitare, te rugăm să ne contactezi.',
    privacySection7Title: '7. Modificări ale politicii',
    privacySection7Text: 'Ne rezervăm dreptul de a actualiza această politică de confidențialitate. Orice modificare va fi publicată pe această pagină.',
    privacySection8Title: '8. Contact',
    privacySection8Text: 'Pentru întrebări sau preocupări legate de confidențialitate, ne poți contacta la adresa de email sau telefon afișată pe pagina de contact.',
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
    viewModels: 'Смотреть модели',
    
    // About section
    aboutBrandTitle: 'Мы Twelve и оживляем ваши стены',
    aboutBrandText: 'через 3D-часы, созданные вручную. Мы персонализируем каждую модель по вашему желанию — с именами, сообщениями, цитатами или логотипом вашего бизнеса.',
    aboutBrandText2: 'Современный дизайн, тонкие детали и нота эмоций в каждой минуте.',
    
    // Popular models
    popularModelsTitle: 'Популярные модели',
    viewAllModels: 'Смотреть все модели',
    
    // Testimonials
    happyCustomers: 'Наши счастливые клиенты',
    testimonial1: 'Часы великолепны, они прекрасно гармонируют с интерьером! Но... больше всего меня приятно удивила команда Twelve Clocks! Отзывчивые, любезные и очень приятные люди! Большое спасибо за предоставленные услуги! Обязательно буду рекомендовать при каждой возможности!',
    testimonial2: 'Рекомендую с полной уверенностью — ответственные, пунктуальные и очень приятное отношение к клиентам. Совет: обратитесь к ним для установки — профессионала видно сразу! Спасибо и желаю успехов!',
    testimonial3: 'Очень красивые часы. Ребята очень отзывчивые, если нужна помощь. Инструкции понятные, часы легко установить и качественные.',
    testimonial4: 'Часы феноменальны, мне очень нравятся! Они полностью изменили интерьер нашей комнаты. Быстрая доставка, хорошо организованная команда. Огромное спасибо! ❤️🌸👋👍',
    testimonial5: 'Часы прибыли! 😍 Я очень довольна, мама искала такую модель 3 года! Качественные, доступная цена, красиво и эстетично упакованы. Большое спасибо!',
    
    // Contact CTA
    contactCtaTitle: 'Давайте создадим что-то особенное вместе',
    contactCtaButton: 'Связаться с нами',
    
    // Footer
    footerTagline: 'для моментов, которые имеют значение',
    followUs: 'Следите за нами',
    privacy: 'Политика конфиденциальности',
    
    // Models page
    modelsPageTitle: 'Наша коллекция',
    modelsPageSubtitle: 'Откройте для себя 3D-часы, которые преображают любое пространство',
    modelsContactTitle: 'Оставьте нам сообщение и закажите часы',
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
    subject: 'Тема (необязательно)',
    message: 'Сообщение',
    send: 'Отправить',
    sending: 'Отправка...',
    messageSent: 'Спасибо за сообщение!',
    messageDescription: 'Команда Twelve свяжется с вами в ближайшее время.',
    error: 'Ошибка',
    errorDescription: 'Произошла ошибка. Пожалуйста, попробуйте еще раз.',
    contactFormTitle: 'Давайте создадим что-то особенное вместе',
    getInTouch: 'Контактная информация',
    address: 'Адрес',
    addressText: 'Кишинев, Молдова',
    
    // Privacy Policy
    privacyTitle: 'Политика конфиденциальности',
    privacyIntro: 'Ваша конфиденциальность является нашим приоритетом. Эта политика конфиденциальности объясняет, как мы собираем, используем и защищаем вашу личную информацию.',
    privacySection1Title: '1. Информация, которую мы собираем',
    privacySection1Text: 'Мы собираем информацию, которую вы предоставляете нам напрямую, такую как имя, адрес электронной почты, номер телефона и детали заказа, когда вы размещаете заказ или связываетесь с нами.',
    privacySection2Title: '2. Как мы используем вашу информацию',
    privacySection2Text: 'Мы используем вашу информацию для обработки заказов, улучшения наших услуг, общения с вами и предоставления поддержки клиентам.',
    privacySection3Title: '3. Обмен информацией',
    privacySection3Text: 'Мы не продаем, не сдаем в аренду и не передаем вашу личную информацию третьим лицам, за исключением случаев, когда это необходимо для обработки ваших заказов или в соответствии с законом.',
    privacySection4Title: '4. Безопасность данных',
    privacySection4Text: 'Мы принимаем меры безопасности для защиты вашей информации от несанкционированного доступа, изменения или раскрытия.',
    privacySection5Title: '5. Файлы cookie',
    privacySection5Text: 'Наш сайт может использовать файлы cookie для улучшения вашего опыта просмотра и анализа трафика на сайте.',
    privacySection6Title: '6. Ваши права',
    privacySection6Text: 'Вы имеете право получить доступ, исправить или удалить вашу личную информацию. Для любых запросов, пожалуйста, свяжитесь с нами.',
    privacySection7Title: '7. Изменения политики',
    privacySection7Text: 'Мы оставляем за собой право обновлять эту политику конфиденциальности. Любые изменения будут опубликованы на этой странице.',
    privacySection8Title: '8. Контакт',
    privacySection8Text: 'По вопросам или проблемам, связанным с конфиденциальностью, вы можете связаться с нами по адресу электронной почты или телефону, указанным на странице контактов.',
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
