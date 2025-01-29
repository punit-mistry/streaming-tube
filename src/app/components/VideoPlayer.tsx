"use client"

import { useEffect, useRef } from "react"
import Hls from "hls.js"
import { ThumbsUp, ThumbsDown, Share2, Download } from "lucide-react"

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const playbackId = process.env.NEXT_PUBLIC_MUX_PLAYBACK_ID
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
  }, [])

  return (
    <div className="bg-[#0f0f0f] rounded-lg overflow-hidden">
      <div className="aspect-w-16 aspect-h-9">
        <video ref={videoRef} controls className="w-full h-full" />
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 bg-[#272727] hover:bg-[#3f3f3f] px-3 py-2 rounded-full">
            <ThumbsUp size={18} />
            <span>23K</span>
          </button>
          <button className="flex items-center space-x-1 bg-[#272727] hover:bg-[#3f3f3f] px-3 py-2 rounded-full">
            <ThumbsDown size={18} />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 bg-[#272727] hover:bg-[#3f3f3f] px-3 py-2 rounded-full">
            <Share2 size={18} />
            <span>Share</span>
          </button>
          <button className="flex items-center space-x-1 bg-[#272727] hover:bg-[#3f3f3f] px-3 py-2 rounded-full">
            <Download size={18} />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  )
}

