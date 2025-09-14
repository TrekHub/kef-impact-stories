"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Play, ArrowRight, Users, GraduationCap, Heart, Sparkles } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-card to-muted overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 text-center">
        {/* Badge */}
        <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
          <Sparkles className="w-4 h-4 mr-2" />
          Interactive Storytelling Experience
        </Badge>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
          Transform Lives Through
          <span className="text-primary block">Education</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
          Experience the power of education through interactive stories. Journey with Kenyan students and discover how
          your support creates lasting change.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
          >
            <Link href="/journey" className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Start Your Journey
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="px-8 py-4 text-lg bg-transparent">
            <a
              href="https://www.kenyaeducationfund.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Heart className="h-5 w-5" />
              Learn About KEF
            </a>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-primary/20 rounded-full">
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-primary mb-2">4,600+</div>
              <div className="text-muted-foreground">Scholarships Provided</div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-secondary/20 rounded-full">
                  <GraduationCap className="h-8 w-8 text-secondary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-secondary mb-2">99%</div>
              <div className="text-muted-foreground">Transition Rate to University</div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-accent/20 rounded-full">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
              </div>
              <div className="text-3xl font-bold text-accent mb-2">18+</div>
              <div className="text-muted-foreground">Years of Impact</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
