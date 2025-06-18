"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BarChart3, BookOpen, Mic, Sparkles, User } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/journal", label: "Journal", icon: BookOpen },
  { href: "/voice", label: "Voice", icon: Mic },
  { href: "/ai-prompts", label: "AI Prompts", icon: Sparkles },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-semibold text-slate-800">MoodFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <Button variant={isActive ? "default" : "ghost"} size="sm" className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              )
            })}
            <Link href="/auth">
              <Button variant="outline" size="sm" className="ml-4">
                <User className="w-4 h-4 mr-2" />
                Account
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Link href="/auth">
              <Button variant="outline" size="sm">
                <User className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href} className="flex flex-col items-center p-2">
                <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-slate-500"}`} />
                <span className={`text-xs mt-1 ${isActive ? "text-blue-600" : "text-slate-500"}`}>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
