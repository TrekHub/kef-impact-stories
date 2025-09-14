import type React from "react"
import { Navigation } from "@/components/navigation"

export default function JourneyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navigation />
      <div className="pt-16">{children}</div>
    </>
  )
}
