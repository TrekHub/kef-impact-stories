"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Users,
  Heart,
  MapPin,
  Sparkles,
  Globe,
  BookOpen,
  Target,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const impactConnections = [
  {
    id: "ripple-effect",
    title: "The Ripple Effect",
    description: "See how one scholarship creates waves of change",
    imageUrl: "/kef-images/graduation.webp",
    connections: [
      "1 student becomes a doctor",
      "Treats 1,000+ patients annually",
      "Mentors 5 medical students",
      "Inspires 50+ young girls in her village",
      "Her siblings attend university",
      "Family lifts out of poverty",
    ],
    color: "blue",
  },
  {
    id: "community-transformation",
    title: "Community Transformation",
    description: "Watch entire communities evolve through education",
    imageUrl: "/kef-images/students-outside.jpg",
    connections: [
      "KEF graduates return as teachers",
      "Local school quality improves",
      "More students pursue higher education",
      "Economic opportunities increase",
      "Cultural shift toward valuing education",
      "Cycle of poverty breaks",
    ],
    color: "green",
  },
  {
    id: "generational-impact",
    title: "Generational Impact",
    description: "Experience how education transforms generations",
    imageUrl: "/kef-images/IMG_1881.jpg",
    connections: [
      "Educated mothers prioritize children's education",
      "Family income increases significantly",
      "Health outcomes improve dramatically",
      "Gender equality advances",
      "Leadership roles in community",
      "Next generation graduates university",
    ],
    color: "purple",
  },
];

export function ImpactConnections() {
  const [selectedConnection, setSelectedConnection] = useState<string | null>(
    null
  );
  const [animationStep, setAnimationStep] = useState(0);

  const startAnimation = (connectionId: string) => {
    setSelectedConnection(connectionId);
    setAnimationStep(0);

    // Animate through each connection step
    const connection = impactConnections.find((c) => c.id === connectionId);
    if (connection) {
      connection.connections.forEach((_, index) => {
        setTimeout(() => {
          setAnimationStep(index + 1);
        }, (index + 1) * 800);
      });
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-600",
        accent: "bg-blue-100",
      },
      green: {
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-600",
        accent: "bg-green-100",
      },
      purple: {
        bg: "bg-purple-50",
        border: "border-purple-200",
        text: "text-purple-600",
        accent: "bg-purple-100",
      },
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section
      id="impact-connections"
      className="py-20 bg-gradient-to-br from-muted/30 to-background"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-lg px-6 py-2">
            <Sparkles className="w-5 h-5 mr-2" />
            Impact Visualization
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See the Connections
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Education doesn't happen in isolation. Every KEF scholarship creates
            a web of positive change that extends far beyond the individual
            student.
          </p>
        </div>

        {/* Interactive Connections */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {impactConnections.map((connection) => {
            const colors = getColorClasses(connection.color);
            const isSelected = selectedConnection === connection.id;

            return (
              <Card
                key={connection.id}
                className={`${colors.bg} ${
                  colors.border
                } border-2 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                  isSelected ? "ring-4 ring-primary/20 scale-105" : ""
                }`}
                onClick={() => startAnimation(connection.id)}
              >
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={connection.imageUrl}
                    alt={connection.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-white/90">
                      Click to Explore
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${colors.text}`}>
                    {connection.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {connection.description}
                  </p>

                  {/* Connection Animation */}
                  {isSelected && (
                    <div className="space-y-3 mt-6">
                      {connection.connections.map((item, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 ${
                            index < animationStep
                              ? `${colors.accent} opacity-100 translate-x-0`
                              : "opacity-50 translate-x-4"
                          }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${
                              index < animationStep
                                ? colors.text.replace("text-", "bg-")
                                : "bg-gray-300"
                            }`}
                          />
                          <span className="text-sm font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {!isSelected && (
                    <Button
                      variant="outline"
                      size="sm"
                      className={`w-full ${colors.border}`}
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Explore Impact
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Your Journey Continues */}
        <div className="text-center">
          <Card className="bg-primary/5 border-primary/20 border-2 max-w-4xl mx-auto">
            <CardContent className="p-12">
              <Users className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-3xl font-bold mb-4">
                Your Journey Creates Real Impact
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Every interaction you've had with KEF students' stories
                represents real lives being transformed. When you support
                education, you're not just helping one person—you're investing
                in entire communities.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    4,600+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Lives Transformed
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    460,000+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Community Members Impacted
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">∞</div>
                  <div className="text-sm text-muted-foreground">
                    Generational Change
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="px-8 py-4 text-lg">
                  <Link href="/impact">
                    <Target className="h-5 w-5 mr-2" />
                    Calculate Your Impact
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg border-2"
                >
                  <a
                    href="https://www.kenyaeducationfund.org/donate"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Make a Difference Today
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
