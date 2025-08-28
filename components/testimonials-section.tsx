"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "./language-context"

export function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const { t, language } = useLanguage()

  const testimonials = [
    {
      en: "Professional, clear results, and immediate insights. The VO2max test helped me understand my training zones perfectly.",
      ar: "التجربة منظمة والنتائج واضحة… أوصي بها. اختبار VO2max ساعدني على فهم مناطق التدريب بشكل مثالي.",
      name: "Ahmed Al-Rashid",
      role: "Marathon Runner",
      rating: 5,
    },
    {
      en: "The RMR test revealed why my diet wasn't working. Dr. Abdullah's explanation was thorough and actionable.",
      ar: "اختبار RMR كشف لي سبب عدم نجاح نظامي الغذائي. شرح د. عبدالله كان شاملاً وقابلاً للتطبيق.",
      name: "Sarah Mohammed",
      role: "Fitness Enthusiast",
      rating: 5,
    },
    {
      en: "Exceptional service and cutting-edge equipment. The detailed report helped optimize my training program.",
      ar: "خدمة استثنائية ومعدات متطورة. التقرير المفصل ساعد في تحسين برنامج التدريب الخاص بي.",
      name: "Omar Hassan",
      role: "Professional Athlete",
      rating: 5,
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0A1F44 0%, #102A56 100%)",
      }}
    >
      {/* Curved Top Divider */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden">
        <svg viewBox="0 0 1200 120" className="w-full h-20 fill-teal-500">
          <path d="M0,0 C300,60 900,60 1200,0 L1200,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight transition-all duration-800 ${
              isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"
            }`}
          >
            {t("testimonialsTitle")}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div
            className={`glass-card-dark rounded-2xl p-8 md:p-12 transition-all duration-800 ${
              isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative">
              <div className="text-center">
                {/* Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-6 w-6 text-yellow-400 fill-current animate-pulse"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-white leading-relaxed mb-8 font-light italic">
                  "{language === "ar" ? testimonials[currentIndex].ar : testimonials[currentIndex].en}"
                </blockquote>

                {/* Author */}
                <div className="text-center">
                  <div className="text-lg font-semibold text-teal-400">{testimonials[currentIndex].name}</div>
                  <div className="text-gray-400">{testimonials[currentIndex].role}</div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevTestimonial}
                  className="text-white hover:text-teal-400 hover:bg-white/10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                {/* Dots */}
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex ? "bg-teal-400 scale-125" : "bg-white/30 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextTestimonial}
                  className="text-white hover:text-teal-400 hover:bg-white/10"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
