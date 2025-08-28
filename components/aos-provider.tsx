"use client"

import { useEffect, type ReactNode } from "react"

export function AOSProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement
            const animationType = element.dataset.aos
            const delay = element.dataset.aosDelay || "0"
            
            setTimeout(() => {
              element.classList.add("aos-animate")
            }, parseInt(delay))
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -60px 0px"
      }
    )

    // Observe all elements with data-aos attributes
    const animatedElements = document.querySelectorAll("[data-aos]")
    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return <>{children}</>
}
