import type React from "react"
import { Inter, Cairo } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AOSProvider } from "@/components/aos-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const cairo = Cairo({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-cairo",
})

export const metadata = {
  title: "POD CLINIC - Fitness & Performance Lab | مختبر الأداء البدني",
  description:
    "Professional fitness testing and performance analysis lab offering VO2max, RMR, and body composition testing.",
  openGraph: {
    title: "POD CLINIC - Fitness & Performance Lab",
    description: "Professional fitness testing and performance analysis lab",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${cairo.variable} antialiased`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AOSProvider>{children}</AOSProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
