export interface StoryChoice {
  id: string
  text: string
  nextSceneId: string
  impact?: string
}

export interface StoryScene {
  id: string
  title: string
  content: string
  imageUrl: string
  choices: StoryChoice[]
  isEnding?: boolean
}

export interface Story {
  id: string
  title: string
  description: string
  scenes: StoryScene[]
}

export interface MapHotspot {
  id: string
  name: string
  coordinates: [number, number] // [lat, lng]
  story: {
    title: string
    content: string
    imageUrl: string
    studentName: string
    impact: string
  }
}

export interface ImpactData {
  donorName: string
  amount: number
  impact: {
    students: number
    months: number
    location: string
    specificImpact: string
  }
}
