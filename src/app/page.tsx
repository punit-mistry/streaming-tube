import VideoPlayer from "./components/VideoPlayer"
import CommentSection from "./components/CommentSection"
import Layout from "./components/Layout"
import StartStream from "./components/StartStream"

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">StreamingTube</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <VideoPlayer />
            <div className="mt-4">
              <StartStream />
            </div>
          </div>
          <div>
            <CommentSection />
          </div>
        </div>
      </div>
    </Layout>
  )
}

