import Link from "next/link"
import { Search, Bell, MessageSquare, User } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-purple-700 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          StreamingTube
        </Link>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-purple-600 text-white placeholder-purple-300 rounded-full py-1 px-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300" size={18} />
          </div>
          <Bell size={20} />
          <MessageSquare size={20} />
          <User size={20} />
        </div>
      </div>
    </header>
  )
}

