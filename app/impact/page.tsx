"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ImpactCalculator } from "@/components/impact-calculator"
import { ImpactStory } from "@/components/impact-story"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { ImpactData } from "@/lib/types"
import { ArrowLeft, Target } from "lucide-react"

export default function ImpactPage() {
  const router = useRouter()
  const [impactData, setImpactData] = useState<ImpactData | null>(null)

  const handleImpactCalculated = (data: ImpactData) => {
    setImpactData(data)
  }

  const handleDonate = () => {
    // Redirect to KEF's actual donation page
    window.open("https://www.kenyaeducationfund.org/donate", "_blank")
  }

  const handleReset = () => {
    setImpactData(null)
  }

  const handleBack = () => {
    router.push("/map")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted p-4">
      <div className="max-w-6xl mx-auto">
        <Button variant="ghost" onClick={handleBack} className="mb-6 bg-background/80 backdrop-blur-sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Map
        </Button>

        {!impactData ? (
          <>
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <Target className="w-4 h-4 mr-2" />
                Impact Mirror
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{"See Your Impact"}</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                {
                  "Discover exactly how your donation will transform lives and create lasting change in Kenyan communities."
                }
              </p>
            </div>

            <ImpactCalculator onImpactCalculated={handleImpactCalculated} />
          </>
        ) : (
          <ImpactStory impactData={impactData} onDonate={handleDonate} onReset={handleReset} />
        )}
      </div>
    </div>
  )
}
