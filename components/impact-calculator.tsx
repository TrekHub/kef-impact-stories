"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ImpactData } from "@/lib/types";
import { Calculator, Heart } from "lucide-react";

interface ImpactCalculatorProps {
  onImpactCalculated: (data: ImpactData) => void;
}

export function ImpactCalculator({
  onImpactCalculated,
}: ImpactCalculatorProps) {
  const [donation, setDonation] = useState<number>(50);

  const calculateImpact = () => {
    // Simple impact calculation
    const studentsHelped = Math.floor(donation / 25);
    const monthsOfEducation = Math.floor(donation / 100);

    const impactData: ImpactData = {
      donorName: "Anonymous",
      amount: donation,
      impact: {
        students: studentsHelped,
        months: monthsOfEducation,
        location: "Kenya",
        specificImpact: `Your $${donation} donation can help ${studentsHelped} students access education for ${monthsOfEducation} months.`,
      },
    };

    onImpactCalculated(impactData);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Impact Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="donation">Donation Amount ($)</Label>
          <Input
            id="donation"
            type="number"
            value={donation}
            onChange={(e) => setDonation(Number(e.target.value))}
            min={1}
            step={1}
          />
        </div>

        <Button onClick={calculateImpact} className="w-full">
          <Heart className="h-4 w-4 mr-2" />
          Calculate Impact
        </Button>
      </CardContent>
    </Card>
  );
}
