"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Smartphone,
  Play,
  ArrowRight,
  Zap,
  Timer,
  Users,
  Heart,
  QrCode,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function QRLanding() {
  const [isMobile, setIsMobile] = useState(false);
  const [showQuickStart, setShowQuickStart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Check if user came from QR code (could be URL parameter or other indicator)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("source") === "qr" || urlParams.get("ref") === "qr") {
      setShowQuickStart(true);
      return () => window.removeEventListener("resize", checkMobile);
    }

    // Check if user has already seen the prompt this session
    const hasSeenPrompt = sessionStorage.getItem("kef-prompt-shown");

    // Only auto-show if user hasn't seen it yet this session
    if (!hasSeenPrompt) {
      const timer = setTimeout(() => {
        setShowQuickStart(true);
        sessionStorage.setItem("kef-prompt-shown", "true");
      }, 2000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", checkMobile);
      };
    }

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const startGameImmediately = () => {
    router.push("/game");
  };

  if (!showQuickStart) {
    return null; // Let the regular hero section show
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-sm mx-auto bg-white border-2 border-primary shadow-2xl">
        <CardContent className="p-6 text-center">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-center mb-4">
              <Play className="h-8 w-8 text-primary mr-2" />
              <Heart className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
            <p className="text-muted-foreground">
              Ready to make choices that change lives?
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6 text-center">
            <div className="p-3 bg-primary/5 rounded-lg">
              <Timer className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-xs font-medium">3-5 min</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Zap className="h-5 w-5 mx-auto mb-1 text-blue-600" />
              <div className="text-xs font-medium">Interactive</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Heart className="h-5 w-5 mx-auto mb-1 text-green-600" />
              <div className="text-xs font-medium">Real Impact</div>
            </div>
          </div>

          {/* Game Description */}
          <div className="mb-6 p-4 bg-gradient-to-r from-primary/5 to-blue-50 rounded-lg">
            <p className="text-sm font-medium mb-2">
              🎮 Interactive Experience
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Make real choices for Kenyan students. Shape their educational
              journey and see how your decisions create lasting change.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              className="w-full text-lg py-6 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
              onClick={startGameImmediately}
            >
              <Play className="h-5 w-5 mr-2" />
              Start Now
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setShowQuickStart(false);
                sessionStorage.setItem("kef-prompt-shown", "true");
              }}
            >
              Explore Website First
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
            <p>🌍 Interactive Stories from Kenya Education Fund</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
