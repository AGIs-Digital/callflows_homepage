"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

// Neue Typen für die individuellen Welleneinstellungen
interface WaveSettings {
  width: number;   // Breite der Welle
  speed: number;   // Geschwindigkeitsfaktor (1.0 = normal)
}

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity,
  // Neue Prop für individuelle Welleneinstellungen
  waveSettings,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  // Array mit individuellen Einstellungen für jede Welle
  waveSettings?: WaveSettings[];
  [key: string]: any;
}) => {
  const noise = createNoise3D();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Basisgeschwindigkeit basierend auf der speed-Prop
  const getBaseSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.003;
      default:
        return 0.001;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let w = ctx.canvas.width = window.innerWidth;
    let h = ctx.canvas.height = canvas.clientHeight;
    let nt = 0;
    
    const waveColors = colors ?? [
      "#fdfdfd",
      "#0f62d5",
      "#def0f2",
      "#004aad",
      "#ffb703",
    ];
    
    // Standardeinstellungen für die Wellen, falls keine individuellen angegeben wurden
    const defaultSettings: WaveSettings[] = Array(waveColors.length).fill(null).map(() => ({
      width: waveWidth || 40,
      speed: 1.0
    }));
    
    // Kombiniere die Standardeinstellungen mit den benutzerdefinierten Einstellungen
    const finalWaveSettings = waveSettings 
      ? defaultSettings.map((defaultSetting, index) => ({
          ...defaultSetting,
          ...(waveSettings[index] || {})
        }))
      : defaultSettings;
    
    const handleResize = () => {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = canvas.clientHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Zeichne die Wellen mit individuellen Einstellungen
    const drawWave = (n: number) => {
      // Erhöhe den Zeitwert mit der Basisgeschwindigkeit
      nt += getBaseSpeed();
      
      // Zeichne jede Welle mit ihren individuellen Einstellungen
      for (let i = 0; i < n; i++) {
        // Verwende nur so viele Wellen, wie wir Farben haben
        if (i >= waveColors.length) break;
        
        ctx.beginPath();
        
        // Verwende die individuelle Breite für diese Welle
        ctx.lineWidth = finalWaveSettings[i].width;
        ctx.strokeStyle = waveColors[i];
        
        // Verwende die individuelle Geschwindigkeit für diese Welle
        const waveSpeed = nt * finalWaveSettings[i].speed;
        
        // Vertikale Staffelung der Wellen - jede Welle beginnt etwas höher als die vorherige
        // Die letzte Welle (gelb) bleibt unberührt
        let verticalOffset;
        if (i === n-1) {
          // Gelbe Welle (letzte) - unverändert
          verticalOffset = h * 0.6;
        } else {
          // Andere Wellen - gestaffelt von unten nach oben
          // Je kleiner der Index, desto weiter unten ist die Welle
          verticalOffset = h * (0.65 + (i * 0.05));
        }
        
        // Zeichne die Welle über den Bildschirmrand hinaus
        for (let x = -100; x < w + 100; x += 5) {
          const y = noise(x / 800, 0.3 * i, waveSpeed) * 50;
          ctx.lineTo(x, y + verticalOffset);
        }
        
        ctx.stroke();
        ctx.closePath();
      }
    };
    
    let animationId: number;
    const render = () => {
      ctx.clearRect(0, 0, w, h);
      
      if (backgroundFill !== "transparent") {
        ctx.fillStyle = backgroundFill || "none";
        ctx.globalAlpha = waveOpacity || 0.5;
        ctx.fillRect(0, 0, w, h);
      }
      
      // Zeichne so viele Wellen wie wir Farben haben
      drawWave(waveColors.length);
      animationId = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [colors, waveWidth, backgroundFill, waveOpacity, speed, waveSettings]);

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0 block"
        ref={canvasRef}
        style={{ display: "block" }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};