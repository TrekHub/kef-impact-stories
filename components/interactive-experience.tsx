"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  ArrowLeft,
  MapPin,
  Users,
  Heart,
  BookOpen,
  Globe,
  Compass,
  Star,
  ChevronRight,
  Play,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { KenyaMap } from "@/components/kenya-map";
import { StorySceneComponent } from "@/components/story-scene";
import type { Story, StoryScene, StoryChoice, MapHotspot } from "@/lib/types";
import storiesData from "@/data/stories.json";
import hotspotsData from "@/data/map-hotspots.json";

type ExperienceStage =
  | "intro"
  | "map-overview"
  | "story-selection"
  | "story-experience"
  | "map-exploration"
  | "connections"
  | "impact-summary";

export function InteractiveExperience() {
  const [currentStage, setCurrentStage] = useState<ExperienceStage>("intro");
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentScene, setCurrentScene] = useState<StoryScene | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<MapHotspot | null>(
    null
  );
  const [visitedRegions, setVisitedRegions] = useState<Set<string>>(new Set());
  const [completedStories, setCompletedStories] = useState<Set<string>>(
    new Set()
  );
  const [progress, setProgress] = useState(0);

  const stories = storiesData.stories as Story[];
  const hotspots = hotspotsData.hotspots as MapHotspot[];

  const totalProgress =
    (currentStage === "intro" ? 10 : 0) +
    (currentStage === "map-overview" ? 20 : 0) +
    (currentStage === "story-selection" ? 30 : 0) +
    (currentStage === "story-experience" ? 50 : 0) +
    (currentStage === "map-exploration" ? 70 : 0) +
    (currentStage === "connections" ? 85 : 0) +
    (currentStage === "impact-summary" ? 100 : 0);

  // Intro Stage Component
  const IntroStage = () => (
    <div className="text-center space-y-8 max-w-4xl mx-auto">
      <Badge variant="secondary" className="text-lg px-6 py-2">
        <Globe className="w-5 h-5 mr-2" />
        Interactive Journey
      </Badge>

      <h1 className="text-5xl md:text-6xl font-bold">Walk in Their Shoes</h1>

      <p className="text-xl text-muted-foreground leading-relaxed">
        Experience education transformation through the eyes of real KEF
        students. Make choices, explore regions, and discover how your decisions
        shape futures across Kenya.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-bold mb-2">Interactive Stories</h3>
            <p className="text-sm text-muted-foreground">
              Make choices that shape real student journeys
            </p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-bold mb-2">Geographic Exploration</h3>
            <p className="text-sm text-muted-foreground">
              Discover Kenya's diverse regions and challenges
            </p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-bold mb-2">Connected Impact</h3>
            <p className="text-sm text-muted-foreground">
              See how individual stories create community change
            </p>
          </CardContent>
        </Card>
      </div>

      <Button
        size="lg"
        className="text-lg px-8 py-4"
        onClick={() => setCurrentStage("map-overview")}
      >
        Begin Your Journey
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );

  // Map Overview Stage
  const MapOverviewStage = () => (
    <div className="space-y-8">
      <div className="text-center">
        <Badge variant="secondary" className="mb-4">
          <Compass className="w-4 h-4 mr-2" />
          Discover Kenya
        </Badge>
        <h2 className="text-4xl font-bold mb-4">
          Where Will Your Journey Take You?
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          From bustling Nairobi to the arid landscapes of Turkana, each region
          tells a unique story of challenge and transformation.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold">Choose Your Starting Point</h3>
          <div className="grid gap-4">
            {hotspots.map((hotspot, index) => (
              <Card
                key={hotspot.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                onClick={() => {
                  setSelectedHotspot(hotspot);
                  setCurrentStage("story-selection");
                }}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-primary rounded-full" />
                    <div>
                      <h4 className="font-bold">{hotspot.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {hotspot.story.studentName} • {hotspot.story.title}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-primary" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="relative">
          <KenyaMap
            hotspots={hotspots}
            onHotspotClick={(hotspot) => {
              setSelectedHotspot(hotspot);
              setCurrentStage("story-selection");
            }}
          />
        </div>
      </div>
    </div>
  );

  // Story Selection Stage
  const StorySelectionStage = () => (
    <div className="space-y-8">
      <div className="text-center">
        <Badge variant="secondary" className="mb-4">
          <MapPin className="w-4 h-4 mr-2" />
          {selectedHotspot?.name}
        </Badge>
        <h2 className="text-4xl font-bold mb-4">
          {selectedHotspot?.story.title}
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="overflow-hidden">
          <div className="relative h-64">
            <Image
              src={selectedHotspot?.story.imageUrl || "/placeholder.svg"}
              alt={selectedHotspot?.story.studentName || "Student"}
              fill
              className="object-cover"
            />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Meet {selectedHotspot?.story.studentName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {selectedHotspot?.story.content}
            </p>
            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm font-medium text-primary">
                KEF Impact: {selectedHotspot?.story.impact}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold">Choose Your Experience</h3>

          <Card
            className="cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => {
              // Find matching story based on region/student
              const matchingStory =
                stories.find(
                  (story) =>
                    story.title
                      .toLowerCase()
                      .includes(selectedHotspot?.name.toLowerCase() || "") ||
                    (story.id.includes("silvia") &&
                      selectedHotspot?.id === "nairobi") ||
                    (story.id.includes("sawa") &&
                      selectedHotspot?.id === "turkana")
                ) || stories[0];

              setSelectedStory(matchingStory);
              setCurrentScene(matchingStory.scenes[0]);
              setCurrentStage("story-experience");
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Play className="h-6 w-6 text-primary" />
                <h4 className="font-bold">Interactive Story Experience</h4>
              </div>
              <p className="text-muted-foreground mb-4">
                Step into {selectedHotspot?.story.studentName}'s shoes and make
                choices that shape their educational journey.
              </p>
              <Badge variant="outline">Make Choices • Shape Outcomes</Badge>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => setCurrentStage("map-exploration")}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="h-6 w-6 text-blue-600" />
                <h4 className="font-bold">Explore This Region</h4>
              </div>
              <p className="text-muted-foreground mb-4">
                Learn about the geographic, cultural, and economic context that
                shapes education in {selectedHotspot?.name}.
              </p>
              <Badge
                variant="outline"
                className="border-blue-200 text-blue-600"
              >
                Discover Context • Build Understanding
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          onClick={() => setCurrentStage("map-overview")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Map
        </Button>
      </div>
    </div>
  );

  // Story Experience Stage
  const StoryExperienceStage = () => {
    const handleChoiceSelect = (choice: StoryChoice) => {
      if (!selectedStory) return;

      const nextScene = selectedStory.scenes.find(
        (scene) => scene.id === choice.nextSceneId
      );
      if (nextScene) {
        setCurrentScene(nextScene);

        // Update progress
        const sceneIndex = selectedStory.scenes.findIndex(
          (scene) => scene.id === nextScene.id
        );
        const storyProgress =
          ((sceneIndex + 1) / selectedStory.scenes.length) * 100;
        setProgress(storyProgress);
      }
    };

    const handleStoryComplete = () => {
      if (selectedStory) {
        setCompletedStories((prev) => new Set([...prev, selectedStory.id]));
        setVisitedRegions(
          (prev) => new Set([...prev, selectedHotspot?.id || ""])
        );
      }
      setCurrentStage("connections");
    };

    if (!currentScene) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">
            <BookOpen className="w-4 h-4 mr-2" />
            Interactive Story • {selectedHotspot?.name}
          </Badge>
          <Button
            variant="ghost"
            onClick={() => setCurrentStage("story-selection")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <StorySceneComponent
          scene={currentScene}
          onChoiceSelect={handleChoiceSelect}
          onComplete={handleStoryComplete}
          progress={progress}
        />
      </div>
    );
  };

  // Connections Stage
  const ConnectionsStage = () => (
    <div className="space-y-8 text-center">
      <Badge variant="secondary" className="text-lg px-6 py-2">
        <Star className="w-5 h-5 mr-2" />
        Journey Complete
      </Badge>

      <h2 className="text-4xl font-bold">You've Experienced Transformation</h2>

      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
        Through {selectedHotspot?.story.studentName}'s journey, you've seen how
        education can break the cycle of poverty and create ripple effects
        across communities.
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="font-bold text-lg mb-2">Your Impact</h3>
            <p className="text-3xl font-bold text-primary mb-2">1</p>
            <p className="text-sm text-muted-foreground">
              Student story experienced
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="font-bold text-lg mb-2">Ripple Effect</h3>
            <p className="text-3xl font-bold text-green-600 mb-2">100+</p>
            <p className="text-sm text-muted-foreground">
              Community members impacted
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold">Continue Your Journey</h3>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => setCurrentStage("map-overview")}>
            <MapPin className="mr-2 h-5 w-5" />
            Explore Another Region
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              const element = document.getElementById("impact-connections");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <Heart className="mr-2 h-5 w-5" />
            See Connection Impact
          </Button>
        </div>
      </div>
    </div>
  );

  const renderCurrentStage = () => {
    switch (currentStage) {
      case "intro":
        return <IntroStage />;
      case "map-overview":
        return <MapOverviewStage />;
      case "story-selection":
        return <StorySelectionStage />;
      case "story-experience":
        return <StoryExperienceStage />;
      case "connections":
        return <ConnectionsStage />;
      default:
        return <IntroStage />;
    }
  };

  return (
    <section
      id="interactive-experience"
      className="py-12 min-h-screen bg-gradient-to-br from-background via-muted/20 to-background"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Journey Progress</span>
            <span className="text-sm text-muted-foreground">
              {totalProgress}%
            </span>
          </div>
          <Progress value={totalProgress} className="w-full" />
        </div>

        {/* Dynamic Content */}
        {renderCurrentStage()}
      </div>
    </section>
  );
}
