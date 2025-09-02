"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => any
}

const translations = {
  en: {
    brand: "POD CLINIC",
    tagline: "Fitness & Performance Lab",
    nav: {
      home: "Home",
      services: "Services",
      experts: "Experts",
      testimonials: "Testimonials",
      contact: "Contact",
    },
    ctaBook: "Book Now",
    ctaServices: "Our Services",
    watchDemo: "Watch Demo Video",
    whatsIncluded: "What's Included:",
    bonusLabel: "Bonus:",
    idealFor: "Ideal for:",
    importantNote: "Important Note:",
    fit3d: {
      title: "Fit3D 3D Body Composition",
      desc: "The new standard for body composition. Get accurate 3D body measurements, composition analysis, and posture assessment in minutes.",
      bullets: [
        "Complete body measurements and composition (fat mass, muscle mass)",
        "3D body scan and visualization",
        "Posture and balance assessment",
        "Precise progress tracking with comparison tools",
        "Free InBody scan included",
      ],
      bonus: "Private measurement room - complete privacy guaranteed",
      note: "All data goes directly to your personal account on the device website. The center has no access to your private data.",
      images: ["/assets/fit3d-1.png", "/assets/fit3d-2.jpg", "/assets/fit3d-3.jpg"],
      youtubeUrl: "https://www.youtube.com/watch?v=fit3d-demo",
      instagramUrl: "https://www.instagram.com/reel/DODnMpCiOSa/",
    },
    complete: {
      title: "All Tests Package\n(Vo2Max + RMR + InBody + Fit3d)",
      desc: "The ultimate fitness assessment combining all our premium tests: VO2Max endurance test, resting metabolic rate measurement (body's calorie burn at rest), 3D body composition and measurements, and InBody analysis.",
      bullets: [
        "VO2Max cardiorespiratory fitness test (endurance)",
        "Resting Metabolic Rate (RMR) - body's calorie burn at rest",
        "Fit3D 3D body composition and measurements",
        "InBody body composition scanner",
        "Comprehensive performance report",
        "Personalized training and nutrition recommendations",
      ],
      note: "The most comprehensive fitness assessment available - perfect for serious athletes and fitness enthusiasts.",
      images: ["/assets/vo2-1.png", "/assets/rmr-1.jpg", "/assets/fit3d-1.png"],
      youtubeUrl: "https://www.youtube.com/watch?v=complete-package-demo",
    },
    vo2: {
      title: "VO2max Test",
      desc: "The gold standard to assess endurance and cardiorespiratory fitness. Results guide run training to continually improve capacity.",
      bullets: [
        "60‑min appointment & immediate debrief",
        "Graded treadmill exercise test",
        "Heart rate & breath‑by‑breath gas analysis",
        "Exercise intensity is increased in periods of about 1:30–2 minutes",
        "Test stops when the maximum capacity is reached",
        "Actual test time (without warm‑up and recovery) is 10–12 min",
        "Results are available immediately after the test",
        "PEAK exercise physiologist will explain test results",
        "Detailed report within 2 business days",
      ],
      bonus: "Body composition test included (InBody)",
      images: ["/assets/vo2-1.png", "/assets/vo2-2.png", "/assets/vo2-3.png"],
      youtubeUrl: "https://www.youtube.com/watch?v=vo2max-demo",
      instagramUrl: "https://www.instagram.com/reel/DODhayFiGWf/",
    },
    rmr: {
      title: "Resting Metabolic Rate (RMR)",
      desc: "An RMR test answers the question, How much should you eat? Your RMR is your body's baseline caloric requirement. Knowing your RMR enables you to verify if a training or nutrition program has increased or decreased your metabolism.",
      bullets: [
        "Immediate results explanation after the test",
        "Detailed report sent to client within 2 business days"
      ],
      bonus: "InBody test for free",
      aud: "Those with hormonal imbalances, Non-responders to standard diets (don't always get results), High muscle mass individuals (bodybuilders), Anyone with health conditions or differences that make standard equations ineffective",
      images: ["/assets/rmr-1.jpg", "/assets/rmr-2.png", "/assets/rmr-3.png"],
      youtubeUrl: "https://www.youtube.com/watch?v=rmr-demo",
      instagramUrl: "https://www.instagram.com/reel/DODks9PiEsO/",
    },
    inbody: {
      title: "Body Composition (InBody)",
      note: "Included for free with VO2max & RMR",
      aud: "Ideal for hormonal imbalances, non‑responders to standard diets, high muscle mass athletes, and special health cases.",
      images: ["/inbody-body-composition-scanner.png", "/inbody-results.png", "/inbody-analysis.png"],
      youtubeUrl: "https://www.youtube.com/watch?v=inbody-demo",
    },
    expert: {
      name: "Dr. Abdullah Al‑Seirfi",
      bio: "Performance assessment & exercise physiology specialist with 1000+ graded tests; lecturer and published contributor in sports nutrition, energy systems, and performance evaluation.",
    },
    testimonialsTitle: "What Clients Say",
    contactTitle: "Contact Us",
    learnMore: "Learn More",
    formName: "Name",
    formEmail: "Email",
    formMessage: "Message",
    formSend: "Send Message",
  },
  ar: {
    brand: "بود كلينك",
    tagline: "مختبر الأداء البدني",
    nav: {
      home: "الرئيسية",
      services: "الخدمات",
      experts: "خبراؤنا",
      testimonials: "آراء العملاء",
      contact: "تواصل",
    },
    ctaBook: "احجز الآن",
    ctaServices: "خدماتنا",
    watchDemo: "شاهد الفيديو التعريفي",
    whatsIncluded: "يشمل:",
    bonusLabel: "ميزة إضافية:",
    idealFor: "تزداد أهمية الاختبار للفئات التالية:",
    importantNote: "ملاحظة هامة:",
    fit3d: {
      title: "قياس مكونات الجسم ثلاثي الأبعاد Fit3D",
      desc: "المعيار الجديد لقياس مكونات وأبعاد الجسم. خلال دقائق سيحصل العميل على جميع قياسات ومكونات الجسم وتقييم للتوازن والقوام.",
      bullets: [
        "جميع قياسات ومكونات الجسم (كتلة الدهون، العضلات)",
        "تصوير ثلاثي الأبعاد للجسم",
        "تقييم للتوازن والقوام",
        "مقارنة وتتبع التطور بدقة عالية جدًا",
        "قياس على جهاز InBody مجاناً",
      ],
      bonus: "غرفة خاصة بالجهاز - مراعاة خصوصية المعلومات مكفولة",
      note: "يتم القياس بصورة منفردة من قبل العميل (لا حاجة للمساعدة) وجميع البيانات تصل للعميل من خلال حسابه الشخصي وليس للمركز أي بيانات خاصة بالعملاء.",
      images: ["/assets/fit3d-1.png", "/assets/fit3d-2.jpg", "/assets/fit3d-3.jpg"],
      youtubeUrl: "https://www.youtube.com/watch?v=fit3d-demo",
      instagramUrl: "https://www.instagram.com/reel/DODnMpCiOSa/",
    },
    complete: {
      title: "باقة كل الاختبارات\n(Vo2Max + RMR + InBody + Fit3d)",
      desc: "باقة الاختبارات الكاملة تشمل اختبار اللياقة البدنية (التحمل)، قياس ايض الراحة (صرف الجسم للسعرات خلال الراحة)، قياس مكونات وأبعاد الجسم ثلاثي الابعاد وجهاز مكونات الجسم ان بادي.",
      bullets: [
        "اختبار VO2Max للياقة القلبية التنفسية (التحمل)",
        "قياس معدل الأيض أثناء الراحة (RMR) - صرف الجسم للسعرات خلال الراحة",
        "Fit3D قياس مكونات وأبعاد الجسم ثلاثي الأبعاد",
        "جهاز مكونات الجسم InBody",
        "تقرير أداء شامل",
        "توصيات مخصصة للتدريب والتغذية",
      ],
      note: "أشمل تقييم للياقة البدنية متاح - مثالي للرياضيين الجادين وعشاق اللياقة البدنية.",
      images: ["/assets/vo2-1.png", "/assets/rmr-1.jpg", "/assets/fit3d-1.png"],
      youtubeUrl: "https://www.youtube.com/watch?v=complete-package-demo",
    },
    vo2: {
      title: "اختبار قياس Vo2max",
      desc: "يعد هذا الاختبار المعيار الذهبي للحكم على مستوى التحمل والكفاءة القلبية التنفسية. توجه نتائجه خطط الجري لتحسين القدرات باستمرار.",
      bullets: [
        "موعد 60 دقيقة وشرح فوري للنتائج",
        "اختبار جهدي متدرج على جهاز المشي",
        "قياس معدل ضربات القلب وتحليل غازات التنفس (نفسًا بنَفَس)",
        "تزداد شدة التمرين كل 1:30 – 2 دقيقة تقريبًا",
        "يتوقف الاختبار عند الوصول إلى أقصى قدرة",
        "المدة الفعلية للاختبار (بدون الإحماء والاسترداد) هي 10–12 دقيقة",
        "النتائج متاحة فور انتهاء الاختبار",
        "أخصائي فسيولوجيا التمرين يشرح النتائج",
        "تقرير تفصيلي خلال يومي عمل",
      ],
      bonus: "قياس مكونات الجسم مجاناً (InBody)",
      images: ["/assets/vo2-1.png", "/assets/vo2-2.png", "/assets/vo2-3.png"],
      youtubeUrl: "https://www.youtube.com/watch?v=vo2max-demo",
      instagramUrl: "https://www.instagram.com/reel/DODhayFiGWf/",
    },
    rmr: {
      title: "اختبار معدل الأيض أثناء الراحة (RMR)",
      desc: "يجيب اختبار معدل الأيض أثناء الراحة عن سؤال: كم يجب أن تأكل؟ يمثل RMR الاحتياج الأساسي للسعرات الحرارية في حالة الراحة. تساعدك معرفته على التحقق مما إذا كان برنامج التدريب أو التغذية قد زاد أو خفّض من معدل الأيض لديك.",
      bullets: [
        "شرح النتائج مباشرة بعد الاختبار",
        "إرسال تقرير مفصل للعميل خلال يومي عمل بعد إجراء الاختبار"
      ],
      bonus: "قياس مكونات الجسم مجاناً (InBody)",
      aud: "من لديهم اختلالات هرمونية، الذين لا يستجيبون للأنظمة الغذائية الاعتيادية (لا يحصلون على نتائج دائماً)، ذوو الكتلة العضلية الكبيرة (لاعبو بناء الأجسام)، وجميع الأشخاص الذين لديهم اختلافات أو حالات صحية تجعل المعادلات العامة غير فعّالة في الوصول إلى نتائج مناسبة لهم",
      images: ["/assets/rmr-1.jpg", "/assets/rmr-2.png", "/assets/rmr-3.png"],
      youtubeUrl: "https://www.youtube.com/watch?v=rmr-demo",
      instagramUrl: "https://www.instagram.com/reel/DODks9PiEsO/",
    },
    inbody: {
      title: "قياس مكونات الجسم (InBody)",
      note: "مجاني مع اختبارات VO2max وRMR",
      aud: "مهم لذوي الاختلالات الهرمونية، وضعف الاستجابة للأنظمة الاعتيادية، وذوي الكتلة العضلية الكبيرة، والحالات الصحية الخاصة.",
      images: ["/inbody-body-composition-scanner.png", "/inbody-results.png", "/inbody-analysis.png"],
      youtubeUrl: "https://www.youtube.com/watch?v=inbody-demo",
    },
    expert: {
      name: "د. عبدالله الصيرفي",
      bio: "مختص بتقييم الأداء والاختبارات الفسيولوجية، أجرى 1000+ اختبار جهدي؛ محاضر وناشر في تغذية الرياضيين وأنظمة الطاقة وتقييم الأداء.",
    },
    testimonialsTitle: "آراء العملاء",
    contactTitle: "تواصل معنا",
    learnMore: "اعرف المزيد",
    formName: "الاسم",
    formEmail: "البريد الإلكتروني",
    formMessage: "الرسالة",
    formSend: "إرسال الرسالة",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("pod-clinic-language") as Language
    if (saved && (saved === "en" || saved === "ar")) {
      setLanguage(saved)
      document.documentElement.dir = saved === "ar" ? "rtl" : "ltr"
      document.documentElement.lang = saved
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    if (mounted) {
      localStorage.setItem("pod-clinic-language", lang)
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
      document.documentElement.lang = lang
    }
  }

  const t = (key: string) => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
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
