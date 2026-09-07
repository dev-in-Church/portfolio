"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

// Accepts a full YouTube URL in any common form and pulls out the video ID
function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : null;
}

export function MusicToggle({ youtubeUrl }: { youtubeUrl: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [apiReady, setApiReady] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  const videoId = getYouTubeId(youtubeUrl);

  // Load the YouTube IFrame API script once, site-wide
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setApiReady(true);
      return;
    }

    const existing = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]',
    );
    if (!existing) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      setApiReady(true);
    };
  }, []);

  // Create the (invisible) player once the API is ready
  useEffect(() => {
    if (!apiReady || !videoId || playerRef.current) return;

    playerRef.current = new window.YT.Player(containerRef.current, {
      videoId,
      width: "1",
      height: "1",
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        playsinline: 1,
        loop: 1,
        playlist: videoId, // required for loop to work on a single video
      },
      events: {
        onReady: () => setPlayerReady(true),
      },
    });

    return () => {
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, [apiReady, videoId]);

  // Pause if the user navigates away from this page without a full reload
  useEffect(() => {
    return () => {
      playerRef.current?.pauseVideo?.();
    };
  }, []);

  const toggle = () => {
    if (!playerReady || !playerRef.current) return;

    if (playing) {
      playerRef.current.pauseVideo();
      setPlaying(false);
    } else {
      // Called directly inside this click handler so it stays tied to a
      // real user gesture, same as the intro sound.
      playerRef.current.playVideo();
      setPlaying(true);
    }
  };

  if (!videoId) return null;

  return (
    <>
      {/* Invisible YouTube player — audio only, tucked off-screen */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          width: 1,
          height: 1,
          overflow: "hidden",
          left: -9999,
          top: -9999,
        }}
      >
        <div ref={containerRef} />
      </div>

      <button
        onClick={toggle}
        aria-label={playing ? "Mute background music" : "Play background music"}
        title={playing ? "Mute music" : "Play music"}
        className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors duration-200"
      >
        {playing ? (
          <Volume2 className="w-5 h-5 text-primary" />
        ) : (
          <VolumeX className="w-5 h-5 text-gray-400" />
        )}
      </button>
    </>
  );
}
