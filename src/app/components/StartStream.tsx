"use client"

import { useState, useRef, useEffect } from "react"
import { Camera, Mic, Video } from "lucide-react"

export default function StartStream() {
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamKey, setStreamKey] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  useEffect(() => {
    if (isStreaming) {
      startStreaming()
    } else {
      stopStreaming()
    }
  }, [isStreaming])

  const startStreaming = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      const response = await fetch("/api/create-stream", { method: "POST" })
      const data = await response.json()
      setStreamKey(data.streamKey)

      const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" })
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0) {
          const formData = new FormData()
          formData.append("file", event.data, "livestream.webm")
          formData.append("streamKey", data.streamKey)

          try {
            await fetch("/api/stream-chunk", {
              method: "POST",
              body: formData,
            })
          } catch (error) {
            console.error("Error sending stream chunk:", error)
          }
        }
      }

      mediaRecorder.start(1000) // Send data every second
    } catch (error) {
      console.error("Error starting stream:", error)
      setIsStreaming(false)
    }
  }

  const stopStreaming = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
    }
    setStreamKey("")
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Start Streaming</h2>
      <div className="aspect-w-16 aspect-h-9 mb-4">
        <video ref={videoRef} autoPlay muted playsInline className="rounded-lg" />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Camera className="text-purple-500" size={24} />
          <Mic className="text-purple-500" size={24} />
        </div>
        <button
          onClick={() => setIsStreaming(!isStreaming)}
          className={`px-4 py-2 rounded-full font-semibold ${
            isStreaming ? "bg-red-500 hover:bg-red-600 text-white" : "bg-purple-500 hover:bg-purple-600 text-white"
          }`}
        >
          {isStreaming ? "Stop Streaming" : "Start Streaming"}
        </button>
      </div>
      {streamKey && (
        <div className="mt-4 p-2 bg-gray-700 rounded text-white">
          <p>Stream Key: {streamKey}</p>
        </div>
      )}
    </div>
  )
}

