"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  ArrowRight,
  Users,
  GraduationCap,
  Heart,
  Sparkles,
  Award,
  Globe,
  TrendingUp,
  Star,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      {/* Simplified Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background to-muted/20" />
      </div>

      <div className="relative z-20 container mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto">
          {/* Flat Badge */}
          <div className="flex justify-center mb-8">
            <Badge
              variant="secondary"
              className="inline-flex items-center gap-2 px-6 py-3 bg-muted border border-border text-foreground font-semibold text-sm rounded-lg"
            >
              <Heart className="w-4 h-4 text-primary" />
              Kenya Education Fund
              <Sparkles className="w-4 h-4 text-primary" />
            </Badge>
          </div>

          {/* Hero Content - Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-foreground leading-tight">
                Transforming Lives Through
                <span className="block text-primary">Education in Kenya</span>
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-8">
                For over 18 years, we've been breaking the cycle of poverty by
                providing scholarships and comprehensive support to Kenya's
                brightest students.
              </p>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold"
                >
                  <Link href="/game" className="flex items-center gap-3">
                    <Play className="h-5 w-5" />
                    Start Interactive Experience
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 text-base font-medium border-2 border-border text-foreground hover:bg-muted"
                  onClick={() => {
                    const element = document.getElementById("journey-section");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Learn More
                </Button>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden border-2 border-border rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1594736797933-d0d9c83d2577?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Kenyan high school students in classroom - empowering education for brighter futures"
                  fill
                  className="object-cover"
                  priority
                />

                {/* Flat Stats on Image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-card border-2 border-border rounded-lg p-3 md:p-4">
                    <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
                      <div>
                        <div className="text-lg md:text-2xl font-semibold text-primary">
                          4,600+
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Students
                        </div>
                      </div>
                      <div>
                        <div className="text-lg md:text-2xl font-semibold text-primary">
                          99%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Success Rate
                        </div>
                      </div>
                      <div>
                        <div className="text-lg md:text-2xl font-semibold text-primary">
                          18+
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Years
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Highlight */}
          <div className="mb-16">
            <div className="max-w-5xl mx-auto bg-card border-2 border-border rounded-lg p-6 md:p-8 lg:p-12">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                  Every Child Deserves a Future
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  We identify students facing financial barriers but with the
                  determination to succeed. Through scholarships, mentorship,
                  and ongoing support, we create pathways from poverty to
                  possibility.
                </p>
                <div className="flex items-center justify-center gap-2 text-primary font-medium">
                  <Globe className="w-5 h-5" />
                  <span>
                    Experience their journey through interactive stories
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional CTA Section */}
          <div className="text-center mb-16">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="px-8 py-4 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <a
                  href="https://www.kenyaeducationfund.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Heart className="h-5 w-5" />
                  About KEF
                </a>
              </Button>
            </div>
          </div>

          {/* Detailed Stats Section */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-20">
            <div className="bg-card border-2 border-border rounded-lg p-6 md:p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 md:p-4 bg-muted border border-border rounded-lg">
                  <Users className="h-6 md:h-8 w-6 md:w-8 text-primary" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-semibold text-foreground mb-2">
                4,600+
              </div>
              <div className="text-foreground font-medium">
                Students Supported
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Since 2006
              </div>
            </div>

            <div className="bg-card border-2 border-border rounded-lg p-6 md:p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 md:p-4 bg-muted border border-border rounded-lg">
                  <GraduationCap className="h-6 md:h-8 w-6 md:w-8 text-primary" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-semibold text-foreground mb-2">
                99%
              </div>
              <div className="text-foreground font-medium">
                University Transition
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Success Rate
              </div>
            </div>

            <div className="bg-card border-2 border-border rounded-lg p-6 md:p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 md:p-4 bg-muted border border-border rounded-lg">
                  <Award className="h-6 md:h-8 w-6 md:w-8 text-primary" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-semibold text-foreground mb-2">
                18+
              </div>
              <div className="text-foreground font-medium">Years of Impact</div>
              <div className="text-sm text-muted-foreground mt-1">
                Proven Results
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mt-16">
            <div className="max-w-4xl mx-auto bg-muted border-2 border-border rounded-lg p-6 md:p-8 lg:p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 md:h-6 w-5 md:w-6 text-primary fill-current"
                    />
                  ))}
                </div>
              </div>
              <blockquote className="text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed mb-6 font-medium">
                "There is joy in realizing the changes that happen right in
                front of you. Their life is forever changed and there is no
                holding back anymore so they soar."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-8 md:w-12 h-0.5 bg-border"></div>
                <cite className="text-muted-foreground font-medium not-italic text-sm md:text-base">
                  Norlena-Albert CJ, Deputy Director
                </cite>
                <div className="w-8 md:w-12 h-0.5 bg-border"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
