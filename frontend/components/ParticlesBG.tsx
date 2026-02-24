// components/ParticlesBG.tsx
"use client";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadStarsPreset } from "tsparticles-preset-stars";
import type { Engine } from "tsparticles-engine";

export default function ParticlesBG() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadStarsPreset(engine);
  }, []);

  return (
    <Particles
      id="hero-particles"
      init={particlesInit}
      options={{
        preset: "stars",
        background: { color: "transparent" },
        particles: {
          number: { value: 60 },
          move: { speed: 0.4 },
          opacity: { value: 0.7 },
          size: { value: 1.2 },
        },
        interactivity: { detect: "canvas", events: { onHover: { enable: true, mode: "repulse" } } },
        fullScreen: { enable: false }, // <— non-aktifkan fullscreen
      }}
      className="absolute inset-0 z-0" // hanya mengisi parent-nya
    />
  );
}