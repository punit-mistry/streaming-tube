"use client"

import { useState, useEffect } from "react"
import pusherClient from '@/lib/pusher'
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
      body: JSON.stringify({ text: newComment }),
    })

    if (response.ok) {
      setNewComment("")
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <h2 className="text-xl font-semibold mb-4 p-4 bg-gray-700 text-white">Live Chat</h2>
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-700 p-2 rounded">
            <span className="font-semibold text-purple-400">{comment.username}: </span>
            <span className="text-white">{comment.message}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-gray-700">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Send a message"
        />
        <button
          type="submit"
          className="mt-2 w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Chat
        </button>
      </form>
    </div>
  )
}

