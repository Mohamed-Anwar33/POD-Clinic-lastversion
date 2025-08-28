"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "./language-context"

export function ExpertsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [count, setCount] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      const timer = setInterval(() => {
        setCount((prev) => {
          if (prev < 1000) {
            return prev + 25
          }
          clearInterval(timer)
          return 1000
        })
      }, 30)

      return () => clearInterval(timer)
    }
  }, [isVisible])

  return (
    <>
      {/* Curved Top Divider */}
      <div className="relative overflow-hidden">
        <svg viewBox="0 0 1200 120" className="w-full h-20 fill-gradient-to-r from-blue-900 to-teal-600">
          <defs>
            <linearGradient id="expertGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0A1F44" />
              <stop offset="100%" stopColor="#26A69A" />
            </linearGradient>
          </defs>
          <path fill="url(#expertGradient)" d="M0,0 C300,60 900,60 1200,0 L1200,120 L0,120 Z" />
        </svg>
      </div>

      <section
        ref={sectionRef}
        id="experts"
        className="py-20 md:py-28 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0A1F44 0%, #102A56 50%, #26A69A 100%)",
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2
              className={`text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight transition-all duration-800 ${
                isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"
              }`}
            >
              {t("nav.experts")}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="glass-card-dark rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div
                  className={`transition-all duration-800 ${
                    isVisible ? "animate-fade-in-left opacity-100" : "opacity-0"
                  }`}
                  data-aos="fade-right"
                >
                  <div className="relative">
                    <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-teal-500 shadow-2xl shadow-teal-500/30">
                      <img
                        src="/assets/dr-abdullah-al-seirfi.jpg"
                        alt={t("expert.name")}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute -bottom-4 right-0 md:-right-4 bg-teal-500 text-white rounded-full p-4 shadow-lg">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${isVisible ? "animate-count-up" : ""}`}>{count}+</div>
                        <div className="text-xs">Tests</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`transition-all duration-800 ${
                    isVisible ? "animate-fade-in-right opacity-100" : "opacity-0"
                  }`}
                  data-aos="fade-left"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{t("expert.name")}</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">{t("expert.bio")}</p>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                      <div className="text-2xl font-bold text-teal-400">1000+</div>
                      <div className="text-sm text-gray-300">Tests Conducted</div>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                      <div className="text-2xl font-bold text-teal-400">10+</div>
                      <div className="text-sm text-gray-300">Years Experience</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
