import VideoPlayer from "./components/VideoPlayer"
import CommentSection from "./components/CommentSection"

export default function Home() {
  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <VideoPlayer />
            <h1 className="text-2xl font-bold mt-4 mb-2">Stream Title</h1>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-600 mr-3"></div>
                <div>
                  <h2 className="font-bold">Channel Name</h2>
                  <p className="text-sm text-gray-400">1.2M subscribers</p>
                </div>
              </div>
              <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700">Subscribe</button>
            </div>
          </div>
          <div>
            <CommentSection />
          </div>
        </div>
      </div>
    </div>
  )
}

