export type Lang = 'en' | 'ar'
export type T = { en: string; ar: string }

// Fill these in; empty links are hidden automatically.
export const LINKS = {
  email: 'abdullahmouawad.dev@gmail.com',
  phone: '+201151997479',
  github: '',
  linkedin: '',
}

export const ui = {
  nav: {
    work: { en: 'Work', ar: 'أعمالي' },
    exp: { en: 'Experience', ar: 'الخبرة' },
    skills: { en: 'Skills', ar: 'المهارات' },
    contact: { en: 'Contact', ar: 'تواصل' },
  },
  hello: { en: "Hi, I'm", ar: 'أهلاً، أنا' },
  name: { en: 'Abdullah Mouawad', ar: 'عبدالله معوض' },
  roles: {
    en: ['Flutter Developer', 'Mobile App Architect', 'Laravel Backend Dev'],
    ar: ['مطور Flutter', 'مهندس تطبيقات موبايل', 'مطور Laravel'],
  },
  tagline: {
    en: 'I build fast, beautiful, production-grade iOS & Android apps — from the first sketch to the App Store.',
    ar: 'ببني تطبيقات iOS و Android سريعة وشيك وجاهزة للإنتاج — من أول فكرة لحد النشر على المتجر.',
  },
  cta1: { en: 'View my work', ar: 'شوف أعمالي' },
  cta2: { en: "Let's talk", ar: 'خلينا نتكلم' },
  stats: [
    { n: 2, plus: true, l: { en: 'Years experience', ar: 'سنين خبرة' } },
    { n: 10, plus: true, l: { en: 'Apps shipped', ar: 'تطبيق منشور' } },
    { n: 1000, plus: true, l: { en: 'Downloads (Marsaai)', ar: 'تحميل (مرساي)' } },
    { n: 2, plus: false, l: { en: 'Stores: iOS & Android', ar: 'متجرين: iOS و Android' } },
  ] as { n: number; plus: boolean; l: T }[],
  workTitle: { en: 'Selected work', ar: 'أعمال مختارة' },
  workSub: { en: 'Real apps, real users, live on the stores.', ar: 'تطبيقات حقيقية، مستخدمين حقيقيين، منشورة على المتاجر.' },
  all: { en: 'All', ar: 'الكل' },
  cats: {
    mobile: { en: 'Mobile', ar: 'موبايل' },
    pos: { en: 'POS', ar: 'نقاط بيع' },
  },
  expTitle: { en: 'Experience', ar: 'الخبرة' },
  skillsTitle: { en: 'Toolbox', ar: 'أدواتي' },
  contactTitle: { en: "Got an app idea? Let's build it.", ar: 'عندك فكرة تطبيق؟ نبنيها سوا.' },
  contactSub: { en: 'Open for freelance and full-time opportunities.', ar: 'متاح للعمل الحر والوظائف بدوام كامل.' },
  copy: { en: 'Copy email', ar: 'انسخ الإيميل' },
  copied: { en: 'Copied!', ar: 'اتنسخ!' },
  view: { en: 'Details', ar: 'التفاصيل' },
  close: { en: 'Close', ar: 'إغلاق' },
  features: { en: 'Highlights', ar: 'أهم المميزات' },
  stack: { en: 'Tech stack', ar: 'التقنيات' },
}

export type Project = {
  id: string
  name: T
  cat: 'mobile' | 'pos'
  year: string
  hue: [string, string]
  blurb: T
  features: T[]
  stack: string[]
  shots: string[]
  /** shots are store screenshots with their own device frame */
  poster?: boolean
  logo?: string
}

export const projects: Project[] = [
  {
    id: 'maly',
    name: { en: 'Maly POS', ar: 'مالي POS' },
    cat: 'pos',
    year: '2026',
    hue: ['#22d3ee', '#6366f1'],
    blurb: {
      en: 'A full retail point-of-sale: multi-branch, offline-first with background sync, ZATCA e-invoicing and NearPay card payments.',
      ar: 'نظام نقاط بيع متكامل: فروع متعددة، يشتغل أوفلاين مع مزامنة تلقائية، فواتير ZATCA ودفع بالكارت عبر NearPay.',
    },
    features: [
      { en: 'Offline-first sales with conflict-safe invoice counters & sync', ar: 'مبيعات أوفلاين مع مزامنة وعدّاد فواتير آمن من التعارض' },
      { en: 'Shifts, held invoices, returns, stock transfers, customer credit', ar: 'ورديات، فواتير معلّقة، مرتجعات، تحويل مخزون، آجل العملاء' },
      { en: 'Role & permission engine per branch and device', ar: 'نظام صلاحيات وأدوار لكل فرع وجهاز' },
      { en: 'Receipt printing, ZATCA reports, Arabic/English localisation', ar: 'طباعة إيصالات، تقارير ZATCA، واجهة عربي/إنجليزي' },
    ],
    stack: ['Flutter', 'Dart', 'REST', 'SQLite', 'ZATCA', 'NearPay'],
    shots: ['/projects/maly/1.webp', '/projects/maly/2.webp', '/projects/maly/4.webp', '/projects/maly/3.webp'],
  },
  {
    id: 'moneeb',
    name: { en: 'Moneeb', ar: 'منيب' },
    cat: 'mobile',
    year: '2026',
    hue: ['#f59e0b', '#10b981'],
    blurb: {
      en: 'A trusted platform for Umrah on behalf of others — request it for the deceased, ill or incapacitated, and follow every stage with photo & video proof and live location.',
      ar: 'منصة موثوقة لأداء عمرة البدل — اطلب العمرة عن متوفى أو مريض أو عاجز، وتابع كل مرحلة بالصور والفيديو والموقع المباشر.',
    },
    features: [
      { en: 'Create and track multiple Umrah requests with live status', ar: 'إنشاء ومتابعة أكثر من طلب عمرة بحالة لحظية' },
      { en: 'Every ritual stage documented with photos and video', ar: 'توثيق كل مرحلة من المناسك بالصور والفيديو' },
      { en: "Live location of the performer, active only during the task", ar: 'الموقع المباشر لمقدم العمرة، ويعمل فقط أثناء المهمة' },
      { en: 'Verified performers; three roles — requester, performer, guest', ar: 'مقدمو عمرة معتمدون؛ ثلاث أدوار — طالب، مقدم، ضيف' },
      { en: 'Qibla compass, prayer times and stories feed, fully Arabic/RTL', ar: 'بوصلة القبلة ومواقيت الصلاة وقصص، بواجهة عربية RTL' },
    ],
    stack: ['Flutter', 'Firebase', 'Live Location', 'FCM', 'Codemagic'],
    shots: ['/projects/moneeb/1.webp', '/projects/moneeb/2.webp', '/projects/moneeb/3.webp', '/projects/moneeb/4.webp', '/projects/moneeb/5.webp', '/projects/moneeb/6.webp'],
    poster: true,
    logo: '/projects/moneeb/logo.webp',
  },
  {
    id: 'marsaai',
    name: { en: 'Marsaai', ar: 'مرساي' },
    cat: 'mobile',
    year: '2025',
    hue: ['#38bdf8', '#2563eb'],
    blurb: {
      en: 'Seafood restaurant app with table reservation, a real-time waiting queue and in-restaurant ordering. 1,000+ downloads.',
      ar: 'تطبيق مطعم مأكولات بحرية: حجز طاولات، طابور انتظار لحظي وطلب الأكل من داخل المطعم. +1000 تحميل.',
    },
    features: [
      { en: 'Live queue with position tracking, auto-redirect to menu', ar: 'طابور لحظي بتتبع الدور وتحويل تلقائي للمنيو' },
      { en: 'Smart table assignment before ordering', ar: 'توزيع ذكي للطاولات قبل الطلب' },
      { en: 'FCM push for order & table alerts', ar: 'إشعارات FCM لحالة الطلب والطاولة' },
    ],
    stack: ['Flutter', 'Firebase', 'FCM', 'REST', 'Provider'],
    shots: ['/projects/marsaai/1.jpg', '/projects/marsaai/2.jpg', '/projects/marsaai/3.jpg'],
  },
  {
    id: 'shure',
    name: { en: 'Shure — Telemedicine', ar: 'شُور — طب عن بُعد' },
    cat: 'mobile',
    year: '2025',
    hue: ['#34d399', '#0ea5e9'],
    blurb: {
      en: 'Two apps (patient + doctor) for remote consultations: video/voice calls, chat, payments and medical records.',
      ar: 'تطبيقين (مريض + دكتور) للاستشارات عن بُعد: مكالمات فيديو وصوت، شات، دفع وسجلات طبية.',
    },
    features: [
      { en: 'Real-time chat with images, voice notes and files', ar: 'شات لحظي بصور ورسائل صوتية وملفات' },
      { en: 'Edfapay online payments & slot scheduling', ar: 'دفع أونلاين عبر Edfapay وجدولة المواعيد' },
      { en: 'Diagnoses, prescriptions & history; CI/CD with Codemagic', ar: 'تشخيص وروشتات وسجل؛ CI/CD عبر Codemagic' },
    ],
    stack: ['Flutter', 'Video/Voice', 'FCM', 'Edfapay', 'Codemagic'],
    shots: [],
  },
  {
    id: 'tamam',
    name: { en: 'Tamam Services', ar: 'تمام للخدمات' },
    cat: 'mobile',
    year: '2025',
    hue: ['#a78bfa', '#ec4899'],
    blurb: {
      en: 'Service marketplace connecting users with nearby carpenters, plumbers, electricians and heavy equipment providers.',
      ar: 'ماركت للخدمات يربط المستخدم بأقرب نجار وسباك وكهربائي ومعدات ثقيلة.',
    },
    features: [
      { en: 'Map-based discovery & dual role (user / provider) in one app', ar: 'اكتشاف على الخريطة ودورين (مستخدم/مزود) في تطبيق واحد' },
      { en: 'Order tracking, push notifications, dark mode, AR/EN', ar: 'تتبع الطلبات، إشعارات، دارك مود، عربي/إنجليزي' },
    ],
    stack: ['Flutter', 'Google Maps', 'Firebase', 'Provider'],
    shots: ['/projects/tamam/1.jpg', '/projects/tamam/2.jpg', '/projects/tamam/3.jpg'],
  },
  {
    id: 'salon',
    name: { en: 'Salon', ar: 'صالون' },
    cat: 'mobile',
    year: '2025',
    hue: ['#fb7185', '#f59e0b'],
    blurb: {
      en: 'Find nearby barbers on a map, browse portfolios, book appointments and chat in real time.',
      ar: 'دوّر على أقرب حلاق على الخريطة، شوف أعماله، احجز موعد واتكلم معاه لحظياً.',
    },
    features: [
      { en: 'Realtime chat on Pusher, appointment booking', ar: 'شات لحظي عبر Pusher وحجز مواعيد' },
      { en: 'Interactive Google Map with ratings', ar: 'خريطة تفاعلية بالتقييمات' },
    ],
    stack: ['Flutter', 'Pusher', 'Google Maps', 'Firebase'],
    shots: [],
  },
  {
    id: 'egypt',
    name: { en: 'Egypt Stores', ar: 'مخازن مصر' },
    cat: 'mobile',
    year: '2024',
    hue: ['#f97316', '#eab308'],
    blurb: {
      en: 'B2B2C e-commerce system: customer, vendor and delivery apps synced through custom APIs.',
      ar: 'نظام تجارة إلكترونية B2B2C: تطبيق عميل وتاجر وتوصيل مرتبطين بـ APIs مخصصة.',
    },
    features: [
      { en: 'Built the customer app end-to-end (cart, checkout, tracking)', ar: 'بنيت تطبيق العميل كامل (سلة، دفع، تتبع)' },
      { en: 'Designed APIs syncing all three apps', ar: 'صممت APIs تربط التطبيقات التلاتة' },
    ],
    stack: ['Flutter', 'Laravel', 'REST', 'Firebase'],
    shots: [],
  },
]

export const experience: { role: T; org: string; period: T; where: T; points: T[] }[] = [
  {
    role: { en: 'Freelance Flutter Developer', ar: 'مطور Flutter (فريلانس)' },
    org: 'Tarmeez Tech',
    period: { en: 'Mar 2025 — Present', ar: 'مارس 2025 — الآن' },
    where: { en: 'Remote · Saudi Arabia', ar: 'عن بُعد · السعودية' },
    points: [
      { en: 'Own projects end-to-end: requirements, UI/UX, build, deploy, iterate.', ar: 'مسؤول عن المشاريع من الألف للياء: متطلبات، تصميم، تطوير، نشر وتحديثات.' },
      { en: 'Shipped Shure (telemedicine) and Marsaai (restaurant) to both stores.', ar: 'نشرت Shure (طب عن بُعد) و Marsaai (مطعم) على المتجرين.' },
    ],
  },
  {
    role: { en: 'Flutter Developer', ar: 'مطور Flutter' },
    org: 'Noouh For Integrated Solutions',
    period: { en: 'Apr 2024 — May 2025', ar: 'أبريل 2024 — مايو 2025' },
    where: { en: 'On-site', ar: 'في المقر' },
    points: [
      { en: 'Primary developer on multiple apps; built most functionality independently.', ar: 'المطور الرئيسي في عدة تطبيقات وبنيت أغلب الميزات باستقلالية.' },
      { en: 'Bridged Flutter and Laravel backend teams using backend know-how.', ar: 'كنت حلقة وصل بين فريق Flutter والباك إند بفضل خبرتي في Laravel.' },
    ],
  },
]

export const skills: { title: T; items: string[] }[] = [
  { title: { en: 'Mobile', ar: 'موبايل' }, items: ['Flutter', 'Dart', 'Provider', 'Bloc', 'GetX', 'Hive', 'SQLite'] },
  { title: { en: 'Backend & APIs', ar: 'باك إند' }, items: ['Laravel', 'PHP', 'REST', 'Firebase', 'Pusher', 'FCM'] },
  { title: { en: 'Architecture', ar: 'المعمارية' }, items: ['Clean Architecture', 'MVC', 'OOP', 'SOLID', 'Offline-first'] },
  { title: { en: 'Delivery', ar: 'النشر' }, items: ['Git', 'GitHub Actions', 'Codemagic', 'Play Store', 'App Store', 'Jira'] },
]
