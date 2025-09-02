"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Globe, Menu, X } from "lucide-react"
import { useLanguage } from "./language-context"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-x-clip ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 md:h-28">
          <div className="flex-shrink-0">
            <a href="#hero" aria-label={t("brand")} className="cursor-pointer">
              <Image
                src="/assets/logo pod.png"
                alt={t("brand")}
                width={280}
                height={80}
                priority
                className={`${isScrolled ? "drop-shadow-[0_0_6px_rgba(0,0,0,0.3)]" : "drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"} h-20 w-auto md:h-24 lg:h-28`}
              />
            </a>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center gap-10 flex-nowrap">
              {Object.entries(t("nav")).map(([key, value], idx) => (
                <span key={key} className="flex items-center">
                  {idx !== 0 && (
                    <span className={`${isScrolled ? "bg-gray-300" : "bg-white/40"} mx-4 block h-5 w-px`} aria-hidden />
                  )}
                  <button
                    onClick={() => scrollToSection(key === "home" ? "hero" : key)}
                    className={`px-2 ps-4 whitespace-nowrap text-base font-medium transition-colors hover:text-teal-500 cursor-pointer ${
                      isScrolled ? "text-gray-700" : "text-white"
                    }`}
                  >
                    {value as string}
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className={`cursor-pointer ${isScrolled ? "text-gray-700" : "text-white"}`}
            >
              <Globe className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2" />
              {language === "en" ? "العربية" : "English"}
            </Button>

            <Button
              onClick={() => window.open("https://wa.me/96560002122?text=مرحباً، أريد حجز موعد في مستوصف بود الصحي", "_blank")}
              className="bg-teal-500 hover:bg-white hover:text-teal-700 text-white font-semibold px-7 py-3 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl animate-pulse-glow cursor-pointer"
            >
              {t("ctaBook")}
            </Button>

            {/* Mobile menu toggle */}
            <button
              className={`md:hidden p-3 rounded-lg transition-colors cursor-pointer ${isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"}`}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden transition-all duration-300 overflow-x-clip ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"} ${
          isScrolled ? "bg-white/95 backdrop-blur" : "bg-black/70 backdrop-blur"
        }`}
      >
        <div className="px-4 py-3 space-y-2">
          {Object.entries(t("nav")).map(([key, value]) => (
            <button
              key={key}
              onClick={() => scrollToSection(key === "home" ? "hero" : key)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium cursor-pointer ${
                isScrolled ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
            >
              {value as string}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
