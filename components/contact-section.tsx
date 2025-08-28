"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Instagram } from "lucide-react"
import { useLanguage } from "./language-context"

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Submit form using FormSubmit
      const formData = new FormData(e.target as HTMLFormElement)
      
      const response = await fetch('https://formsubmit.co/Abdallah_al-sairafi@hotmail.com', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        // Show success message
        setShowSuccess(true)
        
        // Reset form
        setFormData({ name: "", email: "", message: "" })

        // Hide success message after 4 seconds
        setTimeout(() => {
          setShowSuccess(false)
        }, 4000)
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      {/* Curved Top Divider */}
      <div className="relative overflow-hidden">
        <svg viewBox="0 0 1200 120" className="w-full h-20 fill-white">
          <path d="M0,0 C300,60 900,60 1200,0 L1200,120 L0,120 Z" />
        </svg>
      </div>

      <section ref={sectionRef} id="contact" className="py-20 md:py-28 bg-gray-50 overflow-x-clip">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2
              className={`text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight transition-all duration-800 ${
                isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"
              }`}
            >
              {t("contactTitle")}
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div
              className={`transition-all duration-800 ${isVisible ? "animate-fade-in-left opacity-100" : "opacity-0"}`}
              data-aos="fade-right"
            >
              <div className="glass-card rounded-2xl p-8 relative">
                {/* Success Message Overlay */}
                {showSuccess && (
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10 animate-fade-in">
                    <div className="text-center p-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">شكراً لتواصلك معنا!</h3>
                      <p className="text-gray-600 mb-4">تم إرسال رسالتك بنجاح وسنتواصل معك قريباً</p>
                      <div className="w-12 h-1 bg-teal-500 rounded mx-auto"></div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Hidden FormSubmit fields */}
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_next" value="https://your-website.com/thank-you" />
                  <input type="hidden" name="_subject" value="رسالة جديدة من موقع مستوصف بود الصحي" />

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("formName")}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border-gray-300 focus:border-teal-500 focus:ring-teal-500 text-black placeholder-gray-500 dark:text-black dark:placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("formEmail")}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border-gray-300 focus:border-teal-500 focus:ring-teal-500 text-black placeholder-gray-500 dark:text-black dark:placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("formMessage")}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full rounded-xl border-gray-300 focus:border-teal-500 focus:ring-teal-500 resize-none text-black placeholder-gray-500 dark:text-black dark:placeholder-gray-400"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl transition-colors duration-300"
                  >
                    {isSubmitting ? "جاري الإرسال..." : t("formSend")}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div
              className={`transition-all duration-800 ${isVisible ? "animate-fade-in-right opacity-100" : "opacity-0"}`}
              data-aos="fade-left"
            >
              <div className="space-y-8">
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <MapPin className="h-6 w-6 text-teal-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                      <p className="text-gray-600">
                        مستوصف بود الصحي - السالميه قطعه 1 شارع 2
                        <br />
                        POD Health Clinic - Salmiya Block 1 Street 2
                      </p>
                      <a 
                        href="https://maps.app.goo.gl/cz48X1gYTtnthCe38" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-teal-500 hover:text-teal-600 text-sm mt-2 inline-block"
                      >
                        View on Google Maps
                      </a>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <Phone className="h-6 w-6 text-teal-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                      <a 
                        href="https://wa.me/96566656024" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-teal-500 transition-colors"
                      >
                        +965 66656024
                      </a>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <Mail className="h-6 w-6 text-teal-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <a 
                        href="mailto:Abdallah_al-sairafi@hotmail.com" 
                        className="text-gray-600 hover:text-teal-500 transition-colors"
                      >
                        Abdallah_al-sairafi@hotmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                  <div className="flex space-x-4 rtl:space-x-reverse">
                    <a 
                      href="https://www.instagram.com/pod.lab.kw/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-white transition-all p-2.5 rounded-xl hover:bg-teal-500 ring-1 ring-gray-200 hover:ring-teal-500 hover:shadow-md"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white relative">
        {/* Curved Top Border */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden">
          <svg viewBox="0 0 1200 60" className="w-full h-15 fill-teal-500">
            <path d="M0,60 C300,20 900,20 1200,60 L1200,0 L0,0 Z" />
          </svg>
        </div>

        <div className="pt-20 pb-8" data-aos="fade-up" data-aos-offset="0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <a href="#hero" aria-label={t("brand")} className="inline-flex items-center rounded-3xl bg-white/90 backdrop-blur px-5 py-3 shadow-md ring-1 ring-white/20">
                  <Image
                    src="/assets/logo pod.png"
                    alt={t("brand")}
                    width={340}
                    height={96}
                    priority
                    className="h-14 sm:h-16 md:h-20 w-auto"
                  />
                </a>
              </div>
              <p className="text-gray-400 mb-8">{t("tagline")}</p>

              {/* Lightweight footer content without changing colors or spacing */}
              <div className="flex flex-col items-center gap-4 mb-8">
                {/* Quick links */}
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
                  <a href="#services" className="hover:text-white transition-colors">{t("nav").services}</a>
                  <a href="#experts" className="hover:text-white transition-colors">{t("nav").experts}</a>
                  <a href="#contact" className="hover:text-white transition-colors">{t("nav").contact}</a>
                </div>

                {/* Social icons */}
                <div className="flex items-center gap-4 text-gray-300">
                  <a aria-label="Instagram" href="https://www.instagram.com/pod.lab.kw/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Instagram className="h-6 w-6" /></a>
                </div>

                {/* Contact line */}
                <div className="text-gray-400 text-sm">
                  <span>مستوصف بود الصحي - السالميه</span>
                  <span className="mx-2">•</span>
                  <a href="https://wa.me/96566656024" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">+965 66656024</a>
                  <span className="mx-2">•</span>
                  <a href="mailto:Abdallah_al-sairafi@hotmail.com" className="hover:text-white transition-colors">Abdallah_al-sairafi@hotmail.com</a>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-8">
                <p className="text-gray-400 text-sm">© 2024 POD CLINIC. All rights reserved. | جميع الحقوق محفوظة</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
