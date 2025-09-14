"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { ImpactData } from "@/lib/types"
import { Heart, ExternalLink, Share2, Download, GraduationCap, Calendar, MapPin, Users, Sparkles } from "lucide-react"

interface ImpactStoryProps {
  impactData: ImpactData
  onDonate: () => void
  onReset: () => void
}

export function ImpactStory({ impactData, onDonate, onReset }: ImpactStoryProps) {
  const [isSharing, setIsSharing] = useState(false)

  const generatePersonalizedStory = () => {
    const { donorName, amount, impact } = impactData

    const stories = [
      `${donorName}, your generous donation of $${amount} will transform lives in ${impact.location}. ${impact.specificImpact} You're not just funding education—you're breaking cycles of poverty and opening doors to limitless possibilities.`,

      `Dear ${donorName}, with your $${amount} contribution, you're becoming a hero in the story of Kenyan education. Your support will provide ${impact.months} months of educational opportunities in ${impact.location}, creating ripple effects that will benefit entire communities for generations.`,

      `${donorName}, imagine the moment a student receives their diploma, knowing that your $${amount} donation made it possible. In ${impact.location}, your generosity will ${impact.specificImpact.toLowerCase()} This is the power of education—and the power of your compassion.`,
    ]

    return stories[Math.floor(Math.random() * stories.length)]
  }

  const handleShare = async () => {
    setIsSharing(true)
    const story = generatePersonalizedStory()

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Impact with Kenya Education Fund",
          text: story,
          url: window.location.origin,
        })
      } catch (err) {
        console.log("Share cancelled")
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(story)
      alert("Impact story copied to clipboard!")
    }

    setIsSharing(false)
  }

  const personalizedStory = generatePersonalizedStory()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Impact Card */}
      <Card className="bg-gradient-to-br from-primary/10 via-card to-secondary/10 border-0 shadow-xl overflow-hidden">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            <Badge variant="secondary" className="text-lg px-4 py-1">
              Your Personal Impact
            </Badge>
          </div>
          <CardTitle className="text-3xl md:text-4xl font-bold text-balance">
            {"Thank you, "}
            {impactData.donorName}
            {"!"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Impact Visualization */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-background/50 rounded-lg">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-primary/20 rounded-full">
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-primary mb-1">{impactData.impact.students}</div>
              <div className="text-sm text-muted-foreground">
                {impactData.impact.students === 1 ? "Student Supported" : "Students Supported"}
              </div>
            </div>

            <div className="text-center p-6 bg-background/50 rounded-lg">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-secondary/20 rounded-full">
                  <Calendar className="h-8 w-8 text-secondary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-secondary mb-1">{impactData.impact.months}</div>
              <div className="text-sm text-muted-foreground">
                {impactData.impact.months === 1 ? "Month of Education" : "Months of Education"}
              </div>
            </div>

            <div className="text-center p-6 bg-background/50 rounded-lg">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-accent/20 rounded-full">
                  <MapPin className="h-8 w-8 text-accent" />
                </div>
              </div>
              <div className="text-lg font-bold text-accent mb-1">{impactData.impact.location}</div>
              <div className="text-sm text-muted-foreground">Impact Location</div>
            </div>
          </div>

          {/* Personalized Story */}
          <div className="p-6 bg-background/70 rounded-lg border border-primary/20">
            <div className="flex items-start gap-3">
              <Heart className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-primary mb-2">Your Impact Story</h3>
                <p className="text-foreground/90 leading-relaxed text-pretty">{personalizedStory}</p>
              </div>
            </div>
          </div>

          {/* Specific Impact Details */}
          <div className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border">
            <div className="flex items-start gap-3">
              <GraduationCap className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">What Your ${impactData.amount} Provides</h3>
                <p className="text-muted-foreground text-pretty">{impactData.impact.specificImpact}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={onDonate}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
        >
          <Heart className="mr-2 h-5 w-5" />
          Donate ${impactData.amount} Now
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>

        <Button
          onClick={handleShare}
          variant="outline"
          size="lg"
          disabled={isSharing}
          className="px-8 py-3 text-lg bg-transparent"
        >
          <Share2 className="mr-2 h-5 w-5" />
          {isSharing ? "Sharing..." : "Share My Impact"}
        </Button>

        <Button onClick={onReset} variant="ghost" size="lg" className="px-8 py-3 text-lg">
          <Download className="mr-2 h-5 w-5" />
          Try Different Amount
        </Button>
      </div>

      {/* Additional Info */}
      <Card className="bg-muted/50 border-0">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold mb-2">{"100% Direct Impact Guarantee"}</h3>
          <p className="text-muted-foreground text-pretty">
            {
              "Every dollar you donate goes directly to student support. KEF's operational costs are covered separately by private supporters, ensuring maximum impact for your contribution."
            }
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
