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
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground font-medium">
              Story Progress
            </span>
            <span className="text-sm font-semibold">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-secondary rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Story Scene Card */}
        <Card className="mb-8 overflow-hidden border border-border rounded-xl bg-white">
          <div className="relative h-64 md:h-80">
            <Image
              src={scene.imageUrl || "/placeholder.svg"}
              alt={scene.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-white/90 rounded-full text-sm font-medium">
                <Heart className="w-3 h-3 text-primary" />
                Chapter {Math.ceil(progress / 25)}
              </div>
              <CardTitle className="text-white text-2xl md:text-3xl font-bold leading-tight">
                {scene.title}
              </CardTitle>
            </div>
          </div>

          <CardContent className="p-8">
            <p className="text-lg leading-relaxed text-foreground">
              {scene.content}
            </p>
          </CardContent>
        </Card>

        {/* Choices or Completion */}
        {scene.isEnding ? (
          <div className="text-center space-y-8">
            <div className="p-8 bg-primary/5 rounded-xl border border-primary/20">
              <h3 className="text-xl font-semibold text-primary mb-3">
                {"You've experienced the transformative power of education"}
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {
                  "Every story like this is made possible by supporters like you. Ready to see your impact?"
                }
              </p>
            </div>
            <Button
              onClick={onComplete}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-medium rounded-lg"
            >
              Explore Your Impact
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center mb-8 text-foreground">
              {"What happens next?"}
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {scene.choices.map((choice) => (
                <Button
                  key={choice.id}
                  variant={selectedChoice === choice.id ? "default" : "outline"}
                  size="lg"
                  onClick={() => handleChoiceClick(choice)}
                  disabled={selectedChoice !== null}
                  className={`p-6 h-auto text-left justify-start transition-all duration-300 rounded-xl border-2 ${
                    selectedChoice === choice.id
                      ? "bg-primary text-primary-foreground border-primary scale-105"
                      : "hover:bg-secondary hover:border-primary/50 hover:scale-102 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-3 w-full">
                    <ArrowRight
                      className={`h-5 w-5 mt-0.5 flex-shrink-0 transition-transform ${
                        selectedChoice === choice.id ? "translate-x-1" : ""
                      }`}
                    />
                    <span className="leading-relaxed font-medium">
                      {choice.text}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
