"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Heart, BookOpen, Map, Target, ExternalLink } from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navItems = [
    { href: "/journey", label: "Stories", icon: BookOpen },
    { href: "/map", label: "Explore", icon: Map },
    { href: "/impact", label: "Impact", icon: Target },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <span className="hidden sm:block">KEF Stories</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
              <a
                href="https://www.kenyaeducationfund.org/donate"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Heart className="h-4 w-4" />
                Donate
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" onClick={toggleMenu} className="md:hidden">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
              <Button asChild size="sm" className="bg-primary hover:bg-primary/90 w-fit">
                <a
                  href="https://www.kenyaeducationfund.org/donate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Heart className="h-4 w-4" />
                  Donate Now
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
