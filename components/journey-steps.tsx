"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Heart,
  Home,
  MapPin,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const journeySteps = [
  {
    id: "challenge",
    title: "Point A: The Challenge",
    description:
      "Meet students facing impossible choices between education and survival",
    content:
      "In rural Kenya, bright students like Silvia and Sawa face barriers that seem insurmountable. Families earn less than $2 a day. Secondary school fees cost $400 annually. Dreams of becoming doctors or engineers feel impossibly distant.",
    icon: Home,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    imageUrl: "/kef-images/IMG_1715.jpg",
    stats: "60% of girls in rural areas never complete secondary school",
  },
  {
    id: "intervention",
    title: "The KEF Difference",
    description: "Where hope meets opportunity through comprehensive support",
    content:
      "KEF doesn't just pay school fees. We provide uniforms, books, sanitary pads, counseling, and mentorship. We ensure students have everything they need to not just attend school, but to thrive.",
    icon: Heart,
    color: "text-primary",
    bgColor: "bg-primary/5",
    borderColor: "border-primary/20",
    imageUrl: "/kef-images/students.jpg",
    stats: "99% of KEF students transition to university",
  },
  {
    id: "transformation",
    title: "The Journey Unfolds",
    description: "Watch as education transforms dreams into reality",
    content:
      "With KEF's support, students excel academically, gain confidence, and develop leadership skills. They become top performers in their classes, secure university scholarships, and pursue careers in medicine, engineering, and beyond.",
    icon: GraduationCap,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    imageUrl: "/kef-images/IMG_1728.jpg",
    stats: "4,600+ scholarships provided since 2006",
  },
  {
    id: "impact",
    title: "The Ripple Effect",
    description: "One scholarship transforms entire communities",
    content:
      "KEF graduates become doctors, teachers, engineers, and leaders. They return to their communities as change agents, mentoring the next generation and proving that with education, anything is possible.",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    imageUrl: "/kef-images/graduation.webp",
    stats: "Each graduate impacts 100+ community members",
  },
];

export function JourneySteps() {
  return (
    <section id="journey-section" className="py-16 md:py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="secondary" className="mb-4 rounded-lg">
            <MapPin className="w-4 h-4 mr-2" />
            The Transformation Journey
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
            From Challenge to Change
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Follow the path from poverty to possibility, and see how education
            creates lasting impact that spans generations.
          </p>
        </div>

        {/* Journey Steps */}
        <div className="space-y-12 md:space-y-16">
          {journeySteps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <div key={step.id} className="relative">
                {/* Connector Line */}
                {index < journeySteps.length - 1 && (
                  <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-6 md:translate-y-8 z-10">
                    <ArrowDown className="h-6 md:h-8 w-6 md:w-8 text-primary/60" />
                  </div>
                )}

                <div className="bg-card border-2 border-border rounded-lg overflow-hidden">
                  <div
                    className={`grid md:grid-cols-2 gap-0 ${
                      isEven ? "" : "md:grid-flow-col-dense"
                    }`}
                  >
                    {/* Text Content */}
                    <div
                      className={`p-6 md:p-8 lg:p-12 flex flex-col justify-center ${
                        isEven ? "" : "md:order-2"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 md:p-3 bg-muted border border-border rounded-lg">
                          <Icon className="h-5 md:h-6 w-5 md:w-6 text-primary" />
                        </div>
                        <Badge variant="outline" className="text-xs rounded-md">
                          Step {index + 1}
                        </Badge>
                      </div>

                      <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-3">
                        {step.title}
                      </h3>

                      <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6 leading-relaxed">
                        {step.description}
                      </p>

                      <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 leading-relaxed">
                        {step.content}
                      </p>

                      <div className="inline-flex items-center gap-2 px-3 py-2 bg-muted border border-border rounded-lg text-sm font-medium text-primary w-fit">
                        <Zap className="h-4 w-4" />
                        {step.stats}
                      </div>
                    </div>

                    {/* Image */}
                    <div
                      className={`relative h-64 md:h-full min-h-[300px] md:min-h-[400px] ${
                        isEven ? "" : "md:order-1"
                      }`}
                    >
                      <Image
                        src={step.imageUrl}
                        alt={step.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Experience the Journey CTA */}
        <div className="mt-16 md:mt-20 text-center">
          <div className="bg-muted border-2 border-border rounded-lg max-w-4xl mx-auto p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">
              Now Experience These Stories Yourself
            </h3>
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">
              Don't just read about transformation—live it. Walk in the shoes of
              KEF students, make choices that shape their futures, and explore
              the communities where change happens.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg"
                onClick={() => {
                  const element = document.getElementById(
                    "interactive-experience"
                  );
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <BookOpen className="h-4 md:h-5 w-4 md:w-5 mr-2" />
                Start Interactive Experience
                <ArrowRight className="h-4 md:h-5 w-4 md:w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
