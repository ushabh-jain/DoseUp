"use client"

import { useEffect, useRef } from "react"
import "./PulseEffect.css"

export function PulseEffect() {
  const pulseRef = useRef(null)

  useEffect(() => {
    const pulse = pulseRef.current
    if (!pulse) return

    // Create multiple pulse elements
    for (let i = 0; i < 3; i++) {
      const pulseElement = document.createElement("div")
      pulseElement.className = "pulse-circle"
      pulseElement.style.animationDelay = `${i * 0.5}s`
      pulse.appendChild(pulseElement)
    }

    return () => {
      while (pulse.firstChild) {
        pulse.removeChild(pulse.firstChild)
      }
    }
  }, [])

  return <div className="pulse-container" ref={pulseRef}></div>
}

