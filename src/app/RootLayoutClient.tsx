"use client"

import { useState } from "react"
import Header from "./components/Header"
import SideMenu from "./components/SideMenu"

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <SideMenu isOpen={isSidebarOpen} />
        <main
          className={`flex-1 overflow-auto bg-[#0f0f0f] transition-all duration-300 `}
        >
          {children}
        </main>
      </div>
    </div>
  )
}

