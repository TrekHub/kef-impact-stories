"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Map,
  Target,
  Users,
  Heart,
  Sparkles,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

export function FeaturesSection() {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Stories",
      description:
        "Experience choose-your-own-adventure narratives based on real student journeys. Your choices shape their stories and reveal the transformative power of education.",
      badge: "Feeling",
      color: "primary",
    },
    {
      icon: Map,
      title: "Explore Kenya",
      description:
        "Discover different regions of Kenya through an interactive map. Meet students from diverse communities and learn about their unique challenges and triumphs.",
      badge: "Learning",
      color: "secondary",
    },
    {
      icon: Target,
      title: "See Your Impact",
      description:
        "Calculate exactly how your donation transforms lives. Get personalized impact stories showing the direct difference your support makes in Kenyan communities.",
      badge: "Acting",
      color: "accent",
    },
  ];

  return (
    <>
      <section className="py-24 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-full text-sm font-medium text-foreground border border-border">
              <Sparkles className="w-4 h-4 text-primary" />
              Three-Step Journey
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {"An Emotional Journey to Action"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {
                "Our gamified experience takes you through feeling, learning, and acting—creating a deeper connection with the cause of education in Kenya."
              }
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="relative bg-white border border-border rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300"
                >
                  {/* Step Number */}
                  <div className="absolute top-6 right-6">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                      {index + 1}
                    </div>
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-primary/5 rounded-xl">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-xs font-medium px-3 py-1 bg-secondary rounded-full border border-border">
                        {feature.badge}
                      </span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center">
            <Card className="max-w-2xl mx-auto bg-primary/5 border border-primary/20 rounded-xl">
              <CardContent className="p-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  {"Ready to Make a Difference?"}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {
                    "Join thousands of supporters who have already transformed lives through education. Every story you experience brings you closer to understanding the real impact of your generosity."
                  }
                </p>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Real Impact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-secondary rounded-full text-sm font-medium text-foreground border border-border">
                <Heart className="w-4 h-4 text-primary" />
                Real Stories, Real Impact
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Meet the Students Your Support Empowers
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Every donation creates a ripple effect of transformation. From
                rural villages to urban centers, KEF scholars are breaking
                cycles of poverty and building brighter futures for their
                communities.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">
                    4,600+ scholarships provided since 2006
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">
                    99% transition rate from high school to university
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">
                    Supporting students across 153 partner schools
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] relative rounded-xl overflow-hidden border border-border">
                <Image
                  src="https://images.squarespace-cdn.com/content/674774e95d92814e89fc20b1/1012e236-6411-4f71-a7c5-797550a3efbf/Layer_2+%289%29.png?content-type=image%2Fpng"
                  alt="KEF students celebrating graduation"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl border border-border shadow-lg">
                <div className="text-2xl font-bold text-primary mb-1">18+</div>
                <div className="text-sm text-muted-foreground">
                  Years of Impact
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
