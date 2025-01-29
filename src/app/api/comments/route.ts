import { NextResponse } from "next/server"
interface Comment {
  id: string
  message: string
  username: string
}

import Pusher from 'pusher'

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
})
async function sendCommentToAll(comment: Comment) {
await pusher.trigger('chat-channel', 'new-message', {
    comment,
  })
}



export async function POST(request: Request) {
  const { message } = await request.json()

  const comment = {
    id: Date.now().toString(),
    message,
    username: "Anonymous", // You can implement user authentication to get real usernames
  }

  sendCommentToAll(comment) 

  return NextResponse.json({ status:'success',message: "Comment sent" })
}

