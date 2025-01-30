"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface LiveStreamSetupProps {
  playbackId: string;
  onStart: (stream: MediaStream) => void;
}

export default function LiveStreamSetup({ onStart }: LiveStreamSetupProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function setupStream() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
        setError(
          "Unable to access camera and microphone. Please ensure you have granted the necessary permissions."
        );
      }
    }

    setupStream();

    return () => {
      // We'll handle stream cleanup in the parent component
    };
  }, []);

  const handleStart = () => {
    if (stream) {
      onStart(stream);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {error ? (
        <div className="bg-red-500 text-white p-4 rounded">{error}</div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full max-w-2xl aspect-video bg-black"
          />

          <p className="text-sm text-gray-300">
            Preview of your camera. Make sure you&apos;re visible and your
            microphone is working.
          </p>
          <Button
            onClick={handleStart}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Start Streaming
          </Button>
        </>
      )}
    </div>
  );
}
