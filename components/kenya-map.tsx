"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { MapHotspot } from "@/lib/types"
import { MapPin, X, Heart, GraduationCap } from "lucide-react"
import Image from "next/image"

interface KenyaMapProps {
  hotspots: MapHotspot[]
  onHotspotClick: (hotspot: MapHotspot) => void
}

export function KenyaMap({ hotspots, onHotspotClick }: KenyaMapProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<MapHotspot | null>(null)

  const handleHotspotClick = (hotspot: MapHotspot) => {
    setSelectedHotspot(hotspot)
    onHotspotClick(hotspot)
  }

  const closeModal = () => {
    setSelectedHotspot(null)
  }

  // Simplified Kenya map using CSS and positioned hotspots
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Kenya Map SVG */}
      <div className="relative bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-8 border-2 border-border">
        <svg viewBox="0 0 400 300" className="w-full h-auto" style={{ minHeight: "300px" }}>
          {/* Simplified Kenya outline */}
          <path
            d="M50 50 L350 50 L350 80 L320 120 L340 160 L320 200 L280 240 L200 250 L120 230 L80 200 L60 160 L50 120 Z"
            fill="rgba(34, 197, 94, 0.1)"
            stroke="rgba(34, 197, 94, 0.3)"
            strokeWidth="2"
            className="transition-all duration-300"
          />

          {/* Lake Victoria */}
          <ellipse
            cx="120"
            cy="180"
            rx="25"
            ry="15"
            fill="rgba(59, 130, 246, 0.3)"
            stroke="rgba(59, 130, 246, 0.5)"
            strokeWidth="1"
          />

          {/* Hotspot markers */}
          {hotspots.map((hotspot, index) => {
            // Convert lat/lng to SVG coordinates (simplified mapping)
            const x = 120 + (hotspot.coordinates[1] - 34) * 8
            const y = 150 - (hotspot.coordinates[0] + 1) * 25

            return (
              <g key={hotspot.id}>
                <circle
                  cx={x}
                  cy={y}
                  r="8"
                  fill="rgba(190, 18, 60, 0.8)"
                  stroke="white"
                  strokeWidth="2"
                  className="cursor-pointer hover:scale-125 transition-transform duration-200 animate-pulse"
                  onClick={() => handleHotspotClick(hotspot)}
                />
                <text
                  x={x}
                  y={y - 15}
                  textAnchor="middle"
                  className="text-xs font-medium fill-foreground pointer-events-none"
                >
                  {hotspot.name}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <span className="text-muted-foreground">KEF Student Locations</span>
          </div>
        </div>
      </div>

      {/* Hotspot Modal */}
      {selectedHotspot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="relative">
              <Button variant="ghost" size="sm" onClick={closeModal} className="absolute right-2 top-2">
                <X className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-primary" />
                <Badge variant="secondary">{selectedHotspot.name}</Badge>
              </div>
              <CardTitle className="text-xl">{selectedHotspot.story.title}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src={selectedHotspot.story.imageUrl || "/placeholder.svg"}
                  alt={selectedHotspot.story.studentName}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <Badge variant="outline" className="bg-background/80">
                    <Heart className="w-3 h-3 mr-1" />
                    {selectedHotspot.story.studentName}
                  </Badge>
                </div>
              </div>

              <p className="text-foreground/90 leading-relaxed text-pretty">{selectedHotspot.story.content}</p>

              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-start gap-2">
                  <GraduationCap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-primary mb-1">KEF Impact</h4>
                    <p className="text-sm text-muted-foreground text-pretty">{selectedHotspot.story.impact}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
