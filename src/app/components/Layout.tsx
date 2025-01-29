"use client"

import { useState } from "react"
import Header from "./Header"
import SideMenu from "./SideMenu"

export default function Layout({ children }: { children: React.ReactNode }) {
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
          className={`flex-1 overflow-auto bg-[#0f0f0f] p-6 transition-all duration-300 `}
        >
          {children}
        </main>
      </div>
    </div>
  )
}

