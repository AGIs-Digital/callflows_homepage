"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Maximize2 } from "lucide-react";

interface Video {
  title: string;
  description: string;
  sources: {
    src: string;
    quality: string;
    label: string;
  }[];
  poster: string;
  transcriptUrl: string;
}

const videos: Video[] = [
  {
    title: "Outbound-Kampagne mit KI Voice Agent",
    description: "Sehen Sie live, wie unser KI Voice Agent Termine vereinbart",
    sources: [
      {
        src: "/videos/outbound_nina_480p.mp4",
        quality: "480",
        label: "480p"
      },
      {
        src: "/videos/outbound_nina_720p.mp4",
        quality: "720",
        label: "720p"
      },
      {
        src: "/videos/outbound_nina_1080p.mp4",
        quality: "1080",
        label: "1080p"
      }
    ],
    poster: "/images/outbound-poster.png",
    transcriptUrl: "/videos/outbound_nina_transcript.srt"
  },
  {
    title: "Inbound-Support mit KI Voice Agent",
    description: "Erleben Sie unseren KI Voice Agent im Kundenservice",
    sources: [
      {
        src: "/videos/inbound_markus_480p.mp4",
        quality: "480",
        label: "480p"
      },
      {
        src: "/videos/inbound_markus_720p.mp4",
        quality: "720",
        label: "720p"
      },
      {
        src: "/videos/inbound_markus_1080p.mp4",
        quality: "1080",
        label: "1080p"
      }
    ],
    poster: "/images/inbound-poster.png",
    transcriptUrl: "/videos/inbound_markus_transcript.srt"
  }
];

function VideoPlayer({ video }: { video: Video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentQuality, setCurrentQuality] = useState(getInitialQuality());
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentSource = video.sources.find(s => s.quality === currentQuality) || video.sources[0];

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

  const handleQualityChange = (quality: string) => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const wasPlaying = !videoRef.current.paused;
      setCurrentQuality(quality);
      
      videoRef.current.addEventListener('loadeddata', () => {
        videoRef.current!.currentTime = currentTime;
        if (wasPlaying) {
          videoRef.current!.play();
        }
      }, { once: true });
    }
  };

  // Bestimme die beste Startqualität basierend auf Verbindungsqualität
  function getInitialQuality() {
    if (typeof window === 'undefined') return "1080";
    
    const connection = (navigator as any).connection;
    
    // Nur bei erkennbar schlechter Verbindung die Qualität reduzieren
    if (connection) {
      if (connection.effectiveType === 'slow-2g') return "480";
      if (connection.effectiveType === '2g') return "480";
      if (connection.effectiveType === '3g') return "720";
    }
    
    // Standard ist beste Qualität (1080p)
    return "1080";
  }

  return (
    <div ref={containerRef} className="relative rounded-lg overflow-hidden shadow-lg">
      <video
        ref={videoRef}
        poster={video.poster}
        onTimeUpdate={handleTimeUpdate}
        className="w-full aspect-video"
      >
        <source src={currentSource.src} type="video/mp4" />
        <track
          kind="captions"
          src={`${currentSource.src}.vtt`}
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
          <div className="flex items-center gap-4">
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

            <div className="relative group">
              <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white text-sm">
                {currentSource.label}
              </button>
              <div className="absolute bottom-full mb-2 left-0 hidden group-hover:block bg-black/90 rounded-lg overflow-hidden">
                {video.sources.map((source) => (
                  <button
                    key={source.quality}
                    onClick={() => handleQualityChange(source.quality)}
                    className={`block w-full px-4 py-2 text-sm text-left hover:bg-white/10 text-white
                      ${currentQuality === source.quality ? 'bg-white/20' : ''}`}
                  >
                    {source.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

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

function TranscriptSection({ url }: { url: string }) {
  const [transcript, setTranscript] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const loadTranscript = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to load transcript');
      const text = await response.text();
      setTranscript(text);
    } catch (error) {
      console.error('Error loading transcript:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <details 
      className="text-sm text-muted-foreground group"
      onToggle={(e) => {
        if ((e.target as HTMLDetailsElement).open && !transcript && !isLoading) {
          loadTranscript();
        }
      }}
    >
      <summary className="cursor-pointer hover:text-primary transition-colors font-medium flex items-center gap-2">
        <span className="group-open:rotate-90 transition-transform">
          →
        </span>
        Transkript anzeigen
      </summary>
      <div className="mt-4 pl-6 border-l-2 border-primary/20 prose-sm dark:prose-invert">
        {isLoading ? (
          <p>Transkript wird geladen...</p>
        ) : isError ? (
          <p className="text-red-500">Fehler beim Laden des Transkripts</p>
        ) : (
          <p className="whitespace-pre-line">{transcript}</p>
        )}
      </div>
    </details>
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
              <TranscriptSection url={video.transcriptUrl} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}