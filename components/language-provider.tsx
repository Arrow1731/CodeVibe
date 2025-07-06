"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Language = "uz" | "ru" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  uz: {
    // Navigation
    "nav.home": "Bosh sahifa",
    "nav.portfolio": "Loyihalar",
    "nav.contact": "Aloqa",

    // Hero
    "hero.title": "Professional Dasturlash Jamoasi",
    "hero.subtitle": "Biz zamonaviy veb-saytlar, dasturlar va Telegram botlar yaratamiz",
    "hero.viewWork": "Ishlarimizni ko'ring",
    "hero.contact": "Bog'lanish",

    // Services
    "services.title": "Bizning Xizmatlar",
    "services.subtitle": "Biz turli xil texnologiyalar bilan ishlash bo'yicha keng tajribaga egamiz",
    "services.websites": "Veb-saytlar",
    "services.websitesDesc": "Zamonaviy va tez veb-saytlar",
    "services.programs": "Dasturlar",
    "services.programsDesc": "Desktop va mobil ilovalar",
    "services.bots": "Telegram botlar",
    "services.botsDesc": "Avtomatlashtirish uchun botlar",
    "services.webDev": "Veb Dasturlash",
    "services.webDevDesc": "React, Next.js, Vue.js bilan zamonaviy veb-ilovalar",
    "services.mobileDev": "Mobil Dasturlash",
    "services.mobileDevDesc": "iOS va Android uchun native va cross-platform ilovalar",
    "services.botDev": "Bot Dasturlash",
    "services.botDevDesc": "Telegram, Discord va boshqa platformalar uchun botlar",
    "services.design": "UI/UX Dizayn",
    "services.designDesc": "Foydalanuvchi tajribasi va interfeys dizayni",
    "services.backend": "Backend Dasturlash",
    "services.backendDesc": "API, ma'lumotlar bazasi va server tomonidagi mantiq",
    "services.security": "Xavfsizlik",
    "services.securityDesc": "Ilovalar va ma'lumotlarni himoya qilish",

    // Team
    "team.title": "Bizning Jamoa",
    "team.subtitle": "Professional dasturchilar jamoasi",
    "team.developer1Role": "Frontend Dasturchi",
    "team.developer1Bio": "React va Vue.js bo'yicha mutaxassis",
    "team.developer2Role": "Backend Dasturchi",
    "team.developer2Bio": "Node.js va Python bo'yicha mutaxassis",

    // Portfolio
    "portfolio.title": "Bizning Loyihalar",
    "portfolio.subtitle": "Biz yaratgan eng yaxshi ishlar",
    "portfolio.all": "Barchasi",
    "portfolio.websites": "Veb-saytlar",
    "portfolio.programs": "Dasturlar",
    "portfolio.bots": "Botlar",
    "portfolio.website": "Veb-sayt",
    "portfolio.program": "Dastur",
    "portfolio.bot": "Bot",
    "portfolio.viewLive": "Ko'rish",
    "portfolio.viewCode": "Kod",
    "portfolio.noProjects": "Loyihalar topilmadi",

    // Contact
    "contact.title": "Biz bilan bog'laning",
    "contact.subtitle": "Loyihangizni muhokama qilish uchun biz bilan bog'laning",
    "contact.formTitle": "Loyiha buyurtma berish",
    "contact.name": "Ism",
    "contact.email": "Email",
    "contact.phone": "Telefon",
    "contact.projectType": "Loyiha turi",
    "contact.projectTypePlaceholder": "Veb-sayt, dastur, bot...",
    "contact.message": "Xabar",
    "contact.send": "Yuborish",
    "contact.sending": "Yuborilmoqda...",
    "contact.success": "Muvaffaqiyat!",
    "contact.successMessage": "Xabaringiz yuborildi. Tez orada javob beramiz!",
    "contact.error": "Xatolik!",
    "contact.errorMessage": "Xabar yuborishda xatolik yuz berdi",
    "contact.info": "Aloqa ma'lumotlari",
    "contact.emailLabel": "Email manzil",
    "contact.phoneLabel": "Telefon raqam",
    "contact.locationLabel": "Manzil",
    "contact.location": "Toshkent, O'zbekiston",
    "contact.workingHours": "Ish vaqti",
    "contact.weekdays": "Dush-Juma",
    "contact.saturday": "Shanba",
    "contact.sunday": "Yakshanba",
    "contact.closed": "Dam olish",

    // Footer
    "footer.description": "Biz professional veb-saytlar, dasturlar va botlar yaratamiz",
    "footer.services": "Xizmatlar",
    "footer.contact": "Aloqa",
    "footer.rights": "Barcha huquqlar himoyalangan",

    // Common
    "common.loading": "Yuklanmoqda...",
  },
  ru: {
    // Navigation
    "nav.home": "Главная",
    "nav.portfolio": "Портфолио",
    "nav.contact": "Контакты",

    // Hero
    "hero.title": "Профессиональная Команда Разработчиков",
    "hero.subtitle": "Мы создаем современные веб-сайты, программы и Telegram боты",
    "hero.viewWork": "Посмотреть работы",
    "hero.contact": "Связаться",

    // Services
    "services.title": "Наши Услуги",
    "services.subtitle": "У нас большой опыт работы с различными технологиями",
    "services.websites": "Веб-сайты",
    "services.websitesDesc": "Современные и быстрые веб-сайты",
    "services.programs": "Программы",
    "services.programsDesc": "Desktop и мобильные приложения",
    "services.bots": "Telegram боты",
    "services.botsDesc": "Боты для автоматизации",
    "services.webDev": "Веб Разработка",
    "services.webDevDesc": "Современные веб-приложения на React, Next.js, Vue.js",
    "services.mobileDev": "Мобильная Разработка",
    "services.mobileDevDesc": "Native и cross-platform приложения для iOS и Android",
    "services.botDev": "Разработка Ботов",
    "services.botDevDesc": "Боты для Telegram, Discord и других платформ",
    "services.design": "UI/UX Дизайн",
    "services.designDesc": "Пользовательский опыт и дизайн интерфейсов",
    "services.backend": "Backend Разработка",
    "services.backendDesc": "API, базы данных и серверная логика",
    "services.security": "Безопасность",
    "services.securityDesc": "Защита приложений и данных",

    // Team
    "team.title": "Наша Команда",
    "team.subtitle": "Команда профессиональных разработчиков",
    "team.developer1Role": "Frontend Разработчик",
    "team.developer1Bio": "Специалист по React и Vue.js",
    "team.developer2Role": "Backend Разработчик",
    "team.developer2Bio": "Специалист по Node.js и Python",

    // Portfolio
    "portfolio.title": "Наши Проекты",
    "portfolio.subtitle": "Лучшие работы, которые мы создали",
    "portfolio.all": "Все",
    "portfolio.websites": "Веб-сайты",
    "portfolio.programs": "Программы",
    "portfolio.bots": "Боты",
    "portfolio.website": "Веб-сайт",
    "portfolio.program": "Программа",
    "portfolio.bot": "Бот",
    "portfolio.viewLive": "Посмотреть",
    "portfolio.viewCode": "Код",
    "portfolio.noProjects": "Проекты не найдены",

    // Contact
    "contact.title": "Свяжитесь с нами",
    "contact.subtitle": "Свяжитесь с нами для обсуждения вашего проекта",
    "contact.formTitle": "Заказать проект",
    "contact.name": "Имя",
    "contact.email": "Email",
    "contact.phone": "Телефон",
    "contact.projectType": "Тип проекта",
    "contact.projectTypePlaceholder": "Веб-сайт, программа, бот...",
    "contact.message": "Сообщение",
    "contact.send": "Отправить",
    "contact.sending": "Отправка...",
    "contact.success": "Успешно!",
    "contact.successMessage": "Ваше сообщение отправлено. Мы скоро ответим!",
    "contact.error": "Ошибка!",
    "contact.errorMessage": "Произошла ошибка при отправке сообщения",
    "contact.info": "Контактная информация",
    "contact.emailLabel": "Email адрес",
    "contact.phoneLabel": "Номер телефона",
    "contact.locationLabel": "Адрес",
    "contact.location": "Ташкент, Узбекистан",
    "contact.workingHours": "Рабочие часы",
    "contact.weekdays": "Пн-Пт",
    "contact.saturday": "Суббота",
    "contact.sunday": "Воскресенье",
    "contact.closed": "Выходной",

    // Footer
    "footer.description": "Мы создаем профессиональные веб-сайты, программы и боты",
    "footer.services": "Услуги",
    "footer.contact": "Контакты",
    "footer.rights": "Все права защищены",

    // Common
    "common.loading": "Загрузка...",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.portfolio": "Portfolio",
    "nav.contact": "Contact",

    // Hero
    "hero.title": "Professional Development Team",
    "hero.subtitle": "We create modern websites, programs and Telegram bots",
    "hero.viewWork": "View Our Work",
    "hero.contact": "Contact Us",

    // Services
    "services.title": "Our Services",
    "services.subtitle": "We have extensive experience working with various technologies",
    "services.websites": "Websites",
    "services.websitesDesc": "Modern and fast websites",
    "services.programs": "Programs",
    "services.programsDesc": "Desktop and mobile applications",
    "services.bots": "Telegram bots",
    "services.botsDesc": "Bots for automation",
    "services.webDev": "Web Development",
    "services.webDevDesc": "Modern web applications with React, Next.js, Vue.js",
    "services.mobileDev": "Mobile Development",
    "services.mobileDevDesc": "Native and cross-platform apps for iOS and Android",
    "services.botDev": "Bot Development",
    "services.botDevDesc": "Bots for Telegram, Discord and other platforms",
    "services.design": "UI/UX Design",
    "services.designDesc": "User experience and interface design",
    "services.backend": "Backend Development",
    "services.backendDesc": "API, databases and server-side logic",
    "services.security": "Security",
    "services.securityDesc": "Application and data protection",

    // Team
    "team.title": "Our Team",
    "team.subtitle": "Team of professional developers",
    "team.developer1Role": "Frontend Developer",
    "team.developer1Bio": "React and Vue.js specialist",
    "team.developer2Role": "Backend Developer",
    "team.developer2Bio": "Node.js and Python specialist",

    // Portfolio
    "portfolio.title": "Our Projects",
    "portfolio.subtitle": "The best work we have created",
    "portfolio.all": "All",
    "portfolio.websites": "Websites",
    "portfolio.programs": "Programs",
    "portfolio.bots": "Bots",
    "portfolio.website": "Website",
    "portfolio.program": "Program",
    "portfolio.bot": "Bot",
    "portfolio.viewLive": "View Live",
    "portfolio.viewCode": "View Code",
    "portfolio.noProjects": "No projects found",

    // Contact
    "contact.title": "Contact Us",
    "contact.subtitle": "Get in touch with us to discuss your project",
    "contact.formTitle": "Order a Project",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.projectType": "Project Type",
    "contact.projectTypePlaceholder": "Website, program, bot...",
    "contact.message": "Message",
    "contact.send": "Send",
    "contact.sending": "Sending...",
    "contact.success": "Success!",
    "contact.successMessage": "Your message has been sent. We will reply soon!",
    "contact.error": "Error!",
    "contact.errorMessage": "An error occurred while sending the message",
    "contact.info": "Contact Information",
    "contact.emailLabel": "Email Address",
    "contact.phoneLabel": "Phone Number",
    "contact.locationLabel": "Address",
    "contact.location": "Tashkent, Uzbekistan",
    "contact.workingHours": "Working Hours",
    "contact.weekdays": "Mon-Fri",
    "contact.saturday": "Saturday",
    "contact.sunday": "Sunday",
    "contact.closed": "Closed",

    // Footer
    "footer.description": "We create professional websites, programs and bots",
    "footer.services": "Services",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved",

    // Common
    "common.loading": "Loading...",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ru")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["uz", "ru", "en"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
