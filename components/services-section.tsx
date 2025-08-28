"use client";

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Activity, Heart, Zap, Package } from "lucide-react"
import { useLanguage } from "./language-context"
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react"

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { t, language } = useLanguage()

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

  const services = [
    {
      id: "vo2",
      icon: Activity,
      color: "from-red-500 to-orange-500",
      image: "/assets/vo2-1.png",
      data: t("vo2") || {},
    },
    {
      id: "rmr",
      icon: Heart,
      color: "from-blue-500 to-cyan-500",
      image: "/assets/rmr-3.png",
      data: t("rmr") || {},
    },
    {
      id: "fit3d",
      icon: Zap,
      color: "from-purple-500 to-pink-500",
      image: "/assets/fit3d-1.png",
      data: t("fit3d") || {},
    },
    {
      id: "complete",
      icon: Package,
      color: "from-green-500 to-teal-500",
      image: "/assets/vo2-1.png",
      data: t("complete") || {},
    },
  ]

  const selectedServiceData = selectedService ? services.find((s) => s.id === selectedService) : null
  const images = selectedServiceData?.data?.images || []

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1]?.split("&")[0]
    return `https://www.youtube.com/embed/${videoId}`
  }

  return (
    <>
      {/* Curved Top Divider */}
      <div className="relative">
        <svg viewBox="0 0 1200 120" className="w-full h-20 fill-teal-500">
          <path d="M0,0 C300,60 900,60 1200,0 L1200,0 L0,0 Z" />
        </svg>
      </div>

      <section ref={sectionRef} id="services" className="py-20 md:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2
              className={`text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight transition-all duration-800 ${
                isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"
              }`}
            >
              {t("ctaServices")}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={service.id}
                  className={`relative group cursor-pointer transition-all duration-500 hover:cursor-pointer ${
                    isVisible ? "animate-fade-in-right opacity-100" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 120}ms` }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="glass-card rounded-2xl overflow-hidden h-full hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-500 cursor-pointer">
                    {/* Service Image */}
                    <div className="relative h-48 overflow-hidden bg-gray-50">
                      <img
                        src={service.image || "/placeholder.svg"}
                        alt={service.data.title}
                        className="w-full h-full object-contain transition-transform duration-500"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                      />

                      {/* Icon overlay */}
                      <div className="absolute top-4 right-4">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">{service.data.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{service.data.desc}</p>

                      {service.data.bonus && (
                        <div className="bg-teal-50 border border-teal-200 rounded-lg p-2 mb-4">
                          <p className="text-teal-700 font-semibold text-xs">✨ {service.data.bonus}</p>
                        </div>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white transition-colors duration-300 bg-transparent cursor-pointer"
                      >
                        {t("learnMore")}
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-4xl max-h-[95vh] overflow-y-auto bg-white border-0 shadow-2xl p-0">
          {selectedService && selectedServiceData && (
            <>
              <DialogHeader className="border-b border-gray-100 pb-4 px-4 sm:px-6 pt-4 sm:pt-6 sticky top-0 bg-white z-10">
                <div className="flex items-start justify-between">
                  <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight flex-1 pr-4">
                    {selectedServiceData.data.title}
                  </DialogTitle>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
                  >
                    <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                  </button>
                </div>
              </DialogHeader>

              <div className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-4 sm:pb-6">
                {/* Image Gallery Section */}
                {images.length > 0 && (
                  <div className="relative">
                    <div className="relative h-48 sm:h-64 md:h-80 rounded-xl overflow-hidden bg-gray-100 mx-auto">
                      <img
                        src={images[currentImageIndex] || "/placeholder.svg?height=320&width=600"}
                        alt={`${selectedServiceData.data.title} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-contain transition-all duration-500"
                      />

                      {/* Image Navigation */}
                      {images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer"
                          >
                            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer"
                          >
                            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>

                          {/* Image Indicators */}
                          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
                            {images.map((image: string, index: number) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                                  index === currentImageIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* YouTube Video Section */}
                {selectedServiceData.data.youtubeUrl && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{t("watchDemo")}</h4>
                      {showVideo && (
                        <button onClick={() => setShowVideo(false)} className="text-gray-500 hover:text-gray-700 p-1 cursor-pointer">
                          <X className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      )}
                    </div>

                    {!showVideo ? (
                      <button
                        onClick={() => setShowVideo(true)}
                        className="relative w-full h-32 sm:h-40 md:h-48 bg-gray-100 rounded-xl overflow-hidden group hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-red-600 hover:bg-red-700 text-white p-3 sm:p-4 rounded-full group-hover:scale-110 transition-transform">
                            <Play className="h-6 w-6 sm:h-8 sm:w-8 ml-0.5 sm:ml-1" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-left">
                          <p className="text-gray-700 font-medium text-xs sm:text-sm">Click to watch demo</p>
                        </div>
                      </button>
                    ) : (
                      <div className="relative h-48 sm:h-56 md:h-64 lg:h-80 rounded-xl overflow-hidden">
                        <iframe
                          src={getYouTubeEmbedUrl(selectedServiceData.data.youtubeUrl)}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Service Details */}
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{selectedServiceData.data.desc}</p>

                  {selectedServiceData.data.bullets && Array.isArray(selectedServiceData.data.bullets) && (
                    <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                      <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg">{t("whatsIncluded")}</h4>
                      <ul className="space-y-2 sm:space-y-3">
                        {selectedServiceData.data.bullets.map((bullet: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="text-teal-500 mr-2 sm:mr-3 rtl:mr-0 rtl:ml-2 sm:rtl:ml-3 mt-0.5 sm:mt-1 font-bold text-sm sm:text-base">✓</span>
                            <span className="text-gray-700 font-medium text-sm sm:text-base leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedServiceData.data.bonus && (
                    <div className="bg-gradient-to-r from-teal-50 to-green-50 border-l-4 border-teal-500 rounded-r-xl p-4 sm:p-6">
                      <h4 className="font-semibold text-teal-900 mb-2 flex items-center text-base sm:text-lg">
                        <span className="mr-2">🎁</span> {t("bonusLabel")}
                      </h4>
                      <p className="text-teal-800 font-medium text-sm sm:text-base">{selectedServiceData.data.bonus}</p>
                    </div>
                  )}

                  {selectedServiceData.data.aud && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-r-xl p-4 sm:p-6">
                      <h4 className="font-semibold text-blue-900 mb-2 flex items-center text-base sm:text-lg">
                        <span className="mr-2">🎯</span> {t("idealFor")}
                      </h4>
                      <p className="text-blue-800 font-medium text-sm sm:text-base">{selectedServiceData.data.aud}</p>
                    </div>
                  )}

                  {selectedServiceData.data.note && (
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-r-xl p-4 sm:p-6">
                      <h4 className="font-semibold text-amber-900 mb-2 flex items-center text-base sm:text-lg">
                        <span className="mr-2">ℹ️</span> {t("importantNote")}
                      </h4>
                      <p className="text-amber-800 font-medium text-sm sm:text-base">{selectedServiceData.data.note}</p>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <div className="pt-4 sm:pt-6 border-t border-gray-100 sticky bottom-0 bg-white">
                  <Button className="w-full bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white font-semibold py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                    {t("ctaBook")} - {selectedServiceData.data.title}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
