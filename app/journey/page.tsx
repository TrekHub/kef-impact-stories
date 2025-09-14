"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { StorySceneComponent } from "@/components/story-scene";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Story, StoryScene, StoryChoice } from "@/lib/types";
import { ArrowLeft, BookOpen, Users, MapPin, Clock, Award } from "lucide-react";
import storiesData from "@/data/stories.json";
import Image from "next/image";

export default function JourneyPage() {
  const router = useRouter();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentScene, setCurrentScene] = useState<StoryScene | null>(null);
  const [progress, setProgress] = useState(0);

  const stories = storiesData.stories as Story[];

  useEffect(() => {
    if (selectedStory) {
      const startScene = selectedStory.scenes[0];
      setCurrentScene(startScene);
      setProgress(25); // Start at 25% when story begins
    }
  }, [selectedStory]);

  const handleStorySelect = (story: Story) => {
    setSelectedStory(story);
  };

  const handleChoiceSelect = (choice: StoryChoice) => {
    if (!selectedStory) return;

    const nextScene = selectedStory.scenes.find(
      (scene) => scene.id === choice.nextSceneId
    );
    if (nextScene) {
      setCurrentScene(nextScene);

      // Calculate progress based on scene position
      const sceneIndex = selectedStory.scenes.findIndex(
        (scene) => scene.id === nextScene.id
      );
      const newProgress =
        ((sceneIndex + 1) / selectedStory.scenes.length) * 100;
      setProgress(newProgress);
    }
  };

  const handleStoryComplete = () => {
    router.push("/map");
  };

  const handleBack = () => {
    if (currentScene && selectedStory) {
      setSelectedStory(null);
      setCurrentScene(null);
      setProgress(0);
    } else {
      router.push("/");
    }
  };

  if (selectedStory && currentScene) {
    return (
      <div className="relative min-h-screen bg-background">
        {/* Enhanced Back Button with Story Context */}
        <div className="absolute top-4 left-4 z-20">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="bg-background/90 backdrop-blur-sm border border-border rounded-lg hover:bg-card"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Stories
          </Button>
        </div>

        {/* Story Progress Header */}
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <div className="text-sm font-medium">{selectedStory.title}</div>
                <div className="text-xs text-muted-foreground">
                  Scene{" "}
                  {selectedStory.scenes.findIndex(
                    (s) => s.id === currentScene.id
                  ) + 1}{" "}
                  of {selectedStory.scenes.length}
                </div>
              </div>
            </div>
            <Progress value={progress} className="h-1 w-32" />
          </div>
        </div>

        <StorySceneComponent
          scene={currentScene}
          onChoiceSelect={handleChoiceSelect}
          onComplete={handleStoryComplete}
          progress={progress}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-8 border border-border rounded-lg hover:bg-card"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 rounded-lg">
            <BookOpen className="w-4 h-4 mr-2" />
            Interactive Stories
          </Badge>
          <h1 className="text-4xl md:text-6xl font-semibold mb-6 text-balance">
            Choose Your Journey
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Experience the transformative power of education through the eyes of
            Kenyan students. Your choices shape their stories and reveal the
            impact of KEF's work.
          </p>

          {/* Journey Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 p-4 bg-card border border-border rounded-lg">
              <Users className="h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="font-semibold">2 Stories</div>
                <div className="text-sm text-muted-foreground">
                  Real Experiences
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 bg-card border border-border rounded-lg">
              <Clock className="h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="font-semibold">5-10 min</div>
                <div className="text-sm text-muted-foreground">Per Journey</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 bg-card border border-border rounded-lg">
              <Award className="h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="font-semibold">Multiple</div>
                <div className="text-sm text-muted-foreground">Endings</div>
              </div>
            </div>
          </div>
        </div>

        {/* Story Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {stories.map((story, index) => (
            <Card
              key={story.id}
              className="cursor-pointer transition-all duration-300 hover:-translate-y-1 border-2 border-border rounded-lg overflow-hidden group bg-card"
              onClick={() => handleStorySelect(story)}
            >
              {/* Story Image */}
              <div className="relative h-64">
                <Image
                  src={
                    story.scenes[0]?.imageUrl ||
                    "https://images.unsplash.com/photo-1594736797933-d0d9c83d2577?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                  }
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Story Badge */}
                <div className="absolute top-4 left-4">
                  <Badge
                    variant="secondary"
                    className="bg-background/90 text-foreground rounded-lg"
                  >
                    <MapPin className="w-3 h-3 mr-1" />
                    {story.id === "silvia-story" ? "Nairobi" : "Turkana"}
                  </Badge>
                </div>

                {/* Story Number */}
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                    {index + 1}
                  </div>
                </div>

                {/* Story Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl font-semibold mb-1">
                    {story.title}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {story.scenes.length} scenes to explore
                  </p>
                </div>
              </div>

              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {story.description}
                </p>

                {/* Story Progress Indicator */}
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-primary font-medium">
                    Start Journey
                  </span>
                </div>
                <Progress value={0} className="h-2 mb-4" />

                <Button
                  className="w-full rounded-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStorySelect(story);
                  }}
                >
                  Begin {story.title.split("'s")[0]}'s Story
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Information Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-border rounded-lg bg-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Why Stories Matter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-center leading-relaxed">
                These interactive narratives are based on real experiences of
                KEF students. Each choice you make reflects the actual decisions
                and challenges faced by young people in Kenya seeking education.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Real Impact</h4>
                    <p className="text-sm text-muted-foreground">
                      Every story represents actual KEF scholarship recipients
                      and their journeys.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Community Change</h4>
                    <p className="text-sm text-muted-foreground">
                      See how education transforms not just individuals, but
                      entire communities.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
