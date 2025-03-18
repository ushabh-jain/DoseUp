"use client"

import { useEffect, useRef } from "react"
import "./BorderBeam.css"

export function BorderBeam({
  size = 50,
  duration = 6,
  delay = 0,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  reverse = false,
  initialOffset = 0,
}) {
  const beamRef = useRef(null)

  useEffect(() => {
    const beam = beamRef.current
    if (!beam) return

    // Set CSS variables
    beam.style.setProperty("--color-from", colorFrom)
    beam.style.setProperty("--color-to", colorTo)
    beam.style.setProperty("--size", `${size}px`)
    beam.style.setProperty("--duration", `${duration}s`)
    beam.style.setProperty("--delay", `${delay}s`)
    beam.style.setProperty("--initial-offset", `${initialOffset}%`)
    beam.style.setProperty("--direction", reverse ? "reverse" : "normal")

    // Start animation
    beam.classList.add("animate")

    return () => {
      beam.classList.remove("animate")
    }
  }, [size, duration, delay, colorFrom, colorTo, reverse, initialOffset])

  return (
    <div className="border-beam-container">
      <div ref={beamRef} className="border-beam"></div>
    </div>
  )
}

