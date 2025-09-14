"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { StoryScene, StoryChoice } from "@/lib/types"
import { ArrowRight, Heart } from "lucide-react"
import Image from "next/image"

interface StorySceneProps {
  scene: StoryScene
  onChoiceSelect: (choice: StoryChoice) => void
  onComplete: () => void
  progress: number
}

export function StorySceneComponent({ scene, onChoiceSelect, onComplete, progress }: StorySceneProps) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)

  const handleChoiceClick = (choice: StoryChoice) => {
    setSelectedChoice(choice.id)
    setTimeout(() => {
      onChoiceSelect(choice)
      setSelectedChoice(null)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted p-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Story Progress</span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Story Scene Card */}
        <Card className="mb-8 overflow-hidden shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <div className="relative h-64 md:h-80">
            <Image src={scene.imageUrl || "/placeholder.svg"} alt={scene.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <Badge variant="secondary" className="mb-2">
                <Heart className="w-3 h-3 mr-1" />
                Chapter {Math.ceil(progress / 25)}
              </Badge>
              <CardTitle className="text-white text-2xl md:text-3xl font-bold text-balance">{scene.title}</CardTitle>
            </div>
          </div>

          <CardContent className="p-6 md:p-8">
            <p className="text-lg leading-relaxed text-foreground/90 text-pretty">{scene.content}</p>
          </CardContent>
        </Card>

        {/* Choices or Completion */}
        {scene.isEnding ? (
          <div className="text-center space-y-6">
            <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
              <h3 className="text-xl font-semibold text-primary mb-2">
                {"You've experienced the transformative power of education"}
              </h3>
              <p className="text-muted-foreground">
                {"Every story like this is made possible by supporters like you. Ready to see your impact?"}
              </p>
            </div>
            <Button
              onClick={onComplete}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
            >
              Explore Your Impact
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center mb-6 text-foreground">{"What happens next?"}</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {scene.choices.map((choice) => (
                <Button
                  key={choice.id}
                  variant={selectedChoice === choice.id ? "default" : "outline"}
                  size="lg"
                  onClick={() => handleChoiceClick(choice)}
                  disabled={selectedChoice !== null}
                  className={`p-6 h-auto text-left justify-start transition-all duration-300 ${
                    selectedChoice === choice.id
                      ? "bg-primary text-primary-foreground scale-105"
                      : "hover:bg-accent hover:text-accent-foreground hover:scale-102"
                  }`}
                >
                  <div className="flex items-start gap-3 w-full">
                    <ArrowRight
                      className={`h-5 w-5 mt-0.5 flex-shrink-0 transition-transform ${
                        selectedChoice === choice.id ? "translate-x-1" : ""
                      }`}
                    />
                    <span className="text-pretty leading-relaxed">{choice.text}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
