"use client"

import { useEffect, useRef, useState } from "react"
import Hls from "hls.js"
import { User, Heart } from "lucide-react"

interface VideoPlayerProps {
  initialPlaybackId?: string
}

export default function VideoPlayer({ initialPlaybackId }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playbackId, setPlaybackId] = useState(initialPlaybackId || process.env.NEXT_PUBLIC_MUX_PLAYBACK_ID)

  useEffect(() => {
    if (!playbackId) {
      console.error("Mux Playback ID is not set")
      return
    }

    const videoSrc = `https://stream.mux.com/${playbackId}.m3u8`

    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(videoSrc)
      hls.attachMedia(videoRef.current!)
    } else if (videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = videoSrc
    }
  }, [playbackId])

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="aspect-w-16 aspect-h-9">
        <video ref={videoRef} controls className="w-full h-full" />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold text-white mb-2">Live Stream</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <User className="text-purple-500 mr-2" size={20} />
            <span className="text-white">Streamer</span>
          </div>
          <div className="flex items-center">
            <Heart className="text-red-500 mr-2" size={20} />
            <span className="text-white">Live</span>
          </div>
        </div>
      </div>
    </div>
  )
}

