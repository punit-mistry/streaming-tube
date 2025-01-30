"use client"

import { useState } from "react"
import {
  Home,
  Compass,
  PlaySquare,
  Clock,
  ThumbsUp,
  Flame,
  Music2,
  Gamepad2,
  Newspaper,
  Trophy,
  Video,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

const menuItems = [
  { icon: Home, label: "Home" },
  { icon: Compass, label: "Explore" },
  { icon: PlaySquare, label: "Subscriptions" },
  { icon: Clock, label: "History" },
  { icon: ThumbsUp, label: "Liked videos" },
]

const exploreItems = [
  { icon: Flame, label: "Trending" },
  { icon: Music2, label: "Music" },
  { icon: Gamepad2, label: "Gaming" },
  { icon: Newspaper, label: "News" },
  { icon: Trophy, label: "Sports" },
]

interface SideMenuProps {
  isOpen: boolean
}

export default function SideMenu({ isOpen }: SideMenuProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleGoLive = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/go-live", { method: "POST" })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      if (!data.playbackId) {
        throw new Error("No playback ID received from the server")
      }

      router.push(`/live/${data.playbackId}`)
    } catch (error) {
      console.error("Error in handleGoLive:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to start live stream. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <aside
      className={`bg-[#0f0f0f] text-white overflow-y-auto flex-shrink-0 transition-all duration-300 ${isOpen ? "w-64" : "w-0"}`}
    >
      <nav className={`py-3 ${isOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
        <Button
          onClick={handleGoLive}
          disabled={isLoading}
          className="w-full mb-4 bg-red-600 hover:bg-red-700 text-white"
        >
          {isLoading ? "Starting..." : "Go Live"}
          <Video className="ml-2 h-4 w-4" />
        </Button>
        {menuItems.map((item) => (
          <a key={item.label} href="#" className="flex items-center px-6 py-3 hover:bg-[#272727]">
            <item.icon size={20} className="mr-4" />
            <span>{item.label}</span>
          </a>
        ))}
        <hr className="my-2 border-[#272727]" />
        <h3 className="px-6 py-2 text-sm font-semibold">Explore</h3>
        {exploreItems.map((item) => (
          <a key={item.label} href="#" className="flex items-center px-6 py-3 hover:bg-[#272727]">
            <item.icon size={20} className="mr-4" />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  )
}

