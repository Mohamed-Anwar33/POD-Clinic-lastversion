"use client"

import { LanguageProvider } from "@/components/language-context"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ExpertsSection } from "@/components/experts-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <HeroSection />
          <ServicesSection />
          <ExpertsSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
      </div>
    </LanguageProvider>
  )
}
