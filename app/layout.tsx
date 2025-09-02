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
  metadataBase: new URL("https://podlabkw.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/assets/logo pod.png",
    shortcut: "/assets/logo pod.png",
    apple: "/assets/logo pod.png",
  },
  openGraph: {
    title: "POD CLINIC - Fitness & Performance Lab",
    description: "Professional fitness testing and performance analysis lab",
    url: "/",
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
