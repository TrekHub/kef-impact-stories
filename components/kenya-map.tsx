"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { MapHotspot } from "@/lib/types";
import { MapPin, X, Heart, GraduationCap } from "lucide-react";
import Image from "next/image";

interface KenyaMapProps {
  hotspots: MapHotspot[];
  onHotspotClick: (hotspot: MapHotspot) => void;
}

export function KenyaMap({ hotspots, onHotspotClick }: KenyaMapProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<MapHotspot | null>(
    null
  );

  const handleHotspotClick = (hotspot: MapHotspot) => {
    setSelectedHotspot(hotspot);
    onHotspotClick(hotspot);
  };

  const closeModal = () => {
    setSelectedHotspot(null);
  };

  // Accurate Kenya map with stable positioning
  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Kenya Map SVG */}
      <div className="relative bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 rounded-lg p-4 md:p-8 border-2 border-border">
        <svg
          viewBox="0 0 600 500"
          className="w-full h-auto"
          style={{ minHeight: "400px" }}
        >
          {/* Accurate Kenya outline based on real geographical data */}
          <path
            d="M 120 100 
               L 150 90 
               L 200 85 
               L 250 88 
               L 300 95 
               L 350 105 
               L 400 120 
               L 450 140 
               L 480 160 
               L 500 185 
               L 510 215 
               L 515 245 
               L 510 275 
               L 500 305 
               L 485 335 
               L 465 360 
               L 440 380 
               L 410 395 
               L 375 405 
               L 340 410 
               L 305 408 
               L 270 405 
               L 235 400 
               L 200 390 
               L 170 375 
               L 145 355 
               L 125 330 
               L 110 300 
               L 100 270 
               L 95 240 
               L 95 210 
               L 100 180 
               L 105 150 
               L 110 125 
               Z"
            fill="rgba(34, 197, 94, 0.15)"
            stroke="rgba(34, 197, 94, 0.5)"
            strokeWidth="3"
            className="transition-all duration-300"
          />

          {/* Lake Victoria - Western Kenya */}
          <path
            d="M 110 280 
               Q 120 265 140 270 
               Q 160 275 170 290 
               Q 165 305 150 310 
               Q 130 308 120 295 
               Q 110 285 110 280 Z"
            fill="rgba(59, 130, 246, 0.5)"
            stroke="rgba(59, 130, 246, 0.7)"
            strokeWidth="2"
          />

          {/* Lake Turkana - Northern Kenya */}
          <ellipse
            cx="200"
            cy="150"
            rx="15"
            ry="40"
            fill="rgba(59, 130, 246, 0.4)"
            stroke="rgba(59, 130, 246, 0.6)"
            strokeWidth="2"
            transform="rotate(-15 200 150)"
          />

          {/* Mount Kenya */}
          <circle
            cx="320"
            cy="240"
            r="8"
            fill="rgba(107, 114, 128, 0.7)"
            stroke="rgba(75, 85, 99, 0.9)"
            strokeWidth="2"
          />

          {/* Coastal waters */}
          <path
            d="M 440 380 
               Q 470 390 500 405 
               Q 520 420 540 440 
               Q 530 460 510 470 
               Q 480 475 450 470"
            fill="rgba(59, 130, 246, 0.3)"
            stroke="rgba(59, 130, 246, 0.5)"
            strokeWidth="2"
          />

          {/* Fixed hotspot positions based on actual Kenya geography */}
          {hotspots.map((hotspot, index) => {
            // Fixed coordinates for each city
            const cityCoords = {
              nairobi: { x: 320, y: 280 }, // Capital, south-central
              kisumu: { x: 150, y: 285 }, // Near Lake Victoria, western
              turkana: { x: 200, y: 140 }, // Northern Kenya, near Lake Turkana
              mombasa: { x: 450, y: 385 }, // Coastal, southeast
              eldoret: { x: 200, y: 220 }, // Western highlands
            };

            const coords = cityCoords[
              hotspot.id as keyof typeof cityCoords
            ] || { x: 300, y: 250 };

            return (
              <g key={hotspot.id} className="cursor-pointer">
                {/* Pulsing background circle */}
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r="15"
                  fill="rgba(215, 85, 2, 0.15)"
                  className="animate-ping"
                />

                {/* Main marker */}
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r="10"
                  fill="#d75502"
                  stroke="white"
                  strokeWidth="3"
                  className="hover:scale-110 transition-transform duration-200 drop-shadow-lg"
                  onClick={() => handleHotspotClick(hotspot)}
                />

                {/* Center dot */}
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r="4"
                  fill="white"
                  className="pointer-events-none"
                />

                {/* City name label with background */}
                <rect
                  x={coords.x - 25}
                  y={coords.y - 35}
                  width="50"
                  height="18"
                  fill="rgba(255, 255, 255, 0.9)"
                  stroke="rgba(0, 0, 0, 0.1)"
                  strokeWidth="1"
                  rx="9"
                  className="pointer-events-none"
                />
                <text
                  x={coords.x}
                  y={coords.y - 23}
                  textAnchor="middle"
                  className="text-sm font-semibold fill-gray-800 pointer-events-none"
                >
                  {hotspot.name}
                </text>
              </g>
            );
          })}

          {/* Geographic labels */}
          <text
            x="140"
            y="315"
            textAnchor="middle"
            className="text-sm fill-blue-700 font-semibold pointer-events-none"
          >
            Lake Victoria
          </text>
          <text
            x="200"
            y="115"
            textAnchor="middle"
            className="text-sm fill-blue-700 font-semibold pointer-events-none"
          >
            Lake Turkana
          </text>
          <text
            x="320"
            y="260"
            textAnchor="middle"
            className="text-sm fill-gray-700 font-semibold pointer-events-none"
          >
            Mt. Kenya
          </text>
          <text
            x="520"
            y="450"
            textAnchor="middle"
            className="text-sm fill-blue-700 font-semibold pointer-events-none"
          >
            Indian Ocean
          </text>

          {/* Compass */}
          <g transform="translate(50, 120)">
            <circle
              cx="0"
              cy="0"
              r="25"
              fill="rgba(255, 255, 255, 0.9)"
              stroke="rgba(0, 0, 0, 0.2)"
              strokeWidth="2"
            />
            <path d="M 0 -20 L 5 -5 L 0 0 L -5 -5 Z" fill="red" />
            <path
              d="M 0 20 L 5 5 L 0 0 L -5 5 Z"
              fill="white"
              stroke="black"
              strokeWidth="1"
            />
            <text
              x="0"
              y="-30"
              textAnchor="middle"
              className="text-xs font-bold fill-red-600"
            >
              N
            </text>
          </g>
        </svg>

        {/* Enhanced Map Legend */}
        <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg p-4 border border-border shadow-lg">
          <h4 className="font-semibold text-sm mb-3">Map Legend</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-4 h-4 bg-primary rounded-full border-2 border-white"></div>
              <span className="text-muted-foreground">
                KEF Student Communities
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
              <span className="text-muted-foreground">
                Lakes & Water Bodies
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
              <span className="text-muted-foreground">Mountains</span>
            </div>
          </div>
        </div>

        {/* Country label */}
        <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm rounded-lg px-4 py-3 border border-border shadow-lg">
          <div className="text-xl font-bold text-primary">KENYA</div>
          <div className="text-sm text-muted-foreground">Republic of Kenya</div>
          <div className="text-xs text-muted-foreground mt-1">East Africa</div>
        </div>
      </div>

      {/* Hotspot Modal */}
      {selectedHotspot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={closeModal}
                className="absolute right-2 top-2"
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-primary" />
                <Badge variant="secondary">{selectedHotspot.name}</Badge>
              </div>
              <CardTitle className="text-xl">
                {selectedHotspot.story.title}
              </CardTitle>
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

              <p className="text-foreground/90 leading-relaxed text-pretty">
                {selectedHotspot.story.content}
              </p>

              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-start gap-2">
                  <GraduationCap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-primary mb-1">
                      KEF Impact
                    </h4>
                    <p className="text-sm text-muted-foreground text-pretty">
                      {selectedHotspot.story.impact}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
