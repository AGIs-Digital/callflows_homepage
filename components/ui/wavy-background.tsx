"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  speed = "fast",
  waveOpacity = 1,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const noise = createNoise3D();
  let w: number,
    h: number,
    nt: number,
    i: number,
    x: number,
    ctx: any,
    canvas: any;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.003;
      case "fast":
        return 0.006;
      default:
        return 0.001;
    }
  };

  const init = () => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;
    nt = 0;
    window.onresize = function () {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
    };
    render();
  };

  const waveColors = colors ?? [
    "#fdfdfd",
    "#0f62d5",
    "#def0f2",
    "#004aad",
    "#ffb703",

  ];
  const drawWave = (n: number) => {
    nt += getSpeed();
    for (i = 0; i < n; i++) {
      const extendedWidth = w * 1.5;
      const startX = -w * 0.25;

      ctx.beginPath();
      ctx.lineWidth = i === n - 1 ? 3 : waveWidth || 40;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (x = startX; x < startX + extendedWidth; x += 5) {
        var y = noise(x / 800, 0.3 * i, nt) * 50;
        ctx.lineTo(x, y + h * 1);
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  let animationId: number;
  const render = () => {
    // Canvas vollständig löschen
    ctx.clearRect(0, 0, w, h);
    
    // Hintergrund neu zeichnen (falls gewünscht)
    if (backgroundFill !== "transparent") {
      ctx.fillStyle = backgroundFill || "none";
      ctx.globalAlpha = waveOpacity || 0.5;
      ctx.fillRect(0, 0, w, h);
    }
    
    drawWave(4);
    animationId = requestAnimationFrame(render);
  };

  useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn(
        "relative h-screen flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-50"
        ref={canvasRef}
        id="canvas"
      ></canvas>
      <div className={cn("relative z-[55]", className)} {...props}>
        {children}
      </div>
    </div>
  );
};