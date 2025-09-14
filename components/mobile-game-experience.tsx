"use client";

import { useState, useEffect } from "react";
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

  const stories = storiesData.stories as Story[];
  const [startTime] = useState(Date.now());

  useEffect(() => {
    // Auto-advance from splash after 2 seconds
    if (gameState.stage === "splash") {
      const timer = setTimeout(() => {
        setGameState((prev) => ({ ...prev, stage: "character-select" }));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [gameState.stage]);

  const selectCharacter = (characterId: string) => {
    const character = characterProfiles.find((c) => c.id === characterId);
    const story = stories.find((s) => s.id === character?.storyId);

    // Add haptic feedback for mobile
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }

    if (story && character) {
      setGameState((prev) => ({
        ...prev,
        stage: "story-playing",
        selectedCharacter: story,
        currentScene: story.scenes[0],
      }));
    }
  };

  const handleChoice = (choice: StoryChoice) => {
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
          ? 50
          : 10;

      setGameState((prev) => ({
        ...prev,
        currentScene: nextScene,
        choices: [...prev.choices, choice.text],
        impactPoints: prev.impactPoints + impactPoints,
        stage: nextScene.isEnding ? "outcome" : "story-playing",
      }));
    }
  };

  const resetGame = () => {
    setGameState({
      stage: "character-select",
      selectedCharacter: null,
      currentScene: null,
      choices: [],
      impactPoints: 0,
      completionTime: 0,
    });
  };

  // Splash Screen - Immediate hook
  const SplashScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-500" />
      </div>

      <div className="text-center text-white z-10">
        <div className="mb-8">
          <div className="text-6xl mb-4 animate-bounce">🎮</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Your Choices</h1>
          <h2 className="text-2xl md:text-3xl font-light">Change Lives</h2>
        </div>

        <div className="space-y-3 text-lg opacity-90">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">🎯</span>
            <span>Make real decisions</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">📖</span>
            <span>Shape student stories</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">💫</span>
            <span>Create lasting impact</span>
          </div>
        </div>

        <div className="mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto" />
          <p className="mt-2 text-sm opacity-75">Loading your experience...</p>
        </div>
      </div>
    </div>
  );

  // Character Selection - Game starts here
  const CharacterSelect = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-lg mx-auto pt-8">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">
            <Play className="w-5 h-5 mr-2" />
            Choose Your Story
          </Badge>
          <h1 className="text-3xl font-bold mb-2">Who Will You Help?</h1>
          <p className="text-muted-foreground">
            Your choices will shape their future. Choose wisely.
          </p>
        </div>

        <div className="space-y-4">
          {characterProfiles.map((character) => (
            <Card
              key={character.id}
              className="cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border-2 hover:border-primary"
              onClick={() => selectCharacter(character.id)}
            >
              <CardContent className="p-0">
                <div className="grid grid-cols-3 gap-0">
                  {/* Character Image */}
                  <div className="relative h-32">
                    <Image
                      src={character.imageUrl}
                      alt={character.name}
                      fill
                      className="object-cover rounded-l-lg"
                    />
                    <div
                      className={`absolute inset-0 ${character.color} opacity-20 rounded-l-lg`}
                    />
                    <div className="absolute bottom-2 left-2">
                      <span className="text-2xl">{character.emoji}</span>
                    </div>
                  </div>

                  {/* Character Info */}
                  <div className="col-span-2 p-4">
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

                    <Button size="sm" className="w-full mt-3">
                      Help {character.name}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 p-4 bg-primary/5 rounded-lg">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Tip:</strong> Each choice you make affects their
            educational journey and future opportunities.
          </p>
        </div>
      </div>
    </div>
  );

  // Story Playing - Mobile optimized story experience
  const StoryPlaying = () => {
    if (!gameState.currentScene) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
        {/* Progress Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b p-4 z-10">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary">
                <Users className="w-4 h-4 mr-1" />
                {
                  characterProfiles.find(
                    (c) => c.storyId === gameState.selectedCharacter?.id
                  )?.name
                }
                's Story
              </Badge>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">
                  {gameState.impactPoints}
                </span>
              </div>
            </div>
            <Progress
              value={(gameState.choices.length / 4) * 100}
              className="h-2"
            />
          </div>
        </div>

        {/* Story Content */}
        <div className="p-4 max-w-lg mx-auto">
          <StorySceneComponent
            scene={gameState.currentScene}
            onChoiceSelect={handleChoice}
            onComplete={() =>
              setGameState((prev) => ({ ...prev, stage: "outcome" }))
            }
            progress={(gameState.choices.length / 4) * 100}
          />
        </div>
      </div>
    );
  };

  // Outcome Screen - Show impact
  const OutcomeScreen = () => {
    const character = characterProfiles.find(
      (c) => c.storyId === gameState.selectedCharacter?.id
    );
    const completionTime = Math.round((Date.now() - startTime) / 1000);
    const grade =
      gameState.impactPoints > 150
        ? "Excellent"
        : gameState.impactPoints > 100
        ? "Good"
        : "Keep Learning";
    const gradeEmoji =
      gameState.impactPoints > 150
        ? "🌟"
        : gameState.impactPoints > 100
        ? "👍"
        : "💪";

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
        <div className="max-w-lg mx-auto pt-8">
          {/* Celebration Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bounce">{gradeEmoji}</div>
            <h1 className="text-3xl font-bold mb-2">
              {character?.name}'s Future is Bright!
            </h1>
            <p className="text-lg text-muted-foreground">
              Your choices made a real difference
            </p>
          </div>

          {/* Impact Summary */}
          <Card className="mb-6 border-2 border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-4">Your Impact</h3>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {gameState.impactPoints}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Impact Points
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {gameState.choices.length}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Decisions Made
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {completionTime}s
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Time Spent
                  </div>
                </div>
              </div>

              <Badge variant="secondary" className="text-lg px-4 py-2">
                {grade} Decision Maker
              </Badge>
            </CardContent>
          </Card>

          {/* Real Impact Message */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="font-bold mb-3 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
                This Story is Real
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Stories like {character?.name}'s happen every day in Kenya. The
                Kenya Education Fund has helped over 4,600 students just like{" "}
                {character?.name} achieve their dreams through education.
              </p>

              <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                <p className="text-sm font-medium text-primary">
                  💡 A $400 scholarship can change an entire family's future for
                  generations.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="space-y-3">
            <Button
              className="w-full text-lg py-6"
              onClick={() =>
                setGameState((prev) => ({ ...prev, stage: "call-to-action" }))
              }
            >
              <Heart className="h-5 w-5 mr-2" />
              See How You Can Help
            </Button>

            <Button variant="outline" className="w-full" onClick={resetGame}>
              Play Another Story
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // Call to Action Screen
  const CallToActionScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-green-100 p-4">
      <div className="max-w-lg mx-auto pt-8">
        <div className="text-center mb-8">
          <Heart className="h-16 w-16 mx-auto mb-4 text-red-500" />
          <h1 className="text-3xl font-bold mb-2">Make It Real</h1>
          <p className="text-muted-foreground">
            Turn your game choices into real-world impact
          </p>
        </div>

        <div className="space-y-4">
          <Card className="border-2 border-primary">
            <CardContent className="p-6 text-center">
              <GraduationCap className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Sponsor a Student</h3>
              <p className="text-muted-foreground mb-4">
                $400 provides a full year of secondary education
              </p>
              <Button className="w-full" asChild>
                <a
                  href="https://www.kenyaeducationfund.org/donate"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sponsor Now
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-bold mb-2">Share the Experience</h3>
              <p className="text-muted-foreground mb-4">
                Help others discover these powerful stories
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: "KEF Interactive Stories",
                      text: "I just experienced an amazing story about education in Kenya",
                      url: window.location.href,
                    });
                  }
                }}
              >
                Share Story
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <h3 className="text-xl font-bold mb-2">Learn More</h3>
              <p className="text-muted-foreground mb-4">
                Explore KEF's full impact and mission
              </p>
              <Button variant="outline" className="w-full" asChild>
                <a
                  href="https://www.kenyaeducationfund.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit KEF
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button variant="ghost" onClick={resetGame}>
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );

  // Render current stage
  const renderStage = () => {
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

  return renderStage();
}
