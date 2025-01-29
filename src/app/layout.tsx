import "./globals.css"
import { Inter } from "next/font/google"
import RootLayoutClient from "./RootLayoutClient"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "StreamingTube",
  description: "Watch and comment on live streams",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0f0f0f] text-white`}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  )
}

