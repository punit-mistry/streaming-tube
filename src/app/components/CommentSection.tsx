"use client"

import { useState, useEffect } from "react"
import { Send } from "lucide-react"
import pusherClient from "@/lib/pusher"

type Comment = {
  id: string
  message: string
  username: string
}

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")

  const FetchComments = async (incomingComments:{comment:Comment}) => {
    setComments((prevComments) => [...prevComments, incomingComments.comment])
      }
      useEffect(() => {
        const channel = pusherClient.subscribe('chat-channel')
        channel.bind('new-message',FetchComments )
        return () => {
          pusherClient.unsubscribe('chat-channel')
        }
      }, [])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const response = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: newComment }),
    })

    if (response.ok) {
      setNewComment("")
    }
  }

  return (
    <div className="bg-[#0f0f0f] rounded-lg overflow-hidden">
      <h2 className="text-xl font-semibold mb-4 p-4 bg-[#1f1f1f] text-white">Live Chat</h2>
      <div className="h-[calc(100vh-300px)] overflow-y-auto p-4 space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-purple-600"></div>
            <div>
              <span className="font-semibold text-gray-300">{comment.username}</span>
              <p className="text-white">{comment.message}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-[#1f1f1f] flex items-center">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 p-2 rounded-l-full bg-[#272727] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Chat..."
        />
        <button
          type="submit"
          className="bg-[#272727] text-white p-2 rounded-r-full hover:bg-[#3f3f3f] focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  )
}

