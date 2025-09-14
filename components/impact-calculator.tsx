"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import type { ImpactData } from "@/lib/types"
import { Calculator, GraduationCap, Calendar, MapPin, Sparkles } from "lucide-react"

interface ImpactCalculatorProps {
  onImpactCalculated: (impact: ImpactData) => void
}

export function ImpactCalculator({ onImpactCalculated }: ImpactCalculatorProps) {
  const [donorName, setDonorName] = useState("")
  const [amount, setAmount] = useState<number>(100)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculateImpact = (donationAmount: number) => {
    // KEF impact calculations based on real data
    const monthlySchoolFees = 35 // Average monthly secondary school fees
    const studentsSupported = Math.floor(donationAmount / (monthlySchoolFees * 12))
    const monthsOfEducation = Math.floor(donationAmount / monthlySchoolFees)

    let location = "rural Kenya"
    let specificImpact = ""

    if (donationAmount >= 400) {
      location = "Turkana County"
      specificImpact =
        "Fund a complete year of secondary education for a student, including tuition, uniforms, books, and boarding fees."
    } else if (donationAmount >= 200) {
      location = "Kisumu region"
      specificImpact = "Cover 6 months of education expenses, including school supplies and mentorship support."
    } else if (donationAmount >= 100) {
      location = "Nairobi slums"
      specificImpact = "Provide 3 months of educational support, including textbooks and school meals."
    } else {
      location = "various communities"
      specificImpact = "Contribute to essential school supplies and educational materials for multiple students."
    }

    return {
      students: Math.max(1, studentsSupported),
      months: Math.max(1, monthsOfEducation),
      location,
      specificImpact,
    }
  }

  const handleCalculate = () => {
    if (!donorName.trim()) return

    setIsCalculating(true)

    // Simulate calculation delay for better UX
    setTimeout(() => {
      const impact = calculateImpact(amount)
      const impactData: ImpactData = {
        donorName: donorName.trim(),
        amount,
        impact,
      }

      onImpactCalculated(impactData)
      setIsCalculating(false)
    }, 1500)
  }

  const presetAmounts = [50, 100, 200, 400, 800]

  return (
    <Card className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Calculator className="h-6 w-6 text-primary" />
          <Badge variant="secondary">Impact Calculator</Badge>
        </div>
        <CardTitle className="text-2xl">{"Discover Your Impact"}</CardTitle>
        <p className="text-muted-foreground text-pretty">
          {"See exactly how your donation transforms lives and creates opportunities for Kenyan students."}
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Name Input */}
        <div className="space-y-2">
          <Label htmlFor="donor-name" className="text-sm font-medium">
            {"Your Name"}
          </Label>
          <Input
            id="donor-name"
            placeholder="Enter your name"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            className="text-lg"
          />
        </div>

        {/* Amount Selection */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">{"Donation Amount (USD)"}</Label>

          {/* Preset Amounts */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {presetAmounts.map((preset) => (
              <Button
                key={preset}
                variant={amount === preset ? "default" : "outline"}
                onClick={() => setAmount(preset)}
                className="text-sm"
              >
                ${preset}
              </Button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium">$</span>
            <Input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(Math.max(1, Number.parseInt(e.target.value) || 1))}
              className="text-lg font-medium"
            />
          </div>
        </div>

        {/* Quick Impact Preview */}
        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <GraduationCap className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Students</span>
              </div>
              <div className="text-xl font-bold text-primary">{Math.max(1, Math.floor(amount / 420))}</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Months</span>
              </div>
              <div className="text-xl font-bold text-primary">{Math.max(1, Math.floor(amount / 35))}</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Impact</span>
              </div>
              <div className="text-xl font-bold text-primary">
                {amount >= 400 ? "High" : amount >= 200 ? "Medium" : "Direct"}
              </div>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <Button
          onClick={handleCalculate}
          disabled={!donorName.trim() || isCalculating}
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3"
        >
          {isCalculating ? (
            <>
              <Sparkles className="mr-2 h-5 w-5 animate-spin" />
              {"Calculating Your Impact..."}
            </>
          ) : (
            <>
              <Calculator className="mr-2 h-5 w-5" />
              {"Calculate My Impact"}
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center text-pretty">
          {
            "Impact calculations are based on KEF's actual program costs and outcomes. 100% of your donation goes directly to student support."
          }
        </p>
      </CardContent>
    </Card>
  )
}
