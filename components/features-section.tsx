"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Map, Target, Users, Heart, Sparkles } from "lucide-react"

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
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-muted/50 to-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Three-Step Journey
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{"An Emotional Journey to Action"}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            {
              "Our gamified experience takes you through feeling, learning, and acting—creating a deeper connection with the cause of education in Kenya."
            }
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="relative bg-card/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                {/* Step Number */}
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                    {index + 1}
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-3 bg-${feature.color}/20 rounded-lg`}>
                      <Icon className={`h-6 w-6 text-${feature.color}`} />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-pretty">{feature.description}</p>
                </CardContent>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-secondary/10 border-0">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Heart className="h-6 w-6 text-primary" />
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{"Ready to Make a Difference?"}</h3>
              <p className="text-muted-foreground text-pretty">
                {
                  "Join thousands of supporters who have already transformed lives through education. Every story you experience brings you closer to understanding the real impact of your generosity."
                }
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
