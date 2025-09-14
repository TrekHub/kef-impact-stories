import type React from "react"
import { Navigation } from "@/components/navigation"

export default function ImpactLayout({
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
