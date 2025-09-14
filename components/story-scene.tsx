"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { StoryScene, StoryChoice } from "@/lib/types";
import { ArrowRight, Heart, Play, Pause, Volume2, Eye } from "lucide-react";
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
  const [isVisible, setIsVisible] = useState(false);
  const [contentRevealed, setContentRevealed] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const sceneRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);

  // Intersection Observer for entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Start content revelation after a delay
          setTimeout(() => setContentRevealed(true), 800);
        }
      },
      { threshold: 0.1 }
    );

    if (sceneRef.current) {
      observer.observe(sceneRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-scroll reading simulation
  useEffect(() => {
    if (!contentRevealed || !contentRef.current) return;

    const contentLength = scene.content.length;
    const readingSpeed = 40; // characters per second
    const totalTime = (contentLength / readingSpeed) * 1000;

    const interval = setInterval(() => {
      setReadingProgress((prev) => {
        const newProgress = prev + 100 / (totalTime / 100);
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [contentRevealed, scene.content]);

  // Track user engagement
  const trackEngagement = (action: string, data?: any) => {
    // Analytics tracking - could be Google Analytics, Mixpanel, etc.
    console.log(`User engagement: ${action}`, data);
    // Example: gtag('event', action, { scene_id: scene.id, ...data });
  };

  const handleChoiceClick = (choice: StoryChoice) => {
    trackEngagement("choice_selected", {
      choice_id: choice.id,
      choice_text: choice.text,
    });
    setSelectedChoice(choice.id);

    setTimeout(() => {
      onChoiceSelect(choice);
      setSelectedChoice(null);
    }, 800);
  };

  const toggleReading = () => {
    setIsReading(!isReading);
    trackEngagement("reading_toggled", { is_reading: !isReading });
  };

  const handleImageLoad = () => {
    trackEngagement("scene_image_loaded", { scene_id: scene.id });
  };

  return (
    <div
      ref={sceneRef}
      className={`min-h-screen bg-background transition-all duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-2xl mx-auto px-4 py-6 md:py-8">
        {/* Progress Bar - Enhanced with animations */}
        <div
          className={`sticky top-0 bg-background/95 backdrop-blur-sm z-10 pb-4 mb-6 transition-all duration-500 ${
            isVisible ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground font-medium">
              Story Progress
            </span>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          <div className="w-full bg-muted border border-border rounded-lg h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-blue-600 h-3 rounded-lg transition-all duration-1000 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>

          {/* Reading Progress */}
          {contentRevealed && (
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={toggleReading}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                {isReading ? (
                  <Pause className="w-3 h-3" />
                ) : (
                  <Play className="w-3 h-3" />
                )}
              </button>
              <div className="flex-1 bg-muted/50 rounded-full h-1">
                <div
                  className="bg-primary/60 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${readingProgress}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">Reading</span>
            </div>
          )}
        </div>

        {/* Story Scene Card - Enhanced with reveal animations */}
        <div
          className={`mb-8 bg-card border-2 border-border rounded-lg overflow-hidden transition-all duration-1000 ${
            isVisible ? "translate-y-0 scale-100" : "translate-y-8 scale-95"
          }`}
        >
          <div className="relative h-72 md:h-96 group">
            <Image
              src={scene.imageUrl || "/placeholder.svg"}
              alt={scene.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              onLoad={handleImageLoad}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Floating elements for engagement */}
            <div className="absolute top-4 right-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                <Volume2 className="w-3 h-3" />
                <span className="text-xs">Audio Story</span>
              </div>
            </div>

            <div
              className={`absolute bottom-6 left-6 right-6 transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-card/90 backdrop-blur-sm border border-border rounded-lg text-sm font-medium">
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                Chapter {Math.ceil(progress / 25)}
              </div>
              <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
                {scene.title}
              </h1>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div
              className={`transition-all duration-1000 delay-500 ${
                contentRevealed
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <p
                ref={contentRef}
                className="text-lg md:text-xl leading-relaxed text-foreground font-light relative"
              >
                {scene.content}

                {/* Reading indicator */}
                {isReading && (
                  <span className="absolute -left-4 top-0 w-1 bg-primary animate-pulse h-full opacity-50"></span>
                )}
              </p>

              {/* Emotional engagement indicators */}
              <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>Emotional Impact: High</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4 text-blue-500" />
                  <span>
                    Reading Time: {Math.ceil(scene.content.length / 200)} min
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Choices or Completion - Enhanced with staggered animations */}
        {scene.isEnding ? (
          <div
            className={`text-center space-y-8 transition-all duration-1000 delay-700 ${
              contentRevealed
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="p-8 md:p-10 bg-gradient-to-br from-primary/5 to-blue-50 border-2 border-primary/20 rounded-lg">
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary animate-pulse" />
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
                  {"You've experienced the transformative power of education"}
                </h2>
                <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                  {
                    "Every story like this is made possible by supporters like you. Ready to see your impact?"
                  }
                </p>
              </div>

              {/* Impact preview */}
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-white/50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1,247</div>
                  <div className="text-xs text-muted-foreground">
                    Students Helped
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">$89k</div>
                  <div className="text-xs text-muted-foreground">
                    Raised This Month
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">92%</div>
                  <div className="text-xs text-muted-foreground">
                    Success Rate
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={() => {
                trackEngagement("story_completed", { scene_id: scene.id });
                onComplete();
              }}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-medium min-h-14 w-full max-w-md mx-auto transition-all duration-200 hover:scale-105 group"
            >
              <span className="flex items-center gap-2">
                Explore Your Impact
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </div>
        ) : (
          <div
            className={`space-y-8 transition-all duration-1000 delay-800 ${
              contentRevealed
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
                {"What happens next?"}
              </h2>
              <p className="text-muted-foreground">
                Your choice shapes this story
              </p>
            </div>

            <div className="space-y-4">
              {scene.choices.map((choice, index) => (
                <Button
                  key={choice.id}
                  variant={selectedChoice === choice.id ? "default" : "outline"}
                  size="lg"
                  onClick={() => handleChoiceClick(choice)}
                  disabled={selectedChoice !== null}
                  className={`w-full p-6 md:p-8 h-auto text-left justify-start transition-all duration-300 border-2 min-h-20 group hover:shadow-lg ${
                    selectedChoice === choice.id
                      ? "bg-primary text-primary-foreground border-primary transform scale-105"
                      : "hover:bg-muted hover:border-primary bg-card"
                  }`}
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <div className="flex items-center gap-4 w-full">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedChoice === choice.id
                            ? "border-white bg-white/20"
                            : "border-primary/30 group-hover:border-primary"
                        }`}
                      >
                        <ArrowRight
                          className={`h-4 w-4 transition-all duration-300 ${
                            selectedChoice === choice.id
                              ? "translate-x-1 text-white"
                              : "text-primary group-hover:translate-x-1"
                          }`}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <span className="leading-relaxed font-medium text-base md:text-lg block">
                        {choice.text}
                      </span>
                      {/* Choice impact preview */}
                      <span className="text-sm opacity-70 mt-1 block">
                        {choice.id.includes("school")
                          ? "🎓 Education path"
                          : choice.id.includes("work")
                          ? "💼 Work path"
                          : "💫 Transformative path"}
                      </span>
                    </div>
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
