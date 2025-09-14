// Engagement tracking utility for the storytelling fundraising app
// Tracks user behavior through the feeling → learning → acting journey

export interface EngagementEvent {
  event: string;
  data?: Record<string, any>;
  timestamp: number;
  userId?: string;
  sessionId: string;
  stage: "feeling" | "learning" | "acting" | "completed";
}

export interface UserJourney {
  sessionId: string;
  userId?: string;
  startTime: number;
  currentStage: "feeling" | "learning" | "acting" | "completed";
  events: EngagementEvent[];
  conversionData?: {
    donationAmount?: number;
    donorName?: string;
    conversionTime?: number;
  };
}

class EngagementTracker {
  private sessionId: string;
  private userId?: string;
  private currentStage: "feeling" | "learning" | "acting" | "completed" =
    "feeling";
  private events: EngagementEvent[] = [];
  private startTime: number;
  private stageStartTimes: Record<string, number> = {};

  constructor(userId?: string) {
    this.sessionId = this.generateSessionId();
    this.userId = userId;
    this.startTime = Date.now();
    this.stageStartTimes.feeling = this.startTime;

    // Track session start
    this.track("session_started", {
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Main tracking method
  track(event: string, data?: Record<string, any>): void {
    const engagementEvent: EngagementEvent = {
      event,
      data,
      timestamp: Date.now(),
      userId: this.userId,
      sessionId: this.sessionId,
      stage: this.currentStage,
    };

    this.events.push(engagementEvent);

    // Send to analytics (Google Analytics, Mixpanel, etc.)
    this.sendToAnalytics(engagementEvent);

    // Store locally for backup
    this.saveToLocalStorage();

    console.log("📊 Engagement Event:", engagementEvent);
  }

  // Stage progression tracking
  moveToStage(stage: "feeling" | "learning" | "acting" | "completed"): void {
    const previousStage = this.currentStage;
    const timeInPreviousStage =
      Date.now() - this.stageStartTimes[previousStage];

    this.track("stage_completed", {
      from_stage: previousStage,
      to_stage: stage,
      time_in_stage: timeInPreviousStage,
    });

    this.currentStage = stage;
    this.stageStartTimes[stage] = Date.now();

    this.track("stage_started", { stage });
  }

  // Story interaction tracking
  trackStoryInteraction(action: string, data?: Record<string, any>): void {
    this.track(`story_${action}`, {
      ...data,
      stage: this.currentStage,
    });
  }

  // Impact calculator tracking
  trackImpactCalculation(amount: number, donorName?: string): void {
    this.track("impact_calculated", {
      amount,
      has_donor_name: !!donorName,
      calculation_time: Date.now() - this.stageStartTimes[this.currentStage],
    });
  }

  // Donation tracking
  trackDonationIntent(amount: number, donorName: string): void {
    this.track("donation_intent", {
      amount,
      donor_name: donorName,
      journey_duration: Date.now() - this.startTime,
    });
  }

  trackDonationCompleted(
    amount: number,
    donorName: string,
    method?: string
  ): void {
    this.track("donation_completed", {
      amount,
      donor_name: donorName,
      payment_method: method,
      total_journey_time: Date.now() - this.startTime,
      conversion_stage: this.currentStage,
    });

    this.moveToStage("completed");
  }

  // Engagement quality metrics
  trackScrollDepth(depth: number): void {
    this.track("scroll_depth", { depth, stage: this.currentStage });
  }

  trackTimeOnPage(pageId: string): void {
    this.track("time_on_page", {
      page_id: pageId,
      time_spent: Date.now() - this.stageStartTimes[this.currentStage],
    });
  }

  trackMouseMovement(intensity: "low" | "medium" | "high"): void {
    this.track("engagement_intensity", {
      type: "mouse_movement",
      intensity,
      stage: this.currentStage,
    });
  }

  // Emotional response tracking
  trackEmotionalResponse(
    emotion: "inspired" | "concerned" | "motivated" | "hopeful",
    intensity: number
  ): void {
    this.track("emotional_response", {
      emotion,
      intensity, // 1-10 scale
      story_stage: this.currentStage,
    });
  }

  // Get journey analytics
  getJourneyAnalytics(): UserJourney {
    return {
      sessionId: this.sessionId,
      userId: this.userId,
      startTime: this.startTime,
      currentStage: this.currentStage,
      events: this.events,
    };
  }

  // Get conversion funnel data
  getConversionFunnel(): Record<string, any> {
    const stageEvents = this.events.reduce((acc, event) => {
      if (!acc[event.stage]) acc[event.stage] = [];
      acc[event.stage].push(event);
      return acc;
    }, {} as Record<string, EngagementEvent[]>);

    return {
      feeling_engagement: stageEvents.feeling?.length || 0,
      learning_engagement: stageEvents.learning?.length || 0,
      acting_engagement: stageEvents.acting?.length || 0,
      total_time: Date.now() - this.startTime,
      conversion_rate: this.currentStage === "completed" ? 1 : 0,
    };
  }

  // Analytics integration
  private sendToAnalytics(event: EngagementEvent): void {
    // Google Analytics 4
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", event.event, {
        event_category: "fundraising_journey",
        event_label: event.stage,
        custom_parameter_1: event.sessionId,
        value: event.data?.amount || 0,
        ...event.data,
      });
    }

    // Facebook Pixel
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("trackCustom", event.event, {
        stage: event.stage,
        session_id: event.sessionId,
        ...event.data,
      });
    }

    // Custom analytics endpoint
    if (process.env.NODE_ENV === "production") {
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      }).catch(console.error);
    }
  }

  private saveToLocalStorage(): void {
    try {
      localStorage.setItem(
        `kef_journey_${this.sessionId}`,
        JSON.stringify({
          sessionId: this.sessionId,
          events: this.events.slice(-50), // Keep last 50 events
        })
      );
    } catch (error) {
      console.warn("Could not save to localStorage:", error);
    }
  }
}

// Global tracker instance
let globalTracker: EngagementTracker;

export const initializeTracking = (userId?: string): EngagementTracker => {
  globalTracker = new EngagementTracker(userId);
  return globalTracker;
};

export const getTracker = (): EngagementTracker => {
  if (!globalTracker) {
    globalTracker = new EngagementTracker();
  }
  return globalTracker;
};

// Convenience functions
export const trackEvent = (event: string, data?: Record<string, any>): void => {
  getTracker().track(event, data);
};

export const trackStoryChoice = (
  choiceId: string,
  choiceText: string,
  sceneId: string
): void => {
  getTracker().trackStoryInteraction("choice_selected", {
    choice_id: choiceId,
    choice_text: choiceText,
    scene_id: sceneId,
  });
};

export const trackDonationFlow = (
  step: "started" | "amount_entered" | "info_entered" | "submitted",
  data?: Record<string, any>
): void => {
  getTracker().track(`donation_${step}`, data);
};

// React hook for engagement tracking
export const useEngagementTracking = () => {
  const tracker = getTracker();

  return {
    trackEvent: tracker.track.bind(tracker),
    trackStoryInteraction: tracker.trackStoryInteraction.bind(tracker),
    trackImpactCalculation: tracker.trackImpactCalculation.bind(tracker),
    trackDonationIntent: tracker.trackDonationIntent.bind(tracker),
    trackEmotionalResponse: tracker.trackEmotionalResponse.bind(tracker),
    moveToStage: tracker.moveToStage.bind(tracker),
    getAnalytics: tracker.getJourneyAnalytics.bind(tracker),
  };
};
