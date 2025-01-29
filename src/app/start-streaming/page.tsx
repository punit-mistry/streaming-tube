"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, ImageIcon } from "lucide-react"

export default function StartStreaming() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    channelName: "",
    description: "",
    category: "gaming",
  })
  const [channelLogo, setChannelLogo] = useState<File | null>(null)
  const [channelBanner, setChannelBanner] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically upload the images and save the channel data
    router.push(`/channel/${formData.channelName}`)
    console.log(channelBanner, channelLogo)
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create Your Channel</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label className="block">
              <span className="text-lg font-semibold">Channel Name</span>
              <input
                type="text"
                value={formData.channelName}
                onChange={(e) => setFormData({ ...formData, channelName: e.target.value })}
                className="w-full mt-1 p-2 bg-[#272727] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </label>

            <label className="block">
              <span className="text-lg font-semibold">Channel Description</span>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full mt-1 p-2 bg-[#272727] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                required
              />
            </label>

            <label className="block">
              <span className="text-lg font-semibold">Category</span>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full mt-1 p-2 bg-[#272727] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="gaming">Gaming</option>
                <option value="music">Music</option>
                <option value="tech">Technology</option>
                <option value="creative">Creative</option>
              </select>
            </label>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-semibold block mb-2">Channel Logo</span>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-gray-500">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="text-sm text-gray-500">Upload logo</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => setChannelLogo(e.target.files?.[0] || null)}
                  />
                </label>
              </div>

              <div>
                <span className="text-lg font-semibold block mb-2">Channel Banner</span>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-gray-500">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="text-sm text-gray-500">Upload banner</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => setChannelBanner(e.target.files?.[0] || null)}
                  />
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Channel
          </button>
        </form>
      </div>
    </div>
  )
}

