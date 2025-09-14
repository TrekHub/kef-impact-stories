"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Play,
  ArrowRight,
  Users,
  GraduationCap,
  Heart,
  Sparkles,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.squarespace-cdn.com/content/674774e95d92814e89fc20b1/17829310-aee3-454a-a303-d24ba14de1d3/Frame+48.png?content-type=image%2Fpng"
          alt="Kenyan students in classroom"
          fill
          className="object-cover opacity-15"
          priority
        />
        <div className="absolute inset-0 bg-white/90" />
      </div>

      {/* Subtle accent elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-32 left-8 w-2 h-32 bg-primary opacity-20 rounded-full" />
        <div className="absolute bottom-32 right-8 w-2 h-32 bg-primary opacity-20 rounded-full" />
        <div className="absolute top-1/2 right-32 w-1 h-24 bg-primary opacity-10 rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 text-center z-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-secondary rounded-full text-sm font-medium text-foreground border border-border">
          <Heart className="w-4 h-4 text-primary" />
          This is KEF
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          We Believe Every Child
          <span className="text-primary block">Deserves a Future</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          The Kenya Education Fund provides scholarships and holistic support to
          help bright, motivated students break the cycle of poverty through
          education. For over 18 years, we've been transforming lives, one
          student at a time.
        </p>

        {/* Mission Statement */}
        <div className="mb-12 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">
            This is what we do
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            We identify students who face financial barriers to education but
            have the determination to succeed. Through scholarships, mentorship,
            and ongoing support, we create pathways from poverty to possibility.
          </p>
        </div>

        {/* Journey Invitation */}
        <div className="mb-16 p-8 bg-primary/5 rounded-2xl border border-primary/20 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-primary">
            Let's walk through this journey together
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Experience the transformation that happens when education meets
            opportunity. See how a single scholarship can change not just one
            life, but entire communities.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-medium rounded-lg"
            onClick={() => {
              const element = document.getElementById("journey-section");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <ArrowRight className="h-5 w-5 mr-2" />
            Begin the Journey
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

        {/* Testimonial */}
        <div className="mt-20 max-w-3xl mx-auto">
          <Card className="bg-primary/5 border border-primary/20 rounded-xl">
            <CardContent className="p-8 text-center">
              <blockquote className="text-lg italic text-foreground leading-relaxed mb-4">
                "There is joy in realizing the changes that happen right in
                front of you. Their life is forever changed and there is no
                holding back anymore so they soar."
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <cite className="text-sm font-medium text-muted-foreground not-italic">
                  Norlena-Albert CJ, Deputy Director, Kenya Education Fund
                </cite>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
