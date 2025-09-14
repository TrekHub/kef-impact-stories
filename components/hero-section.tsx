"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Play,
  ArrowRight,
  Users,
  GraduationCap,
  Heart,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Subtle accent elements */}
      <div className="absolute inset-0">
        <div className="absolute top-32 left-8 w-2 h-32 bg-primary opacity-20 rounded-full" />
        <div className="absolute bottom-32 right-8 w-2 h-32 bg-primary opacity-20 rounded-full" />
        <div className="absolute top-1/2 right-32 w-1 h-24 bg-primary opacity-10 rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-secondary rounded-full text-sm font-medium text-foreground border border-border">
          <Sparkles className="w-4 h-4 text-primary" />
          Interactive Storytelling Experience
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
          Transform Lives Through
          <span className="text-primary block">Education</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          Experience the power of education through interactive stories. Journey
          with Kenyan students and discover how your support creates lasting
          change.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-medium rounded-lg"
          >
            <Link href="/journey" className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Start Your Journey
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="px-8 py-4 text-lg font-medium rounded-lg border-2"
          >
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
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="bg-white border border-border rounded-xl p-0 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-4 bg-primary/5 rounded-xl">
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-4xl font-bold text-primary mb-2">4,600+</div>
              <div className="text-muted-foreground font-medium">
                Scholarships Provided
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-border rounded-xl p-0 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-4 bg-primary/5 rounded-xl">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-4xl font-bold text-primary mb-2">99%</div>
              <div className="text-muted-foreground font-medium">
                Transition Rate to University
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-border rounded-xl p-0 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-4 bg-primary/5 rounded-xl">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-4xl font-bold text-primary mb-2">18+</div>
              <div className="text-muted-foreground font-medium">
                Years of Impact
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
