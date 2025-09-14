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
    emoji: "👩‍⚕️",
    storyId: "silvia-story",
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
    emoji: "👨‍🔬",
    storyId: "sawa-story",
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

    // Add haptic feedback for mobile
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }

    if (story && character) {
      console.log("Found story:", story.title);
      setGameState((prev) => ({
        ...prev,
        stage: "story-playing",
        selectedCharacter: story,
        currentScene: story.scenes[0],
      }));
      unlockAchievement("character_chosen");
    } else {
      console.error("Story or character not found");
    }
  };

  const handleChoice = (choice: StoryChoice) => {
    console.log("Handling choice:", choice);
    const story = gameState.selectedCharacter;
    if (!story) return;

    // Add haptic feedback for mobile
    if ("vibrate" in navigator) {
      navigator.vibrate(30);
    }

    const nextScene = story.scenes.find(
      (scene) => scene.id === choice.nextSceneId
    );

    if (nextScene) {
      // Add impact points based on choice
      const impactPoints =
        choice.text.includes("KEF") ||
        choice.text.includes("scholarship") ||
        choice.text.includes("education")
          ? 10
          : 3;

      setGameState((prev) => ({
        ...prev,
        currentScene: nextScene,
        choices: [...prev.choices, choice.id],
        impactPoints: prev.impactPoints + impactPoints,
        stage: nextScene.isEnding ? "outcome" : "story-playing",
      }));

      // Unlock achievements based on choices
      if (choice.id.includes("school")) {
        unlockAchievement("education_advocate");
      }
      if (gameState.choices.length >= 2) {
        unlockAchievement("decision_maker");
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
      className={`min-h-screen bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center p-4 relative overflow-hidden transition-all duration-1000 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-500" />
      </div>

      {/* Progress indicator */}
      <div className="absolute top-4 left-4 right-4">
        <div className="flex items-center justify-between text-white/80 text-sm mb-2">
          <span>Game Progress</span>
          <span>{gameProgress}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-white h-2 rounded-full transition-all duration-1000"
            style={{ width: `${gameProgress}%` }}
          />
        </div>
      </div>

      {/* Achievement notifications */}
      {achievements.length > 0 && (
        <div className="absolute top-16 right-4 space-y-2">
          {achievements.slice(-2).map((achievement, index) => (
            <div
              key={achievement}
              className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-medium animate-bounce"
            >
              🏆 {achievement.replace("_", " ").toUpperCase()}
            </div>
          ))}
        </div>
      )}

      <div className="text-center text-white z-10 max-w-lg">
        <div className="mb-8">
          <div className="text-6xl mb-4 animate-bounce">
            <Gamepad2 className="w-16 h-16 mx-auto" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Your Choices</h1>
          <h2 className="text-2xl md:text-3xl font-light">Change Lives</h2>
        </div>

        <div className="space-y-4 mb-8">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <Target className="w-6 h-6 mx-auto mb-2" />
              <div>Make Impact</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <Heart className="w-6 h-6 mx-auto mb-2" />
              <div>Change Lives</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <BookOpen className="w-6 h-6 mx-auto mb-2" />
              <div>Shape Stories</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <Star className="w-6 h-6 mx-auto mb-2" />
              <div>Unlock Hope</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-sm">Interactive storytelling experience</div>
            <div className="text-xs opacity-80 mt-1">Your choices matter</div>
          </div>
        </div>

        <Button
          onClick={startGame}
          className="bg-white text-primary hover:bg-white/90 font-bold px-8 py-4 text-lg rounded-full transition-all duration-200 hover:scale-105 shadow-lg"
          size="lg"
        >
          <Play className="w-5 h-5 mr-2" />
          Start Your Journey
        </Button>

        <div className="mt-6 text-xs opacity-75">
          <p>🎮 Tap to interact • 🎵 Audio enabled • ⏱️ 5 min experience</p>
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
        {/* Progress and achievements header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Level 1</span>
          </div>
          <div className="flex items-center gap-1">
            {achievements.map((achievement, index) => (
              <div
                key={achievement}
                className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs"
              >
                🏆
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">
            <Play className="w-5 h-5 mr-2" />
            Choose Your Character
          </Badge>
          <h1 className="text-3xl font-bold mb-2">Who Will You Help?</h1>
          <p className="text-muted-foreground">
            Your choices will shape their future. Choose wisely.
          </p>
        </div>

        <div className="space-y-4">
          {characterProfiles.map((character, index) => (
            <Card
              key={character.id}
              className="cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border-2 hover:border-primary"
              onClick={() => selectCharacter(character.id)}
            >
              <CardContent className="p-0">
                <div className="grid grid-cols-3 gap-0">
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={character.imageUrl}
                      alt={character.name}
                      fill
                      className="object-cover rounded-l-lg transition-transform duration-300 hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 ${character.color} opacity-20 rounded-l-lg`}
                    />
                    <div className="absolute bottom-2 left-2">
                      <span className="text-2xl drop-shadow-lg">
                        {character.emoji}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 p-4 relative">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold">{character.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        Age {character.age}
                      </Badge>
                    </div>

                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {character.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="font-medium">{character.dream}</span>
                      </div>
                      <div className="flex items-start gap-1 mt-2">
                        <Zap className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-red-600 leading-tight">
                          {character.challenge}
                        </span>
                      </div>
                    </div>

                    <div className="absolute bottom-2 right-2">
                      <div className="flex items-center gap-1 text-xs text-primary">
                        <Heart className="w-3 h-3" />
                        <span>High Impact</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <Volume2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Game Tips</span>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Each choice affects the story outcome</li>
            <li>• Some paths lead to education, others to hardship</li>
            <li>• Your decisions unlock different achievements</li>
          </ul>
        </div>
      </div>
    </div>
  );

  // Story Playing
  const StoryPlaying = () => (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 p-4 border-b">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">
                {gameState.selectedCharacter?.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-bold">
                  {gameState.impactPoints}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {Math.round((gameState.choices.length / 4) * 100)}%
              </div>
            </div>
          </div>
          <Progress
            value={(gameState.choices.length / 4) * 100}
            className="h-2"
          />
        </div>
      </div>

      <div className="p-4 max-w-lg mx-auto">
        {gameState.currentScene && (
          <StorySceneComponent
            scene={gameState.currentScene}
            onChoiceSelect={handleChoice}
            onComplete={() => {
              unlockAchievement("story_completed");
              setGameState((prev) => ({ ...prev, stage: "outcome" }));
            }}
            progress={(gameState.choices.length / 4) * 100}
          />
        )}
      </div>
    </div>
  );

  // Outcome Screen
  const OutcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4 flex items-center justify-center">
      <div className="max-w-lg mx-auto text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
          <h1 className="text-3xl font-bold mb-4">Story Complete!</h1>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-white rounded-lg border-2 border-green-200">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {gameState.impactPoints}
              </div>
              <div className="text-sm text-muted-foreground">Impact Points</div>
            </div>
            <div className="p-4 bg-white rounded-lg border-2 border-blue-200">
              <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {gameState.choices.length}
              </div>
              <div className="text-sm text-muted-foreground">Choices Made</div>
            </div>
          </div>

          {achievements.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">
                Achievements Unlocked
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {achievements.map((achievement) => (
                  <Badge
                    key={achievement}
                    className="bg-yellow-100 text-yellow-800"
                  >
                    🏆 {achievement.replace("_", " ")}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Button
            onClick={() =>
              setGameState((prev) => ({ ...prev, stage: "call-to-action" }))
            }
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 text-lg"
            size="lg"
          >
            <Heart className="w-5 h-5 mr-2" />
            Make Real Impact Now
          </Button>

          <Button onClick={resetGame} variant="outline" className="w-full">
            <Home className="w-4 h-4 mr-2" />
            Try Another Story
          </Button>
        </div>
      </div>
    </div>
  );

  // Call to Action Screen
  const CallToActionScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-blue-50 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">💝</div>
          <h1 className="text-3xl font-bold mb-4">Ready to Change a Life?</h1>
          <p className="text-lg text-muted-foreground">
            You've seen how powerful education can be. Now make it real for a
            student in Kenya.
          </p>
        </div>

        <div className="bg-white rounded-lg border-2 border-primary/20 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Your Impact Story Awaits
          </h2>
          <div className="grid grid-cols-2 gap-4 text-center mb-6">
            <div>
              <div className="text-2xl font-bold text-primary">$100</div>
              <div className="text-sm text-muted-foreground">
                Supports 3 months of education
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">$400</div>
              <div className="text-sm text-muted-foreground">
                Full year scholarship
              </div>
            </div>
          </div>

          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 text-lg"
            size="lg"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Calculate My Impact
          </Button>
        </div>

        <div className="text-center space-y-4">
          <Button onClick={resetGame} variant="outline" className="w-full">
            <Home className="w-4 h-4 mr-2" />
            Experience Another Journey
          </Button>
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
