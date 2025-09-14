"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  Heart,
  Users,
  Zap,
  Star,
  MapPin,
  GraduationCap,
  Sparkles,
  Play,
  Home,
  BookOpen,
  Volume2,
  Gamepad2,
  Target,
} from "lucide-react";
import Image from "next/image";
import { StorySceneComponent } from "@/components/story-scene";
import type { Story, StoryScene, StoryChoice } from "@/lib/types";
import storiesData from "@/data/stories.json";

type GameStage =
  | "splash"
  | "character-select"
  | "story-playing"
  | "decision-impact"
  | "outcome"
  | "call-to-action";

interface GameState {
  stage: GameStage;
  selectedCharacter: Story | null;
  currentScene: StoryScene | null;
  choices: string[];
  impactPoints: number;
  completionTime: number;
}

const characterProfiles = [
  {
    id: "silvia",
    name: "Silvia",
    age: 14,
    location: "Rural Kenya",
    dream: "Become a Doctor",
    challenge: "Family can't afford $400 school fees",
    imageUrl: "/kef-images/IMG_1730.jpg",
    color: "bg-pink-500",
    gradientColor: "from-pink-500 to-rose-600",
    emoji: "👩‍⚕️",
    storyId: "silvia-story",
    difficulty: "High Impact",
    description: "A brilliant student with unwavering determination",
    stats: {
      education: 85,
      determination: 95,
      potential: 90,
    },
  },
  {
    id: "sawa",
    name: "Sawa",
    age: 15,
    location: "Turkana Desert",
    dream: "Become an Engineer",
    challenge: "Expected to tend cattle, school 20km away",
    imageUrl: "/kef-images/IMG_1839.jpg",
    color: "bg-blue-500",
    gradientColor: "from-blue-500 to-indigo-600",
    emoji: "👨‍🔬",
    storyId: "sawa-story",
    difficulty: "High Impact",
    description: "An innovative thinker facing traditional barriers",
    stats: {
      education: 80,
      determination: 90,
      potential: 95,
    },
  },
];

export function MobileGameExperience() {
  const [gameState, setGameState] = useState<GameState>({
    stage: "splash",
    selectedCharacter: null,
    currentScene: null,
    choices: [],
    impactPoints: 0,
    completionTime: 0,
  });

  const [isVisible, setIsVisible] = useState(false);
  const [gameProgress, setGameProgress] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);
  const gameRef = useRef<HTMLDivElement>(null);

  const stories = storiesData.stories as Story[];

  // Initialize visibility animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Calculate game progress
  useEffect(() => {
    const progressMap = {
      splash: 0,
      "character-select": 20,
      "story-playing": 40,
      "decision-impact": 70,
      outcome: 85,
      "call-to-action": 100,
    };
    setGameProgress(progressMap[gameState.stage] || 0);
  }, [gameState.stage]);

  // Achievement system
  const unlockAchievement = (achievement: string) => {
    if (!achievements.includes(achievement)) {
      setAchievements((prev) => [...prev, achievement]);
      console.log("Achievement unlocked:", achievement);
    }
  };

  const startGame = () => {
    console.log("Starting game...");
    setGameState((prev) => ({ ...prev, stage: "character-select" }));
    unlockAchievement("journey_begun");
  };

  const selectCharacter = (characterId: string) => {
    console.log("Selecting character:", characterId);
    const character = characterProfiles.find((c) => c.id === characterId);
    const story = stories.find((s) => s.id === character?.storyId);

    // Enhanced haptic feedback for mobile
    if ("vibrate" in navigator) {
      navigator.vibrate([50, 30, 50]); // Pattern for better feedback
    }

    // Visual feedback - add a slight delay for animation
    const cardElement = document.querySelector(
      `[data-character="${characterId}"]`
    );
    if (cardElement) {
      cardElement.classList.add("animate-pulse");
      setTimeout(() => {
        cardElement.classList.remove("animate-pulse");
      }, 300);
    }

    if (story && character) {
      console.log("Found story:", story.title);
      setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          stage: "story-playing",
          selectedCharacter: story,
          currentScene: story.scenes[0],
        }));
        unlockAchievement("character_chosen");
      }, 150); // Small delay for better UX
    } else {
      console.error("Story or character not found");
    }
  };

  const handleChoice = (choice: StoryChoice) => {
    console.log("Handling choice:", choice);
    const story = gameState.selectedCharacter;
    if (!story) return;

    // Enhanced haptic feedback for mobile
    if ("vibrate" in navigator) {
      navigator.vibrate([30, 10, 30]); // Softer pattern for choices
    }

    const nextScene = story.scenes.find(
      (scene) => scene.id === choice.nextSceneId
    );

    if (nextScene) {
      // Enhanced impact points calculation
      const impactPoints =
        choice.text.includes("KEF") ||
        choice.text.includes("scholarship") ||
        choice.text.includes("education")
          ? 15 // Increased for education choices
          : choice.text.includes("help") || choice.text.includes("support")
          ? 8
          : 3;

      setGameState((prev) => ({
        ...prev,
        currentScene: nextScene,
        choices: [...prev.choices, choice.id],
        impactPoints: prev.impactPoints + impactPoints,
        stage: nextScene.isEnding ? "outcome" : "story-playing",
      }));

      // Enhanced achievement system
      if (
        choice.id.includes("school") ||
        choice.text.toLowerCase().includes("education")
      ) {
        unlockAchievement("education_advocate");
      }
      if (
        choice.text.toLowerCase().includes("kef") ||
        choice.text.toLowerCase().includes("scholarship")
      ) {
        unlockAchievement("scholarship_supporter");
      }
      if (gameState.choices.length >= 2) {
        unlockAchievement("decision_maker");
      }
      if (gameState.impactPoints + impactPoints >= 30) {
        unlockAchievement("impact_champion");
      }
    }
  };

  const resetGame = () => {
    console.log("Resetting game...");
    setGameState({
      stage: "character-select",
      selectedCharacter: null,
      currentScene: null,
      choices: [],
      impactPoints: 0,
      completionTime: 0,
    });
  };

  // Enhanced Splash Screen
  const SplashScreen = () => (
    <div
      ref={gameRef}
      className={`min-h-screen bg-gradient-to-br from-primary via-primary/90 to-orange-600 flex items-center justify-center p-4 relative overflow-hidden transition-all duration-1000 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white/5 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-500" />
        <div className="absolute top-3/4 left-1/3 w-20 h-20 bg-white/5 rounded-full animate-pulse delay-700" />
        {/* Floating hearts animation */}
        <div className="absolute top-1/3 left-1/2 text-white/10 text-2xl animate-bounce delay-300">
          ❤️
        </div>
        <div className="absolute bottom-1/3 left-1/4 text-white/10 text-xl animate-bounce delay-1200">
          📚
        </div>
        <div className="absolute top-2/3 right-1/4 text-white/10 text-lg animate-bounce delay-900">
          ✨
        </div>
      </div>

      {/* Improved progress indicator */}
      <div className="absolute top-4 left-4 right-4">
        <div className="flex items-center justify-between text-white/90 text-sm mb-2 font-medium">
          <span className="flex items-center gap-2">
            <Gamepad2 className="w-4 h-4" />
            Journey Progress
          </span>
          <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
            {gameProgress}%
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-white to-yellow-200 h-2 rounded-full transition-all duration-1000 shadow-glow"
            style={{ width: `${gameProgress}%` }}
          />
        </div>
      </div>

      {/* Enhanced achievement notifications */}
      {achievements.length > 0 && (
        <div className="absolute top-20 right-4 space-y-2">
          {achievements.slice(-2).map((achievement, index) => (
            <div
              key={achievement}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-2 rounded-full text-xs font-bold animate-bounce shadow-lg border border-yellow-300"
            >
              🏆 {achievement.replace("_", " ").toUpperCase()}
            </div>
          ))}
        </div>
      )}

      <div className="text-center text-white z-10 max-w-lg">
        {/* Hero section with enhanced typography */}
        <div className="mb-10">
          <div className="relative mb-6">
            <div className="text-7xl mb-4 transition-transform duration-500 hover:scale-110">
              <div className="relative">
                <Heart className="w-20 h-20 mx-auto text-white drop-shadow-lg" />
                <div className="absolute -top-2 -right-2 text-2xl animate-pulse">
                  ✨
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent drop-shadow-lg">
                Your Choices
              </h1>
              <h2 className="text-3xl md:text-4xl font-light text-white/90 drop-shadow">
                Change Lives
              </h2>
              <p className="text-lg text-white/80 mt-3 leading-relaxed">
                Step into real stories from Kenya and discover how education
                transforms everything
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced feature highlights */}
        <div className="space-y-6 mb-10">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 hover:bg-white/25 transition-all duration-300 cursor-pointer hover:scale-105 border border-white/10">
              <Target className="w-7 h-7 mx-auto mb-2 text-yellow-200" />
              <div className="font-medium">Make Impact</div>
              <div className="text-xs text-white/80 mt-1">
                Every choice matters
              </div>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 hover:bg-white/25 transition-all duration-300 cursor-pointer hover:scale-105 border border-white/10">
              <Users className="w-7 h-7 mx-auto mb-2 text-yellow-200" />
              <div className="font-medium">Real Stories</div>
              <div className="text-xs text-white/80 mt-1">From Kenya</div>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 hover:bg-white/25 transition-all duration-300 cursor-pointer hover:scale-105 border border-white/10">
              <BookOpen className="w-7 h-7 mx-auto mb-2 text-yellow-200" />
              <div className="font-medium">Shape Futures</div>
              <div className="text-xs text-white/80 mt-1">
                Through education
              </div>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 hover:bg-white/25 transition-all duration-300 cursor-pointer hover:scale-105 border border-white/10">
              <Sparkles className="w-7 h-7 mx-auto mb-2 text-yellow-200" />
              <div className="font-medium">Unlock Hope</div>
              <div className="text-xs text-white/80 mt-1">Create change</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm rounded-xl p-5 text-center border border-white/20">
            <div className="text-3xl mb-3">🎯</div>
            <div className="font-semibold text-lg mb-1">
              Interactive Journey
            </div>
            <div className="text-sm text-white/90">
              Experience the power of education through real student stories
            </div>
            <div className="text-xs text-white/75 mt-2 flex items-center justify-center gap-4">
              <span>📱 Mobile Optimized</span>
              <span>⏱️ 5 minutes</span>
              <span>🏆 Earn Achievements</span>
            </div>
          </div>
        </div>

        {/* Enhanced CTA button */}
        <div className="space-y-4">
          <Button
            onClick={startGame}
            className="w-full bg-gradient-to-r from-white to-gray-100 text-primary hover:from-gray-100 hover:to-white font-bold px-8 py-6 text-xl rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl border-2 border-white/20 hover:shadow-white/25"
            size="lg"
          >
            <Play className="w-6 h-6 mr-3" />
            Begin Your Journey
            <ArrowRight className="w-5 h-5 ml-3" />
          </Button>

          <div className="text-sm text-white/80 space-y-1">
            <div className="flex items-center justify-center gap-4">
              <span className="flex items-center gap-1">
                <Volume2 className="w-4 h-4" />
                Immersive Audio
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                Interactive Choices
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced Character Selection
  const CharacterSelect = () => (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 transition-all duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-lg mx-auto pt-8">
        {/* Enhanced progress and achievements header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Progress
              </div>
              <div className="text-lg font-bold">Level 1</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {achievements.map((achievement, index) => (
              <div
                key={achievement}
                className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-sm shadow-lg border-2 border-yellow-300 animate-pulse"
              >
                🏆
              </div>
            ))}
            {achievements.length === 0 && (
              <div className="text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded-full">
                Earn achievements
              </div>
            )}
          </div>
        </div>

        {/* Enhanced header section */}
        <div className="text-center mb-10">
          <div className="mb-4">
            <Badge
              variant="secondary"
              className="text-lg px-6 py-3 rounded-full bg-primary/5 text-primary border border-primary/20"
            >
              <Users className="w-5 h-5 mr-2" />
              Choose Your Hero
            </Badge>
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
            Whose Story Will You Shape?
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Meet two inspiring students from Kenya. Your choices will determine
            whether their dreams become reality.
          </p>
        </div>

        {/* Enhanced character cards */}
        <div className="space-y-8">
          {characterProfiles.map((character, index) => (
            <Card
              key={character.id}
              data-character={character.id}
              className="cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl border-0 group overflow-hidden bg-white/80 backdrop-blur-sm card-interactive character-card-hover relative w-full"
              onClick={() => selectCharacter(character.id)}
            >
              {/* Gradient border effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${character.gradientColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg`}
                style={{ padding: "2px" }}
              >
                <div className="bg-white rounded-lg h-full w-full"></div>
              </div>

              <CardContent className="p-0 relative z-10 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-0 min-h-0">
                  {/* Enhanced image section */}
                  <div className="relative h-48 md:h-52 md:col-span-2 overflow-hidden">
                    <Image
                      src={character.imageUrl}
                      alt={character.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${character.gradientColor} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                    />

                    {/* Character number badge */}
                    <div className="absolute top-4 left-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${character.gradientColor} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-xl border-2 border-white/30`}
                      >
                        {index + 1}
                      </div>
                    </div>

                    {/* Difficulty badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span className="text-xs font-medium text-white">
                          {character.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Character emoji */}
                    <div className="absolute bottom-4 left-4">
                      <div className="text-4xl drop-shadow-2xl filter bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center">
                        {character.emoji}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced content section */}
                  <div className="md:col-span-3 p-4 md:p-6 flex flex-col justify-between min-h-0">
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 truncate">
                            {character.name}
                          </h3>
                          <Badge
                            variant="outline"
                            className="text-xs px-2 md:px-3 py-1 bg-gray-50 whitespace-nowrap"
                          >
                            Age {character.age}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                          <Play className="w-4 h-4" />
                          <span className="text-sm font-medium hidden sm:inline">
                            Start Story
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 italic mb-4 text-sm leading-relaxed line-clamp-2">
                        {character.description}
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-6 h-6 bg-gradient-to-br ${character.gradientColor} rounded-full flex items-center justify-center flex-shrink-0`}
                          >
                            <MapPin className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-700 font-medium truncate">
                            {character.location}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <GraduationCap className="w-3 h-3 text-white" />
                          </div>
                          <span className="font-semibold text-green-700 text-base md:text-lg line-clamp-2">
                            {character.dream}
                          </span>
                        </div>

                        <div className="flex items-start gap-3 min-w-0">
                          <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Zap className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-red-600 leading-tight font-medium text-sm line-clamp-3">
                            {character.challenge}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stats section */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">
                        Student Profile
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(character.stats).map(([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm text-gray-600 capitalize">
                              {key}
                            </span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden stats-bar">
                                <div
                                  className={`h-full bg-gradient-to-r ${character.gradientColor} transition-all duration-1000 group-hover:animate-pulse`}
                                  style={{ width: `${value}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium text-gray-500 w-8">
                                {value}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Enhanced call-to-action */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 gap-2">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <Heart className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-700 truncate">
                          Help {character.name} achieve their dream
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all duration-300 flex-shrink-0">
                        <span className="text-sm font-bold hidden sm:inline">
                          Begin Journey
                        </span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced game tips section */}
        <div className="mt-10 p-6 bg-gradient-to-r from-blue-50 via-white to-green-50 rounded-2xl border-2 border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Volume2 className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold text-lg">Game Guide</span>
          </div>
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex items-center gap-3 p-3 bg-white/80 rounded-lg border">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="w-3 h-3 text-blue-600" />
              </div>
              <span className="text-gray-700">
                Every choice shapes the story outcome
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/80 rounded-lg border">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-3 h-3 text-green-600" />
              </div>
              <span className="text-gray-700">
                Some paths lead to education, others to hardship
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/80 rounded-lg border">
              <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="w-3 h-3 text-yellow-600" />
              </div>
              <span className="text-gray-700">
                Make impact choices to unlock achievements
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced Story Playing
  const StoryPlaying = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Enhanced sticky header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 p-4 border-b shadow-sm">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Reading
                </div>
                <div className="text-lg font-bold truncate max-w-40">
                  {gameState.selectedCharacter?.title?.split(":")[0] || "Story"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full border">
                <Star className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-bold text-yellow-700">
                  {gameState.impactPoints}
                </span>
              </div>
              <div className="text-sm text-muted-foreground bg-gray-100 px-2 py-1 rounded-full">
                {Math.round((gameState.choices.length / 4) * 100)}%
              </div>
            </div>
          </div>

          {/* Enhanced progress bar */}
          <div className="relative">
            <Progress
              value={(gameState.choices.length / 4) * 100}
              className="h-3 bg-gray-200"
            />
            <div className="absolute inset-0 flex items-center">
              <div
                className="h-3 bg-gradient-to-r from-primary to-orange-500 rounded-full transition-all duration-700 shadow-sm"
                style={{ width: `${(gameState.choices.length / 4) * 100}%` }}
              />
            </div>
            {/* Progress indicators */}
            <div className="absolute -bottom-2 left-0 right-0 flex justify-between">
              {[0, 1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full border-2 border-white ${
                    gameState.choices.length >= step
                      ? "bg-primary shadow-sm"
                      : "bg-gray-300"
                  } transition-colors duration-300`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Story content with enhanced spacing */}
      <div className="p-4 max-w-lg mx-auto pt-8">
        {gameState.currentScene && (
          <div className="space-y-6">
            {/* Scene indicator */}
            <div className="text-center">
              <Badge
                variant="outline"
                className="text-xs px-3 py-1 bg-primary/5 text-primary border-primary/30"
              >
                Chapter {gameState.choices.length + 1}
              </Badge>
            </div>

            <StorySceneComponent
              scene={gameState.currentScene}
              onChoiceSelect={handleChoice}
              onComplete={() => {
                unlockAchievement("story_completed");
                setGameState((prev) => ({ ...prev, stage: "outcome" }));
              }}
              progress={(gameState.choices.length / 4) * 100}
            />
          </div>
        )}
      </div>
    </div>
  );

  // Enhanced Outcome Screen
  const OutcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4 flex items-center justify-center">
      <div className="max-w-lg mx-auto text-center">
        {/* Celebration header */}
        <div className="mb-10">
          <div className="relative mb-6">
            <div className="text-8xl mb-4 animate-bounce">🎉</div>
            <div className="absolute -top-2 -left-4 text-2xl animate-ping">
              ✨
            </div>
            <div className="absolute -top-2 -right-4 text-2xl animate-ping delay-300">
              ⭐
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Journey Complete!
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            You've witnessed the transformative power of education. See the
            impact of your choices.
          </p>
        </div>

        {/* Enhanced stats cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-green-700 mb-1">
              {gameState.impactPoints}
            </div>
            <div className="text-sm text-green-600 font-medium">
              Impact Points
            </div>
            <div className="text-xs text-green-500 mt-1">
              {gameState.impactPoints >= 30
                ? "Exceptional Impact!"
                : gameState.impactPoints >= 20
                ? "Great Choices!"
                : "Good Start!"}
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-blue-700 mb-1">
              {gameState.choices.length}
            </div>
            <div className="text-sm text-blue-600 font-medium">
              Key Decisions
            </div>
            <div className="text-xs text-blue-500 mt-1">Each one mattered</div>
          </div>
        </div>

        {/* Enhanced achievements section */}
        {achievements.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
              <span className="text-2xl">🏆</span>
              Achievements Unlocked
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement}
                  className="bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-300 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="text-sm font-bold text-yellow-800 capitalize">
                    {achievement.replace("_", " ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced action buttons */}
        <div className="space-y-4">
          <Button
            onClick={() =>
              setGameState((prev) => ({ ...prev, stage: "call-to-action" }))
            }
            className="w-full bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-500 text-white font-bold px-8 py-6 text-lg rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
            size="lg"
          >
            <Heart className="w-6 h-6 mr-3" />
            Make Real Impact Now
            <Sparkles className="w-5 h-5 ml-3" />
          </Button>

          <Button
            onClick={resetGame}
            variant="outline"
            className="w-full py-4 text-lg rounded-xl border-2 hover:bg-gray-50 transition-all duration-300"
          >
            <Home className="w-5 h-5 mr-2" />
            Experience Another Journey
          </Button>
        </div>

        {/* Impact summary */}
        <div className="mt-8 p-4 bg-gradient-to-r from-primary/5 to-orange-100/50 rounded-xl border border-primary/20">
          <div className="text-sm text-muted-foreground">
            <strong>Remember:</strong> Your choices in this story mirror real
            decisions that affect students in Kenya every day.
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced Call to Action Screen
  const CallToActionScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-blue-50 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Hero section */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-6">💝</div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
            Your Story Continues
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            You've experienced the power of education. Now make it real for
            students who need it most.
          </p>
        </div>

        {/* Impact visualization */}
        <div className="bg-white rounded-2xl border-2 border-primary/20 p-8 mb-8 shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Transform Lives Today
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="text-4xl font-bold text-primary mb-2">$100</div>
              <div className="text-lg font-semibold text-blue-700 mb-2">
                3 Months
              </div>
              <div className="text-sm text-blue-600">
                Covers school fees, uniforms, and supplies for three months
              </div>
              <div className="mt-3 text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-full inline-block">
                🎒 Complete school package
              </div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
              <div className="text-4xl font-bold text-primary mb-2">$400</div>
              <div className="text-lg font-semibold text-green-700 mb-2">
                Full Year
              </div>
              <div className="text-sm text-green-600">
                Complete scholarship including mentorship and support
              </div>
              <div className="mt-3 text-xs text-green-500 bg-green-50 px-2 py-1 rounded-full inline-block">
                🎓 Life-changing education
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <Button
              className="w-full bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-500 text-white font-bold py-6 text-xl rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl"
              size="lg"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              Calculate My Impact
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>

            <p className="text-sm text-muted-foreground">
              See exactly how your donation transforms lives in real-time
            </p>
          </div>
        </div>

        {/* Secondary actions */}
        <div className="text-center space-y-4">
          <Button
            onClick={resetGame}
            variant="outline"
            className="w-full py-4 text-lg rounded-xl border-2 hover:bg-gray-50 transition-all duration-300"
          >
            <Home className="w-5 h-5 mr-2" />
            Experience Another Story
          </Button>

          <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border">
            <div className="text-sm text-muted-foreground text-center">
              <strong>Your choices matter.</strong> Every donation directly
              supports students like Silvia and Sawa in achieving their dreams
              through education.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Debug information
  console.log("Current game state:", gameState);
  console.log("Stories available:", stories?.length || 0);

  // Render based on game stage
  const renderCurrentStage = () => {
    switch (gameState.stage) {
      case "splash":
        return <SplashScreen />;
      case "character-select":
        return <CharacterSelect />;
      case "story-playing":
        return <StoryPlaying />;
      case "outcome":
        return <OutcomeScreen />;
      case "call-to-action":
        return <CallToActionScreen />;
      default:
        return <SplashScreen />;
    }
  };

  return <div className="min-h-screen">{renderCurrentStage()}</div>;
}
