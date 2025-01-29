import { Video, Users, Bell } from "lucide-react"

export default function ChannelPage({ params }: { params: { channelName: string } }) {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Channel Banner */}
      <div className="w-full h-48 md:h-64 bg-gradient-to-r from-purple-600 to-blue-600">
        {/* You would typically render the uploaded banner image here */}
      </div>

      {/* Channel Info */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 -mt-12 mb-8">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-purple-600 border-4 border-[#0f0f0f]">
            {/* You would typically render the uploaded logo here */}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold">{params.channelName}</h1>
            <div className="flex items-center gap-2 text-gray-400 mt-2">
              <Users size={20} />
              <span>0 subscribers</span>
            </div>
          </div>
          <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 flex items-center gap-2">
            <Bell size={20} />
            Subscribe
          </button>
        </div>

        {/* Channel Navigation */}
        <nav className="flex gap-6 border-b border-gray-800 mb-6">
          <button className="px-3 py-4 text-white border-b-2 border-white">Home</button>
          <button className="px-3 py-4 text-gray-400 hover:text-white">Videos</button>
          <button className="px-3 py-4 text-gray-400 hover:text-white">Live</button>
          <button className="px-3 py-4 text-gray-400 hover:text-white">Playlists</button>
          <button className="px-3 py-4 text-gray-400 hover:text-white">Community</button>
        </nav>

        {/* Channel Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Placeholder for videos */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-[#272727] rounded-lg overflow-hidden">
              <div className="aspect-video bg-gray-800" />
              <div className="p-3">
                <h3 className="font-semibold">Video Title</h3>
                <p className="text-sm text-gray-400 mt-1">0 views • Just now</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

