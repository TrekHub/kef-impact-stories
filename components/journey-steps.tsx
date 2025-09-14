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
    imageUrl:
      "https://images.squarespace-cdn.com/content/674774e95d92814e89fc20b1/cae49637-4f85-49b1-b109-e63c30e69b4f/Layer_2+%286%29.png?content-type=image%2Fpng",
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
    imageUrl:
      "https://images.squarespace-cdn.com/content/674774e95d92814e89fc20b1/b95e816e-3728-4617-a005-c08be8f4fe6c/Layer_2+%288%29.png?content-type=image%2Fpng",
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
    imageUrl:
      "https://images.squarespace-cdn.com/content/674774e95d92814e89fc20b1/1012e236-6411-4f71-a7c5-797550a3efbf/Layer_2+%289%29.png?content-type=image%2Fpng",
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
    imageUrl:
      "https://images.squarespace-cdn.com/content/674774e95d92814e89fc20b1/1012e236-6411-4f71-a7c5-797550a3efbf/Layer_2+%289%29.png?content-type=image%2Fpng",
    stats: "Each graduate impacts 100+ community members",
  },
];

export function JourneySteps() {
  return (
    <section
      id="journey-section"
      className="py-20 bg-gradient-to-br from-background via-muted/20 to-background"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <MapPin className="w-4 h-4 mr-2" />
            The Transformation Journey
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            From Challenge to Change
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Follow the path from poverty to possibility, and see how education
            creates lasting impact that spans generations.
          </p>
        </div>

        {/* Journey Steps */}
        <div className="space-y-16">
          {journeySteps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <div key={step.id} className="relative">
                {/* Connector Line */}
                {index < journeySteps.length - 1 && (
                  <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-8 z-10">
                    <ArrowDown className="h-8 w-8 text-primary/40" />
                  </div>
                )}

                <Card
                  className={`${step.bgColor} ${step.borderColor} border-2 overflow-hidden`}
                >
                  <CardContent className="p-0">
                    <div
                      className={`grid md:grid-cols-2 gap-0 ${
                        isEven ? "" : "md:grid-flow-col-dense"
                      }`}
                    >
                      {/* Text Content */}
                      <div
                        className={`p-8 md:p-12 flex flex-col justify-center ${
                          isEven ? "" : "md:order-2"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={`p-3 ${step.bgColor} rounded-lg border ${step.borderColor}`}
                          >
                            <Icon className={`h-6 w-6 ${step.color}`} />
                          </div>
                          <Badge variant="outline" className="text-xs">
                            Step {index + 1}
                          </Badge>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold mb-3">
                          {step.title}
                        </h3>

                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                          {step.description}
                        </p>

                        <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                          {step.content}
                        </p>

                        <div
                          className={`inline-flex items-center gap-2 px-3 py-2 ${step.bgColor} rounded-lg border ${step.borderColor} text-sm font-medium ${step.color} w-fit`}
                        >
                          <Zap className="h-4 w-4" />
                          {step.stats}
                        </div>
                      </div>

                      {/* Image */}
                      <div
                        className={`relative h-64 md:h-full min-h-[400px] ${
                          isEven ? "" : "md:order-1"
                        }`}
                      >
                        <Image
                          src={step.imageUrl}
                          alt={step.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Experience the Journey CTA */}
        <div className="mt-20 text-center">
          <Card className="bg-primary/5 border-primary/20 border-2 max-w-4xl mx-auto">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-4 text-primary">
                Experience These Stories Yourself
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Walk in the shoes of KEF students through interactive stories.
                Make choices that shape their futures and discover the real
                impact of education.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="px-8 py-4 text-lg">
                  <Link href="/journey" className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Start Interactive Stories
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg border-2"
                >
                  <Link href="/map" className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Explore the Map
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
