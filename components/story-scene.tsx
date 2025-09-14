"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { StoryScene, StoryChoice } from "@/lib/types";
import { ArrowRight, Heart } from "lucide-react";
import Image from "next/image";

interface StorySceneProps {
  scene: StoryScene;
  onChoiceSelect: (choice: StoryChoice) => void;
  onComplete: () => void;
  progress: number;
}

export function StorySceneComponent({
  scene,
  onChoiceSelect,
  onComplete,
  progress,
}: StorySceneProps) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const handleChoiceClick = (choice: StoryChoice) => {
    setSelectedChoice(choice.id);
    setTimeout(() => {
      onChoiceSelect(choice);
      setSelectedChoice(null);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6 md:py-8">
        {/* Progress Bar - Fixed positioning for better UX */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 pb-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground font-medium">
              Story Progress
            </span>
            <span className="text-sm font-semibold text-primary">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-muted border border-border rounded-lg h-2">
            <div
              className="bg-primary h-2 rounded-lg transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Story Scene Card - Improved spacing and sizing */}
        <div className="mb-8 bg-card border-2 border-border rounded-lg overflow-hidden">
          <div className="relative h-72 md:h-96">
            <Image
              src={scene.imageUrl || "/placeholder.svg"}
              alt={scene.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium">
                <Heart className="w-4 h-4 text-primary" />
                Chapter {Math.ceil(progress / 25)}
              </div>
              <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
                {scene.title}
              </h1>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <p className="text-lg md:text-xl leading-relaxed text-foreground font-light">
              {scene.content}
            </p>
          </div>
        </div>

        {/* Choices or Completion - Improved mobile UX */}
        {scene.isEnding ? (
          <div className="text-center space-y-8">
            <div className="p-8 md:p-10 bg-muted border-2 border-border rounded-lg">
              <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
                {"You've experienced the transformative power of education"}
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                {
                  "Every story like this is made possible by supporters like you. Ready to see your impact?"
                }
              </p>
            </div>
            <Button
              onClick={onComplete}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-medium min-h-14 w-full max-w-md mx-auto"
            >
              Explore Your Impact
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-center text-foreground">
              {"What happens next?"}
            </h2>
            <div className="space-y-4">
              {scene.choices.map((choice) => (
                <Button
                  key={choice.id}
                  variant={selectedChoice === choice.id ? "default" : "outline"}
                  size="lg"
                  onClick={() => handleChoiceClick(choice)}
                  disabled={selectedChoice !== null}
                  className={`w-full p-6 md:p-8 h-auto text-left justify-start transition-all duration-300 border-2 min-h-20 ${
                    selectedChoice === choice.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "hover:bg-muted hover:border-primary bg-card"
                  }`}
                >
                  <div className="flex items-center gap-4 w-full">
                    <div className="flex-shrink-0">
                      <ArrowRight
                        className={`h-6 w-6 transition-transform ${
                          selectedChoice === choice.id ? "translate-x-1" : ""
                        }`}
                      />
                    </div>
                    <span className="leading-relaxed font-medium text-base md:text-lg flex-1">
                      {choice.text}
                    </span>
                  </div>
                </Button>
              ))}
            </div>

            {/* Add some breathing room at bottom for mobile */}
            <div className="h-8"></div>
          </div>
        )}
      </div>
    </div>
  );
}
