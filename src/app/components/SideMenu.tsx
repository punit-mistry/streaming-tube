import { Home, Compass, PlaySquare, Clock, ThumbsUp, Flame, Music2, Gamepad2, Newspaper, Trophy } from "lucide-react"

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
  return (
    <aside
      className={`bg-[#0f0f0f] text-white overflow-y-auto border-r border-[#272727] flex-shrink-0 transition-all duration-300 ${isOpen ? "w-64" : "w-0"}`}
    >
      <nav className={`py-3 ${isOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
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

