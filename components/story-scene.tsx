"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { StoryScene, StoryChoice } from "@/lib/types";
import {
  ArrowRight,
  Heart,
  Play,
  Pause,
  Volume2,
  Eye,
  Sparkles,
  X,
  Home,
} from "lucide-react";
import Image from "next/image";

interface StorySceneProps {
  scene: StoryScene;
  onChoiceSelect: (choice: StoryChoice) => void;
  onComplete: () => void;
  onExit?: () => void;
  progress: number;
}

export function StorySceneComponent({
  scene,
  onChoiceSelect,
  onComplete,
  onExit,
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
      className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 transition-all duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8 overflow-hidden">
        {/* Enhanced Progress Bar with floating design */}
        <div
          className={`sticky top-2 sm:top-4 bg-white/95 backdrop-blur-lg z-20 rounded-xl md:rounded-2xl border border-gray-200/50 shadow-lg p-3 sm:p-4 mb-6 md:mb-8 transition-all duration-500 mx-auto max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl ${
            isVisible ? "translate-y-0 scale-100" : "-translate-y-4 scale-95"
          }`}
        >
          <div className="flex items-center justify-between mb-3 md:mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2 md:gap-3 min-w-0">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Eye className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <div className="min-w-0">
                <span className="text-xs md:text-sm font-semibold text-gray-900 block truncate">
                  Story Progress
                </span>
                <div className="text-xs text-gray-500 truncate">
                  Chapter {Math.ceil(progress / 25)} of 4
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {onExit && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onExit}
                  className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 text-xs md:text-sm px-2 md:px-3 py-1"
              >
                {Math.round(progress)}% Complete
              </Badge>
            </div>
          </div>

          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary via-orange-500 to-yellow-500 h-3 rounded-full transition-all duration-1000 ease-out relative shadow-sm"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full"></div>
                <div className="absolute right-0 top-0 w-6 h-3 bg-white/50 rounded-full animate-bounce"></div>
              </div>
            </div>

            {/* Progress milestones */}
            <div className="absolute -bottom-3 left-0 right-0 flex justify-between">
              {[25, 50, 75, 100].map((milestone, index) => (
                <div
                  key={milestone}
                  className={`w-2 h-2 rounded-full border-2 border-white transition-all duration-500 ${
                    progress >= milestone
                      ? "bg-primary shadow-lg"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Enhanced Reading Progress */}
          {contentRevealed && (
            <div className="mt-6 flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <button
                onClick={toggleReading}
                className="w-8 h-8 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                {isReading ? (
                  <Pause className="w-4 h-4 text-primary" />
                ) : (
                  <Play className="w-4 h-4 text-primary" />
                )}
              </button>
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Reading Progress</span>
                  <span>{Math.round(readingProgress)}%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${readingProgress}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Story Scene Card with modern design */}
        <div
          className={`mb-8 md:mb-10 bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-1000 hover:shadow-2xl md:hover:shadow-3xl mx-auto max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl ${
            isVisible ? "translate-y-0 scale-100" : "translate-y-8 scale-95"
          }`}
        >
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[28rem] group overflow-hidden">
            <Image
              src={scene.imageUrl || "/placeholder.svg"}
              alt={scene.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              onLoad={handleImageLoad}
            />

            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-blue-600/20" />

            {/* Floating audio indicator */}
            <div className="absolute top-4 md:top-6 right-4 md:right-6">
              <div className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-xs md:text-sm border border-white/30 hover:bg-white/30 transition-all duration-300">
                <Volume2 className="w-3 h-3 md:w-4 md:h-4 animate-pulse" />
                <span className="font-medium hidden sm:inline">
                  Immersive Audio
                </span>
                <span className="font-medium sm:hidden">Audio</span>
              </div>
            </div>

            {/* Chapter indicator */}
            <div className="absolute top-4 md:top-6 left-4 md:left-6">
              <div className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 bg-black/50 backdrop-blur-md rounded-full text-white text-xs md:text-sm border border-white/20">
                <Heart className="w-3 h-3 md:w-4 md:h-4 text-red-400 animate-pulse" />
                <span className="font-medium">
                  Chapter {Math.ceil(progress / 25)}
                </span>
              </div>
            </div>

            {/* Enhanced title section */}
            <div
              className={`absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-10 transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <div className="space-y-2 md:space-y-4">
                <div className="inline-flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full text-white text-xs md:text-sm font-medium">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="hidden sm:inline">
                    Live Story Experience
                  </span>
                  <span className="sm:hidden">Live Story</span>
                </div>
                <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight tracking-tight break-words">
                  {scene.title}
                </h1>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full animate-pulse opacity-50"></div>
          </div>

          {/* Enhanced content section */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-12 bg-gradient-to-br from-white to-gray-50">
            <div
              className={`transition-all duration-1000 delay-500 ${
                contentRevealed
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              {/* Content header */}
              <div className="flex items-center justify-between mb-6 md:mb-8 flex-wrap gap-3">
                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-base md:text-lg">
                      📖
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">
                      Story Content
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 truncate">
                      Immerse yourself in the narrative
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200 text-xs md:text-sm px-2 md:px-3 py-1 whitespace-nowrap"
                >
                  {Math.ceil(scene.content.length / 200)} min read
                </Badge>
              </div>

              {/* Main content with enhanced typography */}
              <div className="relative overflow-hidden">
                <p
                  ref={contentRef}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-800 font-light relative mb-6 md:mb-8 selection:bg-primary/20 break-words overflow-wrap-anywhere"
                  style={{ lineHeight: "1.8" }}
                >
                  {scene.content}

                  {/* Enhanced reading indicator */}
                  {isReading && (
                    <span className="absolute -left-3 md:-left-6 top-0 w-1 md:w-2 bg-gradient-to-b from-primary to-orange-500 animate-pulse h-full opacity-70 rounded-full"></span>
                  )}
                </p>
              </div>

              {/* Enhanced engagement metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 text-center md:text-left">
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Emotional Impact
                    </div>
                    <div className="text-sm text-gray-600">
                      High resonance story
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-center md:text-left">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Eye className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Reading Time
                    </div>
                    <div className="text-sm text-gray-600">
                      {Math.ceil(scene.content.length / 200)} minutes
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-center md:text-left">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-500 font-bold">🎯</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Impact Level
                    </div>
                    <div className="text-sm text-gray-600">
                      Life-changing choices
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced completion screen */}
        {scene.isEnding ? (
          <div
            className={`text-center space-y-10 transition-all duration-1000 delay-700 ${
              contentRevealed
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="relative p-10 md:p-16 bg-gradient-to-br from-primary/5 via-white to-blue-50 border-2 border-primary/20 rounded-3xl shadow-2xl overflow-hidden">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/5 rounded-full translate-y-12 -translate-x-12"></div>

              <div className="relative z-10">
                <div className="mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-pulse">
                    <Heart className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent mb-6 leading-tight">
                    You've Experienced the Power of Education
                  </h2>
                  <p className="text-gray-600 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-light">
                    Every story like this is made possible by supporters like
                    you. Your choices matter, and now you can make them real.
                  </p>
                </div>

                {/* Enhanced impact statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg">
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-xl">🎓</span>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                      1,247
                    </div>
                    <div className="text-sm font-medium text-gray-600 mt-1">
                      Students Helped This Year
                    </div>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-xl">💰</span>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                      $89k
                    </div>
                    <div className="text-sm font-medium text-gray-600 mt-1">
                      Raised This Month
                    </div>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-xl">⭐</span>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                      92%
                    </div>
                    <div className="text-sm font-medium text-gray-600 mt-1">
                      Success Rate
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => {
                  trackEngagement("story_completed", { scene_id: scene.id });
                  onComplete();
                }}
                size="lg"
                className="bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-500 text-white px-12 py-6 text-xl font-bold min-h-16 w-full max-w-lg mx-auto transition-all duration-300 hover:scale-105 group rounded-2xl shadow-xl hover:shadow-2xl"
              >
                <span className="flex items-center gap-3">
                  <Sparkles className="h-6 w-6" />
                  See Your Real Impact
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>

              {onExit && (
                <Button
                  onClick={onExit}
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-lg font-medium min-h-16 rounded-2xl border-2 hover:bg-gray-50"
                >
                  <span className="flex items-center gap-3">
                    <Home className="h-5 w-5" />
                    Return to Main Site
                  </span>
                </Button>
              )}
            </div>
          </div>
        ) : (
          /* Enhanced choice selection */
          <div
            className={`space-y-6 sm:space-y-8 md:space-y-10 px-4 sm:px-6 lg:px-8 transition-all duration-1000 delay-800 ${
              contentRevealed
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            {/* Choice header */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white rounded-full border border-gray-200 shadow-sm mb-4 sm:mb-6">
                <span className="w-3 h-3 bg-gradient-to-r from-primary to-orange-500 rounded-full animate-pulse"></span>
                <span className="text-xs sm:text-sm font-medium text-gray-700">
                  Decision Point
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight px-2">
                What happens next?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4">
                Your choice will shape this story and determine the outcome.
                Choose thoughtfully.
              </p>
            </div>

            {/* Enhanced choice buttons */}
            <div className="space-y-3 sm:space-y-4 md:space-y-6 max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto">
              {scene.choices.map((choice, index) => (
                <Button
                  key={choice.id}
                  variant="ghost"
                  size="lg"
                  onClick={() => handleChoiceClick(choice)}
                  disabled={selectedChoice !== null}
                  className={`w-full p-4 sm:p-6 md:p-8 h-auto text-left justify-start transition-all duration-500 border-2 group hover:shadow-xl rounded-xl sm:rounded-2xl relative ${
                    selectedChoice === choice.id
                      ? "bg-gradient-to-r from-primary to-orange-600 text-white border-transparent transform scale-[1.02] shadow-2xl"
                      : "hover:bg-white hover:border-primary/30 bg-white/80 backdrop-blur-sm border-gray-200 hover:scale-[1.01]"
                  }`}
                  style={{
                    animationDelay: `${index * 200}ms`,
                    animationFillMode: "both",
                  }}
                >
                  {/* Choice selection background effect */}
                  {selectedChoice !== choice.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}

                  <div className="flex items-start gap-3 sm:gap-4 md:gap-6 w-full relative z-10">
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          selectedChoice === choice.id
                            ? "border-white bg-white/20 shadow-lg"
                            : "border-primary/40 group-hover:border-primary group-hover:bg-primary/10"
                        }`}
                      >
                        <ArrowRight
                          className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 transition-all duration-300 ${
                            selectedChoice === choice.id
                              ? "translate-x-1 text-white"
                              : "text-primary group-hover:translate-x-1"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex-1 space-y-1 sm:space-y-2 min-w-0">
                      <span
                        className={`leading-relaxed font-semibold text-sm sm:text-base md:text-lg block whitespace-pre-wrap break-words ${
                          selectedChoice === choice.id
                            ? "text-white"
                            : "text-gray-900 group-hover:text-primary"
                        }`}
                        style={{
                          wordBreak: "break-word",
                          overflowWrap: "break-word",
                          hyphens: "auto",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {choice.text}
                      </span>
                    </div>
                  </div>
                </Button>
              ))}
            </div>

            {/* Choice guidance */}
            <div className="text-center p-4 sm:p-6 bg-blue-50 rounded-xl sm:rounded-2xl border border-blue-100 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-xl sm:text-2xl">💡</span>
                <span className="font-semibold text-blue-900 text-sm sm:text-base">
                  Remember
                </span>
              </div>
              <p className="text-blue-800 text-xs sm:text-sm px-2">
                Each choice reflects real decisions that students in Kenya face
                every day. Your selection helps tell their story.
              </p>
            </div>

            {/* Add some breathing room at bottom for mobile */}
            <div className="h-10"></div>
          </div>
        )}
      </div>
    </div>
  );
}
