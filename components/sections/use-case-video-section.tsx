"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Maximize2 } from "lucide-react";

interface Video {
  title: string;
  description: string;
  src: string;
  poster: string;
  transcript: string;
}

const videos: Video[] = [
  {
    title: "Outbound-Kampagne mit KI Voice Agent",
    description: "Sehen Sie live, wie unser KI Voice Agent Termine vereinbart",
    src: "/videos/outbound-demo.mp4",
    poster: "/images/outbound-poster.jpg",
    transcript: "Transkript des Outbound-Demo-Videos..."
  },
  {
    title: "Inbound-Support mit KI Voice Agent",
    description: "Erleben Sie unseren KI Voice Agent im Kundenservice",
    src: "/videos/inbound-demo.mp4",
    poster: "/images/inbound-poster.jpg",
    transcript: "Transkript des Inbound-Demo-Videos..."
  }
];

function VideoPlayer({ video }: { video: Video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && isPlaying) {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      videoRef.current.currentTime = percentage * videoRef.current.duration;
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div ref={containerRef} className="relative rounded-lg overflow-hidden shadow-lg">
      <video
        ref={videoRef}
        poster={video.poster}
        onTimeUpdate={handleTimeUpdate}
        className="w-full aspect-video"
      >
        <source src={video.src} type="video/mp4" />
        <track
          kind="captions"
          src={`${video.src}.vtt`}
          srcLang="de"
          label="Deutsch"
        />
      </video>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div
          className="w-full h-1 bg-white/20 rounded-full mb-4 cursor-pointer"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-primary rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={togglePlay}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white" />
            )}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Maximize2 className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function UseCaseVideoSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container max-w-7xl">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary dark:text-white">
          Praxis-Einblicke
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {videos.map((video, index) => (
            <div key={index} className="space-y-4">
              <VideoPlayer video={video} />
              <h3 className="text-xl font-semibold">{video.title}</h3>
              <p className="text-muted-foreground">{video.description}</p>
              <details className="text-sm text-muted-foreground">
                <summary className="cursor-pointer hover:text-primary">
                  Transkript anzeigen
                </summary>
                <p className="mt-2 pl-4 border-l-2 border-primary/20">
                  {video.transcript}
                </p>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}