import Link from "next/link"
import { Search, Bell, Video, Menu, Mic, User } from "lucide-react"

interface HeaderProps {
  toggleSidebar: () => void
}

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="bg-[#0f0f0f] text-white p-2 flex items-center justify-between">
      <div className="flex items-center">
        <button className="p-2 hover:bg-[#272727] rounded-full" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <Link href="/" className="flex items-center ml-4">
          <Video size={32} className="text-red-600 mr-1" />
          <span className="text-xl font-bold">StreamingTube</span>
        </Link>
      </div>
      <div className="flex-1 max-w-2xl mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-[#121212] text-white placeholder-gray-400 rounded-l-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-0 top-0 bottom-0 px-4 bg-[#272727] rounded-r-full hover:bg-[#3f3f3f]">
            <Search size={20} />
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Link
          href="/start-streaming"
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 flex items-center gap-2"
        >
          <Video size={20} />
          Start Streaming
        </Link>
        <button className="p-2 hover:bg-[#272727] rounded-full">
          <Bell size={20} />
        </button>
        <button className="p-1 hover:bg-[#272727] rounded-full">
          <User size={24} />
        </button>
      </div>
    </header>
  )
}

