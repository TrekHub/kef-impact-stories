"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { KenyaMap } from "@/components/kenya-map"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { MapHotspot } from "@/lib/types"
import { ArrowLeft, ArrowRight, Map, Users, Target } from "lucide-react"
import hotspotsData from "@/data/map-hotspots.json"

export default function MapPage() {
  const router = useRouter()
  const [visitedHotspots, setVisitedHotspots] = useState<Set<string>>(new Set())

  const hotspots = hotspotsData.hotspots as MapHotspot[]

  const handleHotspotClick = (hotspot: MapHotspot) => {
    setVisitedHotspots((prev) => new Set([...prev, hotspot.id]))
  }

  const handleContinue = () => {
    router.push("/impact")
  }

  const handleBack = () => {
    router.push("/journey")
  }

  const progress = (visitedHotspots.size / hotspots.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted p-4">
      <div className="max-w-6xl mx-auto">
        <Button variant="ghost" onClick={handleBack} className="mb-6 bg-background/80 backdrop-blur-sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Journey
        </Button>

        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            <Map className="w-4 h-4 mr-2" />
            Interactive Map
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{"Discover Kenya's Stories"}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            {
              "Explore different regions of Kenya and meet the students whose lives are being transformed through education."
            }
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Locations Explored</span>
            <span className="text-sm font-medium">
              {visitedHotspots.size} of {hotspots.length}
            </span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Interactive Map */}
        <div className="mb-8">
          <KenyaMap hotspots={hotspots} onHotspotClick={handleHotspotClick} />
        </div>

        {/* Instructions */}
        <Card className="mb-8 bg-card/80 backdrop-blur-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{"How to Explore"}</h3>
                <p className="text-muted-foreground text-pretty">
                  {
                    "Click on the pulsing red markers to discover student stories from different regions of Kenya. Each location reveals unique challenges and triumphs in the journey toward education."
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center p-6 bg-card/80 backdrop-blur-sm border-0">
            <div className="text-3xl font-bold text-primary mb-2">4,600+</div>
            <div className="text-sm text-muted-foreground">Scholarships Provided</div>
          </Card>
          <Card className="text-center p-6 bg-card/80 backdrop-blur-sm border-0">
            <div className="text-3xl font-bold text-primary mb-2">153</div>
            <div className="text-sm text-muted-foreground">Partner Schools</div>
          </Card>
          <Card className="text-center p-6 bg-card/80 backdrop-blur-sm border-0">
            <div className="text-3xl font-bold text-primary mb-2">99%</div>
            <div className="text-sm text-muted-foreground">Transition Rate</div>
          </Card>
        </div>

        {/* Continue Button */}
        {visitedHotspots.size >= 2 && (
          <div className="text-center">
            <div className="p-6 bg-primary/10 rounded-lg border border-primary/20 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-medium text-primary">{"Great exploration!"}</span>
              </div>
              <p className="text-muted-foreground text-pretty">
                {
                  "You've discovered the diverse challenges and opportunities across Kenya. Ready to see how your support can make a difference?"
                }
              </p>
            </div>
            <Button
              onClick={handleContinue}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
            >
              See Your Impact
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}

        {visitedHotspots.size < 2 && (
          <div className="text-center">
            <p className="text-muted-foreground">{"Explore at least 2 locations to continue your journey"}</p>
          </div>
        )}
      </div>
    </div>
  )
}
