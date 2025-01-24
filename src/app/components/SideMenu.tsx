import { Users, Heart, Star } from "lucide-react"

const channels = [
  { name: "Channel 1", viewers: 1200 },
  { name: "Channel 2", viewers: 800 },
  { name: "Channel 3", viewers: 2000 },
]

export default function SideMenu() {
  return (
    <aside className="w-64 bg-gray-800 text-white overflow-y-auto">
      <nav className="p-4">
        <h2 className="text-lg font-semibold mb-4">Followed Channels</h2>
        <ul className="space-y-2">
          {channels.map((channel) => (
            <li key={channel.name} className="flex items-center justify-between hover:bg-gray-700 p-2 rounded">
              <div className="flex items-center">
                <Users size={20} className="mr-2" />
                <span>{channel.name}</span>
              </div>
              <span className="text-sm text-gray-400">{channel.viewers}</span>
            </li>
          ))}
        </ul>
        <h2 className="text-lg font-semibold mt-6 mb-4">Recommended Channels</h2>
        <ul className="space-y-2">
          <li className="flex items-center hover:bg-gray-700 p-2 rounded">
            <Heart size={20} className="mr-2" />
            <span>Recommended Channel 1</span>
          </li>
          <li className="flex items-center hover:bg-gray-700 p-2 rounded">
            <Star size={20} className="mr-2" />
            <span>Recommended Channel 2</span>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

