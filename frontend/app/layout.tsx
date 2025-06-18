import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MoodFlow - Your Personal Mood Journal",
  description: "Track your emotions, reflect on your thoughts, and improve your mental wellbeing",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen`}>
        <Navigation />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  )
}
