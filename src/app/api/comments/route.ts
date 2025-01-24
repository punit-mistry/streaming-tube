import { NextResponse } from "next/server"


import Pusher from 'pusher'

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
})
async function sendCommentToAll(comment: string) {
await pusher.trigger('chat-channel', 'new-message', {
    comment,
  })
}



export async function POST(request: Request) {
  const { text } = await request.json()

  const comment = {
    id: Date.now().toString(),
    message: text,
    username: "Anonymous", // You can implement user authentication to get real usernames
  }

  sendCommentToAll(JSON.stringify(comment))

  return NextResponse.json({ status:'success',message: "Comment sent" })
}

