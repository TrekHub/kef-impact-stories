"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { StorySceneComponent } from "@/components/story-scene"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Story, StoryScene, StoryChoice } from "@/lib/types"
import { ArrowLeft, BookOpen, Users } from "lucide-react"
import storiesData from "@/data/stories.json"

export default function JourneyPage() {
  const router = useRouter()
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [currentScene, setCurrentScene] = useState<StoryScene | null>(null)
  const [progress, setProgress] = useState(0)

  const stories = storiesData.stories as Story[]

  useEffect(() => {
    if (selectedStory) {
      const startScene = selectedStory.scenes[0]
      setCurrentScene(startScene)
      setProgress(25) // Start at 25% when story begins
    }
  }, [selectedStory])

  const handleStorySelect = (story: Story) => {
    setSelectedStory(story)
  }

  const handleChoiceSelect = (choice: StoryChoice) => {
    if (!selectedStory) return

    const nextScene = selectedStory.scenes.find((scene) => scene.id === choice.nextSceneId)
    if (nextScene) {
      setCurrentScene(nextScene)

      // Calculate progress based on scene position
      const sceneIndex = selectedStory.scenes.findIndex((scene) => scene.id === nextScene.id)
      const newProgress = ((sceneIndex + 1) / selectedStory.scenes.length) * 100
      setProgress(newProgress)
    }
  }

  const handleStoryComplete = () => {
    router.push("/map")
  }

  const handleBack = () => {
    if (currentScene && selectedStory) {
      setSelectedStory(null)
      setCurrentScene(null)
      setProgress(0)
    } else {
      router.push("/")
    }
  }

  if (selectedStory && currentScene) {
    return (
      <div className="relative">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <StorySceneComponent
          scene={currentScene}
          onChoiceSelect={handleChoiceSelect}
          onComplete={handleStoryComplete}
          progress={progress}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted p-4">
      <div className="max-w-6xl mx-auto">
        <Button variant="ghost" onClick={handleBack} className="mb-6 bg-background/80 backdrop-blur-sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <BookOpen className="w-4 h-4 mr-2" />
            Interactive Stories
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{"Choose Your Journey"}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            {
              "Experience the transformative power of education through the eyes of Kenyan students. Your choices shape their stories."
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {stories.map((story) => (
            <Card
              key={story.id}
              className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 bg-card/80 backdrop-blur-sm overflow-hidden group"
              onClick={() => handleStorySelect(story)}
            >
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge variant="outline" className="mb-2 bg-background/80">
                    <Users className="w-3 h-3 mr-1" />
                    Real Story
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{story.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground text-pretty leading-relaxed">{story.description}</p>
                <div className="mt-4 flex items-center text-sm text-primary font-medium">
                  {"Start Journey"}
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto p-6 bg-muted/50 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">{"Why Stories Matter"}</h3>
            <p className="text-muted-foreground text-pretty">
              {
                "These interactive narratives are based on real experiences of KEF students. Each choice you make reflects the real decisions and challenges faced by young people in Kenya seeking education."
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
