"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { use } from "react"
import Hls from "hls.js"
import LiveStreamSetup from "@/app/components/LiveStreamSetup"

export default function LiveStreamPage({ params }: { params: Promise<{ playbackId: string }> }) {
  const { playbackId } = use(params)
  const [isStreaming, setIsStreaming] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [streamStatus, setStreamStatus] = useState<string>("not_active")
  const videoRef = useRef<HTMLVideoElement>(null)
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<Hls | null>(null)

  const checkStreamStatus = useCallback(async () => {
    try {
      const response = await fetch(`/api/check-stream-status?playbackId=${playbackId}`)
      const data = await response.json()
      setStreamStatus(data.status)
      return data.isActive
    } catch (error) {
      console.error("Error checking stream status:", error)
      return false
    }
  }, [playbackId])

  const startStreaming = (stream: MediaStream) => {
    setLocalStream(stream)
    setIsStreaming(true)
  }

  useEffect(() => {
    if (isStreaming) {
      const pollInterval = setInterval(async () => {
        const isActive = await checkStreamStatus()
        if (isActive) {
          clearInterval(pollInterval)
          setIsLoading(false)
          initializeHlsPlayer()
        }
      }, 5000) // Check every 5 seconds

      return () => clearInterval(pollInterval)
    }
  }, [isStreaming, checkStreamStatus])

  const initializeHlsPlayer = useCallback(() => {
    if (videoRef.current) {
      const video = videoRef.current
      const videoSrc = `https://stream.mux.com/${playbackId}.m3u8`

      if (Hls.isSupported()) {
        hlsRef.current = new Hls()
        hlsRef.current.loadSource(videoSrc)
        hlsRef.current.attachMedia(video)
        hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch((e) => console.error("Error attempting to play", e))
        })
        hlsRef.current.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            setError("An error occurred while loading the stream. Please try again.")
            setIsLoading(false)
          }
        })
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoSrc
        video.addEventListener("loadedmetadata", () => {
          video.play().catch((e) => console.error("Error attempting to play", e))
        })
      } else {
        setError("Your browser does not support HLS playback.")
        setIsLoading(false)
      }
    }
  }, [playbackId])

  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream
    }

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop())
      }
      if (hlsRef.current) {
        hlsRef.current.destroy()
      }
    }
  }, [localStream])

  if (!isStreaming) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f0f0f] text-white">
        <h1 className="text-3xl font-bold mb-4">Prepare Your Stream</h1>
        <LiveStreamSetup playbackId={playbackId} onStart={startStreaming} />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f0f0f] text-white">
      <h1 className="text-3xl font-bold mb-4">Live Stream</h1>
      <div className="w-full max-w-6xl grid grid-cols-2 gap-4">
        <div className="aspect-video bg-black relative">
          <video ref={localVideoRef} autoPlay muted playsInline className="w-full h-full" />
          <p className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded">Your Camera</p>
        </div>
        <div className="aspect-video bg-black relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
              <p className="absolute mt-20 text-white">Waiting for stream to become active...</p>
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-500 bg-opacity-75">
              <p className="text-white text-center p-4">{error}</p>
            </div>
          )}
          <video ref={videoRef} controls className="w-full h-full" />
          <p className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded">Mux Stream</p>
        </div>
      </div>
      <p className="mt-4 text-gray-400">Stream Status: {streamStatus}</p>
    </div>
  )
}

