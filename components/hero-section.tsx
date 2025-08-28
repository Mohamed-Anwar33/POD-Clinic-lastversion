"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { useLanguage } from "./language-context"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/1620904366370959664_400.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/herosection vedio.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 md:-mt-12">
        <div
          className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"}`}
          data-aos="fade-up"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight text-balance leading-tight">
            {t("tagline")}
          </h1>
          {/* Subtitle removed as requested */}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" data-aos="zoom-in" data-aos-delay="200">
            <Button
              onClick={() => window.open("https://wa.me/96566656024?text=مرحباً، أريد حجز موعد في مستوصف بود الصحي", "_blank")}
              size="lg"
              className="bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 text-lg"
            >
              {t("ctaBook")}
            </Button>

            <Button
              onClick={() => scrollToSection("services")}
              variant="ghost"
              size="lg"
              className="text-white border-2 border-white/40 hover:bg-white/20 hover:border-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 text-lg backdrop-blur-sm"
            >
              <Play className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2" />
              {t("ctaServices")}
            </Button>
          </div>
        </div>
      </div>

      {/* Curved Bottom Divider */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg viewBox="0 0 1200 120" className="block w-full h-20 fill-white">
          <path d="M0,120 C300,60 900,60 1200,120 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  )
}
