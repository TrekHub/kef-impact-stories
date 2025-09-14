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

  // Kenya map with image background and interactive pointers
  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Kenya Map Container */}
      <div className="relative bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 rounded-lg p-4 md:p-8 border-2 border-border">
        {/* Map Image Background */}
        <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
          <Image
            src="/kef-images/map/KE-EPS-02-8001.png"
            alt="Map of Kenya"
            fill
            className="object-contain rounded-lg"
            priority
          />

          {/* Interactive Pointers Overlay */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 10 }}
          >
            {/* Interactive hotspot markers */}
            {hotspots.map((hotspot, index) => {
              // Coordinates as percentages for better compatibility with different map images
              const cityCoords = {
                nairobi: { x: 42, y: 55 }, // Capital, south-central Kenya
                kisumu: { x: 21, y: 55 }, // Near Lake Victoria, western Kenya
                turkana: { x: 27, y: 25 }, // Northern Kenya, near Lake Turkana
                mombasa: { x: 59, y: 72 }, // Coastal, southeast Kenya
                eldoret: { x: 27, y: 40 }, // Western highlands
              };

              const coords = cityCoords[
                hotspot.id as keyof typeof cityCoords
              ] || { x: 50, y: 50 };

              return (
                <g
                  key={hotspot.id}
                  className="cursor-pointer pointer-events-auto"
                >
                  {/* Pulsing background circle */}
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r="3"
                    fill="rgba(215, 85, 2, 0.2)"
                    className="animate-ping"
                  />

                  {/* Main marker with enhanced styling */}
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r="1.8"
                    fill="#d75502"
                    stroke="white"
                    strokeWidth="0.6"
                    className="hover:scale-110 transition-transform duration-200 drop-shadow-lg"
                    onClick={() => handleHotspotClick(hotspot)}
                  />

                  {/* Center dot */}
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r="0.7"
                    fill="white"
                    className="pointer-events-none"
                  />

                  {/* City name label with enhanced background */}
                  <rect
                    x={coords.x - 5.5}
                    y={coords.y - 7}
                    width="11"
                    height="3.5"
                    fill="rgba(255, 255, 255, 0.95)"
                    stroke="rgba(215, 85, 2, 0.3)"
                    strokeWidth="0.1"
                    rx="1.75"
                    className="pointer-events-none drop-shadow-sm"
                  />
                  <text
                    x={coords.x}
                    y={coords.y - 4.5}
                    textAnchor="middle"
                    className="text-xs font-semibold fill-gray-800 pointer-events-none"
                    style={{ fontSize: "2px" }}
                  >
                    {hotspot.name}
                  </text>

                  {/* Connection lines to show KEF presence */}
                  <line
                    x1={coords.x}
                    y1={coords.y + 1.8}
                    x2={coords.x}
                    y2={coords.y + 3.5}
                    stroke="#d75502"
                    strokeWidth="0.3"
                    className="pointer-events-none"
                  />
                  <circle
                    cx={coords.x}
                    cy={coords.y + 4}
                    r="0.4"
                    fill="#d75502"
                    className="pointer-events-none"
                  />
                </g>
              );
            })}

            {/* Compass overlay */}
            <g transform="translate(12, 20)">
              <circle
                cx="0"
                cy="0"
                r="4"
                fill="rgba(255, 255, 255, 0.95)"
                stroke="rgba(0, 0, 0, 0.2)"
                strokeWidth="0.3"
                className="drop-shadow-sm"
              />
              <path
                d="M 0 -3.2 L 0.8 -0.8 L 0 0 L -0.8 -0.8 Z"
                fill="#dc2626"
              />
              <path
                d="M 0 3.2 L 0.8 0.8 L 0 0 L -0.8 0.8 Z"
                fill="white"
                stroke="#374151"
                strokeWidth="0.1"
              />
              <text
                x="0"
                y="-5.2"
                textAnchor="middle"
                className="text-xs font-bold fill-red-600"
                style={{ fontSize: "1.5px" }}
              >
                N
              </text>
            </g>
          </svg>
        </div>

        {/* Enhanced Map Legend - Responsive positioning */}
        <div className="md:absolute md:bottom-4 md:left-4 mt-4 md:mt-0 bg-background/95 backdrop-blur-sm rounded-lg p-4 border border-border shadow-lg z-20 max-w-xs">
          <h4 className="font-semibold text-sm mb-3">Map Legend</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-sm"></div>
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
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
              <span className="text-muted-foreground text-xs">
                Click markers for stories
              </span>
            </div>
          </div>
        </div>

        {/* Country label - Responsive positioning */}
        <div className="md:absolute md:top-4 md:right-4 mb-4 md:mb-0 bg-background/95 backdrop-blur-sm rounded-lg px-4 py-3 border border-border shadow-lg z-20 text-center md:text-left">
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
